
const AboutUs = () => {
  return (
    <section className="min-h-screen bg-background py-[10%] px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          About Us
        </h2>
        <p className="text-white/40 text-lg max-w-3xl mx-auto mb-12">
          We are a team of passionate individuals committed to delivering high-quality
          solutions. Our mission is to innovate, inspire, and empower our clients
          through modern technology and creative thinking.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/4 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-white/80 mb-2">Our Vision</h3>
            <p className="text-white/70">
              To create seamless experiences that drive value and foster innovation
              across all sectors.
            </p>
          </div>

          <div className="bg-white/4 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-white/80 mb-2">Our Mission</h3>
            <p className="text-white/70">
              To provide solutions that empower businesses and individuals to
              achieve their full potential through cutting-edge technology.
            </p>
          </div>

          <div className="bg-white/4 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-white/80 mb-2">Our Values</h3>
            <p className="text-white/70">
              Innovation, integrity, and collaboration guide everything we do,
              ensuring quality and trust in every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
