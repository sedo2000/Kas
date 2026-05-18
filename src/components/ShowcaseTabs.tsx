import React from 'react';
import { Sparkles, GitMerge, Star, Users, Code2, ShieldCheck } from 'lucide-react';

interface ShowcaseTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const ShowcaseTabs: React.FC<ShowcaseTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'animations', label: 'Animations & Effects', icon: Sparkles, desc: 'Draw, Pop, Glow & Liquid' },
    { id: 'indeterminate', label: 'Indeterminate & Trees', icon: GitMerge, desc: 'Tri-state & Hierarchy' },
    { id: 'icons', label: 'Creative & Icons', icon: Star, desc: 'Hearts, Stars & Emojis' },
    { id: 'groups', label: 'Group Selection Rules', icon: Users, desc: 'Limits, Select All & Tags' },
    { id: 'builder', label: 'Playground Builder', icon: Code2, desc: 'Customizer & Code Export' },
    { id: 'a11y', label: 'Accessibility Guide', icon: ShieldCheck, desc: 'WAI-ARIA & Keyboard A11y' },
  ];

  return (
    <div className="bg-slate-900/80 border-b border-slate-800/80 sticky top-[65px] z-40 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 text-left cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/40 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${
                isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight">{tab.label}</div>
                <div className="text-[10px] text-slate-500 font-medium">{tab.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
