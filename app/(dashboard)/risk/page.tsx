'use client'

import { Shield, FileCheck, Lock, Globe, Building2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const overallRiskData = [
  { name: 'Low Risk', value: 45, color: '#10B981' },
  { name: 'Medium Risk', value: 32, color: '#F59E0B' },
  { name: 'High Risk', value: 18, color: '#F97316' },
  { name: 'Critical Risk', value: 5, color: '#EF4444' }
]

const riskFactors = [
  { 
    name: 'Security Certifications', 
    score: 72, 
    weight: 25,
    icon: Shield,
    description: 'Apps with SOC 2, ISO 27001, and other certifications'
  },
  { 
    name: 'Compliance Coverage', 
    score: 65, 
    weight: 20,
    icon: FileCheck,
    description: 'GDPR, HIPAA, and regulatory compliance status'
  },
  { 
    name: 'Permission Sensitivity', 
    score: 48, 
    weight: 20,
    icon: Lock,
    description: 'OAuth permissions and data access levels requested'
  },
  { 
    name: 'Data Residency', 
    score: 85, 
    weight: 15,
    icon: Globe,
    description: 'Data storage locations and transfer policies'
  },
  { 
    name: 'Vendor Reputation', 
    score: 78, 
    weight: 20,
    icon: Building2,
    description: 'Vendor history, breaches, and market presence'
  }
]

const categoryRisk = [
  { category: 'AI Tools', risk: 78, count: 12 },
  { category: 'Productivity', risk: 62, count: 28 },
  { category: 'Cloud Storage', risk: 45, count: 15 },
  { category: 'Communication', risk: 38, count: 22 },
  { category: 'Design', risk: 35, count: 18 },
  { category: 'Project Mgmt', risk: 32, count: 24 },
]

export default function RiskAssessmentPage() {
  // Calculate weighted score
  const weightedScore = Math.round(
    riskFactors.reduce((acc, factor) => acc + (factor.score * factor.weight / 100), 0)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Risk Assessment</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive security risk analysis and scoring methodology
        </p>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Score Gauge */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">Overall Risk Score</h3>
          <div className="mt-6 flex flex-col items-center">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="stroke-muted"
                  strokeWidth="10"
                  fill="none"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="stroke-amber-500 transition-all duration-1000"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${weightedScore * 2.51} 251`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-amber-400">{weightedScore}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Your organization has a <span className="font-medium text-amber-400">Medium</span> overall risk exposure
            </p>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">App Risk Distribution</h3>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {overallRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {overallRiskData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
                <span className="ml-auto text-xs font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk by Category */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">Risk by Category</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRisk} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
                <YAxis type="category" dataKey="category" stroke="#94A3B8" fontSize={10} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1F2937',
                    borderRadius: '12px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar 
                  dataKey="risk" 
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                  name="Risk Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground">Risk Scoring Components</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          How we calculate the overall risk score for each application
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {riskFactors.map((factor) => {
            const Icon = factor.icon
            const getColor = (score: number) => {
              if (score >= 70) return 'text-emerald-400 bg-emerald-500'
              if (score >= 50) return 'text-amber-400 bg-amber-500'
              return 'text-red-400 bg-red-500'
            }
            const colorClass = getColor(factor.score)
            
            return (
              <div key={factor.name} className="rounded-xl border border-border bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{factor.name}</p>
                    <p className="text-xs text-muted-foreground">Weight: {factor.weight}%</p>
                  </div>
                </div>
                
                <p className="mt-3 text-xs text-muted-foreground">{factor.description}</p>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className={colorClass.split(' ')[0] + ' font-bold'}>{factor.score}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${colorClass.split(' ')[1]}`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Methodology */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground">Risk Assessment Methodology</h3>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg font-bold text-emerald-400">
              1
            </div>
            <h4 className="mt-3 font-medium text-foreground">Data Collection</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              We collect data from multiple sources including OAuth connections, SSO logs, email signups, browser extensions, and expense reports.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-lg font-bold text-amber-400">
              2
            </div>
            <h4 className="mt-3 font-medium text-foreground">Risk Analysis</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Each application is evaluated against five key risk factors with weighted scoring based on your organization&apos;s security policies.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-lg font-bold text-blue-400">
              3
            </div>
            <h4 className="mt-3 font-medium text-foreground">Continuous Monitoring</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Risk scores are continuously updated as vendor certifications change, new permissions are granted, or security incidents occur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
