'use client'

import { useState } from 'react';
import { generateTicket } from './actions';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

export default function GenerateTicketButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await generateTicket(id);
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className="text-xs py-1 px-2 h-auto"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Gen Ticket'}
    </Button>
  );
}
