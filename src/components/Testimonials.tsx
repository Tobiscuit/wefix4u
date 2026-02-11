'use client'

import { useState, useEffect } from 'react'

interface Review {
  authorName: string
  authorPhoto: string
  rating: number
  text: string
  relativeTime: string
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      authorName: 'Tytianah H.',
      rating: 5,
      text: 'I was looking for a phone repair service in the area and I called a bunch of places and nobody was answering or they couldn\'t give me a price quote. The guy who answered was very knowledgeable...',
      relativeTime: '1 month ago',
      authorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUTRTsct0OOYFzKMySPc6Medmb1YSf09x2QxSwGl1j6r-ZdWV9eC_gd_zC1aSquMwLlKYmpRGdMjLhUuOi_dL5PAkZuVzqySLJFZNQ_vd4ZwVrpH7878vr3z84adxi4CAeY0j46riF0jL5ZLFL--31svAKA4fPVHCIHxiEg9IEOrdrvY_eWGipRv-ogKR9-CGCpuEvwn-qyNsX53_mZAJFkQtDAOMKcIK36QjPrR-U7PnAw5zz4FUOQSRksNKrV6o3-Z3ZIIxdo0x'
    },
    {
      authorName: 'Jake Scherer',
      rating: 5,
      text: 'Awesome service, fixed my iPad in 2 hours, and was extremely reasonable with their pricing. My daughter can continue doing her school work back if there is any issues. Thank you for your service!',
      relativeTime: '2 months ago',
      authorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCob2TCw-9KCsNniRRdpr2jh30oGdvS9kdbMo8xIUTptIviFD77jDA-Xv2ZOE04iwwT0z1wGD3YoCA8bn1EmTqavuee-hXwdnU0LEIKqNZ31fs091buEpZ_1EFw2Swo5dswRslgLW9zvUYxSQ6nYIngB0-U6iK3OCNF_laZEw15UcNlNwPT8q8X3l80qgDQzuke_8p8Yw1BOhQ5yyhz_HZVSuwBSG96-jmZS7mYnapozLQwpGs-pd6diVJspQX3v4SJpxKqM7IZfso8'
    }
  ])
  const [totalReviews, setTotalReviews] = useState(233)
  const [googleMapsUrl, setGoogleMapsUrl] = useState('#')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
        if (!placeId) return

        const response = await fetch(`/api/reviews?place_id=${placeId}`)
        if (!response.ok) throw new Error('Failed to fetch reviews')

        const data = await response.json()
        if (data.reviews && data.reviews.length > 0) {
          // Take only the top 2 reviews to match the design layout
          setReviews(data.reviews.slice(0, 2))
        }
        if (data.totalRatings) {
          setTotalReviews(data.totalRatings)
        }
        if (data.googleMapsUri) {
          setGoogleMapsUrl(data.googleMapsUri)
        }
      } catch (error) {
        console.error('Error loading Google Reviews:', error)
        // Fallback is already set in initial state
      }
    }

    fetchReviews()
  }, [])

  return (
    <section className="py-20 bg-background-off-white dark:bg-container-dark" id="reviews">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Trusted by Locals</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12">Based on <a className="text-primary font-semibold underline" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{totalReviews} Google reviews</a></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-background-light dark:bg-background-dark p-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img alt={`Avatar of ${review.authorName}`} className="w-12 h-12 rounded-full object-cover" src={review.authorPhoto} />
                  <div>
                    <h4 className="font-semibold">{review.authorName}</h4>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="material-icons-outlined text-base">star</span>
                      ))}
                    </div>
                  </div>
                </div>
                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4 line-clamp-4">"{review.text}"</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">{review.relativeTime}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a className="font-semibold text-primary inline-flex items-center group" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Read All Reviews on Google
            <span className="material-icons-outlined ml-1.5 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
