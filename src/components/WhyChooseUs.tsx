export default function WhyChooseUs() {
  const features = [
    {
      title: 'Skilled Professionals',
      description: 'Our technicians bring years of collective experience with comprehensive training.',
      icon: 'engineering',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      iconColor: 'text-primary'
    },
    {
      title: 'Fast Turnaround',
      description: 'We understand your device is your life. We get it back in your hands as soon as possible.',
      icon: 'speed',
      iconBg: 'bg-red-100 dark:bg-red-900/50',
      iconColor: 'text-red-500'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. We provide upfront quotes before any work begins.',
      icon: 'receipt_long',
      iconBg: 'bg-green-100 dark:bg-green-900/50',
      iconColor: 'text-green-500'
    },
    {
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority. We stand by our work with a comprehensive warranty.',
      icon: 'thumb_up',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      iconColor: 'text-purple-500'
    }
  ]

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Choose Us?</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12">We combine technical expertise with customer-first service to deliver the best repair experience in town.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background-off-white dark:bg-container-dark p-6 rounded-lg text-center">
              <div className={`flex items-center justify-center h-16 w-16 rounded-full ${feature.iconBg} mx-auto mb-5`}>
                <span className={`material-icons-outlined text-3xl ${feature.iconColor}`}>{feature.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
