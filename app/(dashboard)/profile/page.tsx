"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { User, Mail, BookOpen, DollarSign, Languages, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    fetchUserAndProfile();
  }, []);

  const fetchUserAndProfile = async () => {
    setLoading(true);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      // Get profile from users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setBio(data.bio || '');
        setSubjects(data.subjects || []);
        setHourlyRate(data.hourly_rate?.toString() || '');
        setLanguages(data.languages || []);
      }
    }
    
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const updates = {
      full_name: fullName,
      bio: bio,
      subjects: subjects,
      hourly_rate: hourlyRate ? parseInt(hourlyRate) : null,
      languages: languages,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user?.id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
    
    setSaving(false);
  };

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter(l => l !== language));
  };

  const subjectOptions = ['Math', 'Science', 'English', 'History', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Art'];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-zulu-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href={profile?.role === 'tutor' ? '/dashboard/tutor' : '/dashboard/student'}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30' : 'bg-red-50 text-red-700 dark:bg-red-900/30'}`}>
            {message.text}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
              placeholder="Your full name"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full p-3 border rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-500"
            />
            <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
              placeholder="Tell students about yourself, your teaching style, and experience..."
            />
          </div>

          {/* Subjects (Tutor only) */}
          {profile?.role === 'tutor' && (
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Subjects
              </label>
              <div className="flex gap-2 mb-3">
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="flex-1 p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                >
                  <option value="">Select a subject...</option>
                  {subjectOptions.filter(s => !subjects.includes(s)).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={addSubject}
                  className="px-4 py-2 bg-zulu-green text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span key={subject} className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hourly Rate (Tutor only) */}
          {profile?.role === 'tutor' && (
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Hourly Rate ($)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="e.g., 45"
              />
            </div>
          )}

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" /> Languages
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                className="flex-1 p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="e.g., English, Amharic, French"
              />
              <button
                onClick={addLanguage}
                className="px-4 py-2 bg-zulu-green text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <span key={language} className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {language}
                  <button
                    onClick={() => removeLanguage(language)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-zulu-green text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}