import Image from 'next/image'
import { Zap, CheckCircle, Clock, Star, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-light-gray via-white to-trusted-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-hero-glow opacity-30"></div>
      
      <div className="relative container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <div className="text-center md:text-left space-y-6 z-10">
          <div className="inline-block px-4 py-2 bg-trusted-blue-50 rounded-full text-trusted-blue-700 text-sm font-semibold mb-2">
            🔧 Trusted by Locals • 4.9★ Rated
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-dark-text leading-tight">
            Your Devices,
            <span className="text-action-orange"> Fixed Fast</span>
          </h1>
          
          <p className="text-lg text-body-text leading-relaxed max-w-xl">
            From cracked screens to battery replacements, our expert technicians bring your devices back to life. 
            <span className="font-semibold text-dark-text"> Same-day service available.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              className="px-8 py-4 bg-action-orange/90 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center group" 
              href="#contact"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Instant Quote
            </a>
            <a 
              className="glass-panel px-8 py-4 text-trusted-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center" 
              href="/sign-up"
            >
              <Clock className="w-5 h-5 mr-2" />
              Track My Repair
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Certified Techs</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600 fill-current" />
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
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fast Turnaround</p>
                <p className="font-bold text-dark-text">1-Hour Repairs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Invitation Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce hidden md:block">
        <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
        <p className="text-xs text-gray-500 font-medium mt-1">Scroll to explore</p>
      </div>

      {/* Gradient Fade for Smooth Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/80 pointer-events-none"></div>
    </section>
  )
}
