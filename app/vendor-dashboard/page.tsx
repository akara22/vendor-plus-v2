'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Application {
  id: string
  status: string
  market: {
    name: string
    date: string
  }
}

export default function VendorDashboard() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/api/applications')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    }
    fetchApplications()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
          <ul className="space-y-2">
            {applications.map((application) => (
              <li key={application.id}>
                {application.market.name} - {new Date(application.market.date).toLocaleDateString()} - {application.status}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button asChild className="w-full"><Link href="/markets">Apply to Markets</Link></Button>
            <Button asChild variant="outline" className="w-full"><Link href="/vendor-profile">Edit Profile</Link></Button>
            <Button asChild variant="outline" className="w-full"><Link href="/vendor-analytics">View Analytics</Link></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

