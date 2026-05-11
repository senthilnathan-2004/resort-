import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, interest, date } = body;

    if (!name || !interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Format WhatsApp message
    const message = `Hello, my name is ${name}. I am interested in ${interest}${date ? ` for the dates ${date}` : ''}. Could you provide more information?`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '1234567890'; // e.g., 1234567890 without +
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({ url: whatsappUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
