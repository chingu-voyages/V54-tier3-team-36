const FooterWaves = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="block w-full h-36">
          <path
            fill="#004848"
            d="M0,128L48,106.7C96,85,192,43,288,42.7C384,43,480,85,576,128C672,171,768,213,864,213.3C960,213,1056,171,1152,144C1248,117,1344,107,1392,128L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="block w-full h-48">
          <path
            fill="#004848"
            d="M0,192L48,213.3C96,235,192,277,288,277C384,277,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,202.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="absolute top-0 right-0 h-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 1440"
          className="h-full w-full rotate-360">
          <path
            fill="#004848"
            d="M96,0L128,48C160,96,224,192,224,288C224,384,160,480,149.3,576C139,672,181,768,213.3,864C245,960,267,1056,245.3,1152C224,1248,160,1344,128,1392L96,1440L320,1440L320,0Z"></path>
        </svg>
      </div>

      <div className="absolute top-0 left-0 h-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 1440"
          className="h-full w-full rotate-270">
          <path
            fill="#004848"
            d="M96,0L128,48C160,96,224,192,224,288C224,384,160,480,149.3,576C139,672,181,768,213.3,864C245,960,267,1056,245.3,1152C224,1248,160,1344,128,1392L96,1440L0,1440L0,0Z"></path>
        </svg>
      </div>
    </>
  );
};

export default FooterWaves;
