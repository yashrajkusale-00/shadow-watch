'use server'

import { cookies } from 'next/headers'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Mock admin authentication
  // In a real application, you would verify against a database and use hashed passwords
  if (email === 'admin@shadowwatch.com' && password === 'admin123') {
    const cookieStore = await cookies()
    
    cookieStore.set('admin_session', 'mock-session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax'
    })
    
    return { success: true, message: 'Login successful' }
  }

  return { success: false, message: 'Invalid email or password' }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  
  return { success: true, message: 'Logged out successfully' }
}
