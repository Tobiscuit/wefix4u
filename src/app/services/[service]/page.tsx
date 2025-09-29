import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  services: string[]
  pricing: string
  duration: string
  warranty: string
}

const serviceData: Record<string, ServiceData> = {
  'phone-repair': {
    id: 'phone-repair',
    title: 'Phone Repair Services',
    description: 'Professional phone repair services for all major brands and models',
    icon: 'phone_iphone',
    services: [
      'Screen Replacement',
      'Battery Repair', 
      'Charging Port Repair',
      'Water Damage Repair',
      'Software Issues',
      'Camera Repair',
      'Speaker Repair',
      'Button Repair'
    ],
    pricing: 'Starting at $49',
    duration: '1-2 hours',
    warranty: '90 days'
  },
  'laptop-repair': {
    id: 'laptop-repair', 
    title: 'Laptop Repair Services',
    description: 'Expert laptop repair for all brands including MacBook, Dell, HP, and more',
    icon: 'laptop',
    services: [
      'Screen Replacement',
      'Keyboard Repair',
      'Battery Replacement',
      'Hard Drive Upgrade',
      'RAM Upgrade',
      'Motherboard Repair',
      'Charging Port Repair',
      'Software Installation'
    ],
    pricing: 'Starting at $79',
    duration: '2-4 hours',
    warranty: '6 months'
  },
  'tablet-repair': {
    id: 'tablet-repair',
    title: 'Tablet Repair Services', 
    description: 'Fast and reliable tablet repair for iPad, Android tablets, and more',
    icon: 'tablet',
    services: [
      'Screen Replacement',
      'Battery Repair',
      'Charging Port Repair',
      'Home Button Repair',
      'Camera Repair',
      'Speaker Repair',
      'Software Issues',
      'Water Damage Repair'
    ],
    pricing: 'Starting at $59',
    duration: '1-3 hours', 
    warranty: '90 days'
  }
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = serviceData[params.service]
  
  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mt-8">
        {/* Hero Section */}
        <div className="px-4 md:px-20 lg:px-40">
          <div className="max-w-[960px] mx-auto">
            <div 
              className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 md:gap-8"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhKiIFScv3WNjKXVnTG6xfWde7-cKonZ9l6IwtS1cmSolMOzLYCH5st3QYXLByk9l4o3HWnWUKjGc7jTwO6w0QMVIqs7t55-gOZIY3GSPNsRJWSZkI2xBD_7ca_PbQCJj9YMpRrhYFIC5TWV_fZt9qTtkcCtEq7Fd3CjVctI5_8Gx88H2LykOx2f-C3jtMfJRUuwAGCw1QXL6NMkBRxP047aj2tmUtxTSBdQsyV5hagqiZNrN67rL0kvY3uH6I1QXtgxfSMLD6nAFJ")`
              }}
            >
              <span className="material-icons text-6xl text-white mb-4">
                {service.icon}
              </span>
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl text-center font-montserrat">
                {service.title}
              </h1>
              <p className="text-white text-lg text-center max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="px-4 py-10">
          <div className="max-w-[960px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Info Cards */}
              <div className="lg:col-span-2">
                <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
                  What We Fix
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.services.map((serviceItem, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="material-icons text-2xl text-blue-600 mr-3">
                        check_circle
                      </span>
                      <span className="text-gray-900 font-medium">{serviceItem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                  <h3 className="text-gray-900 text-lg font-bold mb-4 font-montserrat">
                    Service Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="text-gray-900 font-bold">{service.pricing}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900 font-bold">{service.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Warranty</span>
                      <span className="text-gray-900 font-bold">{service.warranty}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-300">
                    Request Repair Quote
                  </button>
                  
                  <button className="w-full mt-3 border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 py-10">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-center text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <details className="group bg-white p-4 rounded-xl shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-gray-900 font-medium">How long do repairs take?</h3>
                  <span className="material-icons transition group-open:rotate-180">expand_more</span>
                </summary>
                <p className="text-gray-600 mt-2">
                  Most {service.title.toLowerCase()} repairs are completed within {service.duration}. 
                  More complex issues may take longer, but we&apos;ll always provide an estimated timeframe upfront.
                </p>
              </details>

              <details className="group bg-white p-4 rounded-xl shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-gray-900 font-medium">Do you use original parts?</h3>
                  <span className="material-icons transition group-open:rotate-180">expand_more</span>
                </summary>
                <p className="text-gray-600 mt-2">
                  We use high-quality, third-party parts that meet or exceed original specifications. 
                  This allows us to offer affordable repairs without compromising on quality. All our repairs come with a warranty.
                </p>
              </details>

              <details className="group bg-white p-4 rounded-xl shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-gray-900 font-medium">Is my data safe during the repair?</h3>
                  <span className="material-icons transition group-open:rotate-180">expand_more</span>
                </summary>
                <p className="text-gray-600 mt-2">
                  We highly recommend you back up your data before any repair. While we take the utmost care, 
                  we are not responsible for data loss. For most repairs, your data will not be affected.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm mt-8 mx-4 md:mx-20 lg:mx-40">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-center text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
              Get Your {service.title} Quote
            </h2>
            
            <form className="max-w-xl mx-auto space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="name" 
                  placeholder="Name" 
                  type="text"
                />
              </div>
              
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="email" 
                  placeholder="Email" 
                  type="email"
                />
              </div>
              
              <div>
                <label className="sr-only" htmlFor="phone">Phone</label>
                <input 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="phone" 
                  placeholder="Phone" 
                  type="tel"
                />
              </div>
              
              <div>
                <label className="sr-only" htmlFor="device">Device Model</label>
                <input 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="device" 
                  placeholder="Device Model (e.g., iPhone 14, MacBook Pro)" 
                  type="text"
                />
              </div>
              
              <div>
                <label className="sr-only" htmlFor="issue">Issue Description</label>
                <textarea 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="issue" 
                  placeholder="Describe the issue with your device" 
                  rows={4}
                />
              </div>
              
              <div className="flex justify-center">
                <button 
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700" 
                  type="submit"
                >
                  <span className="truncate">Get Quote</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return [
    { service: 'phone-repair' },
    { service: 'laptop-repair' },
    { service: 'tablet-repair' }
  ]
}
