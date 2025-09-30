import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  services: { name: string; description: string }[]
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
      { name: 'Screen Replacement', description: 'Cracked or broken screens are no match for our expert technicians.' },
      { name: 'Battery Repair', description: 'Restore your phone\'s battery life with a quick and efficient replacement.' },
      { name: 'Charging Port Repair', description: 'Fix issues with charging or connectivity due to a faulty port.' },
      { name: 'Water Damage Repair', description: 'Professional drying and repair services for water-damaged devices.' },
      { name: 'Software Issues', description: 'Troubleshoot and resolve various software glitches and malfunctions.' },
      { name: 'Camera Repair', description: 'Fix camera focus, flash, or lens issues on your device.' },
      { name: 'Speaker Repair', description: 'Restore audio quality with professional speaker replacement.' },
      { name: 'Button Repair', description: 'Fix unresponsive or stuck buttons on your device.' }
    ],
    pricing: 'Starting at $49',
    duration: '1-2 hours',
    warranty: '90 days'
  },
  'laptop-repair': {
    id: 'laptop-repair', 
    title: 'Laptop Repair Services',
    description: 'Fast, reliable, and professional repairs to get you back to work.',
    icon: 'laptop',
    services: [
      { name: 'Virus & Malware Removal', description: 'Thorough removal of malicious software to restore your laptop\'s health and performance.' },
      { name: 'Hardware Upgrades', description: 'Boost your laptop\'s speed and storage with RAM, SSD, and other hardware enhancements.' },
      { name: 'Screen Replacement', description: 'Professional replacement of cracked or damaged laptop screens for various models.' },
      { name: 'Diagnostic Services', description: 'Accurate identification of laptop issues to provide effective and precise repair solutions.' },
      { name: 'Data Recovery', description: 'Secure recovery of lost or inaccessible data from damaged hard drives and storage devices.' },
      { name: 'Battery Replacement', description: 'Replace your old or failing battery to restore your laptop\'s portability and battery life.' }
    ],
    pricing: 'Starting at $79',
    duration: '24-48 hours',
    warranty: '90 days'
  },
  'tablet-repair': {
    id: 'tablet-repair',
    title: 'Tablet & Other Device Repair', 
    description: 'Fast and reliable repair for tablets, gaming consoles, and other devices',
    icon: 'tablet',
    services: [
      { name: 'Screen Replacement', description: 'Restore your tablet\'s display to its original clarity.' },
      { name: 'Battery Repair', description: 'Extend your tablet\'s life with a new, high-capacity battery.' },
      { name: 'Charging Port Repair', description: 'Fix connectivity problems and ensure reliable charging.' },
      { name: 'HDMI Port Repair', description: 'No signal? We can fix or replace your console\'s HDMI port.' },
      { name: 'Disk Drive Issues', description: 'Console not reading games? We\'ll get you back in the game.' },
      { name: 'Overheating Solutions', description: 'We clean and repair cooling systems to prevent shutdowns.' }
    ],
    pricing: 'Starting at $59',
    duration: '24-48 hours', 
    warranty: '90 days'
  }
}

// Mapping service names to URL slugs
const serviceNameToSlug = {
  'Screen Replacement': 'screen-replacement',
  'Battery Repair': 'battery-repair',
  'Battery Replacement': 'battery-replacement',
  'Charging Port Repair': 'charging-port-repair',
  'Water Damage Repair': 'water-damage-repair',
  'Software Issues': 'software-issues',
  'Camera Repair': 'camera-repair',
  'Speaker Repair': 'speaker-repair',
  'Button Repair': 'button-repair',
  'Keyboard Repair': 'keyboard-repair',
  'Hard Drive Upgrade': 'hard-drive-upgrade',
  'RAM Upgrade': 'ram-upgrade',
  'Motherboard Repair': 'motherboard-repair',
  'Software Installation': 'software-installation',
  'Home Button Repair': 'home-button-repair',
  'Virus & Malware Removal': 'virus-malware-removal',
  'Hardware Upgrades': 'hardware-upgrades',
  'Diagnostic Services': 'diagnostic-services',
  'Data Recovery': 'data-recovery',
  'HDMI Port Repair': 'hdmi-port-repair',
  'Disk Drive Issues': 'disk-drive-issues',
  'Overheating Solutions': 'overheating-solutions'
};

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
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl text-center font-montserrat">
                {service.title}
              </h1>
            </div>
          </div>
        </div>

        {/* What We Fix Section */}
        <div className="px-4 py-10">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
              What We Fix
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.services.map((serviceItem, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                  <span className="material-icons text-4xl text-[#3D5AFE]">{service.icon}</span>
                  <div>
                    <p className="text-[#111218] text-base font-medium leading-normal">{serviceItem.name}</p>
                    <p className="text-[#5f678c] text-sm font-normal leading-normal mt-1">{serviceItem.description}</p>
                  </div>
                       <Link href={`/services/detail/${service.id}/${serviceNameToSlug[serviceItem.name as keyof typeof serviceNameToSlug] || serviceItem.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3D5AFE] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#304FFE]">
                      <span className="truncate">Request a Repair</span>
                    </button>
                  </Link>
                </div>
              ))}
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
              <div>
                <h3 className="font-medium text-lg text-[#111218]">How long do repairs take?</h3>
                <p className="text-[#5f678c] mt-2">Most common repairs, like screen or battery replacements, are completed within 24-48 hours. More complex issues may take longer, but we&apos;ll always provide you with a time estimate upfront.</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-lg text-[#111218]">Do you use original parts?</h3>
                <p className="text-[#5f678c] mt-2">We use high-quality, third-party parts that meet or exceed original manufacturer specifications. This allows us to provide reliable repairs at an affordable price. We also offer original parts for certain repairs upon request.</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-lg text-[#111218]">Is there a warranty on repairs?</h3>
                <p className="text-[#5f678c] mt-2">Yes! All our repairs come with a 90-day warranty that covers both the parts we use and the labor. If you experience any issues related to our repair within this period, we&apos;ll fix it free of charge.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm mt-8 mb-16 mx-4 md:mx-20 lg:mx-40">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-center text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
              Get in Touch
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="name">Name</label>
                  <input 
                    className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300" 
                    id="name" 
                    name="name" 
                    type="text"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="email">Email</label>
                  <input 
                    className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300" 
                    id="email" 
                    name="email" 
                    type="email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="phone">Phone</label>
                <input 
                  className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300" 
                  id="phone" 
                  name="phone" 
                  type="tel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="message">Message</label>
                <textarea 
                  className="w-full p-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300" 
                  id="message" 
                  name="message" 
                  rows={4}
                />
              </div>
              
              <div className="text-center">
                <button 
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3D5AFE] text-white text-sm font-bold leading-normal tracking-[0.015em] mx-auto hover:bg-[#304FFE] transition-colors duration-300" 
                  type="submit"
                >
                  <span className="truncate">Submit</span>
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