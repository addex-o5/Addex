import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ExternalLink, User, Tag, Calendar } from 'lucide-react';
import { downloadImage } from '../services/imageService';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(image.url);
    // Could add a toast notification here
    alert('Link copied to clipboard!');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-full bg-aurora-dark/40 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl glass-morphism"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white/70 hover:text-white rounded-full backdrop-blur-md transition-all border border-white/5"
          >
            <X size={24} />
          </button>

          {/* Image Container */}
          <div className="flex-1 relative bg-black/20 flex items-center justify-center overflow-hidden min-h-[300px]">
            <img
              src={image.url}
              alt={image.title}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">{image.title || 'Untitled Artwork'}</h3>
              <div className="flex items-center gap-2 text-aurora-electric/80 font-medium">
                <User size={16} />
                <span>{image.author || 'Unknown Artist'}</span>
              </div>
            </div>

            <div className="space-y-4 py-6 border-y border-white/5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/40">
                  <Tag size={16} />
                  <span>Category</span>
                </div>
                <span className="text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {image.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/40">
                  <Calendar size={16} />
                  <span>Added</span>
                </div>
                <span className="text-white/80">Today</span>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-1 gap-3">
              <button
                onClick={() => downloadImage(image.url, `aurarify-${image.id}.jpg`)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-aurora-gradient text-white font-bold rounded-2xl shadow-lg shadow-aurora-purple/20 hover:shadow-aurora-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download size={20} />
                Download Ultra HD
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-2xl border border-white/10 transition-all"
                >
                  <Share2 size={18} />
                  Share
                </button>
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-2xl border border-white/10 transition-all"
                >
                  <ExternalLink size={18} />
                  Source
                </a>
              </div>
            </div>

            <p className="text-[10px] text-white/20 text-center uppercase tracking-widest mt-4">
              Aurarify Premium • All rights reserved
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
