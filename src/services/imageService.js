import axios from 'axios';

// Note: In a real app, these would be in environment variables
const UNSPLASH_ACCESS_KEY = ''; // Add your key here
const PEXELS_API_KEY = '';      // Add your key here

const FALLBACK_IMAGES = [
  {
    id: 'f1',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=60&w=500',
    title: 'Starry Night Aurora',
    author: 'Vincentiu Solomon',
    category: 'Wallpapers',
    downloadUrl: 'https://unsplash.com/photos/ln5drpv_ImI/download?force=true'
  },
  {
    id: 'f2',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=60&w=500',
    title: 'Cyberpunk City',
    author: 'Aurarify Curated',
    category: 'Fiction',
    downloadUrl: 'https://unsplash.com/photos/cyberpunk'
  },
  {
    id: 'f3',
    url: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=60&w=500',
    title: 'Abstract Neon',
    author: 'Aurarify Curated',
    category: 'Abstract',
    downloadUrl: 'https://unsplash.com/photos/abstract'
  },
  {
    id: 'f4',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=500',
    title: 'Portrait Glow',
    author: 'Aurarify Curated',
    category: 'PFPs',
    downloadUrl: 'https://unsplash.com/photos/portrait'
  },
  {
    id: 'f5',
    url: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=1000',
    thumbnail: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=60&w=500',
    title: 'Electric Purple',
    author: 'Aurarify Curated',
    category: 'Anime',
    downloadUrl: 'https://unsplash.com/photos/anime'
  },
];

const PROXY_URL = 'https://api.allorigins.win/get?url=';

const fetchWallhaven = async (query, category) => {
  try {
    let q = query || '';
    if (!q) {
      if (category === 'Anime') q = 'anime aesthetic';
      else if (category === 'Fiction') q = 'fantasy sci-fi';
      else if (category === 'PFPs') q = 'portrait avatar';
      else if (category === 'Wallpapers') q = 'wallpaper 4k';
      else q = 'landscape aurora';
    }

    const targetUrl = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(q)}&categories=111&purity=100&sorting=random`;
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`, { timeout: 8000 });

    if (!response.data || !response.data.contents) return [];
    const data = JSON.parse(response.data.contents);
    if (!data.data) return [];

    return data.data.map(img => ({
      id: `wh-${img.id}`,
      url: img.path,
      thumbnail: img.thumbs.large,
      title: `${category} ${img.id}`,
      author: 'Wallhaven User',
      category: category === 'All' ? 'Wallpapers' : category,
      downloadUrl: img.path
    }));
  } catch (error) {
    console.error('Wallhaven fetch failed:', error);
    return [];
  }
};

const fetchUnsplash = async (query) => {
  if (!UNSPLASH_ACCESS_KEY) return [];
  try {
    const targetUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`, { timeout: 8000 });
    const data = JSON.parse(response.data.contents);
    return (data.results || []).map(img => ({
      id: `us-${img.id}`,
      url: img.urls.regular,
      thumbnail: img.urls.small,
      title: img.description || img.alt_description || 'Unsplash Image',
      author: img.user.name,
      category: 'Unsplash',
      downloadUrl: img.links.download
    }));
  } catch (e) { return []; }
};

const fetchPexels = async (query) => {
  if (!PEXELS_API_KEY) return [];
  try {
    const targetUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20`;
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`, {
      headers: { 'Authorization': PEXELS_API_KEY },
      timeout: 8000
    });
    const data = JSON.parse(response.data.contents);
    return (data.photos || []).map(img => ({
      id: `px-${img.id}`,
      url: img.src.large2x,
      thumbnail: img.src.medium,
      title: 'Pexels Image',
      author: img.photographer,
      category: 'Pexels',
      downloadUrl: img.src.original
    }));
  } catch (e) { return []; }
};

const fetchNekos = async () => {
  try {
    const targetUrl = 'https://api.nekosapi.com/v4/images/random?limit=20&rating=safe';
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`, { timeout: 8000 });

    if (!response.data || !response.data.contents) return [];
    const data = JSON.parse(response.data.contents);

    // Some versions of the API return an array directly, others return an object with items
    const items = data.items || data;

    return items.map(img => ({
      id: `nk-${img.id}`,
      url: img.url,
      thumbnail: img.url,
      title: 'Anime Character',
      author: img.artist_name || 'Anime Artist',
      category: 'Anime',
      downloadUrl: img.url
    }));
  } catch (error) {
    console.error('Nekos fetch failed:', error);
    return [];
  }
};

export const fetchImages = async (query = '', category = 'All') => {
  try {
    let results = [];

    // Add "Pinterest" to query if it's broad to find that aesthetic
    let searchQuery = query;
    if (query.toLowerCase().includes('pinterest')) {
      searchQuery = query.replace(/pinterest/gi, '').trim() + ' aesthetic moodboard';
    } else if (!query && category === 'All') {
      searchQuery = 'pinterest aesthetic';
    }

    // Route to APIs
    const apis = [fetchWallhaven(searchQuery, category)];
    if (category === 'Anime') apis.push(fetchNekos());
    if (UNSPLASH_ACCESS_KEY) apis.push(fetchUnsplash(searchQuery));
    if (PEXELS_API_KEY) apis.push(fetchPexels(searchQuery));

    const allResults = await Promise.all(apis);
    results = allResults.flat();

    // Specific category adjustments if needed
    if (category === 'PFPs' && results.length > 0) {
      // already handled by query expansion in fetchWallhaven if query was empty
    }

    if (results.length === 0) {
      let filtered = [...FALLBACK_IMAGES];
      if (category !== 'All') {
        filtered = filtered.filter(img => img.category === category);
      }
      return filtered;
    }

    return results;
  } catch (error) {
    console.error('Error in fetchImages:', error);
    return FALLBACK_IMAGES;
  }
};

export const downloadImage = async (url, filename) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'aurarify-image.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download failed:', error);
    window.open(url, '_blank');
  }
};
