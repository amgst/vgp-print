import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { AdminGalleries } from './pages/AdminGalleries';
import { AdminOrders } from './pages/AdminOrders';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/galleries" element={<AdminGalleries />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          
          {/* Public Routes - With Navbar/Footer */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:serviceId" element={<ServiceDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}