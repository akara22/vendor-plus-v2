'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <Button type="submit" className="w-full">Log In</Button>
      </form>
    </div>
  )
}

