'use client'

import { useState } from 'react'
import { Plus, Shield, Bell, Ban, Flag, ToggleLeft, ToggleRight, Clock, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { policies, type Policy } from '@/lib/data'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

function getActionIcon(action: string) {
  switch (action) {
    case 'Send Alert': return Bell
    case 'Block App': return Ban
    case 'Notify Admin': return Bell
    case 'Flag for Review': return Flag
    default: return Shield
  }
}

function getActionColor(action: string) {
  switch (action) {
    case 'Send Alert': return 'text-amber-400 bg-amber-500/20'
    case 'Block App': return 'text-red-400 bg-red-500/20'
    case 'Notify Admin': return 'text-blue-400 bg-blue-500/20'
    case 'Flag for Review': return 'text-purple-400 bg-purple-500/20'
    default: return 'text-muted-foreground bg-muted'
  }
}

export default function PoliciesPage() {
  const [policiesState, setPoliciesState] = useState<Policy[]>(policies)

  const togglePolicy = (id: string) => {
    setPoliciesState(prev =>
      prev.map(policy =>
        policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Policies</h1>
          <p className="mt-2 text-muted-foreground">
            Automated rules to manage shadow IT risk
          </p>
        </div>
        <Button className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
          <Plus className="h-4 w-4" />
          Create Policy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Policies</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{policiesState.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Active Policies</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {policiesState.filter(p => p.enabled).length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Triggered Today</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">3</p>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {policiesState.map((policy) => {
          const ActionIcon = getActionIcon(policy.action)
          const actionColor = getActionColor(policy.action)

          return (
            <div
              key={policy.id}
              className={cn(
                'glass-card rounded-2xl p-6 transition-all',
                !policy.enabled && 'opacity-60'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', actionColor)}>
                    <ActionIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{policy.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePolicy(policy.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {policy.enabled ? (
                    <ToggleRight className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="h-8 w-8" />
                  )}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="rounded-xl border border-border bg-muted/50 px-4 py-2">
                  <p className="text-xs text-muted-foreground">Condition</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{policy.condition}</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/50 px-4 py-2">
                  <p className="text-xs text-muted-foreground">Action</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{policy.action}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                {policy.lastTriggered ? (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Last triggered {formatDistanceToNow(new Date(policy.lastTriggered), { addSuffix: true })}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Never triggered</span>
                )}
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rule Builder Hint */}
      <div className="glass-card rounded-2xl border-dashed border-2 border-border p-8 text-center">
        <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 font-semibold text-foreground">Build Custom Rules</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create automated policies using our visual rule builder to enforce security standards across your organization
        </p>
        <Button variant="outline" className="mt-4 gap-2 rounded-xl border-border bg-muted">
          <Plus className="h-4 w-4" />
          Open Rule Builder
        </Button>
      </div>
    </div>
  )
}
