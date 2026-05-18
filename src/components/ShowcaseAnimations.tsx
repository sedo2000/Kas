import React, { useState } from 'react';
import { Check, Copy, CheckCheck, Sparkles, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShowcaseAnimationsProps {
  soundEnabled: boolean;
  searchQuery: string;
}

export const ShowcaseAnimations: React.FC<ShowcaseAnimationsProps> = ({ soundEnabled, searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Individual checkbox states
  const [states, setStates] = useState<Record<string, boolean>>({
    svgDraw: true,
    popBounce: false,
    rippleFill: true,
    strikeThrough: false,
    neonGlow: true,
    flip3d: false,
    liquidFill: true,
    rotatingGear: false,
    heartbeat: true,
  });

  const handleToggle = (id: string) => {
    const nextState = !states[id];
    setStates(prev => ({ ...prev, [id]: nextState }));
    if (soundEnabled) {
      playSound(nextState ? 'pop' : 'uncheck');
    }
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const animationsList = [
    {
      id: 'svgDraw',
      title: 'SVG Path Draw',
      category: 'Smooth Stroke',
      desc: 'Animates the SVG stroke-dasharray and stroke-dashoffset for a premium handwriting draw effect.',
      tags: ['SVG', 'Stroke Animation', 'Clean'],
      code: `// SVG Path Draw Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className="w-7 h-7 rounded-xl border-2 border-slate-700 bg-slate-900 flex items-center justify-center transition-colors group-hover:border-cyan-500 relative">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-cyan-400 stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-500 [stroke-dasharray:24] [stroke-dashoffset:24] peer-checked:[stroke-dashoffset:0]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
  <span className="text-slate-300 font-medium">SVG Path Draw</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 relative ${
            states.svgDraw 
              ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={states.svgDraw} 
              onChange={() => handleToggle('svgDraw')} 
            />
            <svg 
              viewBox="0 0 24 24" 
              className={`w-5 h-5 fill-none stroke-cyan-400 stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-500 [stroke-dasharray:24] ${
                states.svgDraw ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:24]'
              }`}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-white font-semibold text-base group-hover:text-cyan-400 transition-colors">
            SVG Path Draw
          </span>
        </label>
      )
    },
    {
      id: 'popBounce',
      title: 'Pop & Bounce',
      category: 'Spring Physics',
      desc: 'Uses CSS cubic-bezier scale transforms to create a playful, energetic spring bounce upon checking.',
      tags: ['CSS Transform', 'Spring', 'Playful'],
      code: `// Pop & Bounce Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 \${checked ? 'bg-indigo-500 scale-110 rotate-6' : 'bg-slate-800 border-2 border-slate-700'}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked && <Check className="w-5 h-5 text-white animate-bounce" />}
  </div>
  <span className="text-slate-300 font-medium">Pop & Bounce</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
            states.popBounce 
              ? 'bg-indigo-500 scale-110 rotate-6 shadow-lg shadow-indigo-500/30' 
              : 'bg-slate-900 border-2 border-slate-700 group-hover:scale-105'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.popBounce} 
              onChange={() => handleToggle('popBounce')} 
            />
            {states.popBounce && (
              <Check className="w-5 h-5 text-white transition-transform duration-300 animate-scale-in stroke-[3]" />
            )}
          </div>
          <span className="text-white font-semibold text-base group-hover:text-indigo-400 transition-colors">
            Pop & Bounce
          </span>
        </label>
      )
    },
    {
      id: 'rippleFill',
      title: 'Ripple Fill',
      category: 'Radial Expansion',
      desc: 'An expanding circle starts from the center and floods the checkbox container with vibrant color.',
      tags: ['Ripple', 'Background Fill', 'Material'],
      code: `// Ripple Fill Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className="w-7 h-7 rounded-xl border-2 border-slate-700 bg-slate-900 relative overflow-hidden flex items-center justify-center">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="absolute inset-0 bg-emerald-500 rounded-full scale-0 peer-checked:scale-150 transition-transform duration-500 ease-out" />
    <Check className="w-5 h-5 text-white relative z-10 opacity-0 peer-checked:opacity-100 transition-opacity duration-300 delay-100" />
  </div>
  <span className="text-slate-300 font-medium">Ripple Fill</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className="w-8 h-8 rounded-xl border-2 border-slate-700 bg-slate-900 relative overflow-hidden flex items-center justify-center group-hover:border-slate-600 transition-colors shadow-inner">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={states.rippleFill} 
              onChange={() => handleToggle('rippleFill')} 
            />
            <div className={`absolute inset-0 bg-emerald-500 rounded-full transition-transform duration-500 ease-out ${
              states.rippleFill ? 'scale-150' : 'scale-0'
            }`} />
            <Check className={`w-5 h-5 text-white relative z-10 stroke-[3] transition-opacity duration-300 ${
              states.rippleFill ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
          <span className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors">
            Ripple Fill
          </span>
        </label>
      )
    },
    {
      id: 'strikeThrough',
      title: 'Strike-Through Label',
      category: 'Typography Effect',
      desc: 'Checking the box animates a sleek horizontal line across the label text, perfect for todo lists.',
      tags: ['Todo', 'Text Animation', 'Minimalist'],
      code: `// Strike-Through Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all \${checked ? 'border-amber-500 bg-amber-500/20 text-amber-400' : 'border-slate-700 bg-slate-900'}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked && <Check className="w-4 h-4 stroke-[3]" />}
  </div>
  <span className={\`text-slate-300 font-medium transition-all duration-300 relative \${checked ? 'text-slate-500 line-through' : ''}\`}>
    Strike-Through Task
  </span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
            states.strikeThrough 
              ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/20' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.strikeThrough} 
              onChange={() => handleToggle('strikeThrough')} 
            />
            {states.strikeThrough && <Check className="w-5 h-5 stroke-[3] animate-scale-in" />}
          </div>
          <span className={`font-semibold text-base transition-all duration-300 relative ${
            states.strikeThrough ? 'text-slate-500 line-through decoration-amber-500 decoration-2' : 'text-white group-hover:text-amber-400'
          }`}>
            Strike-Through Task Item
          </span>
        </label>
      )
    },
    {
      id: 'neonGlow',
      title: 'Cyberpunk Neon Glow',
      category: 'Glow & Lighting',
      desc: 'Triggers an intense, futuristic drop shadow and glowing border that pulsates with energy.',
      tags: ['Cyberpunk', 'Glow', 'Dark Mode'],
      code: `// Neon Glow Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 \${checked ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'border-slate-700 bg-slate-900'}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked && <Check className="w-4 h-4 stroke-[3]" />}
  </div>
  <span className="text-slate-300 font-medium">Neon Glow</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${
            states.neonGlow 
              ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.6)] scale-105' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.neonGlow} 
              onChange={() => handleToggle('neonGlow')} 
            />
            {states.neonGlow && <Check className="w-5 h-5 stroke-[3] animate-pulse" />}
          </div>
          <span className="text-white font-semibold text-base group-hover:text-fuchsia-400 transition-colors">
            Cyberpunk Neon Glow
          </span>
        </label>
      )
    },
    {
      id: 'flip3d',
      title: '3D Card Flip',
      category: '3D Transforms',
      desc: 'Flips the checkbox container 180 degrees along the Y-axis to reveal the checkmark on the back.',
      tags: ['3D', 'Flip', 'Transform'],
      code: `// 3D Flip Checkbox
<label className="flex items-center gap-3 cursor-pointer group [perspective:1000px]">
  <div className={\`w-7 h-7 rounded-xl relative [transform-style:preserve-3d] transition-transform duration-500 \${checked ? '[transform:rotateY(180deg)]' : ''}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    <div className="absolute inset-0 bg-slate-900 border-2 border-slate-700 rounded-xl [backface-visibility:hidden]" />
    <div className="absolute inset-0 bg-blue-500 rounded-xl flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
      <Check className="w-4 h-4 text-white stroke-[3]" />
    </div>
  </div>
  <span className="text-slate-300 font-medium">3D Flip</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none [perspective:1000px]">
          <div className={`w-8 h-8 rounded-xl relative [transform-style:preserve-3d] transition-transform duration-700 ${
            states.flip3d ? '[transform:rotateY(180deg)]' : ''
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.flip3d} 
              onChange={() => handleToggle('flip3d')} 
            />
            {/* Front: Unchecked */}
            <div className="absolute inset-0 bg-slate-900 border-2 border-slate-700 rounded-xl [backface-visibility:hidden] group-hover:border-slate-600 transition-colors" />
            {/* Back: Checked */}
            <div className="absolute inset-0 bg-blue-500 rounded-xl flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-blue-500/30">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
          </div>
          <span className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">
            3D Card Flip
          </span>
        </label>
      )
    },
    {
      id: 'liquidFill',
      title: 'Liquid Wave Fill',
      category: 'Creative Physics',
      desc: 'Simulates a rising liquid container that bubbles up to fill the box with a smooth wave effect.',
      tags: ['Liquid', 'Wave', 'Creative'],
      code: `// Liquid Wave Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className="w-7 h-7 rounded-xl border-2 border-slate-700 bg-slate-900 relative overflow-hidden flex items-center justify-center">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="absolute inset-x-0 bottom-0 bg-cyan-500 h-0 peer-checked:h-full transition-all duration-500 ease-in-out" />
    <Check className="w-5 h-5 text-white relative z-10 opacity-0 peer-checked:opacity-100 transition-opacity duration-300 delay-200" />
  </div>
  <span className="text-slate-300 font-medium">Liquid Wave</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className="w-8 h-8 rounded-xl border-2 border-slate-700 bg-slate-900 relative overflow-hidden flex items-center justify-center group-hover:border-slate-600 transition-colors shadow-inner">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={states.liquidFill} 
              onChange={() => handleToggle('liquidFill')} 
            />
            <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-500 ease-in-out ${
              states.liquidFill ? 'h-full' : 'h-0'
            }`} />
            <Check className={`w-5 h-5 text-white relative z-10 stroke-[3] transition-opacity duration-300 ${
              states.liquidFill ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
          <span className="text-white font-semibold text-base group-hover:text-cyan-400 transition-colors">
            Liquid Wave Fill
          </span>
        </label>
      )
    },
    {
      id: 'rotatingGear',
      title: 'Rotating Gear Lock',
      category: 'Mechanical',
      desc: 'Spins 360 degrees while locking into place, providing a mechanical feel to user selections.',
      tags: ['Rotate', 'Mechanical', 'Spin'],
      code: `// Rotating Gear Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-500 \${checked ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 rotate-360' : 'border-slate-700 bg-slate-900'}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? <Check className="w-4 h-4 stroke-[3]" /> : <RefreshCw className="w-4 h-4 text-slate-600" />}
  </div>
  <span className="text-slate-300 font-medium">Rotating Gear</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-700 transform ${
            states.rotatingGear 
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 rotate-[360deg] shadow-lg shadow-emerald-500/20' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.rotatingGear} 
              onChange={() => handleToggle('rotatingGear')} 
            />
            {states.rotatingGear ? (
              <Check className="w-5 h-5 stroke-[3] animate-scale-in" />
            ) : (
              <RefreshCw className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            )}
          </div>
          <span className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors">
            Rotating Gear Lock
          </span>
        </label>
      )
    },
    {
      id: 'heartbeat',
      title: 'Heartbeat Pulse',
      category: 'Organic Motion',
      desc: 'Throbs twice rapidly like a heartbeat when toggled, adding organic life to your interfaces.',
      tags: ['Pulse', 'Heartbeat', 'Lively'],
      code: `// Heartbeat Pulse Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all \${checked ? 'border-rose-500 bg-rose-500 text-white animate-pulse' : 'border-slate-700 bg-slate-900'}\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked && <Check className="w-4 h-4 stroke-[3]" />}
  </div>
  <span className="text-slate-300 font-medium">Heartbeat Pulse</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
            states.heartbeat 
              ? 'border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.heartbeat} 
              onChange={() => handleToggle('heartbeat')} 
            />
            {states.heartbeat && <Check className="w-5 h-5 stroke-[3] animate-scale-in" />}
          </div>
          <span className="text-white font-semibold text-base group-hover:text-rose-400 transition-colors">
            Heartbeat Pulse
          </span>
        </label>
      )
    },
  ];

  // Filter based on search query
  const filteredAnimations = animationsList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Gallery</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Custom Check Animations
          </h2>
          <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
            Click any checkbox to test the interactive physics, sound feedback, and state transitions. Grab the ready-to-use React & Tailwind snippet instantly.
          </p>
        </div>

        <button
          onClick={() => {
            const toggled = Object.keys(states).reduce((acc, key) => ({ ...acc, [key]: !states[key] }), {});
            setStates(toggled);
            if (soundEnabled) playSound('chime');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Invert All States</span>
        </button>
      </div>

      {/* Grid of Showcase Cards */}
      {filteredAnimations.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-lg">No animation styles matched "{searchQuery}"</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnimations.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/50 group"
            >
              {/* Card Header / Live Preview Area */}
              <div className="p-6 sm:p-8 bg-slate-950/60 border-b border-slate-800/60 flex flex-col justify-between items-start gap-6 min-h-[160px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
                
                {/* Category & Status */}
                <div className="flex items-center justify-between w-full z-10">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700/80 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    states[item.id] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/80 text-slate-500 border border-slate-700'
                  }`}>
                    {states[item.id] ? 'CHECKED' : 'UNCHECKED'}
                  </span>
                </div>

                {/* Render Checkbox */}
                <div className="z-10 py-2">
                  {item.render()}
                </div>
              </div>

              {/* Card Body: Description & Tags */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-slate-900/40">
                <div className="space-y-3">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Copy Button */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">React + Tailwind</span>
                  <button
                    onClick={() => handleCopy(item.id, item.code)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      copiedId === item.id
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <CheckCheck className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
