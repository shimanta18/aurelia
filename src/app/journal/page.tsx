'use client';

import JournalSection from '@/Components/JournalSection';
import React from 'react';

export default function JournalPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-10">
      {/* Reusing your beautiful editorial component on its own dedicated route */}
      <JournalSection />
    </div>
  );
}