import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import WelcomePage from './pages/Welcome/WelcomePage'
import Login from './pages/Login/Login'
import WithAuth from './components/auth/WithAuth'
import HomeMentee from './pages/Mentee/HomeMentee'
import HomeMentor from './pages/Mentor/HomeMentor'

function App() {

  const ProtectedMentorHome = WithAuth(HomeMentor, ['MENTOR'])
  const ProtectedMenteeHome = WithAuth(HomeMentee, ['MENTEE'])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/mentor/home' element={<ProtectedMentorHome/>} />
        <Route path='/mentee/home' element={<ProtectedMenteeHome />} />
      </Routes>
    </div>
  );
}

export default App