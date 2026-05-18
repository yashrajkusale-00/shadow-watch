import { ScanSearch, Upload, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Shadow IT Exposure Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          Monitor unauthorized SaaS adoption and security risk across your organization.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 glow-blue">
          <ScanSearch className="h-4 w-4" />
          Scan Organization
        </Button>
        <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80">
          <Upload className="h-4 w-4" />
          Upload Data
        </Button>
        <Button variant="outline" className="gap-2 rounded-xl border-border bg-muted hover:bg-muted/80">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}
