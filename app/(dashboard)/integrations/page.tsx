'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, RefreshCw, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { integrations } from '@/lib/data'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

const integrationLogos: Record<string, string> = {
  'Google Workspace': 'G',
  'Microsoft 365': 'M',
  'Okta': 'O',
  'Slack': 'S',
  'GitHub': 'GH'
}

const integrationColors: Record<string, string> = {
  'Google Workspace': 'from-red-500 to-yellow-500',
  'Microsoft 365': 'from-blue-500 to-cyan-500',
  'Okta': 'from-blue-600 to-blue-400',
  'Slack': 'from-purple-500 to-pink-500',
  'GitHub': 'from-gray-700 to-gray-500'
}

export default function IntegrationsPage() {
  const [syncing, setSyncing] = useState<string | null>(null)

  const handleSync = (id: string) => {
    setSyncing(id)
    setTimeout(() => setSyncing(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Integrations</h1>
        <p className="mt-2 text-muted-foreground">
          Connect your identity providers and SaaS platforms
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Connected</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {integrations.filter(i => i.connected).length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {integrations.filter(i => !i.connected).length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Apps Discovered</p>
          <p className="mt-2 text-3xl font-bold text-primary">156</p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={cn(
              'glass-card rounded-2xl p-6 transition-all hover:scale-[1.01]',
              integration.connected && 'border-emerald-500/30'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white',
                  integrationColors[integration.name] || 'from-gray-500 to-gray-600'
                )}>
                  {integrationLogos[integration.name] || integration.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{integration.name}</h3>
                  {integration.connected ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Connected
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not connected</span>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{integration.description}</p>

            {integration.connected && integration.lastSync && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Last synced {formatDistanceToNow(new Date(integration.lastSync), { addSuffix: true })}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {integration.connected ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-xl border-border bg-muted"
                    onClick={() => handleSync(integration.id)}
                    disabled={syncing === integration.id}
                  >
                    <RefreshCw className={cn('h-4 w-4', syncing === integration.id && 'animate-spin')} />
                    {syncing === integration.id ? 'Syncing...' : 'Sync Now'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-xl border-border bg-muted"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Configure
                  </Button>
                </>
              ) : (
                <Button className="flex-1 gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Integrations */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground">More Integrations Coming Soon</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re continuously adding new integrations. Request an integration or check our roadmap.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {['Salesforce', 'Zendesk', 'Jira', 'Confluence', 'AWS', 'Azure AD', 'OneLogin'].map((name) => (
            <div
              key={name}
              className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-6 gap-2 rounded-xl border-border bg-muted">
          Request Integration
        </Button>
      </div>
    </div>
  )
}
