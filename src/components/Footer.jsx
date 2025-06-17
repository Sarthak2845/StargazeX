const Footer = () => {
  return (
    <footer className="relative bg-gray-950  pt-20 pb-10 overflow-hidden">
      {/* SVG as background */}
      <img
        src="/wave.svg"
        alt="Wave Divider"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30" // You can adjust opacity
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-['Orbitron'] mb-2 bg-gradient-to-l from-[#FF00FF] via-[#FF8000] to-[#FF0080] bg-clip-text text-transparent">StarGazeX</h2>
        <p className="text-gray-400 mb-4">Explore the cosmos, connect under the stars.</p>
        <p className="text-sm text-gray-500 mt-6">© {new Date().getFullYear()} StarGazeX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
