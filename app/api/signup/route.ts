import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password, userType } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data: user, error } = await supabase
    .from('users')
    .insert({ name, email, password: hashedPassword, user_type: userType })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (userType === 'vendor') {
    const { error: vendorError } = await supabase
      .from('vendors')
      .insert({ user_id: user.id, business_name: '', category: '', location: '', contact: '' })

    if (vendorError) {
      return NextResponse.json({ error: vendorError.message }, { status: 400 })
    }
  } else if (userType === 'host') {
    const { error: hostError } = await supabase
      .from('hosts')
      .insert({ user_id: user.id, organization_name: '', contact: '' })

    if (hostError) {
      return NextResponse.json({ error: hostError.message }, { status: 400 })
    }
  }

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
}

