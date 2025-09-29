import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-20 lg:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--dark-text)] leading-tight mb-4">
            Fast, Reliable Repairs for Your Favorite Devices.
          </h1>
          <p className="text-lg text-[var(--body-text)] mb-8">
            From cracked screens to slow laptops, our certified technicians get you back up and running in no time.
          </p>
          <div className="flex flex-col items-center md:items-start gap-y-6">
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                className="bg-[var(--action-orange)] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105" 
                href="#contact"
              >
                Get a Free Quote
              </a>
              <a 
                className="bg-transparent text-[var(--trusted-blue)] font-bold py-3 px-8 rounded-lg border-2 border-[var(--trusted-blue)] hover:bg-[var(--trusted-blue)] hover:text-white transition-all duration-300" 
                href="#services"
              >
                Our Services
              </a>
            </div>
            <div className="w-full max-w-sm mt-4">
              <a 
                className="w-full inline-block bg-[var(--trusted-blue)] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 text-center" 
                href="#track"
              >
                Track Your Repair
              </a>
            </div>
          </div>
        </div>
        <div>
          <Image
            alt="People with repaired devices"
            className="w-full h-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsoVcYPYfCIdBKl-pCRvnm5V8OjfgXM6xaT_G7EoyjizKZ4un4P8L18qh22v1zF5OqP2OlwdsZP75EdyPieDMtOR0uF8ck62i0VLMy4rHX7ZxID4lC0BO72OvrfjbSkNVGZFZ7lxDCyB8t4Vv6D0rk-ZbpiiGHMfibvFEPJGnagqoeqHR00UBykHsJ7YtRZoAD9_bsjKbMDg4CAcdeWJlbbORaBWQmo1wy6sI2RzMdy0JcM6ycaLRaSrusNzfaZnrINWzNY19xM-gi"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  )
}
