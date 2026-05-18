'use client'

import { use } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  Globe, 
  AlertTriangle, 
  Users, 
  Calendar,
  Lock,
  CheckCircle2,
  XCircle,
  FileText,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apps, users } from '@/lib/data'
import { cn } from '@/lib/utils'

function getRiskColor(score: number) {
  if (score <= 30) return { color: 'text-emerald-400', bg: 'bg-emerald-500', label: 'Low Risk' }
  if (score <= 60) return { color: 'text-amber-400', bg: 'bg-amber-500', label: 'Medium Risk' }
  if (score <= 80) return { color: 'text-orange-400', bg: 'bg-orange-500', label: 'High Risk' }
  return { color: 'text-red-400', bg: 'bg-red-500', label: 'Critical Risk' }
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'Approved': return { color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' }
    case 'Pending': return { color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' }
    case 'Blocked': return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' }
    default: return { color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' }
  }
}

export default function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const app = apps.find(a => a.id === id)
  
  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold text-foreground">App not found</h1>
        <Link href="/apps" className="mt-4 text-primary hover:underline">
          Back to apps
        </Link>
      </div>
    )
  }

  const riskConfig = getRiskColor(app.riskScore)
  const statusConfig = getStatusConfig(app.status)
  
  // Get sample users for this app
  const appUsers = users.slice(0, 5)

  // Risk factors
  const riskFactors = [
    { name: 'Security Certifications', score: app.compliance.length >= 3 ? 85 : app.compliance.length >= 2 ? 60 : 30, weight: 25 },
    { name: 'Compliance Coverage', score: app.compliance.includes('SOC 2') ? 80 : 40, weight: 20 },
    { name: 'Permission Sensitivity', score: app.oauthPermissions.length <= 2 ? 70 : 40, weight: 20 },
    { name: 'Data Residency', score: app.dataResidency === 'US' ? 90 : 60, weight: 15 },
    { name: 'Vendor Reputation', score: app.breachHistory ? 30 : 85, weight: 20 }
  ]

  // Timeline events
  const timeline = [
    { date: app.firstDetected, event: 'First detected in organization', type: 'discovery' },
    { date: '2024-01-20', event: 'Risk assessment completed', type: 'assessment' },
    { date: '2024-02-01', event: '15 new users added', type: 'users' },
    { date: '2024-02-10', event: 'Security review requested', type: 'review' },
  ]

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link 
        href="/apps" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discovered Apps
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50 text-2xl font-bold text-foreground">
            {app.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{app.name}</h1>
              <span className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium',
                statusConfig.bg, statusConfig.border, statusConfig.color
              )}>
                {app.status}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{app.vendor}</p>
            <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Approve App
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10">
            <XCircle className="h-4 w-4" />
            Block App
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
            <Shield className="h-4 w-4" />
            Request Review
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Risk Score & Details */}
        <div className="space-y-6">
          {/* Risk Score Gauge */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Risk Score</h3>
            <div className="mt-6 flex flex-col items-center">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="stroke-muted"
                    strokeWidth="8"
                    fill="none"
                    r="42"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={cn('transition-all duration-1000', riskConfig.color.replace('text-', 'stroke-'))}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    r="42"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${app.riskScore * 2.64} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={cn('text-4xl font-bold', riskConfig.color)}>{app.riskScore}</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <span className={cn('mt-4 text-sm font-medium', riskConfig.color)}>{riskConfig.label}</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Details</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Active Users
                </span>
                <span className="font-medium text-foreground">{app.activeUsers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  First Detected
                </span>
                <span className="font-medium text-foreground">{new Date(app.firstDetected).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  Data Residency
                </span>
                <span className="font-medium text-foreground">{app.dataResidency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  Breach History
                </span>
                <span className={cn('font-medium', app.breachHistory ? 'text-red-400' : 'text-emerald-400')}>
                  {app.breachHistory ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Security Certifications</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'].map((cert) => {
                const hasCert = app.compliance.includes(cert)
                return (
                  <span
                    key={cert}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium',
                      hasCert 
                        ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400' 
                        : 'border-border bg-muted text-muted-foreground'
                    )}
                  >
                    {hasCert ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                    {cert}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Middle column - Risk Breakdown & Permissions */}
        <div className="space-y-6">
          {/* Risk Breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Risk Assessment Breakdown</h3>
            <div className="mt-4 space-y-4">
              {riskFactors.map((factor) => (
                <div key={factor.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{factor.name}</span>
                    <span className="font-medium text-foreground">{factor.score}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        factor.score >= 70 ? 'bg-emerald-500' : factor.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Weight: {factor.weight}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* OAuth Permissions */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">OAuth Permissions Requested</h3>
            <div className="mt-4 space-y-2">
              {app.oauthPermissions.map((permission, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3"
                >
                  <Lock className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-foreground">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Users & Timeline */}
        <div className="space-y-6">
          {/* Users */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Active Users</h3>
              <span className="text-sm text-muted-foreground">{app.activeUsers} total</span>
            </div>
            <div className="mt-4 space-y-3">
              {appUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-xs font-medium text-foreground">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.department}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full rounded-xl border-border bg-muted">
              View all users
            </Button>
          </div>

          {/* Timeline */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Detection Timeline</h3>
            <div className="mt-4 space-y-4">
              {timeline.map((event, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-foreground">{event.event}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remediation */}
          <div className="glass-card rounded-2xl border-amber-500/30 p-6">
            <h3 className="text-lg font-semibold text-amber-400">Recommended Actions</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                Request SOC 2 Type II certification from vendor
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                Review and limit OAuth permissions
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                Establish data processing agreement
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                Monitor user activity patterns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
