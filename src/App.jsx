import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertySearch from './components/PropertySearch';
import FeaturedProperties from './components/FeaturedProperties';
import LocationExplorer from './components/LocationExplorer';
import PropertyCategories from './components/PropertyCategories';
import About from './components/About';
import Agents from './components/Agents';
import Developments from './components/Developments';
import Investment from './components/Investment';
import SellProperty from './components/SellProperty';
import Testimonials from './components/Testimonials';
import PropertyJourney from './components/PropertyJourney';
import Gallery from './components/Gallery';
import ViewingForm from './components/ViewingForm';
import Newsletter from './components/Newsletter';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import PropertiesPage from './components/PropertiesPage';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import useFavorites from './hooks/useFavorites';
import { getPropertyById } from './data/properties';

export default function App() {
  const [view, setView] = useState('home');
  const [propertiesFilters, setPropertiesFilters] = useState({});
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [viewingPreset, setViewingPreset] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();

  const scrollToAnchor = useCallback((anchor) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    });
  }, []);

  const handleNavigate = useCallback((link) => {
    if (link.view === 'properties') {
      setPropertiesFilters(link.status ? { status: link.status } : {});
      setView('properties');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      if (link.anchor) {
        scrollToAnchor(link.anchor);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [scrollToAnchor]);

  const goToProperties = useCallback((filters = {}) => {
    setPropertiesFilters(filters);
    setView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((filters) => {
    goToProperties({
      status: filters.status,
      location: filters.location,
      type: filters.type,
      beds: filters.beds,
      minPrice: filters.price.min,
      maxPrice: filters.price.max,
    });
  }, [goToProperties]);

  const openBookViewing = useCallback((property) => {
    setViewingPreset(property?.title || '');
    setSelectedPropertyId(null);
    setView('home');
    scrollToAnchor('contact');
  }, [scrollToAnchor]);

  const selectedProperty = selectedPropertyId ? getPropertyById(selectedPropertyId) : null;

  useEffect(() => {
    document.title =
      view === 'properties'
        ? 'Properties | VERA ESTATES — Luxury Property in London'
        : 'VERA ESTATES | Luxury Property in London';
  }, [view]);

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar onNavigate={handleNavigate} onBookViewing={() => { setView('home'); scrollToAnchor('contact'); }} currentView={view} />

      {view === 'home' ? (
        <>
          <Hero onExplore={() => goToProperties()} onBookViewing={() => scrollToAnchor('contact')} />
          <PropertySearch onSearch={handleSearch} />
          <FeaturedProperties
            onView={setSelectedPropertyId}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onViewAll={() => goToProperties()}
          />
          <LocationExplorer onView={setSelectedPropertyId} />
          <PropertyCategories onSelect={() => goToProperties()} />
          <About />
          <Agents />
          <Developments />
          <Investment />
          <SellProperty onValuation={() => scrollToAnchor('contact')} />
          <Testimonials />
          <PropertyJourney />
          <Gallery />
          <ViewingForm presetProperty={viewingPreset} />
          <Newsletter />
          <LocationContact />
        </>
      ) : (
        <PropertiesPage
          initialFilters={propertiesFilters}
          onView={setSelectedPropertyId}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <Footer onNavigate={handleNavigate} />

      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedPropertyId(null)}
        onBookViewing={openBookViewing}
      />
    </div>
  );
}
