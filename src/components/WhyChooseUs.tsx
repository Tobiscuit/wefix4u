export default function WhyChooseUs() {
  const features = [
    {
      title: 'Skilled Professionals',
      description: 'Our technicians bring years of collective experience with comprehensive training.',
      icon: 'engineering'
    },
    {
      title: 'Fast Turnaround',
      description: 'We understand your device is your life. We get it back in your hands as soon as possible.',
      icon: 'speed'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. We provide upfront quotes before any work begins.',
      icon: 'receipt_long'
    },
    {
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority. We stand by our work with a comprehensive warranty.',
      icon: 'thumb_up'
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Content */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-yellow-400"></div>
              <h2 className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                The WE FIX 4U Standard
              </h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-8 font-montserrat leading-tight">
              Old-school service with modern precision.
            </h3>

            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Key Benefits
            </h4>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="material-icons text-slate-300 dark:text-slate-600 mr-4 text-[10px] mt-1.5">circle</span>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      {feature.title}:
                    </span> 
                    <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                       {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-10"></div>
              {/* Using the existing hero-repair.png or a fallback */}
              <img 
                src="/hero-repair.png" 
                alt="Technician working on a device" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/20 rounded-full blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  )
}
