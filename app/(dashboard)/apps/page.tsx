'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, ChevronDown, ExternalLink, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { apps, categories } from '@/lib/data'
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

function getSourceColor(source: string) {
  switch (source) {
    case 'Email': return 'bg-blue-500/20 text-blue-400'
    case 'SSO': return 'bg-purple-500/20 text-purple-400'
    case 'Browser': return 'bg-amber-500/20 text-amber-400'
    case 'Expense': return 'bg-emerald-500/20 text-emerald-400'
    default: return 'bg-muted text-muted-foreground'
  }
}

export default function DiscoveredAppsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'riskScore' | 'activeUsers' | 'firstDetected'>('riskScore')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Filter and sort apps
  const filteredApps = apps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || app.category === selectedCategory
      const matchesStatus = !selectedStatus || app.status === selectedStatus
      const matchesRisk = !selectedRisk || (
        selectedRisk === 'Low' && app.riskScore <= 30 ||
        selectedRisk === 'Medium' && app.riskScore > 30 && app.riskScore <= 60 ||
        selectedRisk === 'High' && app.riskScore > 60 && app.riskScore <= 80 ||
        selectedRisk === 'Critical' && app.riskScore > 80
      )
      return matchesSearch && matchesCategory && matchesStatus && matchesRisk
    })
    .sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Discovered Apps</h1>
        <p className="mt-2 text-muted-foreground">
          All SaaS applications discovered across your organization
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search apps or vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border-border bg-muted pl-10 text-sm placeholder:text-muted-foreground"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
              <Filter className="h-4 w-4" />
              {selectedCategory}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {categories.map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
              Status: {selectedStatus || 'All'}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedStatus(null)}>All</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedStatus('Approved')}>Approved</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('Pending')}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('Blocked')}>Blocked</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
              Risk: {selectedRisk || 'All'}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedRisk(null)}>All</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedRisk('Low')}>Low (0-30)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRisk('Medium')}>Medium (31-60)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRisk('High')}>High (61-80)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRisk('Critical')}>Critical (81-100)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto text-sm text-muted-foreground">
          {filteredApps.length} apps found
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th 
                  className="cursor-pointer px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('name')}
                >
                  App {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Source
                </th>
                <th 
                  className="cursor-pointer px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('activeUsers')}
                >
                  Users {sortBy === 'activeUsers' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('firstDetected')}
                >
                  First Detected {sortBy === 'firstDetected' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('riskScore')}
                >
                  Risk {sortBy === 'riskScore' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.map((app) => (
                <tr key={app.id} className="group transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{app.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                      getSourceColor(app.discoverySource)
                    )}>
                      {app.discoverySource}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-foreground">{app.activeUsers}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(app.firstDetected).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      'inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium',
                      getRiskColor(app.riskScore)
                    )}>
                      {app.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                      getStatusColor(app.status)
                    )}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/apps/${app.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1.5 rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Approve App</DropdownMenuItem>
                          <DropdownMenuItem>Block App</DropdownMenuItem>
                          <DropdownMenuItem>Request Review</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
