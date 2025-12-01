export default function Footer() {
  return (
    <footer className="bg-background-off-white dark:bg-container-dark text-text-light-secondary dark:text-gray-300">
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight">Ready to Restore Your Device?</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2 max-w-2xl mx-auto">Don't let a broken device slow you down. Get a free, instant quote from our experts.</p>
          <div className="mt-8">
            <a className="inline-flex items-center justify-center bg-accent text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-orange-600 transition-colors" href="#">
              Call Us Now
            </a>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-2">No Fix, No Fee Guarantee</p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="material-icons-outlined text-primary text-3xl">build</span>
                <span className="font-bold text-xl text-text-light-primary dark:text-white">WE FIX 4U</span>
              </div>
              <p className="text-sm max-w-sm mb-6">Your go-to for fast, reliable, and professional device repairs. We bring devices back to life with quality parts and expert care.</p>
              <div className="flex space-x-4">
                <a className="text-gray-400 hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
                </a>
                <a className="text-gray-400 hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a className="text-gray-400 hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2h.001zm-1.04 2.04c-1.849 0-3.354 1.506-3.354 3.354s1.505 3.354 3.354 3.354c1.849 0 3.354-1.506 3.354-3.354s-1.505-3.354-3.354-3.354zm0 5.462c-1.168 0-2.112-.943-2.112-2.108 0-1.166.944-2.108 2.112-2.108 1.166 0 2.108.942 2.108 2.108 0 1.165-.942 2.108-2.108-2.108zm5.123-5.518c-.426 0-.771.344-.771.77s.345.77.771.77.771-.344.771-.77c0-.426-.345-.77-.771-.77z" fillRule="evenodd"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-text-light-primary dark:text-white tracking-wider mb-4">Company</h5>
              <ul className="space-y-3">
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">About</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Careers</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-text-light-primary dark:text-white tracking-wider mb-4">Services</h5>
              <ul className="space-y-3">
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">iPhone Repair</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Samsung Repair</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Laptop Repair</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Game Console</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-text-light-primary dark:text-white tracking-wider mb-4">Legal</h5>
              <ul className="space-y-3">
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Terms of Service</a></li>
                <li><a className="text-sm hover:text-text-light-primary dark:hover:text-white transition-colors" href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© 2024 WeFix4U. All Rights Reserved.</p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Operational Status: Normal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
