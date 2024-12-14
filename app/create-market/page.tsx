'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function CreateMarket() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [capacity, setCapacity] = useState('')
  const [fees, setFees] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data, error } = await supabase
      .from('markets')
      .insert({ name, date, location, description, capacity: parseInt(capacity), fees: parseFloat(fees) })

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Market created successfully",
      })
      router.push('/host-dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Market</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Market Name</Label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input 
            id="date" 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input 
            id="capacity" 
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required 
          />
        </div>
        <div>
          <Label htmlFor="fees">Fees</Label>
          <Input 
            id="fees" 
            type="number"
            step="0.01"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required 
          />
        </div>
        <Button type="submit" className="w-full">Create Market</Button>
      </form>
    </div>
  )
}

