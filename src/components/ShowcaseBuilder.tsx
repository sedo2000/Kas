import React, { useState } from 'react';
import { Check, Star, Heart, Lock, Bell, Sparkles, Copy, CheckCheck, Code2, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

interface ShowcaseBuilderProps {
  soundEnabled: boolean;
}

export const ShowcaseBuilder: React.FC<ShowcaseBuilderProps> = ({ soundEnabled }) => {
  const [copied, setCopied] = useState(false);
  
  // Customization States
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [color, setColor] = useState<'cyan' | 'emerald' | 'indigo' | 'rose' | 'amber' | 'purple'>('cyan');
  const [radius, setRadius] = useState<'none' | 'md' | 'lg' | 'full'>('lg');
  const [icon, setIcon] = useState<'check' | 'star' | 'heart' | 'lock' | 'bell' | 'sparkles'>('check');
  const [anim, setAnim] = useState<'pop' | 'glow' | 'flip' | 'pulse'>('pop');
  const [label, setLabel] = useState('Custom Playground Checkbox');
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleToggle = (e: React.MouseEvent) => {
    if (disabled) return;
    const nextState = !checked;
    setChecked(nextState);

    if (soundEnabled) {
      playSound(nextState ? 'pop' : 'uncheck');
    }
    if (nextState && anim === 'pop') {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  // Maps for classes
  const sizeMap = {
    sm: { box: 'w-5 h-5', icon: 'w-3 h-3', text: 'text-xs' },
    md: { box: 'w-6 h-6', icon: 'w-3.5 h-3.5', text: 'text-sm' },
    lg: { box: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-base' },
    xl: { box: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-lg' },
  };

  const colorMap = {
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500', glow: 'shadow-cyan-500/40' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500', glow: 'shadow-emerald-500/40' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500', glow: 'shadow-indigo-500/40' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500', glow: 'shadow-rose-500/40' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', glow: 'shadow-amber-500/40' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500', glow: 'shadow-purple-500/40' },
  };

  const radiusMap = {
    none: 'rounded-none',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  const animMap = {
    pop: checked ? 'scale-110 rotate-3' : 'scale-100',
    glow: checked ? `shadow-lg ${colorMap[color].glow} scale-105` : '',
    flip: checked ? '[transform:rotateY(180deg)]' : '',
    pulse: checked ? 'animate-pulse shadow-md' : '',
  };

  const renderIcon = () => {
    const className = `${sizeMap[size].icon} ${anim === 'flip' ? '[transform:rotateY(180deg)]' : ''} stroke-[2.5] text-slate-950 animate-scale-in`;
    switch (icon) {
      case 'check': return <Check className={className} />;
      case 'star': return <Star className={`${className} fill-slate-950`} />;
      case 'heart': return <Heart className={`${className} fill-slate-950`} />;
      case 'lock': return <Lock className={className} />;
      case 'bell': return <Bell className={className} />;
      case 'sparkles': return <Sparkles className={className} />;
    }
  };

  // Generate live code snippet
  const generatedCode = `// Generated CheckMate Checkbox Component
import React from 'react';
import { ${icon === 'check' ? 'Check' : icon === 'star' ? 'Star' : icon === 'heart' ? 'Heart' : icon === 'lock' ? 'Lock' : icon === 'bell' ? 'Bell' : 'Sparkles'} } from 'lucide-react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label = "${label}",
  disabled = ${disabled}
}) => {
  return (
    <label className={\`flex items-center gap-3 cursor-pointer select-none group \${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }\`}>
      <div className={\`${sizeMap[size].box} ${radiusMap[radius]} border-2 transition-all duration-300 flex items-center justify-center \${
        checked 
          ? '${colorMap[color].border} ${colorMap[color].bg} ${anim === 'glow' ? `shadow-lg ${colorMap[color].glow}` : ''} ${anim === 'pop' ? 'scale-110 rotate-3' : ''} ${anim === 'pulse' ? 'animate-pulse' : ''}' 
          : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
      } \${disabled ? 'pointer-events-none' : ''}\`}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {checked && (
          <${icon === 'check' ? 'Check' : icon === 'star' ? 'Star' : icon === 'heart' ? 'Heart' : icon === 'lock' ? 'Lock' : icon === 'bell' ? 'Bell' : 'Sparkles'} className="${sizeMap[size].icon} stroke-[2.5] text-slate-950 animate-scale-in" />
        )}
      </div>
      {label && <span className={\`${sizeMap[size].text} font-semibold text-slate-200 group-hover:text-white transition-colors\`}>{label}</span>}
    </label>
  );
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSize('lg');
    setColor('cyan');
    setRadius('lg');
    setIcon('check');
    setAnim('pop');
    setLabel('Custom Playground Checkbox');
    setDisabled(false);
    setChecked(true);
    if (soundEnabled) playSound('chime');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">
            <Code2 className="w-4 h-4" />
            <span>Interactive Customizer</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Playground Checkbox Builder
          </h2>
          <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
            Tweak dimensions, colors, border radii, icons, and animation physics. Watch the component update live and copy the production-ready React & Tailwind code.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl">
          <h3 className="text-lg font-bold text-white border-b border-slate-800/80 pb-4">
            Component Configuration
          </h3>

          {/* 1. Size */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Dimension / Size</label>
            <div className="grid grid-cols-4 gap-3">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all ${
                    size === s ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Color Theme */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Color Palette</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {(['cyan', 'emerald', 'indigo', 'rose', 'amber', 'purple'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold capitalize transition-all flex items-center justify-center gap-1.5 ${
                    color === c ? 'bg-slate-800 border-white text-white shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${colorMap[c].bg}`} />
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Border Radius */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Border Radius</label>
            <div className="grid grid-cols-4 gap-3">
              {(['none', 'md', 'lg', 'full'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold capitalize transition-all ${
                    radius === r ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {r === 'none' ? 'Sharp (0px)' : r === 'md' ? 'Rounded (8px)' : r === 'lg' ? 'Smooth (16px)' : 'Pill (9999px)'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Icon Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">4. Internal Icon</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {(['check', 'star', 'heart', 'lock', 'bell', 'sparkles'] as const).map((i) => (
                <button
                  key={i}
                  onClick={() => setIcon(i)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold capitalize transition-all flex flex-col items-center gap-1 ${
                    icon === i ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {i === 'check' && <Check className="w-4 h-4" />}
                  {i === 'star' && <Star className="w-4 h-4" />}
                  {i === 'heart' && <Heart className="w-4 h-4" />}
                  {i === 'lock' && <Lock className="w-4 h-4" />}
                  {i === 'bell' && <Bell className="w-4 h-4" />}
                  {i === 'sparkles' && <Sparkles className="w-4 h-4" />}
                  <span>{i}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Animation Physics */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">5. Animation Physics</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['pop', 'glow', 'flip', 'pulse'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAnim(a)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold capitalize transition-all ${
                    anim === a ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {a === 'pop' ? 'Scale Pop' : a === 'glow' ? 'Neon Glow' : a === 'flip' ? '3D Flip' : 'Heartbeat Pulse'}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Label & States */}
          <div className="space-y-4 pt-2 border-t border-slate-800/80">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">6. Label Text</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter custom label..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Simulate Disabled State</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Live Preview & Generated Code */}
        <div className="lg:col-span-5 space-y-8 sticky top-[140px]">
          
          {/* Live Preview Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl space-y-6 text-center">
            <h3 className="text-lg font-bold text-white border-b border-slate-800/80 pb-4 text-left">
              Live Component Preview
            </h3>

            <div className="py-12 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px] shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 pointer-events-none" />

              {/* Rendered Live Checkbox */}
              <div 
                onClick={handleToggle}
                className={`flex items-center gap-4 cursor-pointer select-none group/box p-4 rounded-2xl transition-all ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900/50'
                }`}
              >
                <div className={`${sizeMap[size].box} ${radiusMap[radius]} border-2 transition-all duration-300 flex items-center justify-center relative ${
                  checked 
                    ? `${colorMap[color].border} ${colorMap[color].bg} ${animMap[anim]}` 
                    : 'border-slate-700 bg-slate-900 group-hover/box:border-slate-600'
                }`}>
                  <input type="checkbox" className="sr-only" checked={checked} readOnly />
                  {checked && renderIcon()}
                </div>

                {label && (
                  <span className={`${sizeMap[size].text} font-semibold text-slate-200 group-hover/box:text-white transition-colors`}>
                    {label}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 text-[10px] text-slate-500 font-medium">
                Click preview above to test interactive sound & physics
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span>Status: <strong className={checked ? colorMap[color].text : 'text-slate-500'}>{checked ? 'CHECKED' : 'UNCHECKED'}</strong></span>
              <span>Disabled: <strong className={disabled ? 'text-rose-400' : 'text-slate-500'}>{disabled ? 'TRUE' : 'FALSE'}</strong></span>
            </div>
          </div>

          {/* Generated Code Export Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span>Production Code Export</span>
              </h3>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  copied ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                }`}
              >
                {copied ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4" /><span>Copy Code</span></>}
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto max-h-80 scrollbar-thin scrollbar-thumb-slate-800">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
