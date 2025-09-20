import { NextRequest, NextResponse } from 'next/server';
import { exportJobsToExcel } from '@/lib/excelExport';
import { exportJobsToPDF } from '@/lib/pdfExport';
import { getAllJobs } from '@/lib/jobsService';
import path from 'path';

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  const jobs = await getAllJobs();
  const exportDir = path.join(process.cwd(), 'src/exports');

  if (type === 'excel') {
    const filePath = await exportJobsToExcel(jobs, exportDir);
    return NextResponse.json({ success: true, filePath });
  } else if (type === 'pdf') {
    const filePath = await exportJobsToPDF(jobs, exportDir);
    return NextResponse.json({ success: true, filePath });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
  }
}
