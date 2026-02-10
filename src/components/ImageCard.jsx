import React from 'react';
import { Download, Heart, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { downloadImage } from '../services/imageService';

const ImageCard = ({ image }) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(image.url, `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl glass-card"
    >
      <img
        src={image.thumbnail}
        alt={image.title}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="flex items-center justify-between mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{image.title}</h3>
            <p className="text-white/60 text-sm">by {image.author}</p>
          </div>
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
            <Heart size={18} />
          </button>
        </div>

        <div className="flex gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <button
            onClick={handleDownload}
            className="flex-1 gradient-button py-2.5 flex items-center justify-center gap-2 group/btn"
          >
            <span className="flex items-center gap-2">
              <Download size={18} />
              Download
            </span>
          </button>
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80">
          {image.category}
        </span>
      </div>
    </motion.div>
  );
};

export default ImageCard;
