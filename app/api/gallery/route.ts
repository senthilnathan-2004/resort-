import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Gallery from '@/models/Gallery';
import ImageKit from 'imagekit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query = { category };
    }

    const images = await Gallery.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;
    const category = formData.get('category') as string;

    if (!file || !alt || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer, // Buffer
      fileName: file.name,
      folder: '/resort/gallery',
    });

    const newImage = await Gallery.create({
      url: uploadResponse.url,
      alt,
      category,
      publicId: uploadResponse.fileId,
    });

    return NextResponse.json(
      { message: 'Image uploaded successfully', image: newImage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gallery upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
