import { NextRequest } from 'next/server';
import { getAllJobs } from '@/lib/jobsService';

export async function GET(req: NextRequest) {
  const jobs = await getAllJobs();
  return Response.json(jobs);
}
