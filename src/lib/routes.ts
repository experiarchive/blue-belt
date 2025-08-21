import type { Route } from '../types';

// 한글 지역명을 영문 슬러그로 매핑
const AREA_MAPPING: Record<string, string> = {
  '명동': 'myeongdong',
  '홍대': 'hongdae', 
  '강남': 'gangnam',
  '서울역': 'seoul-station',
  '동대문': 'dongdaemun',
  '잠실': 'jamsil',
  '인천공항': 'incheon-airport'
};

export function slugify(text: string): string {
  // 한글 지역명을 영문으로 변환
  let result = text;
  
  // 지역명 매핑
  Object.keys(AREA_MAPPING).forEach(korean => {
    const english = AREA_MAPPING[korean];
    result = result.replace(new RegExp(korean, 'g'), english);
  });
  
  return result
    .replace(/[↔]/g, '-')
    .replace(/[\(\)]/g, '-')
    .replace(/도심행/g, 'downtown')
    .replace(/공항행/g, 'airport')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .trim();
}

export function getRoutesFromEnv(): Route[] {
  const routes: Route[] = [];
  
  // Use import.meta.env for Astro/Vite environment variables
  const env = import.meta.env || {};
  
  // Fallback to hardcoded routes for development if env vars are not available
  const fallbackRoutes = [
    { name: '인천공항↔명동(도심행)', csvUrl: 'https://example.com/dummy.csv' },
    { name: '인천공항↔홍대(도심행)', csvUrl: 'https://example.com/dummy.csv' },
    { name: '인천공항↔강남(도심행)', csvUrl: 'https://example.com/dummy.csv' },
  ];
  
  let index = 1;
  while (true) {
    const nameKey = `ROUTE_${index}_NAME`;
    const csvKey = `ROUTE_${index}_CSV`;
    
    const name = env[nameKey];
    const csvUrl = env[csvKey];
    
    if (!name || !csvUrl) {
      break;
    }
    
    const slug = slugify(name);
    routes.push({ name, slug, csvUrl });
    
    index++;
  }
  
  // If no routes from env, use fallback routes for development
  if (routes.length === 0) {
    return fallbackRoutes.map(route => ({
      name: route.name,
      slug: slugify(route.name),
      csvUrl: route.csvUrl
    }));
  }
  
  return routes;
}

export function getRouteBySlug(slug: string): Route | undefined {
  const routes = getRoutesFromEnv();
  return routes.find(route => route.slug === slug);
}

export function getAllRouteSlugs(): string[] {
  const routes = getRoutesFromEnv();
  return routes.map(route => route.slug);
}

export function findRoutesByKeyword(keyword: string): Route[] {
  const routes = getRoutesFromEnv();
  const searchTerm = keyword.toLowerCase();
  
  return routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm) ||
    route.slug.toLowerCase().includes(searchTerm)
  );
}