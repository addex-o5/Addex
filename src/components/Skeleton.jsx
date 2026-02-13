import React from 'react';

const Skeleton = () => {
  return (
    <div className="w-full h-64 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
  );
};

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
