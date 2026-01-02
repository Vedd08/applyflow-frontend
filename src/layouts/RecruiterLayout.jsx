import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RecruiterSidebar from '../components/recruiter/RecruiterSidebar';

const RecruiterLayout = () => {
  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* SIDEBAR */}
        <RecruiterSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RecruiterLayout;
