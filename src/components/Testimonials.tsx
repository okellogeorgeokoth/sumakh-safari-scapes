
import { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
    testimonial: "Our Serengeti safari exceeded all expectations! The wildlife sightings were incredible, and our guide's knowledge made the experience even more special. The accommodations were comfortable and authentic. We'll definitely book with SUMAKH again!"
  },
  {
    id: 2,
    name: "David Chen",
    location: "Australia",
    rating: 5,
    testimonial: "The Masai Mara tour was a life-changing experience. We saw the big five in just two days! The staff was professional and friendly, making us feel safe and comfortable throughout the journey. The sunset views were absolutely breathtaking."
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Spain",
    rating: 5,
    testimonial: "From the moment we were picked up at the airport, SUMAKH provided top-notch service. Our family safari to Kruger Park was perfectly organized with attention to every detail. The kids loved the special activities arranged for them, and we all enjoyed the close wildlife encounters."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-safari-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-darkbrown">
            Read testimonials from travelers who have experienced unforgettable moments with SUMAKH SAFARIS LTD.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative z-10">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#C8A355" color="#C8A355" />
                ))}
              </div>
              <blockquote className="text-safari-darkbrown italic mb-6 text-lg">
                "{testimonials[activeIndex].testimonial}"
              </blockquote>
              <div>
                <h4 className="font-bold text-xl text-safari-brown">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-safari-brown">
                  {testimonials[activeIndex].location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-safari-beige transition-colors z-20"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} className="text-safari-brown" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-safari-beige transition-colors z-20"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} className="text-safari-brown" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? "bg-safari-gold" : "bg-safari-brown opacity-30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
