import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, message } = body

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof message !== 'string' ||
    !message.trim()
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  await payload.create({
    collection: 'contactSubmissions',
    data: { name, email, message },
  })

  return NextResponse.json({ ok: true })
}
