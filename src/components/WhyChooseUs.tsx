export default function WhyChooseUs() {
  const features = [
    {
      icon: 'engineering',
      title: 'Skilled Professionals',
      description: 'Our technicians bring years of collective expertise and a commitment to quality, ensuring every repair is performed with precision and care.'
    },
    {
      icon: 'bolt',
      title: 'Fast Turnaround',
      description: 'We understand your time is valuable. That\'s why we offer same-day service for many common repairs, getting your device back in your hands as quickly as possible.'
    },
    {
      icon: 'receipt_long',
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. We provide a clear, detailed, and upfront quote before any work begins, so you know exactly what to expect.'
    },
    {
      icon: 'thumb_up_off_alt',
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority. We stand by our work with a comprehensive warranty, ensuring your peace of mind with every repair.'
    }
  ]

  return (
    <section className="bg-[var(--trusted-blue)] text-white py-20" id="about">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="material-icons-outlined text-5xl mb-3">
                {feature.icon}
              </span>
              <h3 className="text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm opacity-90">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
