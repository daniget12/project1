import { SAMPLE_TUTORS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Star, MapPin, BookOpen, Clock, Calendar as CalendarIcon, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const tutor = SAMPLE_TUTORS.find(t => t.id === resolvedParams.id);

  if (!tutor) {
    notFound();
  }

  // Mock schedule
  const MOCK_SCHEDULE = [
    { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
    { day: 'Wednesday', slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
    { day: 'Friday', slots: ['09:00 AM', '03:00 PM'] },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <Link href="/tutors" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-zulu-green mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Tutors
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Action */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-zulu-green/20 to-zulu-yellow/20" />
              
              <img 
                src={tutor.imageUrl} 
                alt={tutor.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-neutral-900 shadow-lg mx-auto relative z-10 mb-4"
              />
              
              <h1 className="text-2xl font-bold mb-1">{tutor.name}</h1>
              <p className="text-zulu-green font-medium mb-4">{tutor.subject}</p>
              
              <div className="flex items-center justify-center space-x-2 bg-neutral-50 dark:bg-neutral-800 py-2 rounded-xl mb-6">
                <Star className="w-5 h-5 fill-zulu-yellow text-zulu-yellow" />
                <span className="font-bold">{tutor.rating}</span>
                <span className="text-neutral-500">({tutor.reviewsCount} reviews)</span>
              </div>

              <div className="text-left space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 mb-6">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Hourly Rate</p>
                  <p className="text-2xl font-bold">${tutor.rate}<span className="text-base font-normal text-neutral-500">/hr</span></p>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Languages</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{tutor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-zulu-green text-white rounded-xl font-bold text-lg hover:bg-green-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                Book Session
              </button>
            </div>
            
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-zulu-green" />
                Verified
              </h3>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex justify-between"><span>Identity</span><span className="font-medium text-neutral-900 dark:text-white">Verified</span></li>
                <li className="flex justify-between"><span>Education</span><span className="font-medium text-neutral-900 dark:text-white">Verified</span></li>
                <li className="flex justify-between"><span>Response Time</span><span className="font-medium text-neutral-900 dark:text-white">&lt; 1 hour</span></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Details & Schedule */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About {tutor.name.split(' ')[0]}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                {tutor.bio}
              </p>
              
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-zulu-green" />
                  Subjects Taught
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map(subject => (
                    <span key={subject} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-2 text-zulu-green" />
                  Availability
                </h2>
                <span className="text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">Accepting new students</span>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {MOCK_SCHEDULE.map(day => (
                  <div key={day.day} className="border border-neutral-100 dark:border-neutral-800 rounded-xl p-4">
                    <h4 className="font-bold mb-3 text-center">{day.day}</h4>
                    <div className="space-y-2">
                      {day.slots.map(slot => (
                        <button key={slot} className="w-full py-2 text-sm bg-neutral-50 dark:bg-neutral-950 hover:bg-zulu-green hover:text-white dark:hover:bg-zulu-green border border-neutral-200 dark:border-neutral-800 hover:border-zulu-green rounded-lg transition-colors">
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {[1, 2].map((review) => (
                  <div key={review} className="pb-6 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center font-bold">
                          S{review}
                        </div>
                        <div>
                          <p className="font-bold">Student {review}</p>
                          <p className="text-xs text-neutral-500">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-zulu-yellow text-zulu-yellow" />)}
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      "Absolutely fantastic tutor! Explained complex topics in a way that was easy to understand. Highly recommend to anyone struggling with this subject."
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl font-medium transition-colors">
                Read All {tutor.reviewsCount} Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
