import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.userType !== 'host') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, date, location, description, capacity, fees } = body

  const { data: host, error: hostError } = await supabase
    .from('hosts')
    .select('id')
    .eq('user_id', session.user.id)
    .single()

  if (hostError) {
    return NextResponse.json({ error: 'Host not found' }, { status: 404 })
  }

  const { data: market, error } = await supabase
    .from('markets')
    .insert({ name, date, location, description, capacity, fees, host_id: host.id })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(market, { status: 201 })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hostId = searchParams.get('hostId')

  let query = supabase.from('markets').select('*')

  if (hostId) {
    query = query.eq('host_id', hostId)
  }

  const { data: markets, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(markets)
}

