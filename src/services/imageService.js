import axios from 'axios';

// Note: In a real app, these would be in environment variables
const UNSPLASH_ACCESS_KEY = '';
const PEXELS_API_KEY = '';

const FALLBACK_IMAGES = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=60&w=500',
    title: 'Starry Night Aurora',
    author: 'Vincentiu Solomon',
    category: 'Wallpapers',
    downloadUrl: 'https://unsplash.com/photos/ln5drpv_ImI/download?force=true'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=500',
    title: 'Mountain Range',
    author: 'Daniel J. Schwarz',
    category: 'Nature',
    downloadUrl: 'https://unsplash.com/photos/q9_9Yy_i5E/download?force=true'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=60&w=500',
    title: 'Abstract Gradient',
    author: 'Alexander Shatov',
    category: 'Abstract',
    downloadUrl: 'https://unsplash.com/photos/JL_ka_4S_iU/download?force=true'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=60&w=500',
    title: 'Purple Mist',
    author: 'Simeon Muller',
    category: 'PFPs',
    downloadUrl: 'https://unsplash.com/photos/v9vv_13G_o/download?force=true'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=60&w=500',
    title: 'Aurora Borealis',
    author: 'Tobias Bjørkli',
    category: 'Wallpapers',
    downloadUrl: 'https://unsplash.com/photos/z7Xon0jV_bI/download?force=true'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=60&w=500',
    title: 'Cyberpunk Aesthetic',
    author: 'Javier Miranda',
    category: 'Abstract',
    downloadUrl: 'https://unsplash.com/photos/fIq0tET6llw/download?force=true'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=60&w=500',
    title: 'Cute Cat PFP',
    author: 'Manja Vitolic',
    category: 'PFPs',
    downloadUrl: 'https://unsplash.com/photos/gKXKBY-C-Dk/download?force=true'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=60&w=500',
    title: 'Deep Space',
    author: 'NASA',
    category: 'Nature',
    downloadUrl: 'https://unsplash.com/photos/ln5drpv_ImI/download?force=true'
  },
];

export const fetchImages = async (query = '', category = 'All') => {
  try {
    // If API keys are provided, fetch from real APIs
    if (UNSPLASH_ACCESS_KEY || PEXELS_API_KEY) {
      let results = [];

      if (UNSPLASH_ACCESS_KEY) {
        const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: query || category || 'aurora', per_page: 20 },
          headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });
        results = [...results, ...unsplashRes.data.results.map(img => ({
          id: `un-${img.id}`,
          url: img.urls.regular,
          thumbnail: img.urls.small,
          title: img.description || img.alt_description || 'Untitled',
          author: img.user.name,
          category: category !== 'All' ? category : 'General',
          downloadUrl: img.links.download_location
        }))];
      }

      if (PEXELS_API_KEY) {
        const pexelsRes = await axios.get('https://api.pexels.com/v1/search', {
          params: { query: query || category || 'aurora', per_page: 20 },
          headers: { Authorization: PEXELS_API_KEY }
        });
        results = [...results, ...pexelsRes.data.photos.map(img => ({
          id: `px-${img.id}`,
          url: img.src.large2x,
          thumbnail: img.src.medium,
          title: img.alt || 'Untitled',
          author: img.photographer,
          category: category !== 'All' ? category : 'General',
          downloadUrl: img.src.original
        }))];
      }

      return results;
    }

    // Fallback logic
    let filtered = [...FALLBACK_IMAGES];
    if (category !== 'All') {
      filtered = filtered.filter(img => img.category === category);
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(q) ||
        img.category.toLowerCase().includes(q) ||
        img.author.toLowerCase().includes(q)
      );
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    return filtered;
  } catch (error) {
    console.error('Error fetching images:', error);
    return FALLBACK_IMAGES;
  }
};

export const downloadImage = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'aurarify-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    window.open(url, '_blank');
  }
};
