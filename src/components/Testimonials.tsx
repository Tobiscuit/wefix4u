export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah L.',
      rating: 5,
      text: 'My laptop was running so slow I was about to give up on it. The team at WE FIX 4U diagnosed the problem, replaced the hard drive with an SSD, and now it\'s faster than when I first bought it! Truly amazing service.',
      timeAgo: '2 days ago'
    },
    {
      name: 'Mike P.',
      rating: 4.5,
      text: 'Cracked my iPhone screen during a morning run. I dropped it off at WE FIX 4U and had it back, good as new, by the afternoon. The price was fair and the service was incredibly fast. Highly recommend.',
      timeAgo: '1 week ago'
    },
    {
      name: 'Jessica Chen',
      rating: 5,
      text: 'Their team is not only skilled but also very honest. They told me my tablet wasn\'t worth repairing and suggested a more cost-effective solution. I appreciate their transparency.',
      timeAgo: '3 weeks ago'
    },
    {
      name: 'David R.',
      rating: 5,
      text: 'Brought in my gaming console that was overheating. They cleaned it out and replaced the thermal paste. It\'s been working perfectly ever since. Quick, professional, and friendly staff.',
      timeAgo: '1 month ago'
    }
  ]

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
          <p className="text-lg text-[var(--body-text)] mr-2">4.9</p>
          <div className="flex text-yellow-500">
            <span className="material-icons-outlined text-2xl">star</span>
            <span className="material-icons-outlined text-2xl">star</span>
            <span className="material-icons-outlined text-2xl">star</span>
            <span className="material-icons-outlined text-2xl">star</span>
            <span className="material-icons-outlined text-2xl">star_half</span>
          </div>
        </div>
        <div className="h-96 overflow-y-auto border-y border-gray-200 divide-y divide-gray-200 p-4 bg-gray-50 rounded-lg shadow-inner">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="py-4 text-left">
              <div className="flex items-center mb-2">
                <h4 className="font-bold text-[var(--dark-text)] mr-3">
                  {testimonial.name}
                </h4>
                <div className="flex text-yellow-500">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-[var(--body-text)] text-sm mb-1">
                "{testimonial.text}"
              </p>
              <span className="text-xs text-gray-400">
                {testimonial.timeAgo}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a 
            className="text-sm text-[var(--trusted-blue)] hover:underline" 
            href="#" 
            target="_blank"
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
