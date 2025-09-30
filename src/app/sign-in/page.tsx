import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex flex-1 justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">Welcome Back</h1>
            </div>
            <SignInForm />
          </div>
        </div>
      </main>
    </div>
  );
}
