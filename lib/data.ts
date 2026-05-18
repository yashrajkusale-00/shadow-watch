// Sample data for the ShadowWatch dashboard
export interface App {
  id: string
  name: string
  logo: string
  vendor: string
  category: string
  discoverySource: 'Email' | 'SSO' | 'Browser' | 'Expense'
  activeUsers: number
  firstDetected: string
  riskScore: number
  status: 'Approved' | 'Pending' | 'Blocked'
  compliance: string[]
  oauthPermissions: string[]
  dataResidency: string
  breachHistory: boolean
  description: string
}

export interface User {
  id: string
  name: string
  email: string
  department: string
  unauthorizedApps: number
  riskExposure: number
  lastActivity: string
  avatar: string
}

export interface Alert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  status: 'new' | 'investigating' | 'resolved'
  appName?: string
}

export interface Integration {
  id: string
  name: string
  logo: string
  description: string
  connected: boolean
  lastSync?: string
}

export const apps: App[] = [
  {
    id: '1',
    name: 'Notion AI',
    logo: '/apps/notion.svg',
    vendor: 'Notion Labs Inc.',
    category: 'Productivity',
    discoverySource: 'Email',
    activeUsers: 47,
    firstDetected: '2024-01-15',
    riskScore: 82,
    status: 'Pending',
    compliance: ['GDPR'],
    oauthPermissions: ['Read emails', 'Access calendar', 'Modify documents'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'AI-powered workspace for notes, docs, and project management.'
  },
  {
    id: '2',
    name: 'ChatGPT',
    logo: '/apps/openai.svg',
    vendor: 'OpenAI',
    category: 'AI Tools',
    discoverySource: 'Browser',
    activeUsers: 156,
    firstDetected: '2024-02-03',
    riskScore: 75,
    status: 'Pending',
    compliance: ['SOC 2'],
    oauthPermissions: ['Read user profile'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'AI chatbot for general-purpose conversations and assistance.'
  },
  {
    id: '3',
    name: 'Canva',
    logo: '/apps/canva.svg',
    vendor: 'Canva Pty Ltd',
    category: 'Design',
    discoverySource: 'Email',
    activeUsers: 89,
    firstDetected: '2024-01-22',
    riskScore: 45,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
    oauthPermissions: ['Read user profile', 'Access files'],
    dataResidency: 'Australia',
    breachHistory: false,
    description: 'Online design and publishing tool for creating visual content.'
  },
  {
    id: '4',
    name: 'Dropbox',
    logo: '/apps/dropbox.svg',
    vendor: 'Dropbox Inc.',
    category: 'Cloud Storage',
    discoverySource: 'SSO',
    activeUsers: 234,
    firstDetected: '2023-11-08',
    riskScore: 38,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
    oauthPermissions: ['Read/write files', 'Manage sharing'],
    dataResidency: 'US',
    breachHistory: true,
    description: 'Cloud storage and file synchronization service.'
  },
  {
    id: '5',
    name: 'Figma',
    logo: '/apps/figma.svg',
    vendor: 'Figma Inc.',
    category: 'Design',
    discoverySource: 'Email',
    activeUsers: 67,
    firstDetected: '2024-01-05',
    riskScore: 28,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
    oauthPermissions: ['Read user profile', 'Access design files'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Collaborative interface design and prototyping tool.'
  },
  {
    id: '6',
    name: 'Trello',
    logo: '/apps/trello.svg',
    vendor: 'Atlassian',
    category: 'Project Management',
    discoverySource: 'Browser',
    activeUsers: 112,
    firstDetected: '2023-12-20',
    riskScore: 32,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
    oauthPermissions: ['Read boards', 'Write cards'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Kanban-style project management and collaboration tool.'
  },
  {
    id: '7',
    name: 'Zoom',
    logo: '/apps/zoom.svg',
    vendor: 'Zoom Video Communications',
    category: 'Communication',
    discoverySource: 'SSO',
    activeUsers: 389,
    firstDetected: '2023-09-15',
    riskScore: 42,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
    oauthPermissions: ['Schedule meetings', 'Access recordings'],
    dataResidency: 'US',
    breachHistory: true,
    description: 'Video conferencing and online meeting platform.'
  },
  {
    id: '8',
    name: 'Airtable',
    logo: '/apps/airtable.svg',
    vendor: 'Airtable Inc.',
    category: 'Database',
    discoverySource: 'Email',
    activeUsers: 34,
    firstDetected: '2024-02-10',
    riskScore: 56,
    status: 'Pending',
    compliance: ['SOC 2'],
    oauthPermissions: ['Read/write bases', 'Manage workspaces'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Cloud-based spreadsheet-database hybrid platform.'
  },
  {
    id: '9',
    name: 'Slack',
    logo: '/apps/slack.svg',
    vendor: 'Salesforce',
    category: 'Communication',
    discoverySource: 'SSO',
    activeUsers: 456,
    firstDetected: '2023-06-01',
    riskScore: 25,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
    oauthPermissions: ['Read messages', 'Post messages', 'Access channels'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Business communication and collaboration platform.'
  },
  {
    id: '10',
    name: 'Monday.com',
    logo: '/apps/monday.svg',
    vendor: 'monday.com Ltd.',
    category: 'Project Management',
    discoverySource: 'Expense',
    activeUsers: 78,
    firstDetected: '2024-01-30',
    riskScore: 48,
    status: 'Pending',
    compliance: ['SOC 2', 'ISO 27001'],
    oauthPermissions: ['Read boards', 'Write updates'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Work operating system for project and workflow management.'
  },
  {
    id: '11',
    name: 'Grammarly',
    logo: '/apps/grammarly.svg',
    vendor: 'Grammarly Inc.',
    category: 'Productivity',
    discoverySource: 'Browser',
    activeUsers: 203,
    firstDetected: '2024-01-12',
    riskScore: 68,
    status: 'Pending',
    compliance: ['SOC 2'],
    oauthPermissions: ['Read text input', 'Access browser data'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'AI-powered writing assistant and grammar checker.'
  },
  {
    id: '12',
    name: 'Miro',
    logo: '/apps/miro.svg',
    vendor: 'Miro Inc.',
    category: 'Collaboration',
    discoverySource: 'Email',
    activeUsers: 45,
    firstDetected: '2024-02-05',
    riskScore: 52,
    status: 'Pending',
    compliance: ['SOC 2', 'ISO 27001'],
    oauthPermissions: ['Access boards', 'Read user profile'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Online collaborative whiteboard platform.'
  },
  {
    id: '13',
    name: 'Loom',
    logo: '/apps/loom.svg',
    vendor: 'Loom Inc.',
    category: 'Communication',
    discoverySource: 'Email',
    activeUsers: 91,
    firstDetected: '2024-01-18',
    riskScore: 44,
    status: 'Approved',
    compliance: ['SOC 2', 'GDPR'],
    oauthPermissions: ['Record screen', 'Access recordings'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Video messaging and screen recording tool.'
  },
  {
    id: '14',
    name: 'Calendly',
    logo: '/apps/calendly.svg',
    vendor: 'Calendly LLC',
    category: 'Scheduling',
    discoverySource: 'Email',
    activeUsers: 167,
    firstDetected: '2023-10-25',
    riskScore: 35,
    status: 'Approved',
    compliance: ['SOC 2', 'GDPR'],
    oauthPermissions: ['Access calendar', 'Read contacts'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Online appointment scheduling software.'
  },
  {
    id: '15',
    name: 'Asana',
    logo: '/apps/asana.svg',
    vendor: 'Asana Inc.',
    category: 'Project Management',
    discoverySource: 'SSO',
    activeUsers: 134,
    firstDetected: '2023-08-14',
    riskScore: 30,
    status: 'Approved',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
    oauthPermissions: ['Read projects', 'Write tasks'],
    dataResidency: 'US',
    breachHistory: false,
    description: 'Work management and team collaboration platform.'
  }
]

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    department: 'Engineering',
    unauthorizedApps: 5,
    riskExposure: 78,
    lastActivity: '2024-02-15T14:30:00',
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Michael Torres',
    email: 'michael.torres@company.com',
    department: 'Marketing',
    unauthorizedApps: 8,
    riskExposure: 92,
    lastActivity: '2024-02-15T12:45:00',
    avatar: 'MT'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily.johnson@company.com',
    department: 'Sales',
    unauthorizedApps: 3,
    riskExposure: 45,
    lastActivity: '2024-02-14T16:20:00',
    avatar: 'EJ'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Finance',
    unauthorizedApps: 2,
    riskExposure: 32,
    lastActivity: '2024-02-15T09:15:00',
    avatar: 'DK'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    department: 'HR',
    unauthorizedApps: 4,
    riskExposure: 58,
    lastActivity: '2024-02-15T11:00:00',
    avatar: 'LW'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Engineering',
    unauthorizedApps: 6,
    riskExposure: 71,
    lastActivity: '2024-02-15T13:30:00',
    avatar: 'JW'
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.foster@company.com',
    department: 'Product',
    unauthorizedApps: 7,
    riskExposure: 85,
    lastActivity: '2024-02-15T10:45:00',
    avatar: 'AF'
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'robert.martinez@company.com',
    department: 'Operations',
    unauthorizedApps: 1,
    riskExposure: 18,
    lastActivity: '2024-02-14T15:30:00',
    avatar: 'RM'
  }
]

export const alerts: Alert[] = [
  {
    id: '1',
    title: 'New high-risk app detected',
    description: 'Notion AI has been detected with a risk score of 82. 47 employees are actively using this application.',
    severity: 'critical',
    timestamp: '2024-02-15T14:30:00',
    status: 'new',
    appName: 'Notion AI'
  },
  {
    id: '2',
    title: '25 employees granted Google Drive access',
    description: 'A bulk permission grant was detected for Google Drive across the Marketing department.',
    severity: 'high',
    timestamp: '2024-02-15T12:15:00',
    status: 'investigating',
    appName: 'Google Drive'
  },
  {
    id: '3',
    title: 'Vendor lacks SOC 2 certification',
    description: 'Grammarly has been flagged for missing SOC 2 Type II certification despite handling sensitive data.',
    severity: 'high',
    timestamp: '2024-02-15T10:45:00',
    status: 'new',
    appName: 'Grammarly'
  },
  {
    id: '4',
    title: 'Unusual data export detected',
    description: 'Large data export activity detected from Airtable by 3 users in the Engineering team.',
    severity: 'critical',
    timestamp: '2024-02-15T09:30:00',
    status: 'investigating',
    appName: 'Airtable'
  },
  {
    id: '5',
    title: 'New browser extension installed',
    description: 'ChatGPT browser extension detected on 15 corporate devices.',
    severity: 'medium',
    timestamp: '2024-02-14T16:20:00',
    status: 'new',
    appName: 'ChatGPT'
  },
  {
    id: '6',
    title: 'Compliance gap identified',
    description: 'Miro application missing HIPAA compliance for Healthcare department usage.',
    severity: 'high',
    timestamp: '2024-02-14T14:00:00',
    status: 'resolved',
    appName: 'Miro'
  },
  {
    id: '7',
    title: 'Shadow IT growth spike',
    description: '12 new applications discovered in the last 7 days, exceeding normal threshold.',
    severity: 'medium',
    timestamp: '2024-02-14T11:30:00',
    status: 'resolved'
  },
  {
    id: '8',
    title: 'API key exposure risk',
    description: 'Potential API key exposure detected in shared Notion workspace.',
    severity: 'critical',
    timestamp: '2024-02-14T09:15:00',
    status: 'resolved',
    appName: 'Notion AI'
  }
]

export const integrations: Integration[] = [
  {
    id: '1',
    name: 'Google Workspace',
    logo: '/integrations/google.svg',
    description: 'Connect to discover apps authorized via Google OAuth and email signups.',
    connected: true,
    lastSync: '2024-02-15T14:00:00'
  },
  {
    id: '2',
    name: 'Microsoft 365',
    logo: '/integrations/microsoft.svg',
    description: 'Discover apps connected through Microsoft Azure AD and Office 365.',
    connected: true,
    lastSync: '2024-02-15T13:45:00'
  },
  {
    id: '3',
    name: 'Okta',
    logo: '/integrations/okta.svg',
    description: 'Import SSO application inventory and user access data.',
    connected: false
  },
  {
    id: '4',
    name: 'Slack',
    logo: '/integrations/slack.svg',
    description: 'Monitor Slack app installations and bot integrations.',
    connected: true,
    lastSync: '2024-02-15T12:30:00'
  },
  {
    id: '5',
    name: 'GitHub',
    logo: '/integrations/github.svg',
    description: 'Track OAuth applications and third-party integrations.',
    connected: false
  }
]

// KPI Data
export const kpiData = {
  totalApps: 156,
  unsanctionedApps: 47,
  highRiskApps: 12,
  employeesAffected: 892,
  complianceGaps: 23,
  exposureScore: 67
}

// Risk distribution data for donut chart
export const riskDistribution = [
  { name: 'Low Risk', value: 45, color: '#10B981' },
  { name: 'Medium Risk', value: 32, color: '#F59E0B' },
  { name: 'High Risk', value: 18, color: '#F97316' },
  { name: 'Critical Risk', value: 5, color: '#EF4444' }
]

// Exposure trend data for line chart
export const exposureTrend = [
  { month: 'Aug', apps: 89, risk: 42 },
  { month: 'Sep', apps: 98, risk: 45 },
  { month: 'Oct', apps: 112, risk: 51 },
  { month: 'Nov', apps: 125, risk: 55 },
  { month: 'Dec', apps: 134, risk: 58 },
  { month: 'Jan', apps: 148, risk: 63 },
  { month: 'Feb', apps: 156, risk: 67 }
]

// Sparkline data for KPI cards
export const sparklineData = {
  totalApps: [89, 98, 112, 125, 134, 148, 156],
  unsanctionedApps: [28, 32, 35, 38, 42, 45, 47],
  highRiskApps: [6, 7, 8, 9, 10, 11, 12],
  employeesAffected: [650, 712, 756, 798, 834, 867, 892],
  complianceGaps: [15, 17, 18, 19, 21, 22, 23],
  exposureScore: [42, 45, 51, 55, 58, 63, 67]
}

// Categories for filtering
export const categories = [
  'All Categories',
  'Productivity',
  'AI Tools',
  'Design',
  'Cloud Storage',
  'Project Management',
  'Communication',
  'Database',
  'Collaboration',
  'Scheduling'
]

// Policies data
export interface Policy {
  id: string
  name: string
  description: string
  condition: string
  action: string
  enabled: boolean
  lastTriggered?: string
}

export const policies: Policy[] = [
  {
    id: '1',
    name: 'High Risk Alert',
    description: 'Alert when any app has a risk score above threshold',
    condition: 'Risk Score > 80',
    action: 'Send Alert',
    enabled: true,
    lastTriggered: '2024-02-15T14:30:00'
  },
  {
    id: '2',
    name: 'Block Non-Compliant Apps',
    description: 'Automatically block apps without SOC 2 certification',
    condition: 'Missing SOC 2',
    action: 'Block App',
    enabled: true,
    lastTriggered: '2024-02-14T09:15:00'
  },
  {
    id: '3',
    name: 'Mass Adoption Alert',
    description: 'Notify when many employees adopt the same app',
    condition: 'Users > 10 in 7 days',
    action: 'Notify Admin',
    enabled: true,
    lastTriggered: '2024-02-13T16:45:00'
  },
  {
    id: '4',
    name: 'Data Residency Check',
    description: 'Flag apps with data stored outside approved regions',
    condition: 'Data outside US/EU',
    action: 'Flag for Review',
    enabled: false
  },
  {
    id: '5',
    name: 'Breach History Alert',
    description: 'Alert on apps with known security breaches',
    condition: 'Has Breach History',
    action: 'Send Alert',
    enabled: true,
    lastTriggered: '2024-02-10T11:20:00'
  }
]
