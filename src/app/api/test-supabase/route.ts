
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { supabaseUrl, supabaseKey } = await req.json();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase URL and Key are required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Attempt to fetch a simple query, for example, list user sessions.
    // This is a lightweight way to check if the credentials are valid.
    const { error } = await supabase.auth.admin.listUsers();

    if (error) {
      // If the error indicates an authentication problem, we can be more specific.
      if (error.message.includes('Authentication failed')) {
        return NextResponse.json({ success: false, error: 'Invalid Supabase credentials.' }, { status: 401 });
      }
      // For other errors, return a generic message.
      return NextResponse.json({ success: false, error: 'Failed to connect to Supabase.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Supabase connection successful!' });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 