import Link from 'next/link';
import { Star, MapPin, BookOpen, Clock } from 'lucide-react';
import type { Tutor } from '@/lib/data';

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-950 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-neutral-100 dark:border-neutral-800 flex flex-col group h-full">
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src={tutor.imageUrl} 
          alt={tutor.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-transparent group-hover:border-zulu-green transition-colors" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg truncate pr-2">{tutor.name}</h3>
            <div className="flex items-center space-x-1 bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md shrink-0">
              <Star className="w-3.5 h-3.5 fill-zulu-yellow text-zulu-yellow" />
              <span className="font-semibold text-sm">{tutor.rating}</span>
            </div>
          </div>
          <p className="text-zulu-green font-medium text-sm mt-1">{tutor.subject}</p>
        </div>
      </div>
      
      <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 flex-grow">
        {tutor.bio}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          <BookOpen className="w-4 h-4 mr-2 shrink-0" />
          <span className="truncate">{tutor.subjects.slice(0, 2).join(', ')}{tutor.subjects.length > 2 ? '...' : ''}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          <MapPin className="w-4 h-4 mr-2 shrink-0" />
          <span>{tutor.languages.join(', ')}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div>
          <span className="font-bold text-xl">${tutor.rate}</span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">/hr</span>
        </div>
        <Link 
          href={`/tutors/${tutor.id}`}
          className="px-5 py-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-zulu-green hover:text-white dark:hover:bg-zulu-green dark:hover:text-white font-medium rounded-xl transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
