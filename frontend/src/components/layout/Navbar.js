import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiSettings,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiCpu,
  FiImage,
  FiTrendingUp,
  FiWifi
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const services = [
  { name: 'Website Development', href: '/services/website-development', icon: FiGlobe },
  { name: 'iOS Development', href: '/services/ios-development', icon: FiSmartphone },
  { name: 'Android Development', href: '/services/android-development', icon: FiSmartphone },
  { name: 'SaaS Products', href: '/services/saas-products', icon: FiCode },
  { name: 'AI Solutions', href: '/services/ai-solutions', icon: FiCpu },
  { name: 'UI/UX Design', href: '/services/uiux-design', icon: FiImage },
  { name: 'Digital Marketing', href: '/services/digital-marketing', icon: FiTrendingUp },
  { name: 'IoT Solutions', href: '/services/iot-solutions', icon: FiWifi },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin } = useAuth();
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);


  const navRef = useRef(null);
  const servicesRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled
          ? isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isScrolled, isDark]);

  useEffect(() => {
    setIsOpen(false);
    setShowServices(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Career', href: '/career' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleServicesToggle = () => {
    setShowServices(!showServices);
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const servicesDropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className="navbar-container fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        isolation: 'isolate',
        background: 'transparent',
        backgroundColor: 'transparent',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg md:text-xl">T</span>
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text">Techtornix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`navbar-item px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                  ? 'active'
                  : ''
                  }`}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  opacity: isActive(item.href) ? 1 : 0.85,
                  fontWeight: isActive(item.href) ? 700 : 500
                }}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
              <button
                onClick={handleServicesToggle}
                className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname.startsWith('/services')
                  ? 'text-primary-600 active'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
              >
                <span>Services</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showServices ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showServices && (
                  <motion.div
                    ref={servicesRef}
                    variants={servicesDropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl border border-gray-800 overflow-hidden z-50"
                    style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
                  >
                    {services.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.name}
                          to={service.href}
                          className="flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200"
                          style={{
                            background: 'transparent',
                            color: '#fff',
                            opacity: 0.95,
                            fontWeight: 500,
                            boxShadow: 'none',
                            border: 'none'
                          }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                          onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                          onClick={() => setShowServices(false)}
                        >
                          <Icon className="w-5 h-5" style={{ color: '#fff' }} />
                          <span>{service.name}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Admin Dashboard Link */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:inline-flex btn-primary"
              >
                Dashboard
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 z-[99999] relative"
              style={{ position: 'relative', zIndex: 99999 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="mobile-menu-panel lg:hidden fixed inset-y-0 right-0 w-80 max-w-[90vw] overflow-y-auto"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000000,
              backgroundColor: '#130d29',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
              isolation: 'isolate'
            }}
          >
            <div className="p-6 h-full" style={{ backgroundColor: '#130d29' }}>
              <div className="flex items-center justify-between mb-8 pt-4 border-b-2 border-gray-200 pb-4">
                <span className="text-2xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: "#130d29",
                    color: "#ffffff"
                  }}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>


              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-6 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 relative z-10 border-2 mb-3 ${isActive(item.href)
                      ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                      : ''
                      }`}
                    style={{
                      background: isActive(item.href) ? '#2563eb' : 'transparent',
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.15)',
                      fontWeight: isActive(item.href) ? 700 : 500
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Services (Dropdown) */}
                <div className="border-t-2 border-gray-300 pt-6 mt-6">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 
             text-lg font-semibold uppercase tracking-wider mb-3
              text-white rounded-lg shadow-md hover:shadow-lg 
             active:scale-95 transition-all duration-300"
                  >
                    <span>Services</span>
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>


                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="flex items-center space-x-3 px-6 py-4 rounded-lg transition-colors duration-200 relative z-10 mb-3"
                              style={{
                                background: 'transparent',
                                color: '#fff',
                                border: 'none',
                                fontWeight: 600
                              }}
                              onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
                              onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon className="w-6 h-6" style={{ color: '#fff' }} />
                              <span>{service.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


                {/* Mobile Admin Link */}
                {isAuthenticated && isAdmin && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                    <Link
                      to="/admin"
                      className="block w-full btn-primary text-center"
                    >
                      Admin Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay lg:hidden fixed inset-0 bg-black bg-opacity-60"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
