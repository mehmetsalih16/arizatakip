import { NextRequest } from 'next/server';
import { addJob } from '@/lib/jobsService';

export async function POST(req: NextRequest) {
  const data = await req.json();
  await addJob(data);
  return Response.json({ success: true });
}
