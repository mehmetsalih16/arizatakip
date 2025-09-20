import { NextRequest } from 'next/server';
import { getAllMalzemeler } from '@/lib/malzemeService';

export async function GET(req: NextRequest) {
  const malzemeler = await getAllMalzemeler();
  return Response.json(malzemeler);
}
