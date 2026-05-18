'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const data = [
  { month: 'Aug', apps: 89, risk: 42 },
  { month: 'Sep', apps: 98, risk: 45 },
  { month: 'Oct', apps: 112, risk: 51 },
  { month: 'Nov', apps: 125, risk: 55 },
  { month: 'Dec', apps: 134, risk: 58 },
  { month: 'Jan', apps: 148, risk: 63 },
  { month: 'Feb', apps: 156, risk: 67 }
]

export function ExposureTrendChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Exposure Trend</h3>
          <p className="mt-1 text-sm text-muted-foreground">Shadow IT growth over time</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
            <span className="text-xs text-muted-foreground">Discovered Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
            <span className="text-xs text-muted-foreground">Risk Score</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="appsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #1F2937',
                borderRadius: '12px',
                color: '#F9FAFB'
              }}
            />
            <Area
              type="monotone"
              dataKey="apps"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#appsGradient)"
              name="Discovered Apps"
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#riskGradient)"
              name="Risk Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
