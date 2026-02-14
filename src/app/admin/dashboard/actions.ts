'use server'

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';

export async function updateStatus(id: string, status: string) {
  const payload = await getPayloadClient();
  await payload.update({
    collection: 'repairs',
    id,
    data: {
      status: status as any,
    },
  });
  revalidatePath('/admin/dashboard');
}

export async function generateTicket(id: string) {
  const payload = await getPayloadClient();
  // Generate random code TR-XXXX
  const code = `TR-${Math.floor(1000 + Math.random() * 9000)}`;

  await payload.update({
    collection: 'repairs',
    id,
    data: {
      ticketCode: code,
    },
  });
  revalidatePath('/admin/dashboard');
}
