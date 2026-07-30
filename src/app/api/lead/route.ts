import { NextResponse } from 'next/server';
import { submitLead } from '@/app/actions/lead';

/** REST alternative to the Server Action — handy for external integrations and tests. */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const result = await submitLead(payload);
  return NextResponse.json(result, { status: result.status === 'success' ? 200 : 400 });
}
