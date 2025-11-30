import { Zap, Phone, ShieldCheck } from 'lucide-react'

export default function CallToAction() {
  return (
    <>
      {/* Gradient Bridge - Smooth Transition */}
      <div className="h-24 bg-gradient-to-b from-white via-blue-50 to-blue-100"></div>

      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700" id="contact">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0"></div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-action-orange rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Restore Your Device?
          </h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't let a broken device slow you down. Get a free, no-obligation quote today and experience the WeFix4U difference.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              className="px-8 py-4 bg-action-orange hover:bg-action-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center group" 
              href="#contact"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Get My Free Quote
            </a>
            <a 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl shadow-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center group" 
              href="tel:+1234567890"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Call Us Now
            </a>
          </div>
          
          <p className="mt-8 text-sm text-blue-100 opacity-90 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            No Fix, No Fee Guarantee
          </p>
        </div>
      </section>
    </>
  )
}
