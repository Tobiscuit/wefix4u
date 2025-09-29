import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceContent } from '@/data/service-content';
import { Metadata } from 'next';

interface ServicePageProps {
  params: {
    device: string;
    service: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const deviceType = params.device;
  const serviceType = params.service;

  const content = serviceContent[deviceType as keyof typeof serviceContent]?.[serviceType as keyof typeof serviceContent['phone-repair']];

  if (!content) {
    return {};
  }

  return {
    title: content.seoMeta.title,
    description: content.seoMeta.description,
    keywords: content.seoMeta.keywords.join(', '),
    openGraph: {
      title: content.seoMeta.title,
      description: content.seoMeta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seoMeta.title,
      description: content.seoMeta.description,
    },
  };
}

export default function IndividualServicePage({ params }: ServicePageProps) {
  const deviceType = params.device;
  const serviceType = params.service;

  const content = serviceContent[deviceType as keyof typeof serviceContent]?.[serviceType as keyof typeof serviceContent['phone-repair']];

  if (!content) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#F5F5F5]" style={{ fontFamily: 'Roboto, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Header />

            <main className="mt-8">
              {/* Hero Section */}
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4"
                    data-alt="Abstract illustration of interconnected electronic components in blue and orange hues."
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhKiIFScv3WNjKXVnTG6xfWde7-cKonZ9l6IwtS1cmSolMOzLYCH5st3QYXLByk9l4o3HWnWUKjGc7jTwO6w0QMVIqs7t55-gOZIY3GSPNsRJWSZkI2xBD_7ca_PbQCJj9YMpRrhYFIC5TWV_fZt9qTtkcCtEq7Fd3CjVctI5_8Gx88H2LykOx2f-C3jtMfJRUuwAGCw1QXL6NMkBRxP047aj2tmUtxTSBdQsyV5hagqiZNrN67rL0kvY3uH6I1QXtgxfSMLD6nAFJ")`
                    }}
                  >
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center font-montserrat">
                      {content.heroHeadline}
                    </h1>
                    <p className="text-white text-lg text-center max-w-2xl">
                      {content.heroSubheadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Process Section */}
              <div className="px-4 py-10">
                <div className="max-w-[960px] mx-auto">
                  <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat text-center">Our {content.title} Process</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.process.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#3D5AFE] text-white text-xl font-bold rounded-full mb-4">
                          {index + 1}
                        </div>
                        <p className="text-[#111218] text-base font-medium leading-normal">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="px-4 py-10 bg-white rounded-xl shadow-sm mx-4 md:mx-20 lg:mx-40">
                <div className="max-w-[960px] mx-auto">
                  <h2 className="text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat text-center">Why Choose Us for {content.title}?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center p-4 bg-[#F5F5F5] rounded-xl">
                        <span className="material-icons text-2xl text-[#3D5AFE] mr-3">check_circle</span>
                        <p className="text-[#111218] font-medium">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline & Warranty Section */}
              <div className="px-4 py-10">
                <div className="max-w-[960px] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-[#111218] text-lg font-bold leading-tight tracking-[-0.015em] mb-4 font-montserrat">Estimated Timeline</h3>
                      <p className="text-[#5f678c]">{content.timeline}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-[#111218] text-lg font-bold leading-tight tracking-[-0.015em] mb-4 font-montserrat">Our Warranty</h3>
                      <p className="text-[#5f678c]">{content.warranty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="px-4 py-10">
                <div className="max-w-[960px] mx-auto">
                  <h2 className="text-center text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">Frequently Asked Questions</h2>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {content.faq.map((item, index) => (
                      <details key={index} className="group bg-white p-4 rounded-xl shadow-sm">
                        <summary className="flex cursor-pointer items-center justify-between">
                          <h3 className="text-[#111218] font-medium">{item.question}</h3>
                          <span className="material-icons transition group-open:rotate-180">expand_more</span>
                        </summary>
                        <p className="text-[#5f678c] mt-2">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="bg-white p-8 rounded-xl shadow-sm mt-8 mb-16 mx-4 md:mx-20 lg:mx-40">
                <div className="max-w-[960px] mx-auto">
                  <h2 className="text-center text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
                    Get Your {content.title} Quote
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
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const params: { device: string; service: string }[] = [];
  for (const deviceType in serviceContent) {
    for (const serviceType in serviceContent[deviceType as keyof typeof serviceContent]) {
      params.push({ device: deviceType, service: serviceType });
    }
  }
  return params;
}
