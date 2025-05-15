
import { Camera, Shield, Compass, Award, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-6">
              About SUMAKH SAFARIS LTD
            </h2>
            <div className="w-24 h-1 bg-safari-gold mb-8"></div>
            <p className="text-lg text-safari-darkbrown mb-6">
              Based in Samburu County, SUMAKH SAFARIS LTD offers unforgettable wildlife adventures across Africa's most spectacular 
              landscapes. With over 15 years of experience, our team of Samburu guides ensures an authentic and immersive safari 
              experience that connects you with nature and traditional Samburu heritage.
            </p>
            <p className="text-lg text-safari-darkbrown mb-8">
              We are proud to showcase not only the magnificent wildlife but also the rich Samburu cultural traditions – from colorful beadwork 
              and traditional dances to age-old ceremonies and warrior traditions. Our commitment to sustainable tourism includes working closely with 
              local Samburu communities to preserve their cultural heritage while providing meaningful economic opportunities.
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
                src="/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png"
                alt="Safari experience" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png"
                alt="Safari wildlife" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png"
                alt="Safari landscape" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png"
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
    description: "Our guides are skilled in helping you capture perfect wildlife moments and Samburu cultural ceremonies."
  },
  {
    icon: <Shield size={24} />,
    title: "Safety First",
    description: "Comprehensive safety measures and experienced Samburu guides ensure your protection."
  },
  {
    icon: <Users size={24} />,
    title: "Cultural Immersion",
    description: "Authentic interactions with Samburu communities, traditional ceremonies, and local crafts."
  },
  {
    icon: <Compass size={24} />,
    title: "Local Knowledge",
    description: "Deep understanding of Samburu traditions, wildlife habitats, and sacred natural sites."
  },
  {
    icon: <Award size={24} />,
    title: "Award Winning",
    description: "Recognized for our cultural preservation efforts and sustainable tourism practices."
  }
];

export default AboutSection;
