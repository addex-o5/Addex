import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MasonryGrid from './components/MasonryGrid';
import ImageModal from './components/ImageModal';
import { SkeletonGrid } from './components/Skeleton';
import { fetchImages } from './services/imageService';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchImages(searchQuery, activeCategory);

      // Apply local sorting/filtering based on activeFilter
      let sortedData = [...data];
      if (activeFilter === 'Popular') {
        sortedData.sort(() => 0.5 - Math.random()); // Simple mock: random shuffle but could be by views
      } else if (activeFilter === 'Random') {
        sortedData.sort(() => 0.5 - Math.random());
      }
      // 'Newest' is the default from API usually

      setImages(sortedData);
      setLoading(false);
    };

    const timer = setTimeout(loadImages, searchQuery ? 500 : 0);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, activeFilter]);

  return (
    <div className="flex min-h-screen bg-aurora-dark text-white font-sans selection:bg-aurora-purple/30 selection:text-aurora-electric">
      {/* Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSidebarOpen={setIsSidebarOpen}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="flex-1 px-6 pb-12 max-w-7xl mx-auto w-full">
          {/* Hero / Page Header */}
          <div className="mb-10 mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Discover the <span className="aurora-text-gradient">Aurora</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-lg max-w-2xl"
            >
              A curated collection of visually stunning wallpapers and PFPs inspired by the electric colors of the northern lights.
            </motion.p>
          </div>

          {/* Filters / Stats */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-aurora-electric animate-pulse"></span>
              <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {activeCategory} {searchQuery ? `- "${searchQuery}"` : ''} ({images.length} items)
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setActiveFilter('Newest')}
                className={cn("text-sm font-medium transition-colors", activeFilter === 'Newest' ? "text-aurora-electric" : "text-white/40 hover:text-white")}
              >
                Recent
              </button>
              <button
                onClick={() => setActiveFilter('Popular')}
                className={cn("text-sm font-medium transition-colors", activeFilter === 'Popular' ? "text-aurora-electric" : "text-white/40 hover:text-white")}
              >
                Popular
              </button>
            </div>
          </div>

          {/* Grid Content */}
          {loading ? (
            <SkeletonGrid />
          ) : (
            <MasonryGrid images={images} onImageClick={setSelectedImage} />
          )}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            &copy; 2024 Aurarify. All rights reserved. Built with Aurora magic.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
