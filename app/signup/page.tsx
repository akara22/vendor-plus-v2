'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('vendor')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType }),
    })

    if (response.ok) {
      router.push('/login')
    } else {
      const data = await response.json()
      console.error(data.error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
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
        <RadioGroup defaultValue="vendor" onValueChange={setUserType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vendor" id="vendor" />
            <Label htmlFor="vendor">Vendor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="host" id="host" />
            <Label htmlFor="host">Host</Label>
          </div>
        </RadioGroup>
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  )
}

