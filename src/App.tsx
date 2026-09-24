import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdmissionModal } from './components/AdmissionModal';
import { SEORouteManager } from './components/SEORouteManager';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Departments } from './pages/Departments';
import { Teachers } from './pages/Teachers';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Admissions } from './pages/Admissions';
import { NoticeDetail } from './pages/NoticeDetail';
import { EventDetail } from './pages/EventDetail';

// Admin Portal Pages & Components
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminProtectedRoute } from './admin/components/AdminProtectedRoute';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminStudents } from './admin/pages/AdminStudents';
import { AdminNotices } from './admin/pages/AdminNotices';
import { AdminEvents } from './admin/pages/AdminEvents';
import { AdminTeachers } from './admin/pages/AdminTeachers';
import { AdminDepartments } from './admin/pages/AdminDepartments';
import { AdminGallery } from './admin/pages/AdminGallery';
import { AdminAdmissions } from './admin/pages/AdminAdmissions';
import { AdminDataCenter } from './admin/pages/AdminDataCenter';
import { AdminAttendance } from './admin/pages/AdminAttendance';
import { AdminReports } from './admin/pages/AdminReports';
import { AdminExamResults } from './admin/pages/AdminExamResults';
import { AdminSettings } from './admin/pages/AdminSettings';

// Student Portal Pages & Components
import { StudentLayout } from './student/components/StudentLayout';
import { StudentProtectedRoute } from './student/components/StudentProtectedRoute';
import { StudentLogin } from './student/pages/StudentLogin';
import { StudentDashboard } from './student/pages/StudentDashboard';
import { StudentProfile } from './student/pages/StudentProfile';
import { StudentAttendance } from './student/pages/StudentAttendance';
import { StudentAcademics } from './student/pages/StudentAcademics';
import { StudentResults } from './student/pages/StudentResults';
import { StudentNotices } from './student/pages/StudentNotices';
import { StudentEvents } from './student/pages/StudentEvents';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 404 Fallback component
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-emerald-900 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-600 max-w-md mb-6">
        The page you are looking for might have been moved or does not exist on the Sharafiyya English Medium School portal.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:bg-emerald-900 transition-colors"
      >
        Return to Home Overview
      </Link>
    </div>
  );
}

function MainLayout({ onOpenAdmissionModal }: { onOpenAdmissionModal: () => void }) {
  const { pathname } = useLocation();
  const isAdminOrStudent = pathname.startsWith('/admin') || pathname.startsWith('/student');

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-800 selection:text-white">
      {!isAdminOrStudent && <Navbar onOpenAdmissionModal={onOpenAdmissionModal} />}

      <main className={`flex-grow ${!isAdminOrStudent ? 'pb-16 lg:pb-0' : ''}`}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home onOpenAdmissionModal={onOpenAdmissionModal} />} />
          <Route path="/about" element={<About onOpenAdmissionModal={onOpenAdmissionModal} />} />
          <Route path="/departments" element={<Departments onOpenAdmissionModal={onOpenAdmissionModal} />} />
          <Route path="/academics" element={<Departments onOpenAdmissionModal={onOpenAdmissionModal} />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<StudentLogin />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admissions" element={<Admissions onOpenAdmissionModal={onOpenAdmissionModal} />} />
          <Route path="/contact" element={<Contact onOpenAdmissionModal={onOpenAdmissionModal} />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="academics" element={<AdminDepartments />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="admissions" element={<AdminAdmissions />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="exam-results" element={<AdminExamResults />} />
              <Route path="data-center" element={<AdminDataCenter />} />
              <Route path="datacenter" element={<AdminDataCenter />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Student Portal Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student" element={<StudentProtectedRoute />}>
            <Route element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="academics" element={<StudentAcademics />} />
              <Route path="results" element={<StudentResults />} />
              <Route path="notices" element={<StudentNotices />} />
              <Route path="events" element={<StudentEvents />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminOrStudent && <Footer />}
      {!isAdminOrStudent && <MobileBottomNav onOpenAdmissionModal={onOpenAdmissionModal} />}
    </div>
  );
}

export function App() {
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

  const handleOpenAdmissionModal = () => setIsAdmissionModalOpen(true);
  const handleCloseAdmissionModal = () => setIsAdmissionModalOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEORouteManager />
      <MainLayout onOpenAdmissionModal={handleOpenAdmissionModal} />
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={handleCloseAdmissionModal}
      />
    </BrowserRouter>
  );
}

export default App;
