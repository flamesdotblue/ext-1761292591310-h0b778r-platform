import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white/70">
      <div className="container mx-auto px-6 md:px-10 py-8 text-sm text-zinc-600 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>Built for giggles. Do not operate heavy machinery while giggling.</p>
        <p className="text-zinc-500">© {new Date().getFullYear()} Tiny Quest Machine</p>
      </div>
    </footer>
  );
}
