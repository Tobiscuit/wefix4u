import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { RepairStatusStepper, RepairStatus } from "@/components/ui/RepairStatusStepper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const payload = await getPayloadClient();

  // Find customer by email
  const { docs: customers } = await payload.find({
    collection: "customers",
    where: {
      email: {
        equals: session.user.email,
      },
    },
  });

  let repairs: any[] = [];

  if (customers.length > 0) {
    const customerId = customers[0].id;
    const result = await payload.find({
      collection: "repairs",
      where: {
        customer: {
          equals: customerId,
        },
      },
      sort: "-createdAt",
    });
    repairs = result.docs;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Gradients & Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              My Repairs
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{session.user.name}</span>
            </p>
          </div>
          <Link href="/book">
            <Button className="shadow-lg shadow-orange-500/20 font-bold">Book New Repair</Button>
          </Link>
        </div>

        {repairs.length === 0 ? (
          <Card variant="glass" className="p-12 text-center shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/50 dark:border-white/10 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 13h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No active repairs</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              You haven't booked any repairs yet. Get started by booking a service for your device.
            </p>
            <Link href="/book">
              <Button variant="outline" className="font-semibold border-gray-300 dark:border-gray-600">Start a Repair</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-8">
            {repairs.map((repair, index) => (
              <Card
                key={repair.id}
                variant="glass"
                className="overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-white/50 dark:border-white/10 animate-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-800/30 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {repair.deviceType} {repair.deviceModel}
                      </h3>
                      <span className="px-3 py-1 text-xs font-mono font-bold bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm">
                        {repair.ticketCode}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Service: {repair.serviceType}
                    </p>
                  </div>
                  <div className="text-right bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm min-w-[140px]">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Est. Cost
                    </p>
                    <p className="font-bold text-xl text-primary dark:text-blue-400">
                        ${repair.estimatedCost}
                    </p>
                    {repair.completionDate && (
                        <p className="text-xs text-gray-400 mt-1 border-t border-gray-100 dark:border-gray-800 pt-1">
                            Due: {new Date(repair.completionDate).toLocaleDateString()}
                        </p>
                    )}
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <RepairStatusStepper status={repair.status as RepairStatus} />
                </div>

                <div className="px-8 py-4 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end backdrop-blur-sm">
                    <Link href={`/track-repair?ticket=${repair.ticketCode}`}>
                        <Button variant="link" size="sm" className="text-primary hover:text-blue-700 font-bold flex items-center gap-1 group">
                            View Details
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Button>
                    </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
