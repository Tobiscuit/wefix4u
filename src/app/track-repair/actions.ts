'use server'

import { getPayloadClient } from '@/lib/payload';

export async function getRepairStatus(ticketCode: string, lastName: string) {
  try {
    const payload = await getPayloadClient();

    // Find the repair by ticketCode
    const { docs } = await payload.find({
      collection: 'repairs',
      where: {
        ticketCode: {
          equals: ticketCode,
        },
      },
      limit: 1,
      depth: 1, // To populate customer
    });

    if (docs.length === 0) {
      return { error: 'Repair not found or invalid ticket code.' };
    }

    const repair = docs[0];

    // Verify last name
    const customer = repair.customer;
    // Check if customer is populated
    if (!customer || typeof customer === 'string' || typeof customer === 'number') {
      return { error: 'System error: Could not verify customer details.' };
    }

    // Case insensitive check
    // @ts-ignore - customer is populated but types might not be generated yet
    if (customer.lastName.toLowerCase() !== lastName.toLowerCase()) {
      return { error: 'Invalid last name provided for this ticket.' };
    }

    // Return safe repair object
    return {
      success: true,
      data: {
        id: repair.id,
        ticketCode: repair.ticketCode,
        device: `${repair.deviceType} ${repair.deviceModel}`,
        // @ts-ignore
        status: repair.status,
        serviceType: repair.serviceType,
        estimatedCost: repair.estimatedCost,
        completionDate: repair.completionDate,
        updatedAt: repair.updatedAt,
      }
    };
  } catch (error) {
    console.error('Error fetching repair:', error);
    return { error: 'An unexpected error occurred.' };
  }
}
