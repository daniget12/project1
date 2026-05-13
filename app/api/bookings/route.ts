import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role'); // 'student' or 'tutor'
    const userId = searchParams.get('userId');

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 });
    }

    // Determine which column to filter on
    const filterColumn = role === 'tutor' ? 'tutor_id' : 'student_id';

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        student:student_id(id, full_name, email),
        tutor:tutor_id(id, full_name, email, subjects)
      `)
      .eq(filterColumn, userId)
      .order('session_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tutor_id, session_date } = body;

    if (!tutor_id || !session_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        student_id: user.id,
        tutor_id,
        session_date,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
