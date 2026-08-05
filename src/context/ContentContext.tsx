import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  src: string;
  thumbnail: string;
  client: string;
  date: string;
  desc: string;
  aspectClass?: string;
  playAudio?: boolean;
}

export interface ReelItem {
  id: number;
  videoSrc: string;
  title: string;
  views: string;
  description: string;
  sound: string;
}

export interface ContentData {
  logo: {
    src: string;
    text: string;
  };
  hero: {
    title: string;
    subtitle: string;
    videoSrc: string;
  };
  showreel: {
    videoSrc: string;
  };
  portfolio: PortfolioItem[];
  reels: ReelItem[];
}

interface ContentContextType {
  content: ContentData;
  updateContent: (section: keyof ContentData | string[], value: any) => void;
  isAdminMode: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  downloadContentJSON: () => void;
  resetToDefaults: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const defaultContent: ContentData = {
  logo: {
    src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785857534915_IMG_2275.JPG (1).jpeg',
    text: 'VIRALIAM'
  },
  hero: {
    title: 'We Create Content That Builds Brands.',
    subtitle: 'We help businesses dominate social media through premium video production, branding, photography, performance marketing, and creative storytelling.',
    videoSrc: 'https://player.vimeo.com/external/403848749.sd.mp4?s=d0db5d51829e5a88c3a164b155f93539e0836528&profile_id=165&oauth2_token_id=57447761'
  },
  showreel: {
    videoSrc: 'https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761'
  },
  portfolio: [
    {
      id: '45',
      title: 'Cinematic Wedding Story',
      category: 'Commercials',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785948603343_lv_0_20260805152256.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785948645095_Screenshot 2026-08-05 221919.png',
      client: 'Nova Motors',
      date: 'March 2026',
      desc: 'Transform your space with timeless elegance and modern luxury. ✨',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '42',
      title: 'Luxury Interior Showcase',
      category: 'Commercials',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785943174054_lv_0_20260805142440.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785943393453_Screenshot 2026-08-05 205208.png',
      client: 'Nova Motors',
      date: 'March 2026',
      desc: 'Transform your space with timeless elegance and modern luxury. ✨',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '65',
      title: 'Luxury Interior Showcase',
      category: 'Commercials',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785948059307_lv_0_20260805143610.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785948077364_Screenshot%202026-08-05%20221059.png',
      client: 'Nova Motors',
      date: 'March 2026',
      desc: 'Transform your space with timeless elegance and modern luxury. ✨',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '173350159',
      title: 'Premium Snooker Store ',
      category: 'Commercials',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785947773220_copy_0134D9F7-F3EF-4E09-9810-8CB56E992EB7.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785947788155_pool-table-with-stick%20(2).jpg',
      client: 'Unknown',
      date: 'Jul 2026',
      desc: 'New Car Delivery Showcase ',
      playAudio: true,
      aspectClass: 'aspect-[16/9]'
      },
  {
    id: '1785073350159',
    title: 'Cinematic Gym ',
    category: 'Reels',
    type: 'video',
    src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785946028724_lv_0_20260805200516.mp4',
    thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785945956508_Screenshot 2026-08-05 213352.png',
    client: 'Unknown',
    date: 'Jul 2026',
    desc: 'New Car Delivery Showcase ',
    playAudio: true,
    aspectClass: 'aspect-[3/4]'
    },
    {
      id: '1785073330159',
      title: 'New Car Delivery Showcase ',
      category: 'Reels',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785946764817_copy_C1F63C7C-2ACB-4225-BB35-5C67BD5774F2.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785946827411_Screenshot%202026-08-05%20215013.png',
      client: 'Unknown',
      date: 'Jul 2026',
      desc: 'Cinematic Gym ',
      playAudio: true,
      aspectClass: 'aspect-[3/4]'
    },
  // {
  //   id: '1785073330159',
  //   title: 'Cinematic Gym ',
  //   category: 'Reels',
  //   type: 'video',
  //   src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785946028724_lv_0_20260805200516.mp4',
  //   thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785945956508_Screenshot 2026-08-05 213352.png',
  //   client: 'Unknown',
  //   date: 'Jul 2026',
  //   desc: 'Cinematic Gym ',
  //   playAudio: true,
  //   aspectClass: 'aspect-[3/4]'
  // },
  {
    id: '1785072130159',
    title: 'New Car Delivery Showcase ',
    category: 'Reels',
    type: 'video',
    src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785405366523_reel_bb115adc.mp4',
    thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785405320271_New%20Project%203%20[B9F1BD2].png',
    client: 'Unknown',
    date: 'Jul 2026',
    desc: 'New Car Delivery Showcase ',
    playAudio: true,
    aspectClass: 'aspect-[3/4]'
  },
  {
      id: '1785072132459',
      title: 'New Car Delivery Showcase ',
      category: 'Reels',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785405234340_reel_3cfed5cf.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785405835753_New%20Project%203%20[5F18232].png',
      client: 'Unknown',
      date: 'Jul 2026',
      desc: 'New Car Delivery Showcase ',
      playAudio: true,
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '1785072130459',
      title: 'New Car Delivery Showcase ',
      category: 'Reels',
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785075974483_0724(1).mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785072929844_Screenshot 2026-07-26 190448.png',
      client: 'Prg Cars',
      date: 'Jul 2026',
      desc: 'New Car Delivery Showcase ',
      playAudio: true,
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '1785072130450',
      title: 'New Car Delivery Showcase ',
      category: 'Reels',
      playAudio: true,
      type: 'video',
      src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785075819520_05.mp4',
      thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785072929844_Screenshot 2026-07-26 190448.png',
      client: 'Prg Cars',
      date: 'Jul 2026',
      desc: 'New Car Delivery Showcase ',
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '1',
      title: 'Aura Luxury Perfume',
      category: 'Product Videos',
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      client: 'Aura Paris',
      date: 'April 2026',
      desc: 'A sensory commercial film showcasing the luxury glass design and gold mist notes of Aura Perfume. Shot on RED V-Raptor.',
      aspectClass: 'aspect-[3/4]'
    },
    {
      id: '2',
      title: 'Chronos Timepiece Campaign',
      category: 'Brand Ads',
      type: 'video',
      src: 'https://player.vimeo.com/external/403848749.sd.mp4?s=d0db5d51829e5a88c3a164b155f93539e0836528&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      client: 'Chronos Watches',
      date: 'June 2026',
      desc: 'Cinematic brand film for premium chronographs. Focused on water resistance, macro detail shots, and ticking precision.',
      aspectClass: 'aspect-[16/9]'
    },
    {
      id: '3',
      title: 'Solstice Summer Fashion',
      category: 'Photography',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      client: 'Solstice Label',
      date: 'May 2026',
      desc: 'High-fashion editorial campaign captured in desert sunlight. Warm filters, heavy shadows, and linen textures.',
      aspectClass: 'aspect-[3/4]'
    },

    // {
    //   id: '12',
    //   title: 'Luxury Interior Showcase',
    //   category: 'Commercials',
    //   type: 'video',
    //   src: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785943876994_lv_0_20260805200821.mp4',
    //   thumbnail: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785945677027_Screenshot 2026-08-05 213053.png',
    //   client: 'Nova Motors',
    //   date: 'March 2026',
    //   desc: 'Transform your space with timeless elegance and modern luxury. ✨',
    //   aspectClass: 'aspect-[16/9]'
    // },
    {
      id: '5',
      title: 'Pulse Neon Rap Video',
      category: 'Music Videos',
      type: 'video',
      src: 'https://player.vimeo.com/external/554839818.sd.mp4?s=d7e63b6b19a16f91f7c223c6cd631e8b2b95c37c&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      client: 'Yung Pulse',
      date: 'January 2026',
      desc: 'A futuristic cyber-rap music video featuring rapid transition editing, glitch effects, neon lasers, and high-contrast grading.',
      aspectClass: 'aspect-[16/9]'
    },

    // {
    //   id: '6',
    //   title: 'Infinite Urban Reel',
    //   category: 'Reels',
    //   type: 'video',
    //   src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d90d965d50972413e9a03b3&profile_id=139&oauth2_token_id=57447761',
    //   thumbnail: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=600&q=80',
    //   client: 'Self Project',
    //   date: 'February 2026',
    //   desc: 'Fast-paced urban cinematography showcasing street life, skateboarding, and transitions suited for reels and shorts.',
    //   aspectClass: 'aspect-[3/4]'
    // }
  ],
  reels: [
    {
      id: 1,
      videoSrc: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785858707737_02 (2).mp4',
      title: 'Grow With Viraliam',
      views: '1.2M views',
      description: 'Every successful business deserves a powerful digital presence. At Viraliam, we help brands grow through innovative marketing strategies, engaging content, and cutting-edge technology solutions.',
      sound: 'Original Audio - Viraliam Music'
    },
    {
      id: 2,
      videoSrc: 'https://viraliam.s3.ap-south-1.amazonaws.com/1785859134230_01.mp4',
      title: 'Create Brand Impact ✨',
      views: '840K views',
      description: 'At Viraliam, we transform ideas into engaging digital experiences that help businesses grow, connect with their audience, and leave a lasting impression.',
      sound: 'Ambient Soundscape - Chronos'
    },
    {
      id: 3,
      videoSrc: 'https://player.vimeo.com/external/517617478.sd.mp4?s=74f4b9f271efd36f2f3d9d71fa9d1c1c1f4e1f72&profile_id=165&oauth2_token_id=57447761',
      title: 'Automotive Aero Glide',
      views: '2.4M views',
      description: 'Track-gimbal tracking shot showing luxury EV corner drifting. Custom engine sound overlays.',
      sound: 'Original Audio - Nova Supercar'
    }
  ]
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('viraliam_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    localStorage.setItem('viraliam_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return sessionStorage.getItem('viraliam_admin_session') === 'active' ||
           window.location.hash === '#admin' ||
           window.location.search.includes('admin=true');
  });

  const [content, setContent] = useState<ContentData>(() => {
    const saved = localStorage.getItem('viraliam_content');
    const isAdminActive = sessionStorage.getItem('viraliam_admin_session') === 'active' ||
                          window.location.hash === '#admin' ||
                          window.location.search.includes('admin=true');
    if (isAdminActive && saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing content', e);
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    if (isAdminMode) {
      localStorage.setItem('viraliam_content', JSON.stringify(content));
    }
  }, [content, isAdminMode]);

  // Sync hash/search query changes
  useEffect(() => {
    const handleUrlCheck = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminMode(true);
        sessionStorage.setItem('viraliam_admin_session', 'active');
        const saved = localStorage.getItem('viraliam_content');
        if (saved) {
          try {
            setContent(JSON.parse(saved));
          } catch (e) {}
        }
      }
    };
    window.addEventListener('hashchange', handleUrlCheck);
    return () => window.removeEventListener('hashchange', handleUrlCheck);
  }, []);

  const updateContent = (section: keyof ContentData | string[], value: any) => {
    setContent((prev) => {
      const next = { ...prev };
      if (Array.isArray(section)) {
        // Deep update
        let current: any = next;
        for (let i = 0; i < section.length - 1; i++) {
          current[section[i]] = { ...current[section[i]] };
          current = current[section[i]];
        }
        current[section[section.length - 1]] = value;
      } else {
        // Flat update
        (next as any)[section] = value;
      }
      return next;
    });
  };

  const login = (password: string): boolean => {
    if (password === 'viraliam2026') {
      setIsAdminMode(true);
      sessionStorage.setItem('viraliam_admin_session', 'active');
      const saved = localStorage.getItem('viraliam_content');
      if (saved) {
        try {
          setContent(JSON.parse(saved));
        } catch (e) {}
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminMode(false);
    sessionStorage.removeItem('viraliam_admin_session');
    localStorage.removeItem('viraliam_content');
    setContent(defaultContent);
    // Clear URL hash
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const downloadContentJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'contentData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to discard your browser local cache edits and sync the latest data configuration from the source code?')) {
      setContent(defaultContent);
      localStorage.removeItem('viraliam_content');
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      isAdminMode,
      login,
      logout,
      downloadContentJSON,
      resetToDefaults,
      theme,
      toggleTheme
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
