import React from 'react';
import { CheckSquare, Volume2, VolumeX, Search, Sparkles, Code2, Layers } from 'lucide-react';
import { playSound } from '../utils/sound';

interface NavbarProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  totalCheckboxes: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  setSoundEnabled,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  totalCheckboxes
}) => {
  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      playSound('chime');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => setActiveTab('animations')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CheckMate<span className="text-cyan-400">.</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Ultimate Checkbox Showcase
              </p>
            </div>
          </div>

          {/* Mobile Sound Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled 
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400'
              }`}
              title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="w-full md:w-80 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search checkboxes, styles, icons..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/80 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Controls & Stats */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span><strong className="text-white font-semibold">{totalCheckboxes}</strong> Variations</span>
          </div>

          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              soundEnabled 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20 hover:bg-indigo-500/30' 
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span>Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Audio Off</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium ${
              activeTab === 'builder'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Interactive Code Builder"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Playground</span>
          </button>
        </div>
      </div>
    </header>
  );
};
