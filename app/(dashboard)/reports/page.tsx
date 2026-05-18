'use client'

import { FileText, Download, Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reports = [
  {
    id: '1',
    name: 'Executive Summary',
    description: 'High-level overview of shadow IT exposure, key risks, and recommended actions for leadership.',
    type: 'PDF',
    icon: '📊',
    lastGenerated: '2024-02-15T10:00:00'
  },
  {
    id: '2',
    name: 'Compliance Report',
    description: 'Detailed analysis of compliance gaps across discovered applications including SOC 2, GDPR, and HIPAA.',
    type: 'PDF',
    icon: '📋',
    lastGenerated: '2024-02-14T14:30:00'
  },
  {
    id: '3',
    name: 'High-Risk Apps Report',
    description: 'Complete list of high-risk applications with security assessments and remediation recommendations.',
    type: 'PDF',
    icon: '⚠️',
    lastGenerated: '2024-02-13T09:15:00'
  },
  {
    id: '4',
    name: 'User Activity Report',
    description: 'Employee-level breakdown of unauthorized SaaS usage patterns and risk exposure.',
    type: 'CSV',
    icon: '👥',
    lastGenerated: '2024-02-12T16:45:00'
  },
  {
    id: '5',
    name: 'Vendor Assessment Report',
    description: 'Security posture analysis of all discovered vendors including certifications and breach history.',
    type: 'PDF',
    icon: '🏢',
    lastGenerated: null
  },
  {
    id: '6',
    name: 'Trend Analysis Report',
    description: 'Historical trends in shadow IT adoption, risk scores, and remediation effectiveness.',
    type: 'PDF',
    icon: '📈',
    lastGenerated: '2024-02-10T11:00:00'
  }
]

const scheduledReports = [
  { name: 'Weekly Executive Summary', frequency: 'Every Monday', nextRun: '2024-02-19T08:00:00' },
  { name: 'Monthly Compliance Report', frequency: 'First of month', nextRun: '2024-03-01T08:00:00' },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
        <p className="mt-2 text-muted-foreground">
          Generate and schedule security reports for your organization
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div key={report.id} className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                {report.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{report.name}</h3>
                <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  {report.type}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground flex-1">{report.description}</p>

            {report.lastGenerated && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <Button className="flex-1 gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80">
                <FileText className="h-4 w-4" />
                Generate
              </Button>
              {report.lastGenerated && (
                <Button variant="outline" size="icon" className="rounded-xl border-border bg-muted">
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
            <p className="mt-1 text-sm text-muted-foreground">Automated reports delivered to your inbox</p>
          </div>
          <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {scheduledReports.map((report, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next run</p>
                <p className="text-sm text-foreground">
                  {new Date(report.nextRun).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="glass-card rounded-2xl border-dashed border-2 border-border p-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 font-semibold text-foreground">Custom Report Builder</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create custom reports with specific data points, filters, and visualizations
        </p>
        <Button variant="outline" className="mt-4 gap-2 rounded-xl border-border bg-muted">
          Open Report Builder
        </Button>
      </div>
    </div>
  )
}
