import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'THE GRAND FASHION FESTIVAL',
    subtitle: '50-80% OFF ON 50,000+ STYLES',
    tag: 'BIGGEST TRENDS OF THE SEASON',
    buttonText: 'EXPLORE ALL DEALS',
    link: '/products?sort=discount_desc',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    gradient: 'from-purple-900/80 via-pink-900/60 to-transparent'
  },
  {
    id: 2,
    title: 'MEN\'S CASUAL & ATHLEISURE',
    subtitle: 'FLAT 50% OFF | HRX, ROADSTER, PUMA',
    tag: 'ELEVATE YOUR EVERYDAY WARDROBE',
    buttonText: 'SHOP MEN',
    link: '/products?gender=men',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=80',
    gradient: 'from-slate-900/80 via-blue-900/60 to-transparent'
  },
  {
    id: 3,
    title: 'ETHNIC & FUSION GLAMOUR',
    subtitle: 'UP TO 70% OFF ON KURTAS & SAREES',
    tag: 'HANDCRAFTED CELEBRATIONS',
    buttonText: 'SHOP ETHNIC',
    link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    gradient: 'from-rose-950/80 via-pink-900/50 to-transparent'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 select-none">
      {/* Slides Container */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} flex items-center`}>
              <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
                <div className="max-w-xl text-white space-y-3 sm:space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full text-pink-200">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    {slide.tag}
                  </span>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-lg font-bold text-pink-100">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-myntra-pink hover:bg-myntra-pinkDark text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-md shadow-lg transition-transform hover:scale-105"
                    >
                      {slide.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 hover:bg-white text-white hover:text-myntra-dark backdrop-blur-sm flex items-center justify-center transition-all shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 hover:bg-white text-white hover:text-myntra-dark backdrop-blur-sm flex items-center justify-center transition-all shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-1.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-myntra-pink' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
