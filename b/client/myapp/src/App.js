import logo from './logo.svg';
import './App.css';
import {Toaster} from 'react-hot-toast';
import { Routes,Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Login from './pages/Auth/Login';
import Home from './pages/Home/HomePage.js';

import Register from './pages/Auth/Register';

function App() {
  return (
    <div>
  
     <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home/' element={<Home />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element ={<Register />} />
     </Routes>
     <Toaster />
    </div>
  );
}

export default App;
