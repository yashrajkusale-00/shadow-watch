'use client'

import { useState } from 'react'
import { Building2, Bell, Gauge, Shield, CreditCard, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'risk-model', label: 'Risk Model', icon: Gauge },
  { id: 'access', label: 'Access Control', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your organization preferences and configuration
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="glass-card rounded-2xl p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : '')} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'organization' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Organization Details</h3>
                <p className="text-sm text-muted-foreground">Basic information about your organization</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Organization Name</label>
                  <Input defaultValue="Acme Corporation" className="rounded-xl border-border bg-muted" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Domain</label>
                  <Input defaultValue="acme.com" className="rounded-xl border-border bg-muted" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <Input defaultValue="Technology" className="rounded-xl border-border bg-muted" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Employee Count</label>
                  <Input defaultValue="500-1000" className="rounded-xl border-border bg-muted" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="gap-2 rounded-xl">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Configure how and when you receive alerts</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Critical Risk Alerts', description: 'Immediate notification for apps with risk score > 80', enabled: true },
                  { label: 'New App Detected', description: 'When a new unauthorized app is discovered', enabled: true },
                  { label: 'Weekly Summary', description: 'Weekly digest of shadow IT activity', enabled: true },
                  { label: 'Compliance Gaps', description: 'When apps fail compliance requirements', enabled: false },
                  { label: 'User Activity Spikes', description: 'Unusual adoption patterns detected', enabled: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className={cn(
                      'h-6 w-11 rounded-full transition-colors cursor-pointer',
                      item.enabled ? 'bg-primary' : 'bg-muted'
                    )}>
                      <div className={cn(
                        'h-5 w-5 rounded-full bg-white shadow-sm transition-transform mt-0.5',
                        item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'risk-model' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Risk Model Weights</h3>
                <p className="text-sm text-muted-foreground">Customize how risk scores are calculated</p>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Security Certifications', value: 25 },
                  { label: 'Compliance Coverage', value: 20 },
                  { label: 'Permission Sensitivity', value: 20 },
                  { label: 'Data Residency', value: 15 },
                  { label: 'Vendor Reputation', value: 20 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={item.value}
                      className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex gap-3">
                <Button className="gap-2 rounded-xl">
                  <Save className="h-4 w-4" />
                  Save Weights
                </Button>
                <Button variant="outline" className="rounded-xl border-border bg-muted">
                  Reset to Default
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Access Control</h3>
                <p className="text-sm text-muted-foreground">Manage team members and permissions</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'John Doe', email: 'john@acme.com', role: 'Admin', avatar: 'JD' },
                  { name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Analyst', avatar: 'SC' },
                  { name: 'Mike Wilson', email: 'mike@acme.com', role: 'Viewer', avatar: 'MW' },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-medium text-foreground">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <span className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium',
                      user.role === 'Admin' ? 'bg-primary/20 text-primary' :
                      user.role === 'Analyst' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
                Invite Team Member
              </Button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
              </div>

              <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="text-2xl font-bold text-foreground">Enterprise</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Monthly</p>
                    <p className="text-2xl font-bold text-foreground">$499</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" className="rounded-xl border-border bg-background/50">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="rounded-xl border-border bg-background/50">
                    View Invoice History
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Payment Method</h4>
                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-xs font-bold text-white">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-foreground">**** **** **** 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
