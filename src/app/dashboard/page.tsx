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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Repairs</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, {session.user.name}</p>
          </div>
          <Link href="/book">
            <Button>Book New Repair</Button>
          </Link>
        </div>

        {repairs.length === 0 ? (
          <Card className="p-12 text-center bg-white dark:bg-gray-800">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 13h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No active repairs</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't booked any repairs yet.</p>
            <Link href="/book">
              <Button variant="outline">Start a Repair</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6">
            {repairs.map((repair) => (
              <Card key={repair.id} className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {repair.deviceType} {repair.deviceModel}
                      </h3>
                      <span className="px-2 py-1 text-xs font-mono bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        {repair.ticketCode}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Service: {repair.serviceType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Est. Cost: <span className="font-bold text-blue-600 dark:text-blue-400">${repair.estimatedCost}</span>
                    </p>
                    {repair.completionDate && (
                        <p className="text-xs text-gray-500">
                            Est. Completion: {new Date(repair.completionDate).toLocaleDateString()}
                        </p>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <RepairStatusStepper status={repair.status as RepairStatus} />
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <Link href={`/track-repair?ticket=${repair.ticketCode}`}>
                        <Button variant="link" size="sm">View Public Tracking Page</Button>
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
