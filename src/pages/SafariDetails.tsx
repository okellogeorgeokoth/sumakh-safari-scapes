
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const SafariDetails = () => {
  const { tourId } = useParams();
  
  // This is a placeholder. In a real application, you would fetch this data from your API or database.
  const safariDetails = {
    title: "Safari Tour Details",
    description: "This page will show detailed information about the selected safari tour.",
    image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png"
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-safari-darkbrown mb-6">
            {safariDetails.title} - {tourId}
          </h1>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src={safariDetails.image}
              alt={safariDetails.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <p className="text-gray-700 mb-4">{safariDetails.description}</p>
              
              <div className="flex gap-4 mt-8">
                <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white">
                  <Link to="/booknow">Book This Safari</Link>
                </Button>
                <Button variant="outline" asChild className="border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-white">
                  <Link to="/safaris">Back to Safaris</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SafariDetails;
