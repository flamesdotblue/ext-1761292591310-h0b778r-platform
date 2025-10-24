import React from 'react';
import Hero3D from './components/Hero3D';
import QuestMachine from './components/QuestMachine';
import QuirkFeed from './components/QuirkFeed';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white text-zinc-900">
      <Hero3D />
      <main>
        <QuestMachine />
        <QuirkFeed />
      </main>
      <Footer />
    </div>
  );
}
