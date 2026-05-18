"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ShieldAlert, CheckCircle, HelpCircle, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultSample = [
  {
    "source": "oauth",
    "domain": "notion.so",
    "user_email": "sarah@acme.com",
    "department": "Finance",
    "timestamp": new Date().toISOString(),
    "raw": {
      "app_name": "Notion",
      "scopes": ["drive.all", "mail.read"],
      "grant_type": "authorization_code"
    }
  },
  {
    "source": "dns",
    "domain": "darkweb-tor-proxy.ru",
    "user_email": "josh.admin@acme.com",
    "department": "IT Operations",
    "timestamp": new Date().toISOString(),
    "raw": {
      "query_type": "A",
      "resolver": "internal_dns"
    }
  }
];

export function AgentTester() {
  const [input, setInput] = useState(JSON.stringify(defaultSample, null, 2));
  const [apiKey, setApiKey] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track if we just received a critical alert to show the flash effect
  const [criticalFlash, setCriticalFlash] = useState(false);

  const runAgent = async () => {
    try {
      setLoading(true);
      setError(null);
      setResults(null);
      setCriticalFlash(false);
      
      let parsedSignals;
      try {
        parsedSignals = JSON.parse(input);
      } catch (e) {
        throw new Error("Invalid JSON input");
      }

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          signals: Array.isArray(parsedSignals) ? parsedSignals : [parsedSignals],
          apiKey: apiKey || undefined 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process signals');
      }

      setResults(data);
      
      // Check if any result is critical
      if (Array.isArray(data) && data.some(alert => alert.risk?.level?.toLowerCase() === 'critical')) {
        setCriticalFlash(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch(level?.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500 animate-pulse font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[600px] relative">
      {/* Full screen red flash effect for critical alerts */}
      {criticalFlash && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-red-500/10 animate-[pulse_2s_ease-in-out_infinite] shadow-[inset_0_0_150px_rgba(239,68,68,0.3)]"></div>
      )}
      
      <Card className="flex flex-col h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-xl relative z-10">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            Input Signals
          </CardTitle>
          <CardDescription>
            Provide raw JSON signals from email, OAuth, or DNS logs.
          </CardDescription>
          <div className="pt-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-zinc-500" />
            <Input 
              type="password" 
              placeholder="Optional: Enter Groq API Key for live AI generation..." 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 font-mono text-sm min-h-[400px] bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500"
            placeholder="Paste JSON array of signals here..."
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={runAgent} 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agent Processing...
              </>
            ) : (
              "Run Detection Agent"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="flex flex-col h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-xl relative z-10 overflow-hidden">
        {criticalFlash && (
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-[pulse_1s_infinite]"></div>
        )}
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Agent Output
          </CardTitle>
          <CardDescription>
            Structured alerts and risk assessments.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-[400px] lg:h-full px-6 pb-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            {!error && !results && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 min-h-[300px]">
                <HelpCircle className="w-12 h-12 mb-4 opacity-20" />
                <p>Run the agent to see analysis results</p>
              </div>
            )}

            <div className="space-y-4">
              {results?.map((alert, i) => {
                const isCritical = alert.risk?.level?.toLowerCase() === 'critical';
                
                return (
                  <div key={i} className={`rounded-xl border ${isCritical ? 'border-red-500/50 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'border-zinc-800 bg-zinc-900/40'} p-5 space-y-4 relative overflow-hidden transition-all`}>
                    
                    {isCritical && (
                       <div className="absolute top-0 right-0 p-2">
                          <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                       </div>
                    )}
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold text-lg flex items-center gap-2 ${isCritical ? 'text-red-400' : 'text-zinc-100'}`}>
                          {alert.tool?.name}
                          {alert.tool?.category === 'unknown' && !isCritical && (
                            <Badge variant="outline" className="bg-zinc-800 text-zinc-300">Unvetted</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-zinc-500 font-mono mt-1">{alert.tool?.domain}</p>
                      </div>
                      <Badge variant="outline" className={getRiskColor(alert.risk?.level)}>
                        Risk: {alert.risk?.score} ({alert.risk?.level})
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-zinc-400">Agent Reasoning</h4>
                      <p className={`text-sm leading-relaxed p-3 rounded-lg border ${isCritical ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-black/20 border-white/5 text-zinc-300'}`}>
                        {alert.risk?.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Recommendation</span>
                        <p className={`text-sm font-bold ${isCritical ? 'text-red-400' : 'text-zinc-200'}`}>
                          {alert.recommendation?.action}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Users Affected</span>
                        <p className="text-sm font-medium text-zinc-200">
                          {alert.users?.length || 0} user(s)
                        </p>
                      </div>
                    </div>
                    
                    {alert.recommendation?.reason && (
                       <div className={`mt-2 text-sm border-l-2 pl-3 ${isCritical ? 'border-red-500 text-red-300/80 font-medium' : 'border-indigo-500/30 text-zinc-400'}`}>
                         {alert.recommendation.reason}
                       </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
