import React, { useState } from 'react';
import { Users, Check, Copy, CheckCheck, AlertCircle, ShieldAlert, Filter, ListFilter } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShowcaseGroupsProps {
  soundEnabled: boolean;
  searchQuery: string;
}

export const ShowcaseGroups: React.FC<ShowcaseGroupsProps> = ({ soundEnabled, searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Group 1: Select All / Deselect All
  const [itemsGroup1, setItemsGroup1] = useState([
    { id: 'g1-1', label: 'Newsletter & Updates', checked: true },
    { id: 'g1-2', label: 'Product Releases', checked: true },
    { id: 'g1-3', label: 'Security Advisories', checked: false },
    { id: 'g1-4', label: 'Partner Offers', checked: false },
  ]);

  const handleGroup1Toggle = (id: string) => {
    setItemsGroup1(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    if (soundEnabled) playSound('click');
  };

  const handleGroup1SelectAll = (check: boolean) => {
    setItemsGroup1(prev => prev.map(item => ({ ...item, checked: check })));
    if (soundEnabled) playSound(check ? 'pop' : 'uncheck');
  };

  // Group 2: Min / Max Limits (Max 2 selections)
  const [itemsGroup2, setItemsGroup2] = useState([
    { id: 'g2-1', label: 'Frontend Development', checked: true },
    { id: 'g2-2', label: 'Backend Architecture', checked: true },
    { id: 'g2-3', label: 'DevOps & CI/CD', checked: false },
    { id: 'g2-4', label: 'AI & Machine Learning', checked: false },
  ]);
  const [limitWarning, setLimitWarning] = useState(false);

  const handleGroup2Toggle = (id: string) => {
    const currentItem = itemsGroup2.find(i => i.id === id);
    if (!currentItem) return;

    const currentlyCheckedCount = itemsGroup2.filter(i => i.checked).length;

    // If trying to check a new item but already at max limit (2)
    if (!currentItem.checked && currentlyCheckedCount >= 2) {
      setLimitWarning(true);
      if (soundEnabled) playSound('error');
      setTimeout(() => setLimitWarning(false), 2000);
      return;
    }

    setItemsGroup2(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    if (soundEnabled) playSound(currentItem.checked ? 'uncheck' : 'pop');
  };

  // Group 3: Mutually Exclusive (Radio-like Checkboxes)
  const [exclusiveSelected, setExclusiveSelected] = useState('monthly');
  const exclusiveOptions = [
    { id: 'monthly', label: 'Monthly Billing ($12/mo)', desc: 'Billed every 30 days' },
    { id: 'annual', label: 'Annual Billing ($10/mo)', desc: 'Save 20% with yearly commitment' },
    { id: 'lifetime', label: 'Lifetime Pass ($299)', desc: 'Pay once, enjoy forever' },
  ];

  const handleExclusiveSelect = (id: string) => {
    setExclusiveSelected(id);
    if (soundEnabled) playSound('chime');
  };

  // Group 4: Tag Filtered Group
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [tagItems, setTagItems] = useState([
    { id: 't1', label: 'React 19 RC', tag: 'frontend', checked: true },
    { id: 't2', label: 'Tailwind CSS v4', tag: 'frontend', checked: true },
    { id: 't3', label: 'Node.js v22', tag: 'backend', checked: false },
    { id: 't4', label: 'PostgreSQL 17', tag: 'database', checked: true },
    { id: 't5', label: 'Redis Cache', tag: 'database', checked: false },
  ]);

  const handleTagItemToggle = (id: string) => {
    setTagItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    if (soundEnabled) playSound('click');
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const group1Code = `// Select All / Deselect All Group
const [items, setItems] = useState([
  { id: '1', label: 'Updates', checked: true },
  { id: '2', label: 'Offers', checked: false },
]);

const handleSelectAll = (checked: boolean) => {
  setItems(prev => prev.map(i => ({ ...i, checked })));
};`;

  const group2Code = `// Max Selection Limit Group (Max 2)
const handleToggle = (id: string) => {
  const checkedCount = items.filter(i => i.checked).length;
  const isChecked = items.find(i => i.id === id)?.checked;
  
  if (!isChecked && checkedCount >= 2) {
    alert('Maximum limit of 2 reached');
    return;
  }
  setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
};`;

  const group3Code = `// Mutually Exclusive Checkboxes
const [selected, setSelected] = useState('monthly');

<div className="space-y-2">
  {options.map(opt => (
    <label key={opt.id} onClick={() => setSelected(opt.id)}>
      <input type="checkbox" checked={selected === opt.id} readOnly />
      <span>{opt.label}</span>
    </label>
  ))}
</div>`;

  const group4Code = `// Tag Filtered Checkbox Group
const filteredItems = selectedTag === 'all' ? items : items.filter(i => i.tag === selectedTag);`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2">
          <Users className="w-4 h-4" />
          <span>Advanced Logic</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Group Selection Rules & Validation
        </h2>
        <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
          Manage complex form states with bulk selection controls, maximum selection limits, mutually exclusive options, and dynamic category filtering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Select All / Deselect All */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ListFilter className="w-5 h-5 text-cyan-400" />
                <span>Bulk Selection Controls</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGroup1SelectAll(true)}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => handleGroup1SelectAll(false)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Provides one-click bulk controls to enable or disable an entire group of notification preferences instantly.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              {itemsGroup1.filter(i => searchQuery ? i.label.toLowerCase().includes(searchQuery.toLowerCase()) : true).map(item => (
                <label key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group select-none">
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    item.checked ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                  }`}>
                    <input type="checkbox" className="sr-only" checked={item.checked} onChange={() => handleGroup1Toggle(item.id)} />
                    {item.checked && <Check className="w-4 h-4 stroke-[3] animate-scale-in" />}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">SelectAllGroup.tsx</span>
            <button
              onClick={() => handleCopy('g1', group1Code)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                copiedId === 'g1' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copiedId === 'g1' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Snippet</span></>}
            </button>
          </div>
        </div>

        {/* Card 2: Min / Max Limits */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Selection Limit Rules (Max 2)</span>
              </h3>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                {itemsGroup2.filter(i => i.checked).length} / 2 Selected
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Enforces a strict maximum limit of 2 selections. Attempting to select a 3rd item triggers a visual validation error.
            </p>

            {limitWarning && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Maximum limit reached! Please deselect an item first.</span>
              </div>
            )}

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              {itemsGroup2.filter(i => searchQuery ? i.label.toLowerCase().includes(searchQuery.toLowerCase()) : true).map(item => (
                <label key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group select-none">
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    item.checked ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                  }`}>
                    <input type="checkbox" className="sr-only" checked={item.checked} onChange={() => handleGroup2Toggle(item.id)} />
                    {item.checked && <Check className="w-4 h-4 stroke-[3] animate-scale-in" />}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">MaxLimitGroup.tsx</span>
            <button
              onClick={() => handleCopy('g2', group2Code)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                copiedId === 'g2' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copiedId === 'g2' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Snippet</span></>}
            </button>
          </div>
        </div>

        {/* Card 3: Mutually Exclusive */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
                <span>Mutually Exclusive (Radio Checkboxes)</span>
              </h3>
              <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
                1 Required
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Checkboxes styled and programmed to act like radio buttons. Selecting any option automatically unchecks the previously active choice.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              {exclusiveOptions.filter(i => searchQuery ? i.label.toLowerCase().includes(searchQuery.toLowerCase()) : true).map(opt => (
                <div 
                  key={opt.id} 
                  onClick={() => handleExclusiveSelect(opt.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group select-none ${
                    exclusiveSelected === opt.id ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    exclusiveSelected === opt.id ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                  }`}>
                    {exclusiveSelected === opt.id && <Check className="w-4 h-4 stroke-[3] animate-scale-in" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">ExclusiveGroup.tsx</span>
            <button
              onClick={() => handleCopy('g3', group3Code)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                copiedId === 'g3' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copiedId === 'g3' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Snippet</span></>}
            </button>
          </div>
        </div>

        {/* Card 4: Tag Filtered Group */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-400" />
                <span>Dynamic Tag Filtering</span>
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {['all', 'frontend', 'backend', 'database'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      selectedTag === tag ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Filter available checkbox options dynamically by category tags, while preserving the underlying checked states across views.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 min-h-[220px]">
              {tagItems
                .filter(i => selectedTag === 'all' ? true : i.tag === selectedTag)
                .filter(i => searchQuery ? i.label.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                .map(item => (
                  <label key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group select-none">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold uppercase text-slate-400 border border-slate-700/50">
                        {item.tag}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.checked ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                    }`}>
                      <input type="checkbox" className="sr-only" checked={item.checked} onChange={() => handleTagItemToggle(item.id)} />
                      {item.checked && <Check className="w-4 h-4 stroke-[3] animate-scale-in" />}
                    </div>
                  </label>
                ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">TagFilteredGroup.tsx</span>
            <button
              onClick={() => handleCopy('g4', group4Code)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                copiedId === 'g4' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copiedId === 'g4' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Snippet</span></>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
