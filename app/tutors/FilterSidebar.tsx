"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentQ = searchParams.get('q') || '';
  const currentSubject = searchParams.get('subject') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '100';

  const [q, setQ] = useState(currentQ);
  const [subject, setSubject] = useState(currentSubject);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const applyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (subject) params.set('subject', subject);
    if (maxPrice !== '100') params.set('maxPrice', maxPrice);
    
    router.push(`/tutors?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setQ('');
    setSubject('');
    setMaxPrice('100');
    router.push('/tutors');
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name or subject..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-zulu-green outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Main Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-zulu-green outline-none transition-all"
        >
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Music">Music</option>
          <option value="Physics">Physics</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Max Hourly Rate: ${maxPrice}</label>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-zulu-green"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>$10</span>
          <span>$100+</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={applyFilters}
          className="flex-1 bg-zulu-green text-white py-2 rounded-xl font-medium hover:bg-green-700 transition-colors"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 bg-neutral-100 dark:bg-neutral-800 py-2 rounded-xl font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-full py-3 mb-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium shadow-sm"
      >
        <SlidersHorizontal className="w-5 h-5 mr-2" />
        Filter Tutors
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-zulu-green" />
            <h2 className="font-bold text-lg">Filters</h2>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-neutral-900 h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-xl">Filters</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
