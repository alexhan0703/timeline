import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await query('SELECT * FROM schedules ORDER BY day, start_time');
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  const { subject, day, start_time, end_time } = await request.json();
  const result = await query(
    'INSERT INTO schedules (subject, day, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
    [subject, day, start_time, end_time]
  );
  return NextResponse.json(result.rows[0]);
}
