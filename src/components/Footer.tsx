import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: <Facebook className="w-5 h-5" /> },
    { name: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> }
  ]

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'iPhone Repair', href: '#' },
        { name: 'Samsung Repair', href: '#' },
        { name: 'Laptop Repair', href: '#' },
        { name: 'Game Console', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Warranty Info', href: '#' },
        { name: 'Cookie Policy', href: '#' }
      ]
    }
  ]

  return (
    <footer className="bg-dark-text text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-trusted-blue to-action-orange rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W4U</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                WE FIX <span className="text-action-orange">4U</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Your trusted partner for fast, reliable, and professional tech repairs. We bring your devices back to life with quality parts and expert care.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-trusted-blue hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-6 text-white">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-action-orange transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WeFix4U. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Operational Status: Normal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
