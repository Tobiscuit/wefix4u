import Image from 'next/image'

export default function Hero() {
  return (
    <section className="py-12 md:py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">Trusted by Locals in Your Neighborhood</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-text-light-primary dark:text-text-dark-primary mb-6">Your Devices, <span className="text-accent">Fixed Fast</span></h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-xl mx-auto md:mx-0 mb-8">From phone screens to battery replacements, our expert technicians bring your devices back to life. Same-day service available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <a className="flex items-center justify-center bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors" href="/book">
                <span className="material-icons-outlined mr-2">sell</span>
                Get Instant Quote
              </a>
              <a className="flex items-center justify-center bg-container-light dark:bg-container-dark border border-gray-300 dark:border-gray-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" href="/sign-in">
                <span className="material-icons-outlined mr-2">location_on</span>
                Track My Repair
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-text-light-secondary dark:text-text-dark-secondary">
              <div className="flex items-center"><span className="material-icons-outlined text-green-500 mr-2">verified</span>Certified Techs</div>
              <div className="flex items-center"><span className="material-icons-outlined text-green-500 mr-2">event_available</span>Same-Day Service</div>
              <div className="flex items-center"><span className="material-icons-outlined text-yellow-400 mr-1.5">star</span>4.9/5 Rating</div>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Technician repairing a smartphone"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANKOE5ixQPIVTRQZzlFlzZUD2CBeRTu81S6vMzzcpanqkjwmTMluSL6f3u_QurNt0K5Kb-4vcKrAkPQTNC5cTQC5plMi32VLD5IzBKq4KCEkQJoPl6JLDdSqRDRQDPbDVzcNcRAGRC5qvo17b_mFCQjyUq3NVbeoFqvuX7URgOm4hm2xm9qARDTjMgm4GYKCWS-G7JiqnXhWErP0cmM5fJ1Z4hQkxU9RvJRfmuPolpUrtGnyvABsKzPMf2XkgSbL9XgH5dGS7-chOk"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-3">
              <span className="material-icons-outlined text-green-400">timer</span>
              <div>
                <p className="font-bold">Fast Turnaround</p>
                <p className="text-sm text-gray-300">1-Hour Repairs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
