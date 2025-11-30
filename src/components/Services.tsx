import { Smartphone, Monitor, Laptop, Gamepad2, CheckCircle } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: 'iPhone Repair',
      description: 'Screen replacements, battery swaps, and water damage repair for all iPhone models. Most repairs done in under 30 minutes.',
      icon: <Smartphone className="w-10 h-10 text-white" />,
      color: 'from-blue-500 to-blue-600',
      features: ['Screen Replacement', 'Battery Replacement', 'Water Damage']
    },
    {
      title: 'Samsung Repair',
      description: 'Expert repair for Galaxy S, Note, and A series. We use high-quality parts to ensure your display looks as good as new.',
      icon: <Monitor className="w-10 h-10 text-white" />,
      color: 'from-purple-500 to-purple-600',
      features: ['OLED Screen Repair', 'Charging Port Fix', 'Camera Lens']
    },
    {
      title: 'Computer Repair',
      description: 'From slow laptops to custom PC builds. We handle virus removal, hardware upgrades, and data recovery.',
      icon: <Laptop className="w-10 h-10 text-white" />,
      color: 'from-orange-500 to-orange-600',
      features: ['Virus Removal', 'SSD Upgrades', 'Data Recovery']
    },
    {
      title: 'Game Console',
      description: 'HDMI port repairs, overheating fixes, and drive replacements for PlayStation, Xbox, and Nintendo Switch.',
      icon: <Gamepad2 className="w-10 h-10 text-white" />,
      color: 'from-green-500 to-green-600',
      features: ['HDMI Port Repair', 'Overheating Fix', 'Controller Drift']
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-light-gray relative overflow-hidden" id="services">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-3xl text-center flex flex-col items-center justify-between hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Icon with Gradient */}
              <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold text-dark-text mb-3">
                  {service.title}
                </h3>
                <p className="text-body-text mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                {/* Feature List */}
                <ul className="space-y-2 mb-6 text-left">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                className="w-full py-3 px-6 bg-trusted-blue text-white font-semibold rounded-xl hover:bg-trusted-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2" 
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
