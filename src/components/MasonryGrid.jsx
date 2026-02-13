import React from 'react';
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard';
import { AnimatePresence } from 'framer-motion';

const MasonryGrid = ({ images, onImageClick }) => {
  const breakpointColumnsObj = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 2,
    640: 1
  };

  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <AnimatePresence mode='popLayout'>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={onImageClick}
            />
          ))}
        </AnimatePresence>
      </Masonry>

      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/40">
          <p className="text-xl font-medium mb-2">No results found</p>
          <p>Try searching for something else or change category</p>
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;
