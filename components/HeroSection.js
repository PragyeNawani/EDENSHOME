'use client';

export default function HeroSection() {
  return (
    <div className="hero-container rounded-2xl w-[60%] order-2 sm:order-1">
      {/* Background image container */}
      {/* Text On Div */}
      <h1 className="absolute z-10 top-[8%] left-0 text-[37px] sm:text-[45px] md:text-[65px] lg:text-[41px] xl:text-[55px] w-full" style={{ color: '#241705' }}>EDENS HOME</h1>

      <h2 className="absolute z-10 top-[27%] left-0 text-[27px] sm:text-[35px] md:text-[45px] lg:text-[31px] xl:text-[40px] w-full" style={{ color: '#241705' }}>Launching Soon! For</h2>
      <h3 className="absolute z-10 top-[40%] left-0 text-[27px] sm:text-[35px] md:text-[45px] lg:text-[31px] xl:text-[40px] w-full" style={{ color: '#241705' }}>Delhi NCR</h3>
      {/* Top Left Overlay */}
      <div className="overlay-left">
      </div>

      {/* Top Center Overlay */}
      <div className="overlay-center">
      </div>
    </div>
  );
}
