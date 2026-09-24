import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Sharafiyya English Medium School | Korangath, Niramaruthur';
const DEFAULT_DESC =
  'Official website of Sharafiyya English Medium School, an Islamic English Medium School in Korangath, Niramaruthur. Explore academics, school activities, admissions, notices and student services.';
const BASE_URL = 'https://sharafiyya.edu';

export const SEORouteManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Identify Private/Admin/Student Routes for Strict Noindex Protection
    const isPrivate =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/student') ||
      pathname.startsWith('/login');

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', isPrivate ? 'noindex, nofollow' : 'index, follow');

    // 2. Set Page Specific Titles & Descriptions
    let pageTitle = DEFAULT_TITLE;
    let pageDesc = DEFAULT_DESC;

    if (isPrivate) {
      if (pathname.startsWith('/admin')) {
        pageTitle = 'Administrator Workspace · Sharafiyya English Medium School';
        pageDesc = 'Internal administrative workspace for Sharafiyya English Medium School.';
      } else if (pathname.startsWith('/student/login')) {
        pageTitle = 'Student & Admin Portal Login | Sharafiyya English Medium School';
        pageDesc = 'Sign in to access your student records, academic reports, and portal circulars.';
      } else if (pathname.startsWith('/student')) {
        pageTitle = 'Student Portal Dashboard | Sharafiyya English Medium School';
        pageDesc = 'Private academic records and student portal.';
      }
    } else {
      switch (pathname) {
        case '/':
          pageTitle = 'Sharafiyya English Medium School | Korangath, Niramaruthur';
          pageDesc = DEFAULT_DESC;
          break;
        case '/about':
          pageTitle = 'About Our School | Sharafiyya English Medium School';
          pageDesc = 'Learn about Sharafiyya English Medium School in Korangath, Niramaruthur — our institutional vision, values, and committed educators.';
          break;
        case '/academics':
        case '/departments':
          pageTitle = 'Academics & Wings | Sharafiyya English Medium School';
          pageDesc = 'Explore our academic structure: Quranic recitation, Islamic studies, English language curriculum, science, and moral development.';
          break;
        case '/teachers':
          pageTitle = 'Our Faculty & Teachers | Sharafiyya English Medium School';
          pageDesc = 'Meet the dedicated teaching faculty and mentors guiding students at Sharafiyya English Medium School, Korangath.';
          break;
        case '/events':
          pageTitle = 'School Events & Calendar | Sharafiyya English Medium School';
          pageDesc = 'Stay informed on institutional events, competitions, celebrations, and academic schedules at Sharafiyya English Medium School.';
          break;
        case '/gallery':
          pageTitle = 'Campus Life & Gallery | Sharafiyya English Medium School';
          pageDesc = 'Visual gallery showcasing classroom learning, student programs, and campus facilities in Korangath, Niramaruthur.';
          break;
        case '/admissions':
          pageTitle = 'Admissions & Enrolment | Sharafiyya English Medium School';
          pageDesc = 'Admission information and enquiries for Sharafiyya English Medium School, Korangath, Niramaruthur.';
          break;
        case '/contact':
          pageTitle = 'Contact & Location | Sharafiyya English Medium School';
          pageDesc = 'Get in touch with Sharafiyya English Medium School at Korangath, Niramaruthur, Tirur, Malappuram.';
          break;
        default:
          if (pathname.startsWith('/notice/')) {
            pageTitle = 'School Notice | Sharafiyya English Medium School';
          } else if (pathname.startsWith('/events/')) {
            pageTitle = 'Event Details | Sharafiyya English Medium School';
          }
          break;
      }
    }

    // Update document title
    document.title = pageTitle;

    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', pageDesc);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const cleanPath = pathname === '/' ? '' : pathname;
    canonical.setAttribute('href', `${BASE_URL}${cleanPath}`);

    // Update Open Graph URL & Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${BASE_URL}${cleanPath}`);

    // Update Twitter Title & Desc
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', pageTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', pageDesc);
  }, [pathname]);

  return null;
};
