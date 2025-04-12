
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-safari-beige p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold font-heading text-safari-brown mb-4">404</h1>
          <p className="text-xl text-safari-darkbrown mb-8">
            Oops! This page seems to have wandered off into the wilderness.
          </p>
          <img 
            src="/public/lovable-uploads/fcb37ae0-1e7f-41e3-ae91-6e2fd118f583.png" 
            alt="Sumakh Safaris Logo" 
            className="h-24 mx-auto mb-8 opacity-70"
          />
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-safari-gold text-white rounded hover:bg-safari-brown transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
