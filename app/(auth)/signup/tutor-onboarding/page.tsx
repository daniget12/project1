"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GraduationCap, Loader2 } from 'lucide-react';

export default function TutorOnboardingPage() {
  const [subjects, setSubjects] = useState('');
  const [bio, setBio] = useState('');
  const [rate, setRate] = useState('25');
  const [languages, setLanguages] = useState('English');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("User session not found. Please try logging in again.");
      setLoading(false);
      return;
    }

    // In a real app, we might have a tutors table or add these fields to users.
    // For this demonstration, we'll update the existing user record with JSON metadata 
    // or just assume the users table has these columns.
    
    // Attempting to update the 'users' table. 
    // Note: The SQL schema must support these columns!
    const { error: dbError } = await supabase
      .from('users')
      .update({
        subjects: subjects.split(',').map(s => s.trim()),
        bio,
        hourly_rate: parseInt(rate),
        languages: languages.split(',').map(l => l.trim())
      })
      .eq('id', user.id);

    if (dbError) {
      console.error('Error saving profile:', dbError);
      setError('Failed to save profile details. Ensure your database schema has the correct columns.');
      setLoading(false);
      return;
    }

    router.push('/dashboard/tutor');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="w-12 h-12 text-zulu-green" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Tell us about your expertise and rates.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow-sm border border-neutral-200 dark:border-neutral-800 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleOnboarding}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Subjects (comma separated)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mathematics, Calculus, Physics"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-zulu-green focus:border-zulu-green sm:text-sm bg-white dark:bg-neutral-950"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Short Bio
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hi, I am an experienced tutor..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-zulu-green focus:border-zulu-green sm:text-sm bg-white dark:bg-neutral-950 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-zulu-green focus:border-zulu-green sm:text-sm bg-white dark:bg-neutral-950"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Languages spoken
                </label>
                <input
                  type="text"
                  required
                  placeholder="English, Amharic"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-zulu-green focus:border-zulu-green sm:text-sm bg-white dark:bg-neutral-950"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-zulu-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zulu-green disabled:opacity-50 transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Setup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
