import React, { useState } from 'react';
import { Search, SlidersHorizontal, Menu, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = ({ searchQuery, setSearchQuery, setIsSidebarOpen }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Newest');

  const filters = ['Newest', 'Popular', 'Most Downloaded'];

  return (
    <header className="sticky top-0 z-30 w-full px-6 py-4 lg:py-6">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl glass-morphism text-white/80 hover:text-white"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-white/40 group-focus-within:text-aurora-purple transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search stunning wallpapers, PFPs, creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-aurora-purple/50 focus:border-aurora-purple/50 transition-all backdrop-blur-md"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-3 rounded-2xl glass-morphism transition-all",
              showFilters ? "text-aurora-electric border-aurora-electric/50" : "text-white/60 hover:text-white hover:border-white/20"
            )}
          >
            <SlidersHorizontal size={20} />
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-3 w-48 glass-morphism rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
              <div className="p-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setShowFilters(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors",
                      activeFilter === filter ? "bg-aurora-purple/20 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {filter}
                    {activeFilter === filter && <Check size={14} className="text-aurora-electric" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-aurora-purple p-0.5">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-full h-full rounded-full bg-aurora-gray"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
