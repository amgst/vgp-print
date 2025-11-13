import { Link } from 'react-router-dom';
import { Printer, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Printer className="h-8 w-8 text-blue-500" />
              <span className="text-xl text-white">PrintPro</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner for all printing needs. Quality prints, fast turnaround, competitive prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Popular Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/business-cards" className="hover:text-blue-500 transition-colors">
                  Business Cards
                </Link>
              </li>
              <li>
                <Link to="/services/flyers-leaflets" className="hover:text-blue-500 transition-colors">
                  Flyers & Leaflets
                </Link>
              </li>
              <li>
                <Link to="/services/brochures" className="hover:text-blue-500 transition-colors">
                  Brochures
                </Link>
              </li>
              <li>
                <Link to="/services/posters" className="hover:text-blue-500 transition-colors">
                  Posters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>123 Print Street, Design City, DC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>info@printpro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 PrintPro Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
