import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { default as RepairStatusSelect } from "./RepairStatusSelect"; // Ensure default import
import { default as GenerateTicketButton } from "./GenerateTicketButton"; // Ensure default import
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const payload = await getPayloadClient();
  const { docs: repairs } = await payload.find({
    collection: "repairs",
    sort: "-createdAt",
    depth: 1,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <Button>New Repair</Button>
        </div>

        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase font-medium">
                <tr>
                  <th className="px-6 py-3">Ticket</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Device</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {repairs.map((repair: any) => (
                  <tr key={repair.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-gray-900 dark:text-white">
                      {repair.ticketCode ? (
                        repair.ticketCode
                      ) : (
                        <GenerateTicketButton id={repair.id} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {typeof repair.customer === 'object' ? `${repair.customer.firstName} ${repair.customer.lastName}` : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {repair.deviceType} {repair.deviceModel}
                      <div className="text-xs text-gray-400">{repair.serviceType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <RepairStatusSelect id={repair.id} currentStatus={repair.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(repair.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
