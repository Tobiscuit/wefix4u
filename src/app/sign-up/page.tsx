import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex flex-1 justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">Create Your WeFix4U Account</h1>
            </div>
            <SignUpForm />
          </div>
        </div>
      </main>
    </div>
  );
}
