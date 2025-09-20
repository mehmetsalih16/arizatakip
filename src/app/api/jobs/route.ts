import { NextRequest } from 'next/server';
import { getAllJobs } from '@/lib/jobsService';

  const { searchParams } = new URL(req.url);
  const ilce = searchParams.get('ilce') || '';
  const date1 = searchParams.get('date1') || '';
  const date2 = searchParams.get('date2') || '';
  let jobs = await getAllJobs();
  if (ilce) {
    jobs = jobs.filter((j: any) => j.ilce && j.ilce.toLowerCase().includes(ilce.toLowerCase()));
  }
  if (date1) {
    jobs = jobs.filter((j: any) => j.date && j.date >= date1);
  }
  if (date2) {
    jobs = jobs.filter((j: any) => j.date && j.date <= date2);
  }
  return Response.json(jobs);
}
