import Link from 'next/link';
import { Search, UserPlus, GraduationCap, Star, Sparkles } from 'lucide-react';

const FEATURED_TUTORS = [
  {
    id: 1,
    name: 'Abebe Bikila',
    subject: 'Mathematics',
    rating: 4.9,
    rate: 25,
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 2,
    name: 'Aster Aweke',
    subject: 'English',
    rating: 5.0,
    rate: 30,
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 3,
    name: 'Teddy Afro',
    subject: 'Music',
    rating: 4.8,
    rate: 20,
    imageUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-neutral-200/50 dark:bg-grid-neutral-800/50 bg-[size:20px_20px]" />
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-zulu-green to-zulu-yellow opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block">Learn Smarter with</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zulu-green via-zulu-yellow to-zulu-red">
              Zulu Tutors
            </span>
          </h1>
          <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10">
            Connect with expert tutors tailored to your learning style. Master any subject, anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/tutors" 
              className="w-full sm:w-auto px-8 py-4 bg-zulu-green text-white rounded-full font-bold text-lg hover:bg-green-700 hover:shadow-lg hover:shadow-zulu-green/30 transition-all transform hover:-translate-y-1"
            >
              Find a Tutor
            </Link>
            <Link 
              href="/signup?role=tutor" 
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 rounded-full font-bold text-lg hover:border-zulu-yellow hover:text-zulu-yellow transition-all transform hover:-translate-y-1"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* AI Feature Highlight Section - BOLD AND PROMINENT */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-zulu-green/10 to-green-500/10 rounded-2xl p-8 text-center border-2 border-zulu-green/20">
            <div className="inline-flex items-center gap-2 bg-zulu-green/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-zulu-green" />
              <span className="text-sm font-semibold text-zulu-green">AI Powered Learning</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Get Instant Help with <span className="text-zulu-green">Zulu AI Tutor</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
              Stuck on a problem? Our AI assistant is available 24/7 to help you understand concepts, solve problems, and prepare for exams.
            </p>
            <Link href="/dashboard/student">
              <button className="bg-zulu-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-zulu-green/20">
                Try AI Assistant Now →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-neutral-500 dark:text-neutral-400">Three simple steps to start your learning journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-10" />
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-neutral-50 dark:bg-neutral-900 rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-950 shadow-lg group-hover:border-zulu-red transition-colors mb-6 z-10">
                <UserPlus className="w-10 h-10 text-zulu-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Sign Up</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Create your free account and tell us what you want to learn.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-neutral-50 dark:bg-neutral-900 rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-950 shadow-lg group-hover:border-zulu-yellow transition-colors mb-6 z-10">
                <Search className="w-10 h-10 text-zulu-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Find a Tutor</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Browse our vetted expert tutors and find your perfect match.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-neutral-50 dark:bg-neutral-900 rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-950 shadow-lg group-hover:border-zulu-green transition-colors mb-6 z-10">
                <GraduationCap className="w-10 h-10 text-zulu-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Start Learning</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Book a session and start achieving your educational goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Tutors</h2>
              <p className="text-neutral-500 dark:text-neutral-400">Learn from the best in the field</p>
            </div>
            <Link href="/tutors" className="text-zulu-green font-medium hover:underline mt-4 md:mt-0">
              View all tutors &rarr;
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_TUTORS.map((tutor) => (
              <div key={tutor.id} className="bg-white dark:bg-neutral-950 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-neutral-100 dark:border-neutral-800 flex flex-col group">
                <div className="flex items-center space-x-4 mb-6">
                  <img src={tutor.imageUrl} alt={tutor.name} className="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-zulu-green transition-colors" />
                  <div>
                    <h3 className="font-bold text-lg">{tutor.name}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{tutor.subject}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center space-x-1 bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-zulu-yellow text-zulu-yellow" />
                    <span className="font-semibold text-sm">{tutor.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">${tutor.rate}</span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">/hr</span>
                  </div>
                </div>
                
                <Link href={`/tutors/${tutor.id}`}>
                  <button className="w-full mt-6 py-2.5 bg-neutral-100 dark:bg-neutral-900 hover:bg-zulu-green hover:text-white dark:hover:bg-zulu-green dark:hover:text-white font-medium rounded-xl transition-colors">
                    View Profile
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zulu-green to-green-600" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your future?</h2>
          <p className="text-green-50 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of students and expert tutors on Zulu Tutors today.
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-white text-zulu-green rounded-full font-bold text-lg hover:bg-neutral-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}