'use client'
import { useState, useEffect } from 'react'

interface Review {
  id: string
  authorName: string
  authorPhoto?: string
  authorUri?: string
  rating: number
  text: string
  time: number
  relativeTime: string
  flagContentUri?: string
  googleMapsUri?: string
}

interface GoogleReviewsData {
  reviews: Review[]
  overallRating: number
  totalRatings: number
  placeName?: string
  placeAddress?: string
  googleMapsUri?: string
  attributions?: string[]
}

interface TestimonialItem {
  name: string
  rating: number
  text: string
  timeAgo: string
  isGoogle: boolean
  authorAttribution?: {
    displayName: string
    uri?: string
    photoUri?: string
  }
}

export default function Testimonials() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Static testimonials as fallback
  const staticTestimonials: TestimonialItem[] = [
    {
      name: 'Sarah L.',
      rating: 5,
      text: 'My laptop was running so slow I was about to give up on it. The team at WE FIX 4U diagnosed the problem, replaced the hard drive with an SSD, and now it\'s faster than when I first bought it! Truly amazing service.',
      timeAgo: '2 days ago',
      isGoogle: false
    },
    {
      name: 'Mike P.',
      rating: 4.5,
      text: 'Cracked my iPhone screen during a morning run. I dropped it off at WE FIX 4U and had it back, good as new, by the afternoon. The price was fair and the service was incredibly fast. Highly recommend.',
      timeAgo: '1 week ago',
      isGoogle: false
    },
    {
      name: 'Jessica Chen',
      rating: 5,
      text: 'Their team is not only skilled but also very honest. They told me my tablet wasn\'t worth repairing and suggested a more cost-effective solution. I appreciate their transparency.',
      timeAgo: '3 weeks ago',
      isGoogle: false
    },
    {
      name: 'David R.',
      rating: 5,
      text: 'Brought in my gaming console that was overheating. They cleaned it out and replaced the thermal paste. It\'s been working perfectly ever since. Quick, professional, and friendly staff.',
      timeAgo: '1 month ago',
      isGoogle: false
    }
  ]

  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/reviews?place_id=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        
        const reviewsData = await response.json()
        setGoogleReviews(reviewsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID) {
      fetchGoogleReviews()
    } else {
      setLoading(false)
    }
  }, [])

  // Combine Google reviews with static testimonials
  const allTestimonials: TestimonialItem[] = [
    ...(googleReviews?.reviews.slice(0, 2).map(review => ({
      name: review.authorName,
      rating: review.rating,
      text: review.text,
      timeAgo: review.relativeTime,
      isGoogle: true,
      authorAttribution: {
        displayName: review.authorName,
        uri: review.authorUri,
        photoUri: review.authorPhoto
      }
    })) || []),
    ...staticTestimonials.slice(0, 2)
  ]

  const overallRating = googleReviews?.overallRating || 4.9
  const totalRatings = googleReviews?.totalRatings || 0

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="material-icons-outlined text-lg">star</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-icons-outlined text-lg">star_half</span>
      )
    }

    return stars
  }

  return (
    <section className="py-20 bg-white" id="reviews">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-[var(--dark-text)] mb-4">
          What Our Customers Say
        </h2>
        <div className="flex justify-center items-center mb-6">
          <p className="text-lg text-[var(--body-text)] mr-2">{overallRating.toFixed(1)}</p>
          <div className="flex text-yellow-500">
            {renderStars(overallRating)}
          </div>
          {totalRatings > 0 && (
            <span className="text-sm text-[var(--body-text)] ml-2">
              ({totalRatings} Google reviews)
            </span>
          )}
        </div>
        
        <div className="h-96 overflow-y-auto border-y border-gray-200 divide-y divide-gray-200 p-4 bg-gray-50 rounded-lg shadow-inner">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--trusted-blue)]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-gray-500 py-8">
              <span className="material-icons-outlined text-4xl mb-2 block">error_outline</span>
              <p>Unable to load reviews at this time.</p>
              <p className="text-sm mt-1">Showing static testimonials below.</p>
            </div>
          ) : (
            allTestimonials.map((testimonial, index) => (
              <div key={index} className="py-4 text-left">
                <div className="flex items-center mb-2">
                  {testimonial.isGoogle && testimonial.authorAttribution?.photoUri ? (
                    <img
                      src={testimonial.authorAttribution.photoUri}
                      alt={testimonial.authorAttribution.displayName || testimonial.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[var(--trusted-blue)] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-xs">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <h4 className="font-bold text-[var(--dark-text)] mr-3">
                    {testimonial.isGoogle && testimonial.authorAttribution?.uri ? (
                      <a
                        href={testimonial.authorAttribution.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--action-orange)] transition-colors"
                      >
                        {testimonial.authorAttribution.displayName || testimonial.name}
                      </a>
                    ) : (
                      testimonial.name
                    )}
                  </h4>
                  <div className="flex text-yellow-500">
                    {renderStars(testimonial.rating)}
                  </div>
                  {testimonial.isGoogle && (
                    <span className="ml-2 text-xs text-gray-500">Google</span>
                  )}
                </div>
                <p className="text-[var(--body-text)] text-sm mb-1">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <span className="text-xs text-gray-400">
                  {testimonial.timeAgo}
                </span>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8">
          {googleReviews?.googleMapsUri ? (
            <a 
              className="text-sm text-[var(--trusted-blue)] hover:underline" 
              href={googleReviews.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Reviews on Google
            </a>
          ) : (
            <a 
              className="text-sm text-[var(--trusted-blue)] hover:underline" 
              href="#" 
              target="_blank"
            >
              View All Reviews on Google
            </a>
          )}
        </div>

        {/* Required Google Attribution */}
        {googleReviews && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span className="mr-1">Powered by</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Maps
              </a>
            </div>
            {googleReviews.attributions && googleReviews.attributions.length > 0 && (
              <div className="mt-2 text-xs text-gray-400 text-center">
                {googleReviews.attributions.map((attribution, index) => (
                  <span key={index}>
                    {attribution}
                    {index < googleReviews.attributions!.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
