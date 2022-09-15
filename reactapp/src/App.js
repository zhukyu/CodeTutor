import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from '../src/components/Login';



function App() {
  useEffect(() => {
    const handleScroll = event => {
      if (window.scrollY > 60) {
        document.querySelector('.NavbarItems').classList.add('scrolled');
      }
      else {
        document.querySelector('.NavbarItems').classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
