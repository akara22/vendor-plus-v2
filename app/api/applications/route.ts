import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.userType !== 'vendor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { marketId, products, boothSize } = body

  const { data: vendor, error: vendorError } = await supabase
    .from('vendors')
    .select('id')
    .eq('user_id', session.user.id)
    .single()

  if (vendorError) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
  }

  const { data: application, error } = await supabase
    .from('applications')
    .insert({
      vendor_id: vendor.id,
      market_id: marketId,
      status: 'pending',
      products,
      booth_size: boothSize
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(application, { status: 201 })
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let applications
  if (session.user.userType === 'vendor') {
    const { data: vendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    const { data, error } = await supabase
      .from('applications')
      .select('*, market(*)')
      .eq('vendor_id', vendor.id)

    applications = data
  } else if (session.user.userType === 'host') {
    const { data: host } = await supabase
      .from('hosts')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    const { data, error } = await supabase
      .from('applications')
      .select('*, vendor(*), market(*)')
      .eq('market.host_id', host.id)

    applications = data
  }

  return NextResponse.json(applications)
}

