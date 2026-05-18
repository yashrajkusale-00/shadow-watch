import { NextResponse } from 'next/server';
import { SHADOW_IT_AGENT_PROMPT } from '@/lib/prompts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signals = body.signals;

    if (!signals || !Array.isArray(signals)) {
      return NextResponse.json({ error: 'Invalid payload: signals must be an array' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a mock response if no API key is present
      // This allows the app to be tested immediately without setup
      console.log('No OPENAI_API_KEY found, returning mock response for signals:', signals);
      
      const mockResponse = signals.map(signal => {
        const isUnknown = !signal.domain.includes('notion') && !signal.domain.includes('slack');
        
        if (signal.domain === 'darkweb-tor-proxy.ru') {
          return {
            "alert_id": crypto.randomUUID(),
            "detected_at": new Date().toISOString(),
            "tool": {
              "name": "Tor Proxy Node",
              "domain": signal.domain,
              "vendor": "Unknown (Russian Federation)",
              "category": "anonymizer / bypass"
            },
            "users": [
              {
                "email": signal.user_email,
                "department": signal.department || "Engineering",
                "first_seen": signal.timestamp
              }
            ],
            "signals": [signal.source],
            "risk": {
              "score": 98,
              "level": "Critical",
              "breakdown": {
                "vendor_risk": 40,
                "data_exposure_risk": 35,
                "spread_risk": 23
              },
              "reasoning": "CRITICAL THREAT: Employee is attempting to route traffic through a known dark web proxy node hosted in a high-risk jurisdiction (Russia). This circumvents all corporate firewalls and is highly indicative of data exfiltration or malicious insider activity."
            },
            "recommendation": {
              "action": "Block",
              "reason": "Immediate device isolation and network block required. Alert SOC team for potential breach or insider threat investigation."
            }
          };
        }

        if (isUnknown) {
          return {
            "alert_id": crypto.randomUUID(),
            "detected_at": new Date().toISOString(),
            "tool": {
              "name": "Unknown",
              "domain": signal.domain,
              "vendor": null,
              "category": "unknown"
            },
            "users": [
              {
                "email": signal.user_email,
                "department": signal.department || "Unknown",
                "first_seen": signal.timestamp || new Date().toISOString()
              }
            ],
            "signals": [signal.source],
            "risk": {
              "score": 75,
              "level": "High",
              "breakdown": {
                "vendor_risk": 40,
                "data_exposure_risk": 10,
                "spread_risk": 25
              },
              "reasoning": "Domain has no fingerprint match. Unknown vendors with no compliance record default to high risk. Treat as unvetted until manually reviewed."
            },
            "recommendation": {
              "action": "Review",
              "reason": "Cannot assess compliance posture without fingerprint match. Flag for manual security review."
            }
          };
        }

        const scopes = signal.raw?.scopes || [];
        const hasHighRiskScopes = scopes.includes('drive.all') || scopes.includes('files.readwrite') || scopes.includes('mail.read');
        
        const dataExposureRisk = hasHighRiskScopes ? 37 : 17;
        const totalRisk = 0 + dataExposureRisk + 25; // vendor + data + spread
        
        let riskLevel = "Medium";
        if (totalRisk > 60 && totalRisk <= 85) riskLevel = "High";
        if (totalRisk > 85) riskLevel = "Critical";

        const reasoning = hasHighRiskScopes 
          ? `Notion has SOC2 and GDPR DPA so vendor risk is low. However, the requested OAuth scopes (${scopes.join(', ')}) are highly privileged (data exposure risk +20). Combined with multiple employees using it in a sensitive department, this presents a significant threat.`
          : `Notion has SOC2 and GDPR DPA so vendor risk is low. OAuth scopes are minimal (${scopes.join(', ') || 'profile + email'}) keeping data exposure moderate. However, multiple employees are now using it, which elevates spread risk significantly given the department sensitivity.`;

        return {
          "alert_id": crypto.randomUUID(),
          "detected_at": new Date().toISOString(),
          "tool": {
            "name": "Notion",
            "domain": "notion.so",
            "vendor": "Notion Labs Inc.",
            "category": "productivity",
            "soc2": true,
            "gdpr_dpa": true,
            "breach_history": false
          },
          "users": [
            {
              "email": signal.user_email,
              "department": signal.department,
              "first_seen": signal.timestamp
            }
          ],
          "signals": [signal.source],
          "risk": {
            "score": totalRisk,
            "level": riskLevel,
            "breakdown": {
              "vendor_risk": 0,
              "data_exposure_risk": dataExposureRisk,
              "spread_risk": 25
            },
            "reasoning": reasoning
          },
          "recommendation": {
            "action": hasHighRiskScopes ? "Block" : "Review",
            "reason": hasHighRiskScopes 
              ? "Tool is requesting excessive permissions (drive.all/mail.read). Recommend immediate block until business justification is provided and scopes are restricted."
              : "Tool is compliance-friendly but spread across a sensitive department. Recommend IT formally evaluates and either approves with a DPA signed or restricts to a managed workspace."
          }
        };
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json(mockResponse);
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: SHADOW_IT_AGENT_PROMPT
          },
          {
            role: 'user',
            content: JSON.stringify(signals)
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return NextResponse.json({ error: 'Failed to process signals with AI' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      // The prompt asks for an array, but if we use json_object it might wrap it. 
      // Let's handle both cases.
      const result = Array.isArray(parsed) ? parsed : (parsed.alerts || parsed.data || parsed);
      return NextResponse.json(result);
    } catch (e) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
