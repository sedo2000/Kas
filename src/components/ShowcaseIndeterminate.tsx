import React, { useState } from 'react';
import { Check, Minus, FolderOpen, Copy, CheckCheck, GitMerge, ChevronDown, ChevronRight, ShieldAlert } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShowcaseIndeterminateProps {
  soundEnabled: boolean;
  searchQuery: string;
}

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

const initialTreeData: TreeNode[] = [
  {
    id: 'root',
    label: '📁 Project Root (All Files)',
    children: [
      {
        id: 'src',
        label: '📂 src',
        children: [
          { id: 'app', label: '📄 App.tsx' },
          { id: 'index', label: '📄 index.css' },
          { id: 'main', label: '📄 main.tsx' },
        ],
      },
      {
        id: 'public',
        label: '📂 public',
        children: [
          { id: 'favicon', label: '🖼️ favicon.ico' },
          { id: 'robots', label: '📄 robots.txt' },
        ],
      },
      {
        id: 'config',
        label: '⚙️ Configuration',
        children: [
          { id: 'package', label: '📦 package.json' },
          { id: 'vite', label: '⚡ vite.config.ts' },
        ],
      },
    ],
  },
];

export const ShowcaseIndeterminate: React.FC<ShowcaseIndeterminateProps> = ({ soundEnabled, searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Single tri-state cycle demo: 'unchecked' | 'indeterminate' | 'checked'
  const [triState, setTriState] = useState<'unchecked' | 'indeterminate' | 'checked'>('indeterminate');

  const cycleTriState = () => {
    if (triState === 'unchecked') {
      setTriState('indeterminate');
      if (soundEnabled) playSound('click');
    } else if (triState === 'indeterminate') {
      setTriState('checked');
      if (soundEnabled) playSound('pop');
    } else {
      setTriState('unchecked');
      if (soundEnabled) playSound('uncheck');
    }
  };

  // Tree selection state: map of id -> boolean (checked)
  const [selectedNodes, setSelectedNodes] = useState<Record<string, boolean>>({
    app: true,
    index: true,
    main: false,
    favicon: true,
    robots: true,
    package: false,
    vite: false,
  });

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    src: true,
    public: true,
    config: false,
  });

  // Table row selection state
  const [tableRows, setTableRows] = useState([
    { id: '1', name: 'Alice Vance', role: 'Admin', status: 'Active', selected: true },
    { id: '2', name: 'Bob Miller', role: 'Editor', status: 'Active', selected: true },
    { id: '3', name: 'Charlie Kim', role: 'Viewer', status: 'Invited', selected: false },
    { id: '4', name: 'Diana Prince', role: 'Contributor', status: 'Active', selected: false },
  ]);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (soundEnabled) playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to get all leaf IDs under a node
  const getLeafIds = (node: TreeNode): string[] => {
    if (!node.children) return [node.id];
    return node.children.flatMap(getLeafIds);
  };

  // Calculate status of a node: 'checked' | 'unchecked' | 'indeterminate'
  const getNodeState = (node: TreeNode): 'checked' | 'unchecked' | 'indeterminate' => {
    if (!node.children) {
      return selectedNodes[node.id] ? 'checked' : 'unchecked';
    }
    const leaves = getLeafIds(node);
    const checkedCount = leaves.filter(id => selectedNodes[id]).length;
    if (checkedCount === leaves.length) return 'checked';
    if (checkedCount === 0) return 'unchecked';
    return 'indeterminate';
  };

  // Handle checking/unchecking a tree node
  const handleTreeNodeToggle = (node: TreeNode) => {
    const currentState = getNodeState(node);
    const nextChecked = currentState !== 'checked'; // if indeterminate or unchecked -> check all. If checked -> uncheck all.
    
    const leaves = getLeafIds(node);
    const newSelected = { ...selectedNodes };
    leaves.forEach(id => {
      newSelected[id] = nextChecked;
    });

    setSelectedNodes(newSelected);
    if (soundEnabled) {
      playSound(nextChecked ? 'pop' : 'uncheck');
    }
  };

  const toggleFolderExpand = (id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Table header state
  const selectedRowCount = tableRows.filter(r => r.selected).length;
  const tableHeaderState = selectedRowCount === tableRows.length ? 'checked' : selectedRowCount === 0 ? 'unchecked' : 'indeterminate';

  const toggleTableHeader = () => {
    const nextState = tableHeaderState !== 'checked';
    setTableRows(prev => prev.map(row => ({ ...row, selected: nextState })));
    if (soundEnabled) playSound(nextState ? 'pop' : 'uncheck');
  };

  const toggleTableRow = (id: string) => {
    setTableRows(prev => prev.map(row => row.id === id ? { ...row, selected: !row.selected } : row));
    if (soundEnabled) playSound('click');
  };

  // Filter tree or table based on search query
  const matchesSearch = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());

  // Render tree node recursively
  const renderTree = (node: TreeNode, depth = 0) => {
    const state = getNodeState(node);
    const isFolder = !!node.children;
    const isExpanded = expandedFolders[node.id];

    // Check if node matches search query
    const isMatch = searchQuery ? matchesSearch(node.label) : true;

    return (
      <div key={node.id} className="select-none" style={{ paddingLeft: depth > 0 ? '1.5rem' : '0' }}>
        <div className={`flex items-center gap-2 py-2 px-3 rounded-xl transition-all ${
          state === 'checked' ? 'bg-cyan-500/10 border border-cyan-500/20' : state === 'indeterminate' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-slate-800/40 border border-transparent'
        } ${isMatch ? '' : 'opacity-30'}`}>
          {isFolder && (
            <button 
              onClick={() => toggleFolderExpand(node.id)} 
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}

          {/* Tri-state Checkbox */}
          <button
            onClick={() => handleTreeNodeToggle(node)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              state === 'checked' ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' :
              state === 'indeterminate' ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/20' :
              'border-slate-700 bg-slate-900 hover:border-slate-600'
            }`}
          >
            {state === 'checked' && <Check className="w-4 h-4 stroke-[3] animate-scale-in" />}
            {state === 'indeterminate' && <Minus className="w-4 h-4 stroke-[3] animate-scale-in" />}
          </button>

          <span className="text-sm font-semibold text-slate-200 cursor-pointer flex-1" onClick={() => handleTreeNodeToggle(node)}>
            {node.label}
          </span>

          {isFolder && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
              {getLeafIds(node).filter(id => selectedNodes[id]).length} / {getLeafIds(node).length}
            </span>
          )}
        </div>

        {isFolder && isExpanded && (
          <div className="mt-1 border-l border-slate-800/80 ml-4 space-y-1">
            {node.children!.map(child => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const treeCodeSnippet = `// Tri-State Indeterminate Checkbox Component
interface TriStateCheckboxProps {
  state: 'checked' | 'unchecked' | 'indeterminate';
  onChange: () => void;
  label: string;
}

export const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({ state, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className={\`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all \${
        state === 'checked' ? 'border-cyan-500 bg-cyan-500 text-slate-950' :
        state === 'indeterminate' ? 'border-indigo-500 bg-indigo-500 text-white' :
        'border-slate-700 bg-slate-900'
      }\`}>
        {state === 'checked' && <Check className="w-4 h-4 stroke-[3]" />}
        {state === 'indeterminate' && <Minus className="w-4 h-4 stroke-[3]" />}
      </div>
      <span className="text-slate-200 font-medium">{label}</span>
    </label>
  );
};`;

  // Filter table rows
  const filteredTableRows = tableRows.filter(r => matchesSearch(r.name) || matchesSearch(r.role) || matchesSearch(r.status));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Section Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-2">
          <GitMerge className="w-4 h-4" />
          <span>Tri-State Architecture</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Indeterminate States & Tree Hierarchies
        </h2>
        <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
          Indeterminate checkboxes represent a "partially selected" state. They are essential for nested category trees, permission tables, and bulk actions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Single Tri-state & Table Demo */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Card 1: Single Tri-State Cycle */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
                <span>Tri-State Cycle Demo</span>
              </h3>
              <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                triState === 'checked' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                triState === 'indeterminate' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {triState}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Click the checkbox below to manually cycle through all three states: <strong className="text-slate-200">Unchecked</strong> ➔ <strong className="text-indigo-400">Indeterminate</strong> ➔ <strong className="text-cyan-400">Checked</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-center py-8">
              <button
                onClick={cycleTriState}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer shadow-lg ${
                  triState === 'checked' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-cyan-500/10 scale-105' :
                  triState === 'indeterminate' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-indigo-500/10 scale-105' :
                  'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                  triState === 'checked' ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' :
                  triState === 'indeterminate' ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/20' :
                  'border-slate-700 bg-slate-950'
                }`}>
                  {triState === 'checked' && <Check className="w-5 h-5 stroke-[3] animate-scale-in" />}
                  {triState === 'indeterminate' && <Minus className="w-5 h-5 stroke-[3] animate-scale-in" />}
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-white">Master Consent Switch</div>
                  <div className="text-xs text-slate-400">Cycles 3 distinct operational modes</div>
                </div>
              </button>
            </div>

            {/* Code Copy */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs text-slate-500 font-mono">TriStateCheckbox.tsx</span>
              <button
                onClick={() => handleCopy('tristate', treeCodeSnippet)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  copiedId === 'tristate'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {copiedId === 'tristate' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Snippet</span></>}
              </button>
            </div>
          </div>

          {/* Card 2: Table Bulk Selection Demo */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-lg font-bold text-white">
                Data Table Bulk Selection
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {selectedRowCount} of {tableRows.length} selected
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              The table header checkbox automatically enters an indeterminate state when some, but not all, rows are selected.
            </p>

            {/* Table Container */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60 shadow-inner">
              {/* Table Header */}
              <div className="flex items-center gap-4 px-4 py-3 bg-slate-900/80 border-b border-slate-800 font-semibold text-xs text-slate-400 uppercase tracking-wider">
                <button
                  onClick={toggleTableHeader}
                  className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                    tableHeaderState === 'checked' ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20' :
                    tableHeaderState === 'indeterminate' ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm shadow-indigo-500/20' :
                    'border-slate-700 bg-slate-950 hover:border-slate-600'
                  }`}
                  aria-label="Select All Rows"
                >
                  {tableHeaderState === 'checked' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {tableHeaderState === 'indeterminate' && <Minus className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span className="flex-1">Member Name</span>
                <span className="w-24">Role</span>
                <span className="w-20 text-right">Status</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-800/60">
                {filteredTableRows.map(row => (
                  <div 
                    key={row.id} 
                    onClick={() => toggleTableRow(row.id)}
                    className={`flex items-center gap-4 px-4 py-3 text-sm transition-colors cursor-pointer ${
                      row.selected ? 'bg-cyan-500/5 text-white' : 'hover:bg-slate-900/40 text-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                      row.selected ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {row.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="flex-1 font-medium">{row.name}</span>
                    <span className="w-24 text-xs text-slate-400">{row.role}</span>
                    <span className="w-20 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {row.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Nested Folder Tree */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-6 shadow-xl h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-cyan-400" />
                    <span>Nested Permission Hierarchy</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Automatic bi-directional state propagation
                  </p>
                </div>

                <button
                  onClick={() => {
                    const allLeaves = initialTreeData.flatMap(getLeafIds);
                    const allChecked = allLeaves.every(id => selectedNodes[id]);
                    const newSelected = { ...selectedNodes };
                    allLeaves.forEach(id => { newSelected[id] = !allChecked; });
                    setSelectedNodes(newSelected);
                    if (soundEnabled) playSound(!allChecked ? 'pop' : 'uncheck');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all shadow-sm"
                >
                  Toggle All
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Checking a parent folder automatically selects all child files. Checking only some child files sets the parent folder to an indeterminate state.
              </p>

              {/* Tree View Container */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto shadow-inner space-y-2">
                {initialTreeData.map(rootNode => renderTree(rootNode))}
              </div>
            </div>

            {/* Tree Info Footer */}
            <div className="pt-6 border-t border-slate-800/80 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <div className="text-lg font-extrabold text-cyan-400">
                    {Object.values(selectedNodes).filter(Boolean).length}
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">Checked Leaves</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <div className="text-lg font-extrabold text-indigo-400">
                    {initialTreeData.flatMap(getLeafIds).length}
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">Total Leaves</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                  <div className="text-lg font-extrabold text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">Synced</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Bi-Directional Sync Algorithm</span>
                <button
                  onClick={() => handleCopy('treeCode', treeCodeSnippet)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    copiedId === 'treeCode'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {copiedId === 'treeCode' ? <><CheckCheck className="w-4 h-4" /><span>Copied!</span></> : <><Copy className="w-4 h-4 text-slate-400" /><span>Copy Tree Code</span></>}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
