import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <span className="font-bold text-xl tracking-tight text-zulu-green">Zulu Tutors</span>
          <p className="text-sm text-neutral-500 mt-2">Learn Smarter. Powered by Zulu Tech.</p>
        </div>
        <div className="flex space-x-6">
          <Link href="#" className="text-sm text-neutral-500 hover:text-zulu-yellow transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-sm text-neutral-500 hover:text-zulu-yellow transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm text-neutral-500 hover:text-zulu-yellow transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
