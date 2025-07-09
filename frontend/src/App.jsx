import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import WelcomePage from './pages/Welcome/WelcomePage';
import Login from './pages/Login/Login';
import WithAuth from './components/auth/WithAuth';
import HomeMentee from './pages/Mentee/HomeMentee';
import HomeMentor from './pages/Mentor/HomeMentor';
import Connections from './pages/Connections/Connections';

export default function App() {

  const ProtectedMentorHome = WithAuth(HomeMentor, ['MENTOR']);
  const ProtectedMenteeHome = WithAuth(HomeMentee, ['MENTEE']);
  const ProtectedConnections = WithAuth(Connections, ['MENTEE', "MENTOR"]);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <p className="quote">Mentorship is the compass that helps you navigate your journey to success.</p>
        <div className="loading-anime">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">Loading MentorMe...{progress}</p>
      </div>
    );
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/mentor/home' element={<ProtectedMentorHome />} />
        <Route path='/mentee/home' element={<ProtectedMenteeHome />} />
        <Route path='/connections' element={<ProtectedConnections />} />
      </Routes>
    </div>
  );
}
