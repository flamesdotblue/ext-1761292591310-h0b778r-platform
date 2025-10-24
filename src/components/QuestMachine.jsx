import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Rocket, Sparkles, Star } from 'lucide-react';

const QUESTS = [
  'Blink 12 times as fast as you can. Count out loud! 👀',
  'Give your best 2-second evil villain laugh. Mwahaha! 😈',
  'Do the tiniest chair wiggle shimmy. No standing allowed. 🪑',
  'Point dramatically to a random corner and say “Aha!” 🧭',
  'High-five the air near you. Twice. ✋✋',
  'Whisper “I am a majestic potato” with conviction. 🥔',
  'Pretend the floor is lava for three hops. 🔥',
  'Salute the nearest houseplant (or imaginary one). 🪴',
  'Spell your name with nose-movements only. 👃',
  'Give an Oscar speech for your water bottle. 🏆',
  'Do three micro-jumps, as quiet as a ninja. 🥷',
  'Wrap yourself in an invisible cape and strike a pose. 🦸',
  'Make the tiniest “pew pew” laser sound. 🔫 pew!',
  'Wave at your reflection in anything shiny. ✨',
  'Narrate your next 5 seconds like a sports commentator. 🎙️',
  'Drum a 4-beat rhythm on your desk. Twice. 🥁',
  'Bounce an imaginary ball and shout “boop!” each time. 🏀',
  'Slow-mo clap for yourself for exactly 3 claps. 👏',
  'Tell the room your secret superhero name. 🤫🦹',
  'Do one polite bow to the universe. 🙇'
];

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function QuestMachine() {
  const [current, setCurrent] = useState('Tap the button to receive your tiny quest.');
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [streak, setStreak] = useLocalStorage('tqm_streak', 0);
  const [history, setHistory] = useLocalStorage('tqm_history', []);
  const timerRef = useRef(null);

  const randomQuest = useMemo(() => () => {
    return QUESTS[Math.floor(Math.random() * QUESTS.length)];
  }, []);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [running, timeLeft]);

  function startQuest() {
    const next = randomQuest();
    setCurrent(next);
    setTimeLeft(10);
    setRunning(true);
  }

  function markDone() {
    if (running) return; // wait until timer ends
    setStreak(s => s + 1);
    setHistory(h => [{ text: current, at: Date.now() }, ...h].slice(0, 15));
  }

  function resetStreak() { setStreak(0); }

  const progress = running ? ((10 - timeLeft) / 10) * 100 : 0;

  return (
    <section id="play" className="relative container mx-auto px-6 md:px-10 py-16">
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-orange-200 bg-white/90 backdrop-blur shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-orange-700 font-semibold">
                <Sparkles className="h-5 w-5" /> Tiny Quest
              </div>
              <div className="text-sm text-zinc-500">10-second challenges</div>
            </div>

            <p className="mt-4 text-lg md:text-xl font-medium text-zinc-900 min-h-[3.5rem]">
              {current}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={startQuest} className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-4 py-3 font-semibold hover:bg-zinc-800 transition">
                <Rocket className="h-5 w-5" /> Give me a quest
              </button>
              <button onClick={markDone} disabled={running} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${running ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                <Star className="h-5 w-5" /> Mark as done
              </button>
            </div>

            <div className="mt-6">
              <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                {running ? `Time left: ${timeLeft}s` : 'Ready when you are!'}
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <div className="text-sm text-orange-900/80">Your streak</div>
            <div className="mt-2 flex items-end gap-3">
              <div className="text-5xl font-extrabold text-orange-700">{streak}</div>
              <button onClick={resetStreak} className="text-xs text-orange-700/70 underline hover:text-orange-700">reset</button>
            </div>
            <p className="mt-3 text-sm text-orange-900/70">Keep a streak by completing quests after the timer ends. Silly discipline is still discipline!</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="font-semibold text-zinc-900">Recent quests</h3>
            <ul className="mt-3 space-y-2 max-h-48 overflow-auto pr-1">
              {history.length === 0 && (
                <li className="text-sm text-zinc-600">No completions yet. Your tiny legend awaits.</li>
              )}
              {history.map((h, i) => (
                <li key={i} className="text-sm text-zinc-800">
                  <span className="mr-2">•</span>{h.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
