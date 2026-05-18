import React, { useState } from 'react';
import { ShieldCheck, Volume2, Key, Eye, CheckCheck, Copy } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShowcaseA11yProps {
  soundEnabled: boolean;
  searchQuery: string;
}

export const ShowcaseA11y: React.FC<ShowcaseA11yProps> = ({ soundEnabled, searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live Screen Reader Simulation Checkbox
  const [a11yChecked, setA11yChecked] = useState(false);
  const [srAnnouncement, setSrAnnouncement] = useState('Screen reader ready. Use Tab to focus and Space to toggle.');

  const handleA11yToggle = (checked: boolean) => {
    setA11yChecked(checked);
    const announcement = checked 
      ? 'Checked. Terms and Conditions agreement checkbox. 1 of 1.' 
      : 'Unchecked. Terms and Conditions agreement checkbox. 1 of 1.';
    setSrAnnouncement(announcement);
    if (soundEnabled) playSound(checked ? 'pop' : 'uncheck');
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const a11yCode = `// Fully Accessible Custom Checkbox Component
interface AccessibleCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  id: string;
  disabled?: boolean;
}

export const AccessibleCheckbox: React.FC<AccessibleCheckboxProps> = ({
  checked, onChange, label, description, id, disabled
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center h-6">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-describedby={description ? \`\${id}-desc\` : undefined}
          className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all cursor-pointer"
        />
      </div>
      <div className="text-left">
        <label htmlFor={id} className="text-sm font-semibold text-slate-200 cursor-pointer select-none">
          {label}
        </label>
        {description && (
          <p id={\`\${id}-desc\`} className="text-xs text-slate-400 mt-0.5 select-none">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};`;

  const sections = [
    {
      title: 'Keyboard Navigation Standards',
      icon: Key,
      desc: 'Ensure all checkbox variations are fully reachable via the Tab key and togglable via the Spacebar. Avoid removing default focus rings unless replacing them with high-contrast custom indicators.',
      bullets: [
        'Tab / Shift+Tab: Moves focus to the next or previous checkbox.',
        'Spacebar: Toggles the checked or unchecked state of the focused item.',
        'Arrow Keys: Used to navigate between mutually exclusive radio groups.',
      ]
    },
    {
      title: 'WAI-ARIA Attributes Guide',
      icon: ShieldCheck,
      desc: 'When building custom checkboxes with divs or spans, proper ARIA roles and state attributes are mandatory for assistive technologies.',
      bullets: [
        'role="checkbox": Informs screen readers that the element behaves as a checkbox.',
        'aria-checked="true | false | mixed": Explicitly defines the current binary or indeterminate state.',
        'aria-describedby="[id]": Links secondary helper text or error messages directly to the input.',
      ]
    },
    {
      title: 'Color Contrast & Visual Focus',
      icon: Eye,
      desc: 'Meet WCAG AA / AAA contrast standards by maintaining at least a 4.5:1 ratio between checkbox borders/icons and their backgrounds.',
      bullets: [
        'Minimum 4.5:1 contrast ratio for text and active icon fills.',
        '2px minimum focus ring with high-contrast ring-offset for visibility.',
        'Clear disabled states (opacity-50) with aria-disabled="true".',
      ]
    },
  ];

  // Filter sections if search query exists
  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.bullets.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>WAI-ARIA & WCAG Compliance</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Accessibility (A11y) & Keyboard Navigation
        </h2>
        <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
          Beautiful UI should never compromise usability. Learn how to build custom checkboxes that work flawlessly with screen readers, keyboard navigation, and high-contrast display modes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: A11y Guidelines & Standards */}
        <div className="lg:col-span-7 space-y-8">
          {filteredSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl">
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{sec.title}</h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {sec.desc}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Right Column: Screen Reader Simulator & Accessible Code Export */}
        <div className="lg:col-span-5 space-y-8 sticky top-[140px]">
          
          {/* Screen Reader Live Simulator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span>Screen Reader Simulator</span>
              </h3>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                Live ARIA Output
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Interact with the checkbox below using your mouse or keyboard (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Tab</kbd> & <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Space</kbd>). The box below displays exactly what a screen reader announces.
            </p>

            {/* Interactive Accessible Checkbox */}
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-start gap-4 shadow-inner">
              <div className="flex items-start gap-3 w-full">
                <div className="flex items-center h-6">
                  <input
                    id="a11y-demo-cb"
                    type="checkbox"
                    checked={a11yChecked}
                    onChange={(e) => handleA11yToggle(e.target.checked)}
                    aria-describedby="a11y-demo-desc"
                    className="w-6 h-6 rounded-lg border-2 border-slate-700 bg-slate-900 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all cursor-pointer shadow-md"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="a11y-demo-cb" className="text-base font-bold text-white cursor-pointer select-none">
                    I agree to the Terms & Privacy Policy
                  </label>
                  <p id="a11y-demo-desc" className="text-xs text-slate-400 mt-0.5 select-none leading-normal">
                    By checking this box, you acknowledge that you have read and agree to our terms of service and privacy agreement.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Announcement Output Box */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Screen Reader Voice Output:</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-emerald-400 font-mono text-xs shadow-inner leading-relaxed animate-fade-in">
                "{srAnnouncement}"
              </div>
            </div>
          </div>

          {/* Accessible Checkbox Component Export */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Accessible Code Export</span>
              </h3>
              <button
                onClick={() => handleCopy('a11yCode', a11yCode)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  copiedId === 'a11yCode' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {copiedId === 'a11yCode' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Code</span></>}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto max-h-80 scrollbar-thin scrollbar-thumb-slate-800">
              <code>{a11yCode}</code>
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
