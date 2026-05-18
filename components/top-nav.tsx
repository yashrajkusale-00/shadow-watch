'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAdmin } from '@/app/actions'
import { Search, RefreshCw, Bell, Calendar, ChevronDown, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function TopNav() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAdmin()
    router.push('/login')
    router.refresh()
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search apps, users, vendors..."
          className="h-10 w-full rounded-xl border-border bg-muted pl-10 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Refresh button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80"
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        {/* Date range selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Last 30 days</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 90 days</DropdownMenuItem>
            <DropdownMenuItem>Last year</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Custom range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative rounded-xl border-border bg-muted hover:bg-muted/80">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            3
          </span>
        </Button>

        {/* Organization switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="hidden sm:inline">Acme Corp</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              Acme Corp
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500">
                <Building2 className="h-3.5 w-3.5 text-white" />
              </div>
              TechStart Inc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add organization</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-medium text-white">
                JD
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>John Doe</span>
                <span className="text-xs font-normal text-muted-foreground">john@acme.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
