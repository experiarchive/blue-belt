import { useState } from 'preact/hooks';
import { findRoutesByKeyword } from '../lib/routes';

export default function SearchBoxIsland() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSearch = (e: Event) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      showToast('검색어를 입력해주세요.');
      return;
    }
    
    const routes = findRoutesByKeyword(searchQuery.trim());
    
    if (routes.length > 0) {
      const firstRoute = routes[0];
      window.location.href = `/routes/${firstRoute.slug}`;
    } else {
      showToast('해당 키워드와 일치하는 노선이 없습니다.');
    }
  };
  
  const showToast = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };
  
  return (
    <div class="search-box-container">
      <form onSubmit={handleSearch} class="relative">
        <div class="flex gap-3 items-center">
          <div class="relative flex-1">
            {/* Search icon */}
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              placeholder="어디로 가시나요? (명동, 홍대, 강남…)"
              class="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-400 transition-all duration-200 text-gray-800"
            />
          </div>
          <button
            type="submit"
            class="px-6 py-3 rounded-xl bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] hover:shadow-lg hover:scale-105 transition-all duration-200 transform"
          >
            검색
          </button>
        </div>
      </form>
      
      {showMessage && (
        <div class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}
    </div>
  );
}