import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles, Gamepad2 } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/rwKT-aWtlkdY-8UV/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-50/70 via-orange-100/20 to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs md:text-sm shadow-sm">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Tap into tiny, silly challenges</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
            The Tiny Quest Machine
          </h1>
          <p className="mt-3 md:mt-4 max-w-xl md:text-lg text-zinc-700">
            A playful button that deals out mini quests you can do in under 10 seconds. Try one. Giggle. Repeat.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#play" className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white px-5 py-3 font-semibold shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition">
              <Gamepad2 className="h-5 w-5" />
              Try a Quest
            </a>
            <span className="text-sm text-zinc-600">No sign-up. Pure silliness.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
