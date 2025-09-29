import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#F5F5F5]" style={{fontFamily: 'Roboto, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Header />
            
            <main className="mt-8 flex-1 flex items-center justify-center">
              <SignInForm />
            </main>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
