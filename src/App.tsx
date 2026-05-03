import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, 
  MousePointer2, 
  Square, 
  Circle, 
  Eraser, 
  Pencil, 
  Move, 
  Crop, 
  Layers, 
  Settings, 
  Share2, 
  Menu, 
  Search, 
  Bell,
  ChevronDown,
  X,
  Plus,
  Eye,
  Lock,
  History,
  Palette,
  Trash2,
  Monitor,
  Maximize2,
  Gamepad2
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Sub-components ---

const TopNav = () => (
  <nav className="h-10 sm:h-12 bg-[#252525] border-b border-[#111] flex items-center justify-between px-3 text-xs select-none z-50">
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-[10px] sm:text-xs">PS</div>
      <div className="hidden md:flex gap-3 text-gray-300">
        <span className="hover:text-white cursor-pointer transition-colors">File</span>
        <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
        <span className="hover:text-white cursor-pointer transition-colors">Image</span>
        <span className="hover:text-white cursor-pointer transition-colors">View</span>
        <span className="hover:text-white cursor-pointer transition-colors">Help</span>
      </div>
      <div className="md:hidden">
        <Menu size={20} className="text-gray-400" />
      </div>
    </div>
    <div className="flex-1 flex justify-center px-4 overflow-hidden">
       <span className="text-gray-500 text-[9px] sm:text-[10px] tracking-widest font-mono truncate">CLOUDPHOTO_PROJECT_01.PSD @ 66.7%</span>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="hidden sm:flex items-center gap-2 text-gray-400 bg-[#333] px-2 py-0.5 rounded border border-[#444] transition-all focus-within:border-blue-500/50">
        <Search size={14} />
        <span className="hidden lg:inline">Search...</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Share2 size={16} className="text-gray-400 hover:text-white cursor-pointer" />
        <div className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1 rounded cursor-pointer font-medium transition-colors text-[10px] sm:text-xs">Share</div>
      </div>
    </div>
  </nav>
);

const Toolbar = ({ activeTool, setActiveTool }: { activeTool: string, setActiveTool: (t: string) => void }) => {
  const tools = [
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'crop', icon: Crop, label: 'Crop' },
    { id: 'shape', icon: Square, label: 'Rect' },
    { id: 'pencil', icon: Pencil, label: 'Draw' },
    { id: 'type', icon: Type, label: 'Text' },
  ];

  return (
    <>
      {/* Desktop Sidebar Toolbar */}
      <div className="hidden sm:flex w-12 bg-[#2b2b2b] border-r border-[#111] flex-col items-center py-4 gap-4 flex-shrink-0">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`p-2 rounded-lg transition-all relative group ${
              activeTool === tool.id 
                ? 'bg-[#3d3d3d] text-blue-400 border border-[#444] shadow-inner' 
                : 'text-gray-400 hover:text-white hover:bg-[#333]'
            }`}
          >
            <tool.icon size={20} />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap hidden sm:block">
              {tool.label}
            </div>
          </button>
        ))}
        <div className="mt-auto flex flex-col items-center gap-4 pb-2">
          <Palette size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#252525] border-t border-[#111] flex items-center justify-around px-2 z-[60] pb-2">
         {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg gap-1 transition-all ${
              activeTool === tool.id 
                ? 'text-blue-400' 
                : 'text-gray-500'
            }`}
          >
            <tool.icon size={18} />
            <span className="text-[9px] font-medium">{tool.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

const Inspector = () => {
  const [layers, setLayers] = useState([
    { id: 1, name: 'Text Overlay', type: 'type', visible: true, locked: false },
    { id: 2, name: 'Background Image', type: 'image', visible: true, locked: true },
    { id: 3, name: 'Gradient Fill', type: 'shape', visible: false, locked: false },
    { id: 4, name: 'Base layer', type: 'image', visible: true, locked: false },
  ]);

  const toggleVisibility = (id: number) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  return (
    <div className="w-72 bg-[#2b2b2b] border-l border-[#111] flex flex-col h-full text-xs flex-shrink-0 hidden lg:flex">
      <div className="flex h-10 border-b border-[#111] bg-[#252525] flex-shrink-0">
        <div className="flex-1 flex items-center justify-center border-b-2 border-blue-500 text-white font-medium">Color</div>
        <div className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-300 cursor-pointer">Swatches</div>
        <div className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-300 cursor-pointer">Gradients</div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Color Picker Simulation */}
        <div className="space-y-2">
          <div className="aspect-square bg-gradient-to-tr from-black via-red-500 to-white rounded-sm border border-[#111] relative cursor-crosshair">
             <div className="absolute top-1/4 left-1/2 w-2 h-2 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-violet-500 rounded-sm"></div>
            <div className="w-6 h-6 bg-[#212121] border border-[#111]"></div>
          </div>
        </div>

        {/* Properties */}
        <div className="space-y-3 pt-4 border-t border-[#3d3d3d]">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">Properties</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-medium">Width</label>
              <div className="bg-[#1a1a1a] p-1.5 rounded border border-[#3d3d3d] text-gray-200 focus-within:border-blue-500/50">1920 px</div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-medium">Height</label>
              <div className="bg-[#1a1a1a] p-1.5 rounded border border-[#3d3d3d] text-gray-200 focus-within:border-blue-500/50">1080 px</div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-medium">Fill</label>
            <div className="flex items-center gap-2 bg-[#1a1a1a] p-1.5 rounded border border-[#3d3d3d]">
              <div className="w-3 h-3 bg-white border border-gray-600"></div>
              <span className="text-gray-200 font-mono">#FFFFFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layers Panel */}
      <div className="flex-1 flex flex-col border-t border-[#3d3d3d] min-h-0">
        <div className="flex h-10 border-b border-[#111] bg-[#252525] flex-shrink-0">
          <div className="flex-1 flex items-center justify-center border-b-2 border-blue-500 text-white font-medium">Layers</div>
          <div className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-300 cursor-pointer">Channels</div>
          <div className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-300 cursor-pointer">Paths</div>
        </div>
        
        <div className="flex items-center gap-2 p-2 bg-[#252525] border-b border-[#111]">
          <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#3d3d3d] text-[10px] cursor-pointer hover:bg-[#333]">
             Kind <ChevronDown size={10} />
          </div>
          <div className="flex-1 h-px bg-[#3d3d3d] mx-2"></div>
          <Lock size={12} className="text-gray-500" />
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {layers.map((layer) => (
            <div 
              key={layer.id} 
              className={`flex items-center gap-2 p-1.5 hover:bg-[#3d3d3d] rounded group cursor-pointer transition-colors ${!layer.visible ? 'opacity-50' : ''}`}
            >
              <div className="w-4 flex justify-center" onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}>
                {layer.visible ? <Eye size={12} className="text-gray-400 group-hover:text-blue-400" /> : <div className="w-3 h-3 border border-[#444] rounded-sm" />}
              </div>
              <div className="w-6 h-6 bg-[#1a1a1a] border border-[#3d3d3d] rounded-sm flex items-center justify-center">
                {layer.type === 'type' && <Type size={10} />}
                {layer.type === 'shape' && <Square size={10} />}
                {layer.type === 'image' && <Monitor size={10} />}
              </div>
              <span className={`flex-1 truncate ${layer.locked ? 'text-gray-500 italic' : 'text-gray-300'}`}>{layer.name}</span>
              {layer.locked && <Lock size={10} className="text-gray-600" />}
            </div>
          ))}
        </div>

        <div className="h-10 bg-[#252525] border-t border-[#111] flex items-center justify-between px-4 text-gray-400 flex-shrink-0">
          <Trash2 size={16} className="hover:text-red-400 cursor-pointer transition-colors" />
          <div className="flex gap-4 items-center">
             <Plus size={16} className="hover:text-white cursor-pointer transition-colors" />
             <Layers size={16} className="hover:text-white cursor-pointer transition-colors" />
             <Square className="size-4 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatOverlay = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'CurlyFries471', text: 'HI SAMME', color: '#ff4444' },
    { id: 2, user: 'sydniflyer', text: 'Yooooo we got a raid', color: '#44ff44' },
    { id: 3, user: 'p_animations', text: 'HI YT', color: '#4444ff' },
    { id: 4, user: 'samme', text: 'is that a part 2? the experience back', color: '#ffaa00' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Fan_#1', 'CodeMaster', 'GamerX', 'PhotoshopGod', 'StreamLover', 'CreativeMind', 'PixelArt'];
      const texts = ['PogChamp!', 'This looks insane', 'How did you do that?', 'Which tool is that?', 'LUL', 'Great stream!', 'Love the layers', 'Subscribed!'];
      const newUser = users[Math.floor(Math.random() * users.length)];
      setMessages(prev => [...prev.slice(-12), { 
        id: Date.now(), 
        user: newUser, 
        text: texts[Math.floor(Math.random() * texts.length)],
        color: `hsl(${Math.random() * 360}, 70%, 65%)`
      }]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 w-64 max-h-[340px] flex flex-col gap-1.5 pointer-events-none overflow-hidden select-none z-50">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-start gap-2 bg-black/50 backdrop-blur-md p-2 rounded-lg text-xs border border-white/5 shadow-lg"
          >
            <span style={{ color: msg.color }} className="font-bold whitespace-nowrap">{msg.user}:</span>
            <span className="text-white font-medium drop-shadow-md">{msg.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const StreamerCam = () => {
  return (
    <motion.div 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.02 }}
      className="fixed bottom-6 left-6 w-64 h-44 bg-black rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl custom-shadow group cursor-move z-50"
    >
      <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center">
        <div className="relative w-full h-full overflow-hidden bg-[#222]">
           <img 
             src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600" 
             alt="Streamer" 
             className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105 duration-700"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           
           <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-red-600/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold border border-red-500/50">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              LIVE
           </div>

           <div className="absolute top-2 left-2 flex items-center gap-1.5 text-white/70 text-[9px]">
              <Gamepad2 size={12} />
              <span>Creative / Art</span>
           </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Maximize2 size={14} className="text-white/50 cursor-pointer hover:text-white" />
        <Move size={14} className="text-white/50" />
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTool, setActiveTool] = useState('move');
  const [zoom, setZoom] = useState(66.7);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-200 bg-[#121212]">
      <TopNav />
      
      {/* Sub-header / Options Bar */}
      <div className="hidden sm:flex h-8 bg-[#2b2b2b] border-b border-[#111] items-center px-4 gap-6 text-[11px] text-gray-400 flex-shrink-0 select-none">
        <div className="flex items-center gap-2">
           <span className="font-medium">Mode:</span>
           <div className="bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#3d3d3d] flex items-center gap-1 text-gray-200 cursor-pointer hover:bg-[#333]">
              Normal <ChevronDown size={10} />
           </div>
        </div>
        <div className="h-4 w-px bg-[#3d3d3d]"></div>
        <div className="flex items-center gap-2">
           <span className="font-medium">Opacity:</span>
           <div className="bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#3d3d3d] text-gray-200 w-12 text-center">100%</div>
        </div>
        <div className="h-4 w-px bg-[#3d3d3d]"></div>
        <label className="flex items-center gap-2 cursor-pointer hover:text-gray-100 transition-colors">
           <input type="checkbox" className="rounded-sm bg-[#1a1a1a] border-[#3d3d3d]" defaultChecked />
           <span>Anti-alias</span>
        </label>
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-100 transition-colors">
           <input type="checkbox" className="rounded-sm bg-[#1a1a1a] border-[#3d3d3d]" defaultChecked />
           <span>Sample All Layers</span>
        </div>
      </div>

      <main className="flex flex-1 overflow-hidden relative">
        <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        
        {/* Canvas Area */}
        <div className="flex-1 bg-[#1a1a1a] relative flex items-center justify-center overflow-auto p-12 sm:p-40 pb-20 sm:pb-40">
           {/* Checkerboard background simulation */}
           <div 
             className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)`,
               backgroundSize: '20px 20px'
             }}
           ></div>

           <motion.div 
             className="bg-white shadow-2xl relative flex-shrink-0"
             style={{ 
               width: 'min(90vw, 1000px)', 
               height: 'min(50vh, 600px)',
               scale: zoom / 100
             }}
             layoutId="canvas"
             transition={{ type: "spring", damping: 20, stiffness: 100 }}
           >
              {/* Actual Canvas or placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                 <div className="p-6 sm:p-12 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center gap-4 sm:gap-6 animate-pulse text-center">
                    <History size={48} className="text-gray-50 flex-shrink-0" />
                    <span className="text-gray-200 font-medium font-sans text-sm sm:text-lg lg:text-xl uppercase tracking-widest px-4">Workspace Initialized</span>
                 </div>
              </div>
           </motion.div>

           {/* Zoom indicator */}
           <div className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 bg-[#2b2b2b]/95 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10 text-[11px] text-gray-400 select-none z-20 shadow-2xl">
              <button 
                onClick={() => setZoom(z => Math.max(10, z - 10))}
                className="hover:text-white transition-colors p-1"
              >-</button>
              <span className="font-mono text-gray-200 w-12 text-center">{zoom.toFixed(1)}%</span>
              <button 
                onClick={() => setZoom(z => Math.min(400, z + 10))}
                className="hover:text-white transition-colors p-1"
              >+</button>
           </div>
        </div>

        <Inspector />

        {/* Overlays - Repositioned for mobile */}
        <div className="hidden sm:block">
          <StreamerCam />
          <ChatOverlay />
        </div>
                
        {/* Floating Tooltips or Status */}
        <div className="hidden sm:block absolute top-4 left-64 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] pointer-events-none select-none z-10">
           Canvas Area (Centered)
        </div>
      </main>

      {/* Footer / Status Bar - Hidden on small mobile */}
      <footer className="hidden sm:flex h-6 bg-blue-600 border-t border-blue-700 items-center px-4 justify-between text-[10px] text-white flex-shrink-0 z-50">
        <div className="flex items-center gap-6 font-medium">
           <span className="flex items-center gap-1"><Settings size={10} /> System: Online</span>
           <span>Doc: 3.29M / 3.29M</span>
           <span className="opacity-80">GPU Acceleration: On</span>
        </div>
        <div className="flex gap-6 font-medium">
           <span>1920 x 1080 (72 ppi)</span>
           <span>sRGB IEC61966-2.1</span>
        </div>
      </footer>
    </div>
  );
}
