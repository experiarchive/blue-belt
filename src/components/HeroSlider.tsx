import { useState, useEffect } from 'preact/hooks';

const HERO_IMAGES = [
  {
    src: '/hero/airport-bus-night.webp',
    alt: '서울 야경',
    title: '서울 어디든지',
    subtitle: '실시간 시간표 · 요금 · 노선 안내'
  },
  {
    src: '/hero/incheon-airport-view.webp', 
    alt: '인천공항 전경',
    title: '인천공항에서 서울까지',
    subtitle: '편리하고 빠른 공항버스 서비스'
  },
  {
    src: '/hero/seoul-city-view.webp',
    alt: '서울 도심',
    title: '24시간 운행정보',
    subtitle: '정확한 시간표로 여행 계획을 세우세요'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6초마다 전환

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentImage = HERO_IMAGES[currentSlide];

  return (
    <div class="relative w-full h-full overflow-hidden">
      {/* Background Images */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          class={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            class="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div class="absolute inset-0 bg-black/20 z-20"></div>

      {/* Content */}
      <div class="relative max-w-7xl mx-auto px-4 py-24 md:py-36 z-30">
        <div class="text-center">
          <h2 class="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg transition-all duration-500">
            {currentImage.title}
          </h2>
          <p class="text-white/90 text-lg md:text-xl drop-shadow transition-all duration-500">
            {currentImage.subtitle}
          </p>
        </div>
      </div>

      {/* Slide indicators */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div class="flex gap-3">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              class={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows (optional) */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="이전 슬라이드"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % HERO_IMAGES.length)}
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="다음 슬라이드"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}