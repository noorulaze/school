import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, BookOpen, Users, Calendar, Sparkles, X, ZoomIn, ShieldAlert } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_EDITORIAL_NOTICE, type GalleryItem } from '../data/gallery';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Classrooms', 'Student Activities', 'Programs', 'Events'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const renderIcon = (cat: string) => {
    switch (cat) {
      case 'Campus': return <Building className="w-8 h-8 text-[#164e37]" />;
      case 'Classrooms': return <BookOpen className="w-8 h-8 text-[#164e37]" />;
      case 'Student Activities': return <Users className="w-8 h-8 text-[#164e37]" />;
      case 'Programs': return <Sparkles className="w-8 h-8 text-[#164e37]" />;
      case 'Events': return <Calendar className="w-8 h-8 text-[#164e37]" />;
      default: return <Building className="w-8 h-8 text-[#164e37]" />;
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Campus Gallery</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Visual archive of campus facilities, classrooms, student activities, programs, and events at {SCHOOL_INFO.officialName}.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Compliance Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>{GALLERY_EDITORIAL_NOTICE}</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#164e37] text-white border-[#164e37]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-[#d2cabb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="bg-white rounded-xl border border-[#e5e0d5] p-3 space-y-3 cursor-pointer hover:border-[#164e37] transition-all shadow-2xs group flex flex-col justify-between"
            >
              <div className="space-y-2">
                {/* Photo Placeholder Frame */}
                <div className="relative aspect-4/3 rounded-lg bg-[#f4f1ea] border border-[#d2cabb] flex flex-col items-center justify-center p-4 text-center group-hover:bg-[#eae5da] transition-colors">
                  <div className="mb-2">
                    {renderIcon(item.category)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-700 font-medium leading-tight">
                    [{item.placeholderLabel}]
                  </span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1 rounded bg-white text-slate-700 shadow-xs block">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#164e37] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {item.category}
                    </span>
                    <PlaceholderBadge label="Photo Slot" size="sm" />
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e5e0d5] text-[10px] text-slate-400 flex justify-between items-center">
                <span>Click to view details</span>
                <span>Korangath, Tirur</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="relative max-w-lg w-full bg-white rounded-2xl p-6 border border-[#d2cabb] shadow-xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                  {activeModalItem.category}
                </span>
                <PlaceholderBadge label="Administrative Image Slot" size="sm" />
              </div>

              {/* Display Frame */}
              <div className="aspect-video rounded-xl bg-[#f4f1ea] border border-[#d2cabb] flex flex-col items-center justify-center p-6 text-center">
                {renderIcon(activeModalItem.category)}
                <p className="font-mono text-xs text-slate-800 mt-2 font-bold">
                  [{activeModalItem.placeholderLabel}]
                </p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                  Recommended upload: Standard high-resolution photo taken under clear daylight.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeModalItem.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e0d5] text-xs text-slate-500 flex justify-between items-center">
                <span>{SCHOOL_INFO.officialName}</span>
                <span>{SCHOOL_INFO.location.area}, Tirur</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
