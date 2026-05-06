import { Mail, Phone, MapPin } from 'lucide-react';

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Gurukula</h2>
          <p className="text-sm leading-relaxed">
            Empowering students with industry-leading computer training. Join us to build your future in tech.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 text-sm">
              <MapPin size={18} className="text-blue-400" />
              <span>Shri Gurusanidhya Building, Near Bharat Petrol Pump, Belthangady – 574214</span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
              <Phone size={18} className="text-blue-400" />
              <span>+91 6366564639</span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
              <Mail size={18} className="text-blue-400" />
              <span>info@gurukula.edu</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300">
              <FacebookIcon size={20} />
            </a>
            <a href="https://www.instagram.com/gurukulabelthangady/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300">
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyrights */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Gurukula Computer Training Center. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;