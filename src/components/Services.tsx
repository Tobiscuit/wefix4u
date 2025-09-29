export default function Services() {
  const services = [
    {
      icon: 'phone_iphone',
      title: 'Phone Repair',
      description: 'Screen replacement, battery issues, charging ports, and more.',
      link: '#phone-repair'
    },
    {
      icon: 'laptop_mac',
      title: 'Laptop Repair',
      description: 'Virus removal, hardware upgrades, data recovery, and performance tuning.',
      link: '#laptop-repair'
    },
    {
      icon: 'tablet_android',
      title: 'Tablet & Other Devices',
      description: 'We also service tablets, game consoles, and other common electronics.',
      link: '#tablet-repair'
    }
  ]

  return (
    <section className="py-20 bg-[var(--light-gray)]" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[var(--dark-text)] mb-12">
          What We Fix
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-between"
            >
              <div>
                <span className="material-icons-outlined text-6xl text-[var(--trusted-blue)] mb-4">
                  {service.icon}
                </span>
                <h3 className="text-2xl font-bold text-[var(--dark-text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-[var(--body-text)] mb-6">
                  {service.description}
                </p>
              </div>
              <a 
                className="text-[var(--trusted-blue)] font-medium hover:underline" 
                href={service.link}
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
