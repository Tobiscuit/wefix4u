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
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-text-light-primary dark:text-text-dark-primary">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 bg-background-off-white dark:bg-container-dark/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight text-text-light-primary dark:text-text-dark-primary">
              My Repairs
            </h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary">
              Welcome back, <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{session.user.name}</span>
            </p>
          </div>
          <Link href="/book">
            <Button className="font-bold shadow-md">Book New Repair</Button>
          </Link>
        </div>

        {repairs.length === 0 ? (
          <Card variant="default" className="p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-container-dark rounded-xl">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons-outlined text-4xl">build</span>
            </div>
            <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">No active repairs</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8 max-w-md mx-auto">
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
                variant="default"
                className="overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-container-dark rounded-xl"
              >
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                        {repair.deviceType} {repair.deviceModel}
                      </h3>
                      <span className="px-3 py-1 text-xs font-mono font-bold bg-white dark:bg-gray-700 rounded-full text-text-light-secondary dark:text-text-dark-secondary border border-gray-200 dark:border-gray-600 shadow-sm">
                        {repair.ticketCode}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Service: {repair.serviceType}
                    </p>
                  </div>
                  <div className="text-right bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm min-w-[140px]">
                    <p className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-1">
                        Est. Cost
                    </p>
                    <p className="font-bold text-xl text-primary dark:text-blue-400">
                        ${repair.estimatedCost}
                    </p>
                    {repair.completionDate && (
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1 border-t border-gray-100 dark:border-gray-800 pt-1">
                            Due: {new Date(repair.completionDate).toLocaleDateString()}
                        </p>
                    )}
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <RepairStatusStepper status={repair.status as RepairStatus} />
                </div>

                <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <Link href={`/track-repair?ticket=${repair.ticketCode}`}>
                        <Button variant="link" size="sm" className="text-primary hover:text-blue-700 font-bold flex items-center gap-1 group">
                            View Details
                            <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
