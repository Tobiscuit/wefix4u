import RepairIntakeForm from '@/components/admin/RepairIntakeForm';

export default function NewRepairPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-dark-text">New Repair Intake</h2>
        <p className="text-body-text mt-1">Create a new ticket for a walk-in customer.</p>
      </div>
      
      <RepairIntakeForm />
    </div>
  );
}
