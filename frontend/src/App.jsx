import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import WelcomePage from './pages/Welcome/WelcomePage'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App