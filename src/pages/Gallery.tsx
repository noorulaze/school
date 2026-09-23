import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ZoomIn, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getPublicGallery } from '../services/publicService';
import type { GalleryItem } from '../types/firestore';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { RealisticImageSlot, type SceneType } from '../components/RealisticImageSlot';

export const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getPublicGallery()
      .then(setGalleryItems)
      .catch(() => setGalleryItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalItem]);

  const categories = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category).filter(Boolean)))];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const mapCategoryToScene = (cat: string, id: string): SceneType => {
    if (cat === 'Campus') return 'campus';
    if (cat === 'Classrooms') return id === 'gal-06' ? 'library' : 'classroom';
    if (cat === 'Student Activities') return 'quran_study';
    if (cat === 'Programs') return 'activities';
    if (cat === 'Events') return 'assembly';
    return 'campus';
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Campus Photo Gallery</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Campus Photo Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
              Photographic highlights of campus facilities, classroom environments, student programs, and commemorative events at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Grid */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#164e37] animate-spin mb-3" />
              <p className="text-xs text-slate-500 font-medium">Loading gallery archive...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20 px-4 bg-white rounded-2xl border border-[#e5e0d5]">
              <div className="w-14 h-14 rounded-2xl bg-[#f4f1ea] flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-7 h-7 text-[#164e37]/40" />
              </div>
              <h3 className="text-base font-bold text-[#0f231c]">No Gallery Items Available Yet</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                Campus photography and event galleries will be published here by the school administration once approved.
              </p>
            </div>
          ) : (
            <>
              {/* Category Tabs */}
              {categories.length > 2 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#164e37] text-white border-[#164e37] shadow-2xs font-bold'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-[#d2cabb]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Asymmetric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
                {filteredItems.map((item, idx) => {
                  const isFeature = idx === 0 || idx === 5;
                  const colSpan = isFeature ? 'lg:col-span-7' : 'lg:col-span-5';
                  const scene = mapCategoryToScene(item.category, item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveModalItem(item)}
                      className={`${colSpan} group cursor-pointer relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#d2cabb] bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full`}
                    >
                      {item.image ? (
                        <div className="relative w-full h-full min-h-[200px] sm:min-h-[220px] overflow-hidden bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <RealisticImageSlot
                          scene={scene}
                          aspectRatio={isFeature ? '16/10' : '4/3'}
                          label={`Category: ${item.category}`}
                          caption={item.title}
                          className="h-full min-h-[200px] sm:min-h-[220px]"
                        />
                      )}

                      {/* Hover Overlay with Zoom Button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20 pointer-events-none">
                        <div className="p-3 rounded-full bg-white/90 text-[#164e37] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Clean Bottom Metadata Bar */}
                      <div className="p-3 sm:p-3.5 bg-white border-t border-[#e5e0d5] flex items-center justify-between text-xs">
                        <div className="min-w-0 mr-2">
                          <strong className="block text-slate-900 text-xs truncate">{item.title}</strong>
                          <span className="text-[11px] text-slate-500 truncate block">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. Fullscreen Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-[#f4f1ea] border-b border-[#e5e0d5] flex items-center justify-between">
              <div className="min-w-0 mr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e37]">
                  {activeModalItem.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                aria-label="Close image modal"
                className="w-10 h-10 rounded-lg text-slate-600 hover:text-black hover:bg-slate-200 active:bg-slate-300 transition-colors flex items-center justify-center shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3 sm:p-4 overflow-y-auto">
              {activeModalItem.image ? (
                <div className="relative w-full max-h-[60vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </div>
              ) : (
                <RealisticImageSlot
                  scene={mapCategoryToScene(activeModalItem.category, activeModalItem.id)}
                  aspectRatio="16/10"
                  label={activeModalItem.category}
                  caption={activeModalItem.title}
                  className="shadow-sm"
                />
              )}

              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 bg-[#fbfaf7] rounded-xl border border-[#e5e0d5] text-xs space-y-2">
                <p className="text-slate-700 leading-relaxed text-xs">
                  {activeModalItem.description || (activeModalItem as any).caption || 'Campus photograph from Sharafiyya English Medium School, Korangath.'}
                </p>
                <div className="pt-2 border-t border-[#e5e0d5] flex flex-col sm:flex-row sm:items-center justify-between text-slate-500 text-[11px] gap-1">
                  <span>Category: {activeModalItem.category}</span>
                  <span className="font-semibold text-[#164e37]">
                    Korangath, Tirur, Malappuram
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
