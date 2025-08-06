import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import WelcomePage from './pages/Welcome/WelcomePage';
import Login from './pages/Login/Login';
import WithAuth from './components/auth/WithAuth';
import HomeMentee from './pages/Mentee/HomeMentee';
import HomeMentor from './pages/Mentor/HomeMentor';
import Connections from './pages/Connections/Connections';
import { Toaster } from "react-hot-toast";
import ProfilePage from './pages/ProfilePage/ProfilePage';

export default function App() {

  const ProtectedMentorHome = WithAuth(HomeMentor, ['MENTOR']);
  const ProtectedMenteeHome = WithAuth(HomeMentee, ['MENTEE']);
  const ProtectedConnections = WithAuth(Connections, ['MENTEE', "MENTOR"]);
  const ProtectedProfile = WithAuth(ProfilePage, ['MENTEE', "MENTOR"]);

  return (
    <div className='App'>
      <Toaster />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/mentor/home' element={<ProtectedMentorHome />} />
        <Route path='/mentee/home' element={<ProtectedMenteeHome />} />
        <Route path='/connections' element={<ProtectedConnections />} />
        <Route path='/user/info' element={<ProtectedProfile />} />
      </Routes>
    </div>
  );
}
