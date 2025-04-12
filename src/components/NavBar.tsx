
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-safari-darkbrown shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/public/lovable-uploads/fcb37ae0-1e7f-41e3-ae91-6e2fd118f583.png" 
              alt="Sumakh Safaris Logo" 
              className="h-16 md:h-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/safaris" label="Safaris" />
            <NavLink href="/destinations" label="Destinations" />
            <NavLink href="/gallery" label="Gallery" />
            <NavLink href="/about" label="About" />
            <NavLink href="/contact" label="Contact" />
            <button className="px-6 py-2 bg-safari-gold text-white rounded hover:bg-safari-brown transition-colors">
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-safari-brown focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X size={28} className={scrolled ? "text-white" : "text-safari-darkbrown"} />
            ) : (
              <Menu size={28} className={scrolled ? "text-white" : "text-safari-darkbrown"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-safari-beige">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" label="Home" onClick={toggleMobileMenu} />
              <MobileNavLink href="/safaris" label="Safaris" onClick={toggleMobileMenu} />
              <MobileNavLink href="/destinations" label="Destinations" onClick={toggleMobileMenu} />
              <MobileNavLink href="/gallery" label="Gallery" onClick={toggleMobileMenu} />
              <MobileNavLink href="/about" label="About" onClick={toggleMobileMenu} />
              <MobileNavLink href="/contact" label="Contact" onClick={toggleMobileMenu} />
              <button className="w-full px-6 py-3 bg-safari-gold text-white rounded hover:bg-safari-brown transition-colors">
                Book Now
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link to={href} className="text-lg font-medium hover:text-safari-gold transition-colors text-white">
      {label}
    </Link>
  );
};

const MobileNavLink = ({ 
  href, 
  label, 
  onClick 
}: { 
  href: string; 
  label: string; 
  onClick: () => void;
}) => {
  return (
    <Link 
      to={href} 
      className="text-xl font-medium text-safari-darkbrown hover:text-safari-gold transition-colors py-2"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavBar;
