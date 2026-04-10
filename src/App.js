import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About'; // Import the About component
import Portfolio from './components/Portfolio';
import Cinematic from './components/Cinematic';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Admin from './components/Admin';
import './App.css'; // Make sure to import the CSS

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 2 seconds to hide the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcBHBpXtHr4FOVhx0KhafT1cjoM8uAnzrwA&s" 
          alt="Loading Logo" 
          className="loader-image"
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} /> {/* Add About route */}
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="cinematic" element={<Cinematic />} />
        <Route path="gallery/:albumId" element={<Gallery />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;