export default function CallToAction() {
  return (
    <section className="py-20 bg-[var(--light-gray)]" id="contact">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-center text-[var(--dark-text)] mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-[var(--body-text)] mb-8 max-w-2xl mx-auto">
          Contact us today for a free, no-obligation quote. Let our expert technicians bring your devices back to life.
        </p>
        <a 
          className="bg-[var(--action-orange)] text-white font-bold py-4 px-10 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-lg" 
          href="#contact"
        >
          Get My Free Quote
        </a>
      </div>
    </section>
  )
}
