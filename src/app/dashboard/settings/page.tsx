'use client';

import React, { useState } from 'react';

export default function SettingsPage(): React.JSX.Element {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Workspace preferences saved.');
    }, 800);
  };

  return (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-normal text-stone-900 tracking-tight">Workspace Configuration</h1>
        <p className="text-sm font-sans font-light text-stone-500 mt-1">Configure systemic variables, interaction rules, and interface controls.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/60 shadow-sm divide-y divide-stone-100 font-sans text-sm text-stone-700">
        {/* Toggle 1: Broadcast Nodes */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-stone-900">Communication Node Sync</h3>
            <p className="text-xs text-stone-400 mt-0.5">Receive immediate dashboard warnings concerning listings and offers.</p>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${notifications ? 'bg-[#A48463]' : 'bg-stone-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle 2: Identity Safeguards */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-stone-900">2FA Core Validation</h3>
            <p className="text-xs text-stone-400 mt-0.5">Force secondary verification checks upon terminal initialization access.</p>
          </div>
          <button 
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${twoFactor ? 'bg-[#A48463]' : 'bg-stone-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Action Blocks: Save Button */}
        <div className="p-6 bg-stone-50/40 flex justify-end">
          <button 
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-[#A48463] hover:bg-[#8C6F51] text-[#FAF7F2] font-medium px-5 py-2 text-xs rounded-lg transition-colors duration-150 shadow-sm uppercase tracking-wider"
          >
            {saving ? 'Synchronizing...' : 'Save Config Parameters'}
          </button>
        </div>
      </div>
    </div>
  );
}