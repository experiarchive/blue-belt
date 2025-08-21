import { useState } from 'preact/hooks';

const MENU_ITEMS = [
  { label: '노선정보', href: '#routes' },
  { label: '이용정보', href: '#guide' }
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav class="flex items-center">
      {/* Desktop Navigation */}
      <div class="hidden md:flex items-center space-x-10">
        {MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            class="relative text-slate-800 hover:text-[#2563EB] font-bold text-lg xl:text-xl transition-all duration-300 group py-2 px-1"
          >
            {item.label}
            {/* Hover underline effect */}
            <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        class="md:hidden flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200"
        aria-label="메뉴 열기"
      >
        <div class="w-6 h-5 flex flex-col justify-between">
          <div class={`h-0.5 bg-slate-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div class={`h-0.5 bg-slate-800 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div class={`h-0.5 bg-slate-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div class="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={closeMenu}>
          <div class="fixed top-0 right-0 w-64 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Menu Header */}
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <div class="flex items-center">
                <span class="font-bold text-slate-800 text-xl">메뉴</span>
              </div>
              <button
                onClick={closeMenu}
                class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200"
                aria-label="메뉴 닫기"
              >
                <svg class="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div class="p-6 space-y-4">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  class="flex items-center justify-between p-5 rounded-xl hover:bg-blue-50 hover:shadow-sm transition-all duration-200 group"
                >
                  <div>
                    <div class="font-bold text-slate-800 group-hover:text-[#2563EB] text-xl">
                      {item.label}
                    </div>
                    <div class="text-base text-slate-600 mt-2">
                      {item.label === '노선정보' ? '시간표 및 요금 안내' : '이용방법 및 주의사항'}
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-slate-500 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <div class="text-center text-xs text-slate-500">
                © 2025 Seoul Airport Bus
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}