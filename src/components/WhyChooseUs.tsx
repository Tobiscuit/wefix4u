import { Wrench, Zap, Receipt, ThumbsUp } from 'lucide-react'

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: 'Skilled Professionals',
      description: 'Our technicians bring years of collective expertise and a commitment to quality, ensuring every repair is performed with precision and care.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: 'Fast Turnaround',
      description: 'We understand your time is valuable. That\'s why we offer same-day service for many common repairs, getting your device back in your hands as quickly as possible.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Receipt className="w-8 h-8 text-white" />,
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. We provide a clear, detailed, and upfront quote before any work begins, so you know exactly what to expect.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-white" />,
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority. We stand by our work with a comprehensive warranty, ensuring your peace of mind with every repair.',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section className="py-24 bg-light-gray relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-trusted-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-action-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            Why Choose WeFix4U?
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            We combine technical expertise with customer-first service to deliver the best repair experience in town.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-3xl text-center hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-4">
                {feature.title}
              </h3>
              <p className="text-body-text text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
