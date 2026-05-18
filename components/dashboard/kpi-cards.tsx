'use client'

import { useEffect, useState } from 'react'
import { 
  AppWindow, 
  ShieldAlert, 
  AlertTriangle, 
  Users, 
  FileWarning, 
  Gauge,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: number
  trend: number
  icon: React.ElementType
  sparklineData: number[]
  color: 'blue' | 'purple' | 'red' | 'amber' | 'emerald' | 'orange'
  suffix?: string
}

const colorMap = {
  blue: {
    bg: 'from-blue-500/20 to-blue-600/10',
    icon: 'text-blue-500',
    glow: 'shadow-blue-500/20',
    chart: '#3B82F6'
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-600/10',
    icon: 'text-purple-500',
    glow: 'shadow-purple-500/20',
    chart: '#8B5CF6'
  },
  red: {
    bg: 'from-red-500/20 to-red-600/10',
    icon: 'text-red-500',
    glow: 'shadow-red-500/20',
    chart: '#EF4444'
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/10',
    icon: 'text-amber-500',
    glow: 'shadow-amber-500/20',
    chart: '#F59E0B'
  },
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-600/10',
    icon: 'text-emerald-500',
    glow: 'shadow-emerald-500/20',
    chart: '#10B981'
  },
  orange: {
    bg: 'from-orange-500/20 to-orange-600/10',
    icon: 'text-orange-500',
    glow: 'shadow-orange-500/20',
    chart: '#F97316'
  }
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="animate-count">
      {displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function KPICard({ title, value, trend, icon: Icon, sparklineData, color, suffix = '' }: KPICardProps) {
  const colors = colorMap[color]
  const isPositive = trend > 0
  const chartData = sparklineData.map((v, i) => ({ value: v, index: i }))

  return (
    <div className={cn(
      'glass-card group relative overflow-hidden rounded-2xl p-5 transition-smooth hover:scale-[1.02]',
      `hover:shadow-lg hover:${colors.glow}`
    )}>
      {/* Background gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-70',
        colors.bg
      )} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            `bg-gradient-to-br ${colors.bg}`
          )}>
            <Icon className={cn('h-5 w-5', colors.icon)} />
          </div>
          <div className={cn(
            'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
            isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        </div>

        {/* Value */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            <AnimatedNumber value={value} suffix={suffix} />
          </p>
        </div>

        {/* Sparkline */}
        <div className="mt-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.chart} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={colors.chart} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.chart}
                strokeWidth={2}
                fill={`url(#gradient-${color})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function KPIGrid() {
  const kpis = [
    {
      title: 'Total Discovered Apps',
      value: 156,
      trend: 12,
      icon: AppWindow,
      sparklineData: [89, 98, 112, 125, 134, 148, 156],
      color: 'blue' as const
    },
    {
      title: 'Unsanctioned Apps',
      value: 47,
      trend: 8,
      icon: ShieldAlert,
      sparklineData: [28, 32, 35, 38, 42, 45, 47],
      color: 'purple' as const
    },
    {
      title: 'High Risk Apps',
      value: 12,
      trend: 15,
      icon: AlertTriangle,
      sparklineData: [6, 7, 8, 9, 10, 11, 12],
      color: 'red' as const
    },
    {
      title: 'Employees Affected',
      value: 892,
      trend: 5,
      icon: Users,
      sparklineData: [650, 712, 756, 798, 834, 867, 892],
      color: 'amber' as const
    },
    {
      title: 'Compliance Gaps',
      value: 23,
      trend: -3,
      icon: FileWarning,
      sparklineData: [28, 26, 25, 24, 24, 23, 23],
      color: 'orange' as const
    },
    {
      title: 'Exposure Score',
      value: 67,
      trend: 4,
      icon: Gauge,
      sparklineData: [42, 45, 51, 55, 58, 63, 67],
      color: 'emerald' as const,
      suffix: '/100'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
