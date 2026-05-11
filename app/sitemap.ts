import { MetadataRoute } from 'next';
import dbConnect from '@/lib/database/mongodb';
import Room from '@/models/Room';
import Offer from '@/models/Offer';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourluxuryresort.com';

  try {
    await dbConnect();
    
    // Fetch dynamic routes
    const rooms = await Room.find({ isAvailable: true }).select('slug updatedAt');
    const offers = await Offer.find({ isActive: true }).select('slug updatedAt');

    const roomUrls = rooms.map((room) => ({
      url: `${baseUrl}/rooms/${room.slug}`,
      lastModified: room.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const offerUrls = offers.map((offer) => ({
      url: `${baseUrl}/offers/${offer.slug}`,
      lastModified: offer.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/rooms`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      ...roomUrls,
      ...offerUrls,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      }
    ];
  }
}
