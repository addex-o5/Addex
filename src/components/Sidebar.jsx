import React from 'react';
import { Layout, Image, Palmtree, Ghost, Sparkles, Sword, Play, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const categories = [
  { name: 'All', icon: Layout },
  { name: 'Wallpapers', icon: Sparkles },
  { name: 'PFPs', icon: Image },
  { name: 'Anime', icon: Play },
  { name: 'Fiction', icon: Sword },
  { name: 'Nature', icon: Palmtree },
  { name: 'Abstract', icon: Ghost },
];

const Sidebar = ({ activeCategory, setActiveCategory, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-screen w-64 glass-morphism z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-aurora-gradient rounded-xl flex items-center justify-center shadow-lg shadow-aurora-purple/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold aurora-text-gradient">Aurarify</h1>
          </div>

          <nav className="space-y-2">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 px-4">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeCategory === cat.name
                    ? "bg-aurora-purple/20 text-aurora-electric border border-aurora-purple/30"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <cat.icon size={20} className={cn(
                  "transition-colors",
                  activeCategory === cat.name ? "text-aurora-electric" : "group-hover:text-aurora-purple"
                )} />
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="p-4 rounded-2xl bg-aurora-gradient/10 border border-aurora-purple/20">
            <p className="text-sm font-medium text-white/80">Premium Access</p>
            <p className="text-xs text-white/40 mb-3">Get 4K Aurora wallpapers</p>
            <button className="w-full py-2 bg-aurora-purple hover:bg-aurora-purple/80 text-white text-xs font-bold rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
