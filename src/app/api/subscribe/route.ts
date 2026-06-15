import { NextRequest, NextResponse } from 'next/server'

// Brevo (ex Sendinblue) API — añadir contacto a lista de espera
// Docs: https://developers.brevo.com/reference/createcontact

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) // ID de tu lista en Brevo

    if (!BREVO_API_KEY) {
      // En desarrollo sin API key, simulamos éxito
      console.log(`[DEV] Would subscribe: ${email}`)
      return NextResponse.json({ success: true })
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: {
          SOURCE: 'duskdrops_waitlist',
        },
      }),
    })

    if (!res.ok && res.status !== 204) {
      const err = await res.json()
      // Si el contacto ya existe (code 'duplicate_parameter'), lo tratamos como éxito
      if (err.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true })
      }
      throw new Error(err.message || 'Brevo error')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Subscribe]', err)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
