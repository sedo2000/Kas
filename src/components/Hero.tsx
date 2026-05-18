import React, { useState } from 'react';
import { Sparkles, Check, Flame, Award, ShieldCheck, Zap } from 'lucide-react';
import { playSound } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

interface HeroProps {
  soundEnabled: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Hero: React.FC<HeroProps> = ({ soundEnabled, setActiveTab }) => {
  const [masterChecked, setMasterChecked] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const handleMasterCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextState = !masterChecked;
    setMasterChecked(nextState);

    if (nextState) {
      setCheckCount(prev => prev + 1);
      if (soundEnabled) playSound('success');
      // Trigger confetti from the button's position
      const rect = e.currentTarget.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      if (soundEnabled) playSound('uncheck');
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80 py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients & Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next-Gen UI Components
              </span>
              <span className="text-slate-600">|</span>
              <span>Fully Accessible & Customizable</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              The Ultimate <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Checkbox Showcase
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore a curated collection of state-of-the-art check animations, tri-state indeterminate trees, custom SVG icons, advanced group selection rules, and creative micro-interactions. Complete with a live React & Tailwind code builder!
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-medium">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>60fps CSS Animations</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-medium">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Indeterminate Trees</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WAI-ARIA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-medium">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant Copy Code</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('animations')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                Browse Showcase
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold transition-all text-sm"
              >
                Open Playground Builder
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Master Checkbox Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-xl shadow-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500 -z-10" />

              <div className="text-center space-y-6">
                <div className="inline-block p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-cyan-400 mb-2">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Interactive Quick Try
                </h3>

                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the master checkbox below to experience our custom sound synthesis and confetti particle engine in action.
                </p>

                {/* Big Master Checkbox */}
                <div className="flex flex-col items-center justify-center py-4">
                  <button
                    onClick={handleMasterCheck}
                    className={`w-28 h-28 rounded-3xl flex items-center justify-center transition-all duration-500 transform active:scale-95 cursor-pointer shadow-xl relative ${
                      masterChecked
                        ? 'bg-gradient-to-tr from-cyan-500 to-emerald-500 shadow-cyan-500/40 scale-105 border-none'
                        : 'bg-slate-950 border-4 border-slate-700 hover:border-slate-600 shadow-slate-950/50'
                    }`}
                    aria-label="Master Quick Try Checkbox"
                  >
                    {masterChecked ? (
                      <Check className="w-16 h-16 text-slate-950 animate-scale-in stroke-[3]" />
                    ) : (
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Click Me</span>
                    )}

                    {/* Ring Glow */}
                    {masterChecked && (
                      <div className="absolute inset-0 rounded-3xl border-2 border-white/50 animate-ping pointer-events-none" />
                    )}
                  </button>

                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-300 font-medium">
                    <span>Status:</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      masterChecked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {masterChecked ? 'MASTER CHECKED 🎉' : 'UNCHECKED'}
                    </span>
                  </div>

                  {checkCount > 0 && (
                    <p className="mt-2 text-xs text-slate-400 animate-fade-in">
                      You've celebrated <strong className="text-cyan-400">{checkCount}</strong> times!
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 text-left">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Sound Engine: <strong className="text-slate-200">{soundEnabled ? 'Active' : 'Muted'}</strong></span>
                    <span>Confetti Engine: <strong className="text-emerald-400 font-semibold">Ready</strong></span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
