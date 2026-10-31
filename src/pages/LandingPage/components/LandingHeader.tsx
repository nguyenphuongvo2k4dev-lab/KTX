import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingHeader: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_16px_rgba(0,55,176,0.08)] border-b border-outline-variant/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-primary tracking-tight">SmartDorm</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">VNU</span>
              </div>
              <span className="text-[11px] text-on-surface-variant hidden sm:block leading-none">Ký túc xá thông minh ĐHQG</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Tính năng', id: 'features' },
              { label: 'Thống kê', id: 'stats' },
              { label: 'Cổng truy cập', id: 'portals' },
              { label: 'Công nghệ', id: 'tech' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3.5 py-2 rounded-lg text-sm text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 transition-all font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg shadow-sm hover:bg-primary-container transition-all"
            >
              Đăng ký lưu trú
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-4 py-3 space-y-1 shadow-lg">
          {[
            { label: 'Tính năng', id: 'features' },
            { label: 'Thống kê', id: 'stats' },
            { label: 'Cổng truy cập', id: 'portals' },
            { label: 'Công nghệ', id: 'tech' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-container transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary-fixed/30 transition-colors"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full py-2.5 text-sm font-bold bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors"
            >
              Đăng ký lưu trú K24
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
