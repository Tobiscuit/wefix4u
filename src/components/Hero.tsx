import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-light-gray via-white to-trusted-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-hero-glow opacity-30"></div>
      
      <div className="relative container mx-auto px-6 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <div className="text-center md:text-left space-y-6 z-10">
          <div className="inline-block px-4 py-2 bg-trusted-blue-50 rounded-full text-trusted-blue-700 text-sm font-semibold mb-2">
            🔧 Trusted by 500+ Happy Customers
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-dark-text leading-tight">
            Your Devices,
            <span className="text-action-orange"> Fixed Fast</span>
          </h1>
          
          <p className="text-lg text-body-text leading-relaxed max-w-xl">
            From cracked screens to battery replacements, our expert technicians bring your devices back to life. 
            <span className="font-semibold text-dark-text"> Same-day service available.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              className="glass-card px-8 py-4 bg-action-orange text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center group" 
              href="#contact"
            >
              <span className="material-icons mr-2 group-hover:scale-110 transition-transform">bolt</span>
              Get Instant Quote
            </a>
            <a 
              className="glass-panel px-8 py-4 text-trusted-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center" 
              href="/sign-up"
            >
              <span className="material-icons mr-2">account_circle</span>
              Track My Repair
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="material-icons text-green-600">verified</span>
              <span>Certified Techs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-blue-600">schedule</span>
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-yellow-600">star</span>
              <span>4.9★ Rating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="relative">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-glass-hover transition-all duration-500 transform hover:scale-105">
            <Image
              alt="Professional technician repairing device with precision tools"
              className="w-full h-auto"
              src="/hero-repair.png"
              width={600}
              height={400}
              priority
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-4 -left-4 glass-panel p-4 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="material-icons text-green-600">check_circle</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fast Turnaround</p>
                <p className="font-bold text-dark-text">1-Hour Repairs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
