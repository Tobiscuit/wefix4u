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
    // Using the new Places API (New) endpoint with correct format
    const url = `https://places.googleapis.com/v1/places/${placeId}`
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'id,displayName,reviews,rating,userRatingCount,googleMapsUri,formattedAddress,attributions',
        'X-Goog-Api-Key': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }

    const data = await response.json()
    
    // The new Places API (New) doesn't have a status field like the old API
    if (!data) {
      throw new Error('No data received from Google Places API')
    }

    const reviews = data.reviews || []
    const rating = data.rating || 0
    const totalRatings = data.userRatingCount || 0

    return NextResponse.json({
      reviews: reviews.map((review: {
        name?: string
        relativePublishTimeDescription?: string
        rating?: number
        text?: { text: string; languageCode: string }
        originalText?: { text: string; languageCode: string }
        authorAttribution?: {
          displayName?: string
          uri?: string
          photoUri?: string
        }
        publishTime?: string
        flagContentUri?: string
        googleMapsUri?: string
      }) => ({
        id: review.name || Date.now().toString(),
        authorName: review.authorAttribution?.displayName || 'Anonymous',
        authorPhoto: review.authorAttribution?.photoUri,
        authorUri: review.authorAttribution?.uri,
        rating: review.rating || 0,
        text: review.text?.text || review.originalText?.text || '',
        time: review.publishTime ? new Date(review.publishTime).getTime() : Date.now(),
        relativeTime: review.relativePublishTimeDescription || 'Recently',
        flagContentUri: review.flagContentUri,
        googleMapsUri: review.googleMapsUri,
      })),
      overallRating: rating,
      totalRatings,
      placeName: data.displayName?.text || 'Business',
      placeAddress: data.formattedAddress || '',
      googleMapsUri: data.googleMapsUri || '',
      attributions: data.attributions || [],
    })
  } catch (error) {
    console.error('Error fetching Google Reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
