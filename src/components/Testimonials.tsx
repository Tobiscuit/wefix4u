'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, StarHalf, AlertCircle, ArrowRight } from 'lucide-react'

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

  // Show only Google Reviews when available, filter for 4+ star reviews
  const allTestimonials: TestimonialItem[] = googleReviews?.reviews && googleReviews.reviews.length > 0
    ? googleReviews.reviews
        .filter(review => review.rating >= 4) // Only show 4+ star reviews
        .slice(0, 4)
        .map(review => ({
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
        }))
    : staticTestimonials.slice(0, 4)

  const overallRating = googleReviews?.overallRating || 4.9
  const totalRatings = googleReviews?.totalRatings || 0

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5 text-yellow-400 fill-current" />
      )
    }

    return stars
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="reviews">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-trusted-blue-50/50 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-4">
            Trusted by Locals
          </h2>
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-dark-text">{overallRating.toFixed(1)}</span>
            <div className="flex">
              {renderStars(overallRating)}
            </div>
          </div>
          {totalRatings > 0 && (
            <p className="text-body-text">
              Based on {totalRatings} Google reviews
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trusted-blue"></div>
            </div>
          ) : error ? (
            <div className="col-span-2 text-center text-gray-500 py-12 glass-card rounded-3xl">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p>Unable to load reviews at this time.</p>
              <p className="text-sm mt-1">Showing static testimonials below.</p>
            </div>
          ) : (
            allTestimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-3xl hover:shadow-glass-hover transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {testimonial.isGoogle && testimonial.authorAttribution?.photoUri ? (
                      <Image
                        src={testimonial.authorAttribution.photoUri}
                        alt={testimonial.authorAttribution.displayName || testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-trusted-blue to-blue-600 rounded-full flex items-center justify-center shadow-md text-white font-bold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-dark-text text-lg">
                        {testimonial.isGoogle && testimonial.authorAttribution?.uri ? (
                          <a
                            href={testimonial.authorAttribution.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-action-orange transition-colors"
                          >
                            {testimonial.authorAttribution.displayName || testimonial.name}
                          </a>
                        ) : (
                          testimonial.name
                        )}
                      </h4>
                      <div className="flex text-yellow-400 text-sm">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  {testimonial.isGoogle && (
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                      alt="Google" 
                      width={24} 
                      height={24} 
                      className="opacity-80"
                    />
                  )}
                </div>
                
                <p className="text-body-text leading-relaxed mb-4 italic relative z-10">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div className="text-right">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {testimonial.timeAgo}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          {googleReviews?.googleMapsUri ? (
            <a 
              className="inline-flex items-center gap-2 text-trusted-blue font-semibold hover:text-blue-700 transition-colors group" 
              href={googleReviews.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read All Reviews on Google
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <a 
              className="inline-flex items-center gap-2 text-trusted-blue font-semibold hover:text-blue-700 transition-colors group" 
              href="#" 
              target="_blank"
            >
              Read All Reviews on Google
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
