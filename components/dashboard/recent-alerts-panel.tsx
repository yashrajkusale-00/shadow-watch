'use client'

import { AlertTriangle, AlertCircle, Info, CheckCircle2, Clock } from 'lucide-react'
import { alerts } from '@/lib/data'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

function getSeverityConfig(severity: string) {
  switch (severity) {
    case 'critical':
      return { 
        icon: AlertTriangle, 
        color: 'text-red-400', 
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        glow: 'shadow-red-500/20'
      }
    case 'high':
      return { 
        icon: AlertCircle, 
        color: 'text-orange-400', 
        bg: 'bg-orange-500/20',
        border: 'border-orange-500/30',
        glow: 'shadow-orange-500/20'
      }
    case 'medium':
      return { 
        icon: Info, 
        color: 'text-amber-400', 
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        glow: 'shadow-amber-500/20'
      }
    default:
      return { 
        icon: CheckCircle2, 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        glow: 'shadow-emerald-500/20'
      }
  }
}

// Get recent alerts (only new and investigating)
const recentAlerts = alerts
  .filter(a => a.status === 'new' || a.status === 'investigating')
  .slice(0, 4)

export function RecentAlertsPanel() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          <p className="mt-1 text-sm text-muted-foreground">Security events requiring attention</p>
        </div>
        <span className="flex h-6 items-center rounded-full bg-red-500/20 px-2.5 text-xs font-medium text-red-400">
          {recentAlerts.length} active
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {recentAlerts.map((alert) => {
          const config = getSeverityConfig(alert.severity)
          const Icon = config.icon
          
          return (
            <div
              key={alert.id}
              className={cn(
                'group cursor-pointer rounded-xl border p-4 transition-smooth hover:scale-[1.01]',
                config.border,
                'bg-gradient-to-r from-transparent to-transparent hover:from-muted/50 hover:to-transparent'
              )}
            >
              <div className="flex gap-3">
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  config.bg
                )}>
                  <Icon className={cn('h-5 w-5', config.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground line-clamp-1">{alert.title}</p>
                    <span className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase',
                      config.bg,
                      config.color
                    )}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{alert.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </span>
                    {alert.appName && (
                      <span className="rounded bg-muted px-1.5 py-0.5">
                        {alert.appName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button className="mt-4 w-full rounded-xl border border-border bg-muted/50 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        View all alerts
      </button>
    </div>
  )
}
