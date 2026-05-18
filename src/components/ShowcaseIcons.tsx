import React, { useState } from 'react';
import { Star, Heart, Lock, Unlock, ThumbsUp, Bell, BellOff, Volume2, VolumeX, Sparkles, Copy, CheckCheck, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShowcaseIconsProps {
  soundEnabled: boolean;
  searchQuery: string;
}

export const ShowcaseIcons: React.FC<ShowcaseIconsProps> = ({ soundEnabled, searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // States
  const [states, setStates] = useState<Record<string, boolean>>({
    starRating: true,
    heartLike: false,
    lockSecure: true,
    thumbsUp: false,
    bellNotify: true,
    audioSim: true,
    emojiToggle: false,
    scratchOff: true,
  });

  const [rating, setRating] = useState(4); // 1-5 stars

  const handleToggle = (id: string) => {
    const nextState = !states[id];
    setStates(prev => ({ ...prev, [id]: nextState }));
    if (soundEnabled) {
      if (id === 'heartLike') playSound(nextState ? 'chime' : 'uncheck');
      else if (id === 'lockSecure') playSound(nextState ? 'click' : 'uncheck');
      else playSound(nextState ? 'pop' : 'uncheck');
    }
  };

  const handleStarClick = (val: number) => {
    setRating(val);
    if (soundEnabled) playSound('chime');
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const items = [
    {
      id: 'starRating',
      title: 'Star Rating Checkbox Group',
      category: 'Rating System',
      desc: 'Five interactive star checkboxes that automatically fill up to the selected rating level.',
      tags: ['Stars', 'Rating', 'Review'],
      code: `// Star Rating Checkbox Group
<div className="flex items-center gap-1.5">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      onClick={() => setRating(star)}
      className={\`p-1.5 rounded-xl transition-all duration-300 \${
        star <= rating ? 'text-amber-400 bg-amber-400/10 scale-110' : 'text-slate-600 bg-slate-800/50'
      }\`}
    >
      <Star className={\`w-6 h-6 \${star <= rating ? 'fill-amber-400 animate-scale-in' : ''}\`} />
    </button>
  ))}
</div>`,
      render: () => (
        <div className="flex items-center gap-2 select-none py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className={`p-2 rounded-xl transition-all duration-300 transform cursor-pointer ${
                star <= rating 
                  ? 'text-amber-400 bg-amber-400/15 scale-110 shadow-lg shadow-amber-400/20 border border-amber-400/30' 
                  : 'text-slate-600 bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
              title={`Rate ${star} Stars`}
            >
              <Star className={`w-5 h-5 transition-transform duration-300 ${
                star <= rating ? 'fill-amber-400 animate-scale-in stroke-[2]' : 'stroke-[1.5]'
              }`} />
            </button>
          ))}
          <span className="ml-2 text-xs font-bold text-slate-400">({rating}/5)</span>
        </div>
      )
    },
    {
      id: 'heartLike',
      title: 'Heart Bookmark / Like Toggle',
      category: 'Social Interaction',
      desc: 'A gorgeous beating red heart toggle designed for bookmarking, favoriting, or liking content.',
      tags: ['Heart', 'Like', 'Bookmark'],
      code: `// Heart Bookmark Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 \${
    checked ? 'border-rose-500 bg-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/30 scale-105' : 'border-slate-700 bg-slate-900'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    <Heart className={\`w-5 h-5 \${checked ? 'fill-rose-500 animate-bounce' : ''}\`} />
  </div>
  <span className="text-slate-300 font-medium">Favorite Item</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform ${
            states.heartLike 
              ? 'border-rose-500 bg-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/30 scale-110 rotate-3' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600 text-slate-500'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.heartLike} 
              onChange={() => handleToggle('heartLike')} 
            />
            <Heart className={`w-5 h-5 transition-transform duration-300 ${
              states.heartLike ? 'fill-rose-500 animate-scale-in stroke-[2.5]' : 'stroke-[2]'
            }`} />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-rose-400 transition-colors">Heart Like Toggle</div>
            <div className="text-xs text-slate-400">{states.heartLike ? 'Liked & Favorited ❤️' : 'Click to Favorite'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'lockSecure',
      title: 'Padlock Security Switch',
      category: 'Access Control',
      desc: 'Switches between an open and closed padlock to signify secure encryption or private access.',
      tags: ['Lock', 'Security', 'Privacy'],
      code: `// Padlock Security Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all \${
    checked ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-amber-500/50 bg-amber-500/10 text-amber-500'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? <Lock className="w-5 h-5 stroke-[2.5]" /> : <Unlock className="w-5 h-5 stroke-[2.5]" />}
  </div>
  <span className="text-slate-300 font-medium">{checked ? 'Locked' : 'Unlocked'}</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
            states.lockSecure 
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20 scale-105' 
              : 'border-amber-500/50 bg-amber-500/10 text-amber-500 shadow-lg shadow-amber-500/10'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.lockSecure} 
              onChange={() => handleToggle('lockSecure')} 
            />
            {states.lockSecure ? (
              <Lock className="w-5 h-5 stroke-[2.5] animate-scale-in" />
            ) : (
              <Unlock className="w-5 h-5 stroke-[2.5] animate-scale-in" />
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors">Security Padlock</div>
            <div className="text-xs text-slate-400">{states.lockSecure ? 'Secure Encryption Active 🔒' : 'Unrestricted Access 🔓'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'thumbsUp',
      title: 'Thumbs Up Endorsement',
      category: 'Social Endorsement',
      desc: 'A premium thumbs up toggle perfect for voting boards, feature requests, or comment sections.',
      tags: ['Thumbs', 'Vote', 'Social'],
      code: `// Thumbs Up Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all \${
    checked ? 'border-blue-500 bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/30' : 'border-slate-700 bg-slate-900'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    <ThumbsUp className={\`w-4 h-4 \${checked ? 'fill-slate-950 animate-bounce' : ''}\`} />
  </div>
  <span className="text-slate-300 font-medium">Upvote</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform ${
            states.thumbsUp 
              ? 'border-blue-500 bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/30 scale-110 -rotate-6' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600 text-slate-500'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.thumbsUp} 
              onChange={() => handleToggle('thumbsUp')} 
            />
            <ThumbsUp className={`w-5 h-5 transition-transform duration-300 ${
              states.thumbsUp ? 'fill-slate-950 animate-scale-in stroke-[2.5]' : 'stroke-[2]'
            }`} />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">Upvote Endorsement</div>
            <div className="text-xs text-slate-400">{states.thumbsUp ? 'Upvoted (+1)' : 'Click to Upvote'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'bellNotify',
      title: 'Bell Subscription Toggle',
      category: 'Notifications',
      desc: 'Simulates a ringing bell when checked, indicating active push notifications or email subscriptions.',
      tags: ['Bell', 'Notification', 'Subscribe'],
      code: `// Bell Subscription Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all \${
    checked ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/20' : 'border-slate-700 bg-slate-900 text-slate-500'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? <Bell className="w-5 h-5 stroke-[2.5] animate-bounce" /> : <BellOff className="w-5 h-5 stroke-[2]" />}
  </div>
  <span className="text-slate-300 font-medium">Notifications</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
            states.bellNotify 
              ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/20 scale-105' 
              : 'border-slate-700 bg-slate-900 text-slate-500 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.bellNotify} 
              onChange={() => handleToggle('bellNotify')} 
            />
            {states.bellNotify ? (
              <Bell className="w-5 h-5 stroke-[2.5] animate-pulse" />
            ) : (
              <BellOff className="w-5 h-5 stroke-[2]" />
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-amber-400 transition-colors">Push Notifications</div>
            <div className="text-xs text-slate-400">{states.bellNotify ? 'Subscribed 🔔' : 'Muted 🔕'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'emojiToggle',
      title: 'Emoji Mood Switcher',
      category: 'Creative Emoji',
      desc: 'Toggles between two distinct emoji moods, providing a fun, human touch to form preferences.',
      tags: ['Emoji', 'Mood', 'Creative'],
      code: `// Emoji Mood Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className="w-10 h-10 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-2xl select-none">
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? '🤩' : '😴'}
  </div>
  <span className="text-slate-300 font-medium">Energy Level</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl transition-all duration-300 transform ${
            states.emojiToggle 
              ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20 scale-110 rotate-6' 
              : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.emojiToggle} 
              onChange={() => handleToggle('emojiToggle')} 
            />
            <span className="animate-scale-in">{states.emojiToggle ? '🤩' : '😴'}</span>
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-yellow-400 transition-colors">Emoji Mood Switch</div>
            <div className="text-xs text-slate-400">{states.emojiToggle ? 'Hyper Excited Mode!' : 'Sleepy Chill Mode'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'scratchOff',
      title: 'Scratch-Off / Pixel Reveal',
      category: 'Gamification',
      desc: 'Checking the box simulates scratching off a secret lottery ticket or revealing a hidden pixel prize.',
      tags: ['Scratch', 'Reveal', 'Gamified'],
      code: `// Scratch-Off Reveal Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden \${
    checked ? 'border-purple-500 bg-purple-500/20 text-purple-400' : 'border-slate-700 bg-slate-800'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {!checked && <div className="absolute inset-0 bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-300">SCRATCH</div>}
    {checked && <Sparkles className="w-6 h-6 animate-spin text-purple-400" style={{ animationDuration: '3s' }} />}
  </div>
  <span className="text-slate-300 font-medium">Reveal Mystery Prize</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
            states.scratchOff 
              ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/30 scale-105' 
              : 'border-slate-700 bg-slate-800 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.scratchOff} 
              onChange={() => handleToggle('scratchOff')} 
            />
            {!states.scratchOff && (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center text-[10px] font-extrabold tracking-widest text-slate-300 border border-dashed border-slate-500/50 m-1 rounded-xl">
                REVEAL
              </div>
            )}
            {states.scratchOff && (
              <Sparkles className="w-6 h-6 animate-spin text-purple-400" style={{ animationDuration: '4s' }} />
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-purple-400 transition-colors">Mystery Scratch-Off</div>
            <div className="text-xs text-slate-400">{states.scratchOff ? '🎉 You Won 500 CheckPoints!' : 'Scratch to reveal bonus'}</div>
          </div>
        </label>
      )
    },
    {
      id: 'audioSim',
      title: 'Acoustic Sound Synth Toggle',
      category: 'Audio Feedback',
      desc: 'Specifically designed to showcase Web Audio API synthesis. Emits custom acoustic frequencies on toggle.',
      tags: ['Audio', 'Synth', 'Acoustic'],
      code: `// Acoustic Audio Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <div className={\`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all \${
    checked ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20' : 'border-slate-700 bg-slate-900 text-slate-500'
  }\`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
  </div>
  <span className="text-slate-300 font-medium">Acoustic Feedback</span>
</label>`,
      render: () => (
        <label className="flex items-center gap-4 cursor-pointer group select-none">
          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
            states.audioSim 
              ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20 scale-105' 
              : 'border-slate-700 bg-slate-900 text-slate-500 group-hover:border-slate-600'
          }`}>
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={states.audioSim} 
              onChange={() => handleToggle('audioSim')} 
            />
            {states.audioSim ? (
              <Volume2 className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-base group-hover:text-cyan-400 transition-colors">Acoustic Sound Synth</div>
            <div className="text-xs text-slate-400">{states.audioSim ? 'Web Audio Synth Active 🔊' : 'Audio Synth Muted 🔇'}</div>
          </div>
        </label>
      )
    },
  ];

  // Filter based on search query
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
          <Star className="w-4 h-4" />
          <span>Creative Customizations</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Icon Variations & Creative Micro-Interactions
        </h2>
        <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
          Checkboxes don't have to be boring squares. Replace standard checkmarks with stars, hearts, padlocks, emojis, or gamified scratch-offs.
        </p>
      </div>

      {/* Grid of Showcase Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-lg">No icon variations matched "{searchQuery}"</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/50 group"
            >
              {/* Card Header / Live Preview Area */}
              <div className="p-6 sm:p-8 bg-slate-950/60 border-b border-slate-800/60 flex flex-col justify-between items-start gap-6 min-h-[160px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
                
                {/* Category & Status */}
                <div className="flex items-center justify-between w-full z-10">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-amber-400 border border-slate-700/80 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>A11y Compliant</span>
                  </div>
                </div>

                {/* Render Checkbox */}
                <div className="z-10 py-2 w-full">
                  {item.render()}
                </div>
              </div>

              {/* Card Body: Description & Tags */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-slate-900/40">
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
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
