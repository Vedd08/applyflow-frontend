import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

/* ===== LAYOUTS ===== */
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

/* ===== PUBLIC PAGES ===== */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/* ===== COMMON AUTH PAGES ===== */
import Explore from './pages/Explore';
import JobDetails from './pages/JobDetails';

/* ===== STUDENT ===== */
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
// import EditStudentProfile from './EditStudentProfile';



/* ===== RECRUITER ===== */
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import RecruiterLayout from './layouts/RecruiterLayout';
import RecruiterApplicants from './pages/recruiter/RecruiterApplicants';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';
import MyJobs from './pages/recruiter/MyJobs';

/* ===== ADMIN ===== */
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';
import AdminUsers from './pages/admin/AdminUsers';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= AUTHENTICATED (ALL ROLES) ================= */}
          {/* <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Explore />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <JobDetails />
                </MainLayout>
              </ProtectedRoute>
            }
          /> */}

          {/* ================= STUDENT ================= */}
          {/* ================= STUDENT ================= */}
<Route
  path="/student"
  element={
    <ProtectedRoute roles={['student']}>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<StudentDashboard />} />
  <Route path="profile" element={<StudentProfile />} />
</Route>


{/* ================= AUTHENTICATED (MAIN LAYOUT) ================= */}
<Route
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  {/* COMMON */}
  <Route path="/explore" element={<Explore />} />
  <Route path="/jobs/:id" element={<JobDetails />} />

  {/* STUDENT */}
  <Route path="/student" element={<StudentDashboard />} />
  <Route path="/student/profile" element={<StudentProfile />} />
</Route>



          {/* ================= RECRUITER (NESTED) ================= */}
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute roles={['recruiter']}>
                <RecruiterLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<RecruiterDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="applicants" element={<RecruiterApplicants />} />
            <Route path="profile" element={<RecruiterProfile />} />
          </Route>


          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN PANEL (NESTED) ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
