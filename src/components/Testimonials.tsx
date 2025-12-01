'use client'
import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [reviews, setReviews] = useState([
    {
      name: 'Tytianah H.',
      rating: 5,
      text: 'I was looking for a phone repair service in the area and I called a bunch of places and nobody was answering or they couldn\'t give me a price quote. The guy who answered was very knowledgeable...',
      time: '1 month ago',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUTRTsct0OOYFzKMySPc6Medmb1YSf09x2QxSwGl1j6r-ZdWV9eC_gd_zC1aSquMwLlKYmpRGdMjLhUuOi_dL5PAkZuVzqySLJFZNQ_vd4ZwVrpH7878vr3z84adxi4CAeY0j46riF0jL5ZLFL--31svAKA4fPVHCIHxiEg9IEOrdrvY_eWGipRv-ogKR9-CGCpuEvwn-qyNsX53_mZAJFkQtDAOMKcIK36QjPrR-U7PnAw5zz4FUOQSRksNKrV6o3-Z3ZIIxdo0x'
    },
    {
      name: 'Jake Scherer',
      rating: 5,
      text: 'Awesome service, fixed my iPad in 2 hours, and was extremely reasonable with their pricing. My daughter can continue doing her school work back if there is any issues. Thank you for your service!',
      time: '2 months ago',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCob2TCw-9KCsNniRRdpr2jh30oGdvS9kdbMo8xIUTptIviFD77jDA-Xv2ZOE04iwwT0z1wGD3YoCA8bn1EmTqavuee-hXwdnU0LEIKqNZ31fs091buEpZ_1EFw2Swo5dswRslgLW9zvUYxSQ6nYIngB0-U6iK3OCNF_laZEw15UcNlNwPT8q8X3l80qgDQzuke_8p8Yw1BOhQ5yyhz_HZVSuwBSG96-jmZS7mYnapozLQwpGs-pd6diVJspQX3v4SJpxKqM7IZfso8'
    }
  ])

  // NOTE: Ideally, we would fetch reviews from the API as before.
  // For this design implementation, we'll stick to the hardcoded ones from the reference
  // to ensure exact visual matching, but the structure allows for dynamic data.

  return (
    <section className="py-20 bg-background-off-white dark:bg-container-dark" id="reviews">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Trusted by Locals</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12">Based on <a className="text-primary font-semibold underline" href="#">233 Google reviews</a></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-background-light dark:bg-background-dark p-8 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img alt={`Avatar of ${review.name}`} className="w-12 h-12 rounded-full object-cover" src={review.avatar} />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="material-icons-outlined text-base">star</span>
                      ))}
                    </div>
                  </div>
                </div>
                <img alt="Google logo" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5vWVRzJub0Kj6s-tEObsRzrrVvLN7Ut2VCmlg2u0UIMwWL5C_x88QRh9oEVLdimaHgKVZW29vE3o5ojpCly29PJWTD-h4TIgZSDYNsn9R1hPSXO88Q-4IZlQgD6SZ47lhzj62Ra0zmM1Ob6RuaEKoBw-xZo9fnEG3HdR2hfzW4dppD99P5RjoHurnwDAGaDIlBRKl8fX10Mi8abuFW570CFxA5kixZjedyxLaYwJTaJK-x62sCaEdWnxVIIuKXOhruEJdPAlWwYi8" />
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">"{review.text}"</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">{review.time}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a className="font-semibold text-primary inline-flex items-center group" href="#">
            Read All Reviews on Google
            <span className="material-icons-outlined ml-1.5 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
