'use client'

import { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Clock, GripVertical } from 'lucide-react'
import { alerts } from '@/lib/data'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

function getSeverityConfig(severity: string) {
  switch (severity) {
    case 'critical':
      return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' }
    case 'high':
      return { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
    case 'medium':
      return { icon: Info, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' }
    default:
      return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' }
  }
}

type AlertStatus = 'new' | 'investigating' | 'resolved'

export default function AlertsPage() {
  const [alertsState, setAlertsState] = useState(alerts)

  const columns: { status: AlertStatus; title: string; color: string }[] = [
    { status: 'new', title: 'New', color: 'bg-red-500' },
    { status: 'investigating', title: 'Investigating', color: 'bg-amber-500' },
    { status: 'resolved', title: 'Resolved', color: 'bg-emerald-500' },
  ]

  const moveAlert = (alertId: string, newStatus: AlertStatus) => {
    setAlertsState(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          Security events and notifications requiring attention
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Alerts</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{alertsState.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Critical</p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {alertsState.filter(a => a.severity === 'critical').length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">High Priority</p>
          <p className="mt-2 text-3xl font-bold text-orange-400">
            {alertsState.filter(a => a.severity === 'high').length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Resolved Today</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {alertsState.filter(a => a.status === 'resolved').length}
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const columnAlerts = alertsState.filter(a => a.status === column.status)
          
          return (
            <div key={column.status} className="glass-card rounded-2xl p-4">
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn('h-3 w-3 rounded-full', column.color)} />
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {columnAlerts.length}
                </span>
              </div>

              {/* Alert Cards */}
              <div className="space-y-3">
                {columnAlerts.map((alert) => {
                  const config = getSeverityConfig(alert.severity)
                  const Icon = config.icon

                  return (
                    <div
                      key={alert.id}
                      className={cn(
                        'group cursor-pointer rounded-xl border p-4 transition-all hover:scale-[1.01]',
                        config.border,
                        'bg-gradient-to-br from-muted/50 to-transparent'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                        <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', config.bg)}>
                          <Icon className={cn('h-4 w-4', config.color)} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-foreground text-sm line-clamp-2">{alert.title}</p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                          
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <span className={cn(
                              'rounded-full px-2 py-0.5 text-[10px] font-medium uppercase',
                              config.bg, config.color
                            )}>
                              {alert.severity}
                            </span>
                            {alert.appName && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                {alert.appName}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                          </div>

                          {/* Quick Actions */}
                          {column.status !== 'resolved' && (
                            <div className="mt-3 flex gap-2">
                              {column.status === 'new' && (
                                <button
                                  onClick={() => moveAlert(alert.id, 'investigating')}
                                  className="text-xs text-primary hover:underline"
                                >
                                  Start Investigation
                                </button>
                              )}
                              {column.status === 'investigating' && (
                                <button
                                  onClick={() => moveAlert(alert.id, 'resolved')}
                                  className="text-xs text-emerald-400 hover:underline"
                                >
                                  Mark Resolved
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {columnAlerts.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center">
                    <p className="text-sm text-muted-foreground">No alerts</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
