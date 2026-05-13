"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Star, Users, ChevronRight, Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  session_date: string;
  duration_minutes: number;
  subject: string;
  status: string;
  meeting_link: string | null;
  student: {
    id: string;
    full_name: string;
    email: string;
  };
}

export default function TutorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      // Get tutor profile
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // Fetch real bookings where this user is the tutor
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select(`
          *,
          student:users!bookings_student_id_fkey (
            id,
            full_name,
            email
          )
        `)
        .eq('tutor_id', user.id)
        .order('session_date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(bookingsData || []);
      }
    }
    
    setLoading(false);
  };

  const upcomingSessions = bookings.filter(
    b => b.status === 'confirmed' && new Date(b.session_date) > new Date()
  );
  
  const completedSessions = bookings.filter(b => b.status === 'completed');
  
  const totalEarnings = completedSessions.reduce((sum, booking) => {
    const hours = booking.duration_minutes / 60;
    return sum + (hours * (profile?.hourly_rate || 0));
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-zulu-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Here's what's happening with your students.
          </p>
        </div>

        {/* Stats Cards - Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Students</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <Users className="w-8 h-8 text-zulu-green opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Completed Sessions</p>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>
              <Star className="w-8 h-8 text-zulu-yellow opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Earnings</p>
                <p className="text-2xl font-bold">${totalEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-zulu-green opacity-50" />
            </div>
          </div>
        </div>

        {/* Upcoming Sessions - Real Data */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-zulu-green" />
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            </div>
            <Link href="/profile" className="text-sm text-zulu-green hover:underline flex items-center gap-1">
              Update availability <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {upcomingSessions.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border p-8 text-center">
              <p className="text-neutral-500">No upcoming sessions. Share your profile with students!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {upcomingSessions.map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-neutral-900 rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{booking.student?.full_name || 'Student'}</h3>
                    <p className="text-sm text-neutral-500">{booking.subject || 'General'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm">
                      {new Date(booking.session_date).toLocaleDateString()} at {new Date(booking.session_date).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="border border-zulu-green text-zulu-green px-4 py-2 rounded-lg text-sm hover:bg-zulu-green hover:text-white transition-colors">
                      Confirm
                    </button>
                    <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Availability Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Availability Settings</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl border p-6">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Set your weekly schedule so students know when to book.
            </p>
            <Link href="/profile">
              <button className="bg-zulu-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Manage Availability
              </button>
            </Link>
          </div>
        </div>

        {/* Reviews - Coming from database */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-zulu-yellow" />
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-xl border p-8 text-center">
            <p className="text-neutral-500">Reviews will appear here once students leave feedback after sessions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}