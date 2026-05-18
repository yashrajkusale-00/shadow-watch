'use client'

import Link from 'next/link'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apps } from '@/lib/data'
import { cn } from '@/lib/utils'

function getRiskColor(score: number) {
  if (score <= 30) return 'text-emerald-400 bg-emerald-500/20'
  if (score <= 60) return 'text-amber-400 bg-amber-500/20'
  if (score <= 80) return 'text-orange-400 bg-orange-500/20'
  return 'text-red-400 bg-red-500/20'
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Approved': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
    case 'Pending': return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
    case 'Blocked': return 'text-red-400 bg-red-500/20 border-red-500/30'
    default: return 'text-muted-foreground bg-muted border-border'
  }
}

const complianceBadges: Record<string, string> = {
  'SOC 2': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'ISO 27001': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'GDPR': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'HIPAA': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
}

// Get top high-risk apps
const highRiskApps = [...apps].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5)

export function HighRiskAppsTable() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top High-Risk Apps</h3>
          <p className="mt-1 text-sm text-muted-foreground">Applications requiring immediate attention</p>
        </div>
        <Link href="/apps">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">App</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</th>
              <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Users</th>
              <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Risk</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Compliance</th>
              <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {highRiskApps.map((app) => (
              <tr key={app.id} className="group transition-colors hover:bg-muted/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 text-sm font-bold text-foreground">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.vendor}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-muted-foreground">{app.category}</span>
                </td>
                <td className="py-4 text-center">
                  <span className="text-sm font-medium text-foreground">{app.activeUsers}</span>
                </td>
                <td className="py-4 text-center">
                  <span className={cn(
                    'inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium',
                    getRiskColor(app.riskScore)
                  )}>
                    {app.riskScore}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-1">
                    {app.compliance.slice(0, 2).map((cert) => (
                      <span
                        key={cert}
                        className={cn(
                          'rounded-md border px-1.5 py-0.5 text-[10px] font-medium',
                          complianceBadges[cert] || 'bg-muted text-muted-foreground border-border'
                        )}
                      >
                        {cert}
                      </span>
                    ))}
                    {app.compliance.length > 2 && (
                      <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        +{app.compliance.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                    getStatusColor(app.status)
                  )}>
                    {app.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <Link href={`/apps/${app.id}`}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1.5 rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Details
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
