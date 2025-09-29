'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Review {
  id: number
  authorName: string
  authorPhoto?: string
  rating: number
  text: string
  time: number
  relativeTime: string
}

interface GoogleReviewsData {
  reviews: Review[]
  overallRating: number
  totalRatings: number
}

interface GoogleReviewsProps {
  placeId: string
  maxReviews?: number
  showOverallRating?: boolean
}

export default function GoogleReviews({ 
  placeId, 
  maxReviews = 5, 
  showOverallRating = true 
}: GoogleReviewsProps) {
  const [data, setData] = useState<GoogleReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/reviews?place_id=${placeId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        
        const reviewsData = await response.json()
        setData(reviewsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (placeId) {
      fetchReviews()
    }
  }, [placeId])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <span className="material-icons-outlined text-4xl mb-2 block">error_outline</span>
          <p>Unable to load reviews at this time.</p>
          <p className="text-sm mt-1">Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!data || data.reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <span className="material-icons-outlined text-4xl mb-2 block">rate_review</span>
          <p>No reviews available yet.</p>
        </div>
      </div>
    )
  }

  const displayReviews = data.reviews.slice(0, maxReviews)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {showOverallRating && (
        <div className="text-center mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center mr-2">
              {renderStars(Math.round(data.overallRating))}
            </div>
            <span className="text-2xl font-bold text-[var(--dark-text)]">
              {data.overallRating.toFixed(1)}
            </span>
          </div>
          <p className="text-[var(--body-text)] text-sm">
            Based on {data.totalRatings} Google reviews
          </p>
        </div>
      )}

      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start mb-3">
              <div className="flex-shrink-0 mr-3">
                {review.authorPhoto ? (
                  <Image
                    src={review.authorPhoto}
                    alt={review.authorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-[var(--trusted-blue)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {review.authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[var(--dark-text)] text-sm">
                    {review.authorName}
                  </h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-xs text-[var(--body-text)] mt-1">
                  {review.relativeTime}
                </p>
              </div>
            </div>
            {review.text && (
              <p className="text-[var(--body-text)] text-sm leading-relaxed">
                {review.text}
              </p>
            )}
          </div>
        ))}
      </div>

      {data.reviews.length > maxReviews && (
        <div className="text-center mt-6">
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--trusted-blue)] hover:text-[var(--action-orange)] transition-colors duration-300 text-sm font-medium"
          >
            View all {data.totalRatings} reviews on Google
            <span className="material-icons-outlined text-sm ml-1">open_in_new</span>
          </a>
        </div>
      )}
    </div>
  )
}
