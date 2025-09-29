import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('place_id')
  
  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID is required' },
      { status: 400 }
    )
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Using the new Places API (New) endpoint
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
    })

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Debug logging to see what we're getting
    console.log('Google Places API Response:', JSON.stringify(data, null, 2))
    
    // The new Places API (New) doesn't have a status field like the old API
    if (!data) {
      throw new Error('No data received from Google Places API')
    }

    const reviews = data.reviews || []
    const rating = data.rating || 0
    const totalRatings = data.userRatingCount || 0

    return NextResponse.json({
      reviews: reviews.map((review: {
        time?: number
        author_name?: string
        profile_photo_url?: string
        rating?: number
        text?: string | { text: string; languageCode: string }
        relative_time_description?: string
      }) => ({
        id: review.time || Date.now(),
        authorName: review.author_name || 'Anonymous',
        authorPhoto: review.profile_photo_url,
        rating: review.rating || 0,
        text: typeof review.text === 'string' ? review.text : review.text?.text || '',
        time: review.time || Date.now(),
        relativeTime: review.relative_time_description || 'Recently',
      })),
      overallRating: rating,
      totalRatings,
    })
  } catch (error) {
    console.error('Error fetching Google Reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
