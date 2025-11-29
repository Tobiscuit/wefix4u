export default function Services() {
  const services = [
    {
      icon: 'phone_iphone',
      title: 'Phone Repair',
      description: 'Cracked screens, dead batteries, broken charging ports - we fix them all.',
      features: ['Same-Day Service', '90-Day Warranty', 'OEM Parts'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'laptop_mac',
      title: 'Laptop Repair',
      description: 'Slow performance, virus removal, hardware upgrades, and data recovery.',
      features: ['Free Diagnostics', 'Data Protection', '24hr Turnaround'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'tablet_android',
      title: 'Tablet & Consoles',
      description: 'iPads, Androids, PS5, Xbox - we service all your favorite devices.',
      features: ['Expert Technicians', 'Affordable Pricing', 'Quick Repairs'],
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-light-gray relative overflow-hidden" id="services">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-trusted-blue-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-action-orange-100 rounded-full text-action-orange-700 text-sm font-semibold mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-4">
            What We Fix
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            From smartphones to gaming consoles, our certified technicians handle it all with care and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-3xl text-center flex flex-col items-center justify-between hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Icon with Gradient */}
              <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-icons text-4xl text-white">
                  {service.icon}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-dark-text mb-3">
                  {service.title}
                </h3>
                <p className="text-body-text mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Feature List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span className="material-icons text-green-600 text-base">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                className="w-full py-3 px-6 bg-trusted-blue text-white font-semibold rounded-xl hover:bg-trusted-blue-700 transition-colors shadow-md hover:shadow-lg" 
                href="#contact"
              >
                Request Repair
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
