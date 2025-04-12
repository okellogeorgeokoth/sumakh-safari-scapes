
import { Camera, Shield, Compass, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-6">
              About SUMAKH SAFARIS
            </h2>
            <div className="w-24 h-1 bg-safari-gold mb-8"></div>
            <p className="text-lg text-safari-darkbrown mb-6">
              SUMAKH SAFARIS offers unforgettable wildlife adventures across Africa's most spectacular landscapes. 
              With over 15 years of experience, our team of expert guides ensures an authentic and immersive safari 
              experience that connects you with nature and local cultures.
            </p>
            <p className="text-lg text-safari-darkbrown mb-8">
              We are committed to sustainable tourism and conservation efforts, working closely with local 
              communities and wildlife preservation initiatives to protect the magnificent ecosystems we visit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 p-3 bg-safari-beige rounded-full text-safari-brown">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="font-bold font-heading text-lg mb-2">{advantage.title}</h3>
                    <p className="text-safari-darkbrown">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/public/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png"
                alt="Safari experience" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="/public/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png"
                alt="Safari wildlife" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/public/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png"
                alt="Safari landscape" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="/public/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png"
                alt="Safari animals" 
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const advantages = [
  {
    icon: <Camera size={24} />,
    title: "Photography Expertise",
    description: "Our guides are skilled in helping you capture perfect wildlife moments."
  },
  {
    icon: <Shield size={24} />,
    title: "Safety First",
    description: "Comprehensive safety measures and experienced guides ensure your protection."
  },
  {
    icon: <Compass size={24} />,
    title: "Local Knowledge",
    description: "Deep understanding of wildlife habitats and animal behavior patterns."
  },
  {
    icon: <Award size={24} />,
    title: "Award Winning",
    description: "Recognized for our sustainable tourism practices and excellent service."
  }
];

export default AboutSection;
