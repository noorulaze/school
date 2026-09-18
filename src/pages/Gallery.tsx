import React, { useState } from 'react';
import { Camera, Sparkles, X, ZoomIn, Building, BookOpen, Users, Trophy } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_EDITORIAL_NOTICE, type GalleryItem } from '../data/gallery';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Academic', 'Spiritual', 'Activities'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'building': return <Building className="w-8 h-8 text-amber-300" />;
      case 'book': return <BookOpen className="w-8 h-8 text-amber-300" />;
      case 'users': return <Users className="w-8 h-8 text-amber-300" />;
      case 'trophy': return <Trophy className="w-8 h-8 text-amber-300" />;
      default: return <Sparkles className="w-8 h-8 text-amber-300" />;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -right-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Archive & Campus Life</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Campus Gallery
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            Moments of Learning & Devotion at {SCHOOL_INFO.officialName}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Glimpses of daily recitation, classroom instruction, and student assemblies at our campus in Korangath, Tirur.
          </p>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Institutional Integrity Notice */}
          <div className="max-w-3xl mx-auto mb-10 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <PlaceholderBadge label="Media Notice" size="sm" className="shrink-0 mt-0.5" />
            <p>{GALLERY_EDITORIAL_NOTICE}</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item: GalleryItem) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border border-emerald-800/40 aspect-4/3 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
              >
                <div className="absolute inset-0 bg-islamic-pattern opacity-10 group-hover:opacity-20 transition-opacity" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-800/90 text-amber-300 border border-amber-400/30">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center py-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-white/10">
                    {renderIcon(item.iconType)}
                  </div>
                  <span className="text-[11px] font-mono text-amber-400/90 text-center">
                    {item.placeholderLabel}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Lightbox Modal */}
          {activeModalItem && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setActiveModalItem(null)}
            >
              <div
                className="relative max-w-lg w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-800 text-amber-300">
                    {activeModalItem.category}
                  </span>
                  <PlaceholderBadge label="Editable Photo Slot" size="sm" />
                </div>

                <div className="aspect-video rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-950 flex flex-col items-center justify-center p-6 border border-white/10">
                  {renderIcon(activeModalItem.iconType)}
                  <p className="font-mono text-xs text-amber-300 mt-3 text-center">
                    {activeModalItem.placeholderLabel}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 text-center">
                    Upload resolution: 1920x1080px or 4:3 high-res photo
                  </p>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {activeModalItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalItem.caption}
                </p>

                <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
                  <span>{SCHOOL_INFO.officialName}</span>
                  <span>{SCHOOL_INFO.location.area}, Tirur</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
