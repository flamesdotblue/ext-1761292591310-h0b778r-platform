import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';

const NAMES = ['Ava', 'Leo', 'Milo', 'Zoe', 'Kai', 'Luna', 'Noah', 'Maya', 'Ivy', 'Nico', 'Aria', 'Finn'];
const EMOJIS = ['😂', '🔥', '✨', '🌀', '🌟', '🎉', '😎', '🤪', '🙌'];

function makeRandomFeed(count = 8) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const action = [
      'did the tiny shimmy',
      'saluted a fern',
      'whispered about potatoes',
      'conquered lava hops',
      'performed stealth claps',
      'booped an imaginary ball',
      'won an Oscar for hydration',
    ][Math.floor(Math.random() * 7)];
    items.push({ name, emoji, action });
  }
  return items;
}

export default function QuirkFeed() {
  const feed = useMemo(() => makeRandomFeed(9), []);

  return (
    <section className="container mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-zinc-800">
        <Sparkles className="h-5 w-5 text-orange-600" />
        <h2 className="text-xl font-semibold">Live-ish Feed</h2>
      </div>
      <p className="text-sm text-zinc-600 mt-1">Totally real humans allegedly doing tiny quests right now.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feed.map((f, idx) => (
          <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-zinc-900">{f.name}</div>
              <div className="text-xl">{f.emoji}</div>
            </div>
            <div className="mt-2 text-zinc-700 text-sm">{f.name} {f.action} — legend status pending.</div>
          </div>
        ))}
      </div>
    </section>
  );
}
