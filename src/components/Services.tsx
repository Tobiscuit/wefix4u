export default function Services() {
  const services = [
    {
      title: 'iPhone Repair',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      iconColor: 'text-primary',
      icon: 'phone_iphone',
      features: ['Screen Replacement', 'Battery Replacement', 'Charging Port Fix']
    },
    {
      title: 'Samsung Repair',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      iconColor: 'text-purple-500',
      icon: 'smartphone',
      features: ['Screen & Back Glass', 'Camera Lens', 'Charging Port Fix']
    },
    {
      title: 'Computer Repair',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50',
      iconColor: 'text-accent',
      icon: 'laptop_mac',
      features: ['Screen Replacement', 'Data Recovery', 'SSD Upgrades']
    },
    {
      title: 'Game Console',
      iconBg: 'bg-green-100 dark:bg-green-900/50',
      iconColor: 'text-green-500',
      icon: 'sports_esports',
      features: ['HDMI Port Repair', 'Overheating Fix', 'Controller Repair']
    }
  ]

  return (
    <section className="py-20 bg-background-off-white dark:bg-container-dark" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What We Fix</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12">From smartphones to gaming consoles, our certified technicians handle it all with care and expertise.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-background-light dark:bg-background-dark p-8 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${service.iconBg} mb-6`}>
                <span className={`material-icons-outlined text-3xl ${service.iconColor}`}>{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <ul className="space-y-3 text-text-light-secondary dark:text-text-dark-secondary mb-6 flex-grow">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center"><span className="material-icons-outlined text-green-500 mr-3">check_circle</span>{feature}</li>
                ))}
              </ul>
              <a className="mt-auto w-full text-center bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity" href="#">Request Repair</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
