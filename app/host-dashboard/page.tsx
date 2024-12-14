'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Market {
  id: string
  name: string
  date: string
  location: string
  applications: number
}

export default function HostDashboard() {
  const [markets, setMarkets] = useState<Market[]>([])

  useEffect(() => {
    const fetchMarkets = async () => {
      const { data, error } = await supabase
        .from('markets')
        .select('*, applications(count)')
      if (error) {
        console.error('Error fetching markets:', error)
      } else {
        setMarkets(data || [])
      }
    }
    fetchMarkets()

    const subscription = supabase
      .channel('public:markets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'markets' }, fetchMarkets)
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Host Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Your Markets</h2>
          <ul className="space-y-2">
            {markets.map((market) => (
              <li key={market.id}>
                {market.name} - {new Date(market.date).toLocaleDateString()} - {market.applications} applications
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button asChild className="w-full"><Link href="/create-market">Create Market</Link></Button>
            <Button asChild variant="outline" className="w-full"><Link href="/manage-markets">Manage Markets</Link></Button>
            <Button asChild variant="outline" className="w-full"><Link href="/host-profile">Edit Profile</Link></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

