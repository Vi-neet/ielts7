import { Instagram, Facebook, Youtube, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo and Main Content Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <img
              src="/icon.webp"
              alt="IELTS Academy Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-white">IELTS 7+ house</span>
          </div>
          <p className="text-sm leading-relaxed">
            Your journey to IELTS Band 7+ starts here. Let&apos;s work together
            to unlock your global future and make your international dreams a
            reality.
          </p>
          <p className="text-xs">
            Copyright &copy; {currentYear} IELTS Academy. All rights reserved.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/free/general_reading"
                className="hover:text-white transition-colors"
              >
                Tests
              </a>
            </li>
            <li>
              <a
                href="/evaluation"
                className="hover:text-white transition-colors"
              >
                Get your writings reviewed
              </a>
            </li>
            <li>
              <a
                href="/watchNlearn"
                className="hover:text-white transition-colors"
              >
                Free Resources
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Column */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
          <address className="not-italic space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="footer-el">334 King St N, Waterloo, ON N2J 2Z2 </p>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="footer-el">252, Block A3, Janakpuri, Delhi, 110058 </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <a
                href="tel:+1234567890"
                className="hover:text-white transition-colors footer-el"
              >
                +91 81780 55015
              </a>
            </div>
          </address>
        </div>

        {/* Social Links Column */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Connect With Us
          </h3>
          <div className="space-y-4">
            <p className="text-sm">
              Follow us on social media for daily IELTS tips, success stories,
              and study resources.
            </p>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.instagram.com/ielts_7plus_house/"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/IELTS-7-house/61561875090567/"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@harsharannarula7868"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
