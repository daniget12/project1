"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Calendar, Clock, Star, BookOpen, Sparkles, ChevronRight, Loader2 } from 'lucide-react';
import AIChatInterface from '@/components/AIChatInterface';

interface Booking {
  id: string;
  session_date: string;
  duration_minutes: number;
  subject: string;
  status: string;
  meeting_link: string | null;
  tutor: {
    id: string;
    full_name: string;
    email: string;
  };
}

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
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
      // Fetch real bookings from database
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tutor:users!bookings_tutor_id_fkey (
            id,
            full_name,
            email
          )
        `)
        .eq('student_id', user.id)
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
  
  const pastSessions = bookings.filter(
    b => b.status === 'completed' || new Date(b.session_date) < new Date()
  );

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
        
        {/* Welcome Header - Real User Data */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Ready to learn something new today?
          </p>
        </div>

        {/* AI CHAT SECTION */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-zulu-green to-green-500 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-zulu-green to-green-600 bg-clip-text text-transparent">
              AI Study Assistant
            </h2>
            <span className="bg-zulu-green/10 text-zulu-green text-xs px-2 py-1 rounded-full font-semibold">
              Powered by Groq
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Get instant help with homework, clarify concepts, or practice questions with your personal AI tutor.
          </p>
          
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-zulu-green/30 shadow-xl shadow-zulu-green/5 overflow-hidden">
            <div className="bg-gradient-to-r from-zulu-green/10 to-transparent px-4 py-2 border-b border-zulu-green/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-zulu-green rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-zulu-green">Active • Ready to help</span>
              </div>
            </div>
            <div className="p-1">
              <AIChatInterface />
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
            <Link href="/tutors" className="text-sm text-zulu-green hover:underline flex items-center gap-1">
              Find more tutors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {upcomingSessions.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border p-8 text-center">
              <p className="text-neutral-500">
                No upcoming sessions. <Link href="/tutors" className="text-zulu-green">Find a tutor</Link> to get started!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {upcomingSessions.map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-neutral-900 rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{booking.tutor?.full_name || 'Tutor'}</h3>
                    <p className="text-sm text-neutral-500">{booking.subject || 'General'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm">
                      {new Date(booking.session_date).toLocaleDateString()} at {new Date(booking.session_date).toLocaleTimeString()}
                    </span>
                  </div>
                  {booking.meeting_link ? (
                    <a href={booking.meeting_link} target="_blank" rel="noopener noreferrer" className="bg-zulu-green text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                      Join Session
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-400">Meeting link pending</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Session History - Real Data */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-neutral-400" />
            <h2 className="text-xl font-semibold">Session History</h2>
          </div>
          
          {pastSessions.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border p-8 text-center">
              <p className="text-neutral-500">No past sessions yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastSessions.map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-neutral-900 rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4 opacity-75">
                  <div>
                    <h3 className="font-semibold">{booking.tutor?.full_name || 'Tutor'}</h3>
                    <p className="text-sm text-neutral-500">{booking.subject || 'General'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{new Date(booking.session_date).toLocaleDateString()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}