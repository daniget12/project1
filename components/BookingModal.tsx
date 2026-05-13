"use client";

import { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
  tutorId: string;
  tutorName: string;
  onClose: () => void;
}

export default function BookingModal({ tutorId, tutorName, onClose }: BookingModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Please select a date and time.');
      return;
    }

    setLoading(true);
    setError('');

    // Combine date and time to ISO string
    const sessionDate = new Date(`${date}T${time}`).toISOString();

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutor_id: tutorId,
          session_date: sessionDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book session');
      }

      setSuccess(true);
      router.refresh(); // Refresh to update upcoming sessions if on dashboard
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Book a Session</h2>
          <p className="text-neutral-500 text-sm mb-6">Schedule a session with {tutorName}</p>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-zulu-green mb-4" />
              <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-neutral-500 text-sm">Your request has been sent to the tutor.</p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-xl focus:outline-none focus:border-zulu-green focus:ring-1 focus:ring-zulu-green transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-xl focus:outline-none focus:border-zulu-green focus:ring-1 focus:ring-zulu-green transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 bg-zulu-green hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex justify-center items-center disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
