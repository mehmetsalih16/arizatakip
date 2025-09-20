import { NextRequest } from 'next/server';
import { addMalzeme } from '@/lib/malzemeService';

export async function POST(req: NextRequest) {
  const data = await req.json();
  await addMalzeme(data);
  return Response.json({ success: true });
}
