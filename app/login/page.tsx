'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await loginAdmin(formData)
    setIsLoading(false)

    if (result.success) {
      toast.success(result.message)
      router.push('/')
      router.refresh()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShieldAlert className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">ShadowWatch Admin</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form action={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@shadowwatch.com"
                defaultValue="admin@shadowwatch.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="admin123"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
