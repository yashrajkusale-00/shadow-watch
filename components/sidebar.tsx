'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  AppWindow, 
  ShieldAlert, 
  Users, 
  Bell, 
  FileText, 
  Plug, 
  BarChart3, 
  Settings,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Discovered Apps', href: '/apps', icon: AppWindow },
  { name: 'Risk Assessments', href: '/risk', icon: ShieldAlert },
  { name: 'Agent Test', href: '/agent', icon: ShieldAlert },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Policies', href: '/policies', icon: FileText },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">ShadowWatch</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth',
                  isActive
                    ? 'active-nav-glow bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className={cn(
                  'h-5 w-5 transition-smooth',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
            <p className="text-xs font-medium text-muted-foreground">Security Score</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">67</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" 
                style={{ width: '67%' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
