import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { KPIGrid } from '@/components/dashboard/kpi-cards'
import { RiskDistributionChart } from '@/components/dashboard/risk-distribution-chart'
import { ExposureTrendChart } from '@/components/dashboard/exposure-trend-chart'
import { HighRiskAppsTable } from '@/components/dashboard/high-risk-apps-table'
import { RecentAlertsPanel } from '@/components/dashboard/recent-alerts-panel'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header with CTAs */}
      <DashboardHeader />

      {/* KPI Cards */}
      <KPIGrid />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RiskDistributionChart />
        <div className="lg:col-span-2">
          <ExposureTrendChart />
        </div>
      </div>

      {/* Table and Alerts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <HighRiskAppsTable />
        </div>
        <RecentAlertsPanel />
      </div>
    </div>
  )
}
