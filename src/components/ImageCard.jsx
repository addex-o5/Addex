import React from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, Share2, ZoomIn } from 'lucide-react';
import { downloadImage } from '../services/imageService';

const ImageCard = React.forwardRef(({ image, onClick }, ref) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(image.url, `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(image.url);
    alert('Link copied!');
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(image)}
      className="group relative mb-6 break-inside-avoid rounded-[2rem] overflow-hidden glass-morphism border border-white/5 bg-white/2 cursor-pointer transition-shadow hover:shadow-[0_20px_50px_rgba(138,43,226,0.3)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image.thumbnail}
          alt={image.title}
          loading="lazy"
          className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Subtle inner shadow on hover */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] group-hover:ring-aurora-electric/30 transition-all duration-500" />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button className="p-2.5 bg-white/10 hover:bg-aurora-purple/60 rounded-2xl backdrop-blur-xl border border-white/10 text-white transition-all hover:scale-110 active:scale-90">
                <Heart size={18} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/10 hover:bg-aurora-electric/60 rounded-2xl backdrop-blur-xl border border-white/10 text-white transition-all hover:scale-110 active:scale-90"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2.5 bg-aurora-gradient rounded-2xl text-white transition-all hover:scale-110 active:scale-90 shadow-lg shadow-aurora-purple/20"
              >
                <Download size={18} />
              </button>
            </div>

            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10 text-white/50 group-hover:text-white transition-colors">
              <ZoomIn size={18} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-electric"></span>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{image.category}</span>
            </div>
            <h3 className="text-white font-bold text-xl truncate leading-tight">{image.title}</h3>
            <p className="text-white/60 text-xs font-medium mt-1">by {image.author}</p>
          </div>
        </div>
      </div>

      {/* Category Badge (Always visible, fades out on hover) */}
      <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] font-black text-white/90 uppercase tracking-[0.15em] pointer-events-none group-hover:opacity-0 transition-all duration-300">
        {image.category}
      </div>
    </motion.div>
  );
});

export default ImageCard;
