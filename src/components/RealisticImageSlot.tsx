import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export type SceneType =
  | 'campus'
  | 'classroom'
  | 'quran_study'
  | 'assembly'
  | 'library'
  | 'activities';

interface RealisticImageSlotProps {
  scene: SceneType;
  caption?: string;
  label?: string;
  className?: string;
  aspectRatio?: 'video' | '4/3' | 'square' | '16/10' | 'portrait' | 'auto';
  showAdminBadge?: boolean;
}

export const RealisticImageSlot: React.FC<RealisticImageSlotProps> = ({
  scene,
  caption,
  label = 'Official Photograph Slot',
  className = '',
  aspectRatio = '16/10',
  showAdminBadge = true,
}) => {
  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === '4/3'
      ? 'aspect-4/3'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : '';

  // Render authentic SVG scene representations
  const renderSceneIllustration = () => {
    switch (scene) {
      case 'campus':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sky-campus" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8f3ee" />
                <stop offset="60%" stopColor="#f4f9f6" />
                <stop offset="100%" stopColor="#fdfaf3" />
              </linearGradient>
              <linearGradient id="roof-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9c422b" />
                <stop offset="50%" stopColor="#b85438" />
                <stop offset="100%" stopColor="#873520" />
              </linearGradient>
              <linearGradient id="wall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fcfbf7" />
                <stop offset="100%" stopColor="#ebe4d3" />
              </linearGradient>
            </defs>
            {/* Sky */}
            <rect width="800" height="500" fill="url(#sky-campus)" />
            {/* Distant Kerala greenery & coconut palms */}
            <path d="M0 310 Q 120 280, 240 300 T 480 290 T 720 305 T 800 295 L 800 500 L 0 500 Z" fill="#2d6a4f" opacity="0.3" />
            <path d="M0 330 Q 150 315, 300 325 T 600 320 T 800 330 L 800 500 L 0 500 Z" fill="#1b5038" opacity="0.5" />
            {/* Palm silhouettes on side */}
            <g opacity="0.35" stroke="#164e37" strokeWidth="2.5" fill="none">
              <path d="M 60 380 Q 75 260 90 180" />
              <path d="M 90 180 Q 50 160 30 190 M 90 180 Q 110 150 140 170 M 90 180 Q 80 130 95 120 M 90 180 Q 130 180 150 210" />
              <path d="M 740 380 Q 725 250 710 170" />
              <path d="M 710 170 Q 670 150 650 180 M 710 170 Q 730 140 760 160 M 710 170 Q 700 120 715 110" />
            </g>
            {/* Main Campus Building - Traditional Kerala Verandah School Architecture */}
            <rect x="180" y="240" width="440" height="150" fill="url(#wall-grad)" stroke="#d2cabb" strokeWidth="2" />
            <polygon points="160,240 400,160 640,240" fill="url(#roof-grad)" stroke="#6b2614" strokeWidth="3" />
            <circle cx="400" cy="155" r="5" fill="#c59b27" />
            <line x1="400" y1="150" x2="400" y2="135" stroke="#c59b27" strokeWidth="3" />
            <rect x="180" y="320" width="440" height="70" fill="#f4efe2" />
            {[210, 260, 310, 360, 410, 460, 510, 560].map((x, i) => (
              <g key={i}>
                <rect x={x} y="270" width="10" height="120" fill="#164e37" />
                <rect x={x - 2} y="266" width="14" height="6" fill="#c59b27" />
                <rect x={x - 2} y="386" width="14" height="6" fill="#c59b27" />
              </g>
            ))}
            {[230, 330, 430, 530].map((x, i) => (
              <g key={i}>
                <path d={`M ${x} 265 L ${x} 245 A 15 15 0 0 1 ${x + 30} 245 L ${x + 30} 265 Z`} fill="#164e37" opacity="0.85" />
                <line x1={x + 15} y1="230" x2={x + 15} y2="265" stroke="#ffffff" strokeWidth="1" />
              </g>
            ))}
            <path d="M 370 390 L 370 315 A 30 30 0 0 1 430 315 L 430 390 Z" fill="#0f3b29" />
            <rect x="120" y="390" width="560" height="15" fill="#cfc7b6" stroke="#b8ad99" strokeWidth="1" />
            <path d="M 0 405 L 800 405 L 800 500 L 0 500 Z" fill="#2d6a4f" opacity="0.85" />
            <polygon points="350,500 450,500 420,405 380,405" fill="#ded7c5" stroke="#c4baa4" strokeWidth="1.5" />
          </svg>
        );

      case 'classroom':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="class-wall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f7f5ed" />
                <stop offset="100%" stopColor="#ede6d5" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#class-wall)" />
            <rect x="150" y="60" width="500" height="230" rx="8" fill="#1b382b" stroke="#7a5528" strokeWidth="10" />
            <text x="400" y="125" fill="#f4f1ea" fontFamily="Amiri, serif" fontSize="28" textAnchor="middle" direction="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </text>
            <text x="400" y="165" fill="#c59b27" fontFamily="sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle">
              درس اليوم: أحكام التجويد والقرآن الكريم
            </text>
            <line x1="200" y1="185" x2="600" y2="185" stroke="#486e58" strokeWidth="1.5" />
            <text x="400" y="215" fill="#c2d6cb" fontFamily="sans-serif" fontSize="13" textAnchor="middle">
              Class Session • Sharafiyya English Medium School • Korangath
            </text>
            <polygon points="320,420 480,420 460,320 340,320" fill="#8c5828" stroke="#5f3711" strokeWidth="2" />
            <rect x="330" y="310" width="140" height="15" rx="3" fill="#a86e36" stroke="#5f3711" strokeWidth="1.5" />
            <polygon points="60,500 240,500 220,410 80,410" fill="#75481f" opacity="0.9" />
            <polygon points="560,500 740,500 720,410 580,410" fill="#75481f" opacity="0.9" />
            <polygon points="0,0 220,0 350,500 0,500" fill="#ffffff" opacity="0.08" />
          </svg>
        );

      case 'quran_study':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="quran-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#142c22" />
                <stop offset="100%" stopColor="#0a1a14" />
              </linearGradient>
              <linearGradient id="gold-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3d077" />
                <stop offset="100%" stopColor="#b48318" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#quran-bg)" />
            <path d="M 220 500 L 220 220 A 180 180 0 0 1 580 220 L 580 500 Z" fill="#18362a" stroke="#254d3d" strokeWidth="3" />
            <circle cx="400" cy="180" r="40" fill="none" stroke="#c59b27" strokeWidth="1.5" opacity="0.4" />
            <circle cx="400" cy="180" r="30" fill="none" stroke="#c59b27" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <polygon points="260,460 300,470 540,320 500,310" fill="#543114" />
            <polygon points="540,460 500,470 260,320 300,310" fill="#6d411b" />
            <polygon points="230,300 395,315 395,200 250,180" fill="#f7f3e8" stroke="#d5c8ab" strokeWidth="1.5" />
            <polygon points="395,315 570,300 550,180 395,200" fill="#fcf9f2" stroke="#d5c8ab" strokeWidth="1.5" />
            <line x1="395" y1="200" x2="395" y2="315" stroke="#b48318" strokeWidth="3" />
            <rect x="265" y="195" width="115" height="16" fill="url(#gold-glow)" rx="2" />
            <rect x="415" y="195" width="115" height="16" fill="url(#gold-glow)" rx="2" />
            {[220, 235, 250, 265, 280].map((y, i) => (
              <g key={i}>
                <line x1="265" y1={y} x2="380" y2={y + 1} stroke="#2c3e35" strokeWidth="2" strokeDasharray="6 3 12 2" opacity="0.8" />
                <line x1="415" y1={y + 1} x2="530" y2={y} stroke="#2c3e35" strokeWidth="2" strokeDasharray="10 2 6 4" opacity="0.8" />
              </g>
            ))}
            <path d="M 270 320 Q 230 360 260 400 Q 300 420 330 380" fill="none" stroke="#c59b27" strokeWidth="3" strokeDasharray="4 4" />
          </svg>
        );

      case 'library':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="wood-shelf" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#633b19" />
                <stop offset="100%" stopColor="#45270e" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="#f8f6f0" />
            <rect x="80" y="40" width="640" height="420" fill="url(#wood-shelf)" rx="4" />
            <rect x="100" y="160" width="600" height="18" fill="#8c5828" />
            <rect x="100" y="290" width="600" height="18" fill="#8c5828" />
            <rect x="100" y="420" width="600" height="18" fill="#8c5828" />
            {[
              { w: 32, h: 90, color: '#164e37' },
              { w: 28, h: 95, color: '#1b5f43' },
              { w: 36, h: 92, color: '#7a201b' },
              { w: 26, h: 88, color: '#1e314b' },
              { w: 30, h: 94, color: '#164e37' },
              { w: 34, h: 90, color: '#b48318' },
              { w: 28, h: 96, color: '#7a201b' },
              { w: 32, h: 92, color: '#164e37' },
            ].map((book, idx) => (
              <g key={idx}>
                <rect x={130 + idx * 36} y={160 - book.h} width={book.w} height={book.h} fill={book.color} rx="2" stroke="#d4af37" strokeWidth="1" />
                <line x1={130 + idx * 36 + 4} y1={160 - book.h + 10} x2={130 + idx * 36 + book.w - 4} y2={160 - book.h + 10} stroke="#d4af37" strokeWidth="1.5" />
                <line x1={130 + idx * 36 + 4} y1={160 - 10} x2={130 + idx * 36 + book.w - 4} y2={160 - 10} stroke="#d4af37" strokeWidth="1.5" />
              </g>
            ))}
            {[
              { w: 30, h: 100, color: '#1b5038' },
              { w: 32, h: 105, color: '#164e37' },
              { w: 28, h: 98, color: '#8c6512' },
              { w: 34, h: 102, color: '#1e314b' },
              { w: 30, h: 95, color: '#7a201b' },
            ].map((book, idx) => (
              <rect key={idx} x={420 + idx * 36} y={290 - book.h} width={book.w} height={book.h} fill={book.color} rx="2" stroke="#c59b27" strokeWidth="1" />
            ))}
            <rect x="0" y="440" width="800" height="60" fill="#2d1b0d" />
            <polygon points="120,440 260,440 240,410 140,410" fill="#fdfaf3" stroke="#d5c8ab" strokeWidth="1.5" />
          </svg>
        );

      case 'assembly':
      case 'activities':
      default:
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="assembly-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dbeee5" />
                <stop offset="100%" stopColor="#fdfbf7" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#assembly-sky)" />
            <path d="M 0 320 Q 200 290 400 310 T 800 300 L 800 500 L 0 500 Z" fill="#1b5038" opacity="0.3" />
            <rect x="250" y="160" width="300" height="240" fill="#ffffff" stroke="#d2cabb" strokeWidth="2" />
            <polygon points="230,160 400,90 570,160" fill="#9c422b" stroke="#7a201b" strokeWidth="2" />
            <circle cx="400" cy="85" r="4" fill="#c59b27" />
            <path d="M 330 400 L 330 260 A 70 70 0 0 1 470 260 L 470 400 Z" fill="#164e37" opacity="0.9" />
            <circle cx="700" cy="80" r="45" fill="#fef08a" opacity="0.4" />
            <rect x="0" y="400" width="800" height="100" fill="#ebe4d3" />
            {[180, 260, 340, 420, 500, 580].map((x, idx) => (
              <line key={idx} x1={x} y1="430" x2={x + 40} y2="490" stroke="#d2cabb" strokeWidth="2" strokeDasharray="4 4" />
            ))}
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#d2cabb] bg-[#fbfaf7] shadow-xs group ${aspectClass} ${className}`}
    >
      {/* Background SVG Scene Representation */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-102">
        {renderSceneIllustration()}
      </div>

      {/* Subtle Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Top Header Indicators: flex container preventing collision on narrow screens */}
      <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-medium border border-white/20 shadow-xs min-w-0 max-w-[68%]">
          <Camera className="w-3 h-3 text-[#c59b27] shrink-0" />
          <span className="truncate">{label}</span>
        </div>

        {showAdminBadge && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100/90 text-amber-950 text-[9px] font-bold border border-amber-300 shadow-2xs shrink-0">
            <ImageIcon className="w-2.5 h-2.5 text-amber-700 shrink-0" />
            <span className="hidden sm:inline">Upload via Admin</span>
            <span className="sm:hidden">Admin</span>
          </div>
        )}
      </div>

      {/* Caption at Bottom */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-3.5 z-10 text-white">
          <p className="text-xs sm:text-sm font-semibold drop-shadow-xs">{caption}</p>
          <p className="text-[10px] text-slate-200/90 mt-0.5">
            Sharafiyya English Medium School • Korangath, Tirur
          </p>
        </div>
      )}
    </div>
  );
};
