import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ServicesPage() {
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
                Phone Repair Services
              </h1>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-4 py-10">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-10 font-montserrat">
              Our Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Screen Replacement */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">phone_iphone</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Screen Replacement</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    Cracked or broken screens are no match for our expert technicians.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
              </div>

              {/* Battery Repair */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">battery_charging_full</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Battery Repair</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    Restore your phone&apos;s battery life with a quick and efficient replacement.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
              </div>

              {/* Charging Port Repair */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">power</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Charging Port Repair</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    Fix issues with charging or connectivity due to a faulty port.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
              </div>

              {/* Water Damage Repair */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">water_drop</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Water Damage Repair</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    Professional drying and repair services for water-damaged devices.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
              </div>

              {/* Software Issues */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">build_circle</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Software Issues</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    Troubleshoot and resolve various software glitches and malfunctions.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
              </div>

              {/* Other Phone Repairs */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-blue-600">build</span>
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">Other Phone Repairs</p>
                  <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                    If your issue isn&apos;t listed, describe it to us, and we&apos;ll see how we can help.
                  </p>
                </div>
                <button className="flex mt-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700">
                  <span className="truncate">Request a Repair</span>
                </button>
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
                  <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                </summary>
                <p className="text-gray-600 mt-2">
                  Most common repairs, like screen or battery replacements, are completed within 1-2 hours. 
                  More complex issues may take longer, but we&apos;ll always provide an estimated timeframe upfront.
                </p>
              </details>

              <details className="group bg-white p-4 rounded-xl shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-gray-900 font-medium">Do you use original parts?</h3>
                  <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                </summary>
                <p className="text-gray-600 mt-2">
                  We use high-quality, third-party parts that meet or exceed original specifications. 
                  This allows us to offer affordable repairs without compromising on quality. All our repairs come with a warranty.
                </p>
              </details>

              <details className="group bg-white p-4 rounded-xl shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="text-gray-900 font-medium">Is my data safe during the repair?</h3>
                  <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
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
              Get In Touch
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
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea 
                  className="w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 px-4 py-2 border" 
                  id="message" 
                  placeholder="Message" 
                  rows={4}
                />
              </div>
              
              <div className="flex justify-center">
                <button 
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700" 
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
