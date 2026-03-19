import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Sectors from './pages/Sectors';
import SectorDetail from './pages/SectorDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Kebeles from './pages/Kebeles';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { Language } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <BrowserRouter>
      <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/sectors" element={<Sectors lang={lang} />} />
          <Route path="/sectors/:id" element={<SectorDetail lang={lang} />} />
          <Route path="/news" element={<News lang={lang} />} />
          <Route path="/news/:id" element={<NewsDetail lang={lang} />} />
          <Route path="/events" element={<Events lang={lang} />} />
          <Route path="/events/:id" element={<EventDetail lang={lang} />} />
          <Route path="/kebeles" element={<Kebeles lang={lang} />} />
          <Route path="/services" element={<Services lang={lang} />} />
          <Route path="/services/:id" element={<ServiceDetail lang={lang} />} />
          <Route path="/gallery" element={<Gallery lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
