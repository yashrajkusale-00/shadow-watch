'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, Mail, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { users } from '@/lib/data'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

function getRiskColor(score: number) {
  if (score <= 30) return 'text-emerald-400 bg-emerald-500/20'
  if (score <= 60) return 'text-amber-400 bg-amber-500/20'
  if (score <= 80) return 'text-orange-400 bg-orange-500/20'
  return 'text-red-400 bg-red-500/20'
}

const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Product', 'Operations']

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [sortBy, setSortBy] = useState<'name' | 'riskExposure' | 'unauthorizedApps'>('riskExposure')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDepartment = selectedDepartment === 'All Departments' || user.department === selectedDepartment
      return matchesSearch && matchesDepartment
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Users</h1>
        <p className="mt-2 text-muted-foreground">
          Employees with unauthorized SaaS application usage
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Users Affected</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">High Risk Users</p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {users.filter(u => u.riskExposure > 70).length}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Avg. Unauthorized Apps</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {Math.round(users.reduce((acc, u) => acc + u.unauthorizedApps, 0) / users.length)}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Avg. Risk Exposure</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {Math.round(users.reduce((acc, u) => acc + u.riskExposure, 0) / users.length)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border-border bg-muted pl-10 text-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
              <Filter className="h-4 w-4" />
              {selectedDepartment}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {departments.map((dept) => (
              <DropdownMenuItem key={dept} onClick={() => setSelectedDepartment(dept)}>
                {dept}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto text-sm text-muted-foreground">
          {filteredUsers.length} users
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
                  User {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Department
                </th>
                <th 
                  className="cursor-pointer px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('unauthorizedApps')}
                >
                  Unauthorized Apps {sortBy === 'unauthorizedApps' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('riskExposure')}
                >
                  Risk Exposure {sortBy === 'riskExposure' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Last Activity
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-medium text-foreground">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {user.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-foreground">{user.unauthorizedApps}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      'inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium',
                      getRiskColor(user.riskExposure)
                    )}>
                      {user.riskExposure}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(user.lastActivity), { addSuffix: true })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-lg text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      View Details
                    </Button>
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
