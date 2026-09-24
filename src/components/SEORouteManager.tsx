import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Sharafiyya English Medium School | Korangath, Niramaruthur';
const DEFAULT_DESC =
  'Sharafiyya English Medium School is an Islamic English Medium School in Korangath, Niramaruthur, combining modern education, Islamic values, academic learning and student development.';
const BASE_URL = 'https://sharafiyya.edu';

export const SEORouteManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Identify Private/Admin/Student Routes for Strict Noindex Protection
    const isPrivate =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/student/dashboard') ||
      pathname.startsWith('/student/profile') ||
      pathname.startsWith('/student/attendance') ||
      pathname.startsWith('/student/academics') ||
      pathname.startsWith('/student/notices') ||
      pathname.startsWith('/student/events') ||
      pathname.startsWith('/student/login') ||
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
          pageTitle = 'About Sharafiyya English Medium School | Korangath, Niramaruthur';
          pageDesc =
            'Learn about Sharafiyya English Medium School in Korangath, Niramaruthur — our institutional vision, Islamic values, academic learning and committed educators.';
          break;
        case '/academics':
        case '/departments':
          pageTitle = 'Academic Programs & Curriculum | Sharafiyya English Medium School';
          pageDesc =
            'Explore academic curriculum and programs at Sharafiyya English Medium School: Quranic recitation with Tajweed, Islamic studies, English language, science, and character formation.';
          break;
        case '/teachers':
          pageTitle = 'Teaching Faculty & Educators | Sharafiyya English Medium School';
          pageDesc =
            'Meet the dedicated teaching faculty and qualified educators guiding students at Sharafiyya English Medium School in Korangath, Niramaruthur.';
          break;
        case '/students':
          pageTitle = 'Student Portal & Academic Access | Sharafiyya English Medium School';
          pageDesc =
            'Access the Sharafiyya English Medium School Student Portal to view academic progress, attendance records, school announcements, and student resources in Korangath, Niramaruthur.';
          break;
        case '/events':
          pageTitle = 'School Events, Programs & Calendar | Sharafiyya English Medium School';
          pageDesc =
            'Stay updated with school assemblies, academic assessments, Islamic celebrations, and annual programs at Sharafiyya English Medium School in Korangath, Niramaruthur.';
          break;
        case '/gallery':
          pageTitle = 'Campus Life & Photo Gallery | Sharafiyya English Medium School';
          pageDesc =
            'Explore photographs and moments of campus life, student activities, learning spaces, and cultural occasions at Sharafiyya English Medium School.';
          break;
        case '/admissions':
          pageTitle = 'Admissions & Enrolment | Sharafiyya English Medium School, Niramaruthur';
          pageDesc =
            'Admission enquiries and enrolment details for Sharafiyya English Medium School in Korangath, Niramaruthur. Discover our application process and criteria.';
          break;
        case '/contact':
          pageTitle = 'Contact & Location | Sharafiyya English Medium School, Korangath';
          pageDesc =
            'Get in touch with Sharafiyya English Medium School at Korangath, Niramaruthur, Tirur. Find campus address, office consultation hours, and enquiry details.';
          break;
        default:
          if (pathname.startsWith('/notice/')) {
            pageTitle = 'School Notice | Sharafiyya English Medium School';
            pageDesc = 'Official notice and announcement from Sharafiyya English Medium School, Korangath, Niramaruthur.';
          } else if (pathname.startsWith('/events/')) {
            pageTitle = 'Event Details | Sharafiyya English Medium School';
            pageDesc = 'Event details, dates, and schedules from Sharafiyya English Medium School, Korangath, Niramaruthur.';
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
