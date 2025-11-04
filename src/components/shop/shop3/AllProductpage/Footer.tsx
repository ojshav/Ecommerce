import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full bg-black flex justify-center items-start py-10 md:py-16 px-2 sm:px-4 md:px-8">
    <div className="w-full max-w-[1380px] flex flex-col md:flex-row justify-between items-start px-0 md:px-8 gap-8 md:gap-0">
      {/* Left: Brand Description */}
      <div className="w-full md:w-[400px] min-w-[200px] md:min-w-[300px] mr-0 md:mr-12 mb-8 md:mb-0">
        <div className="text-[#CCFF00] text-2xl sm:text-[35px] font-bebas mb-2">AOIN</div>
        <div className="text-[#939393] text-sm sm:text-[16px] font-normal leading-relaxed">
          Aoin is a Sydney streetwear brand outfitin<br />
          inspired indonesian with premium clothing that<br />
          has a minimalist edge.
        </div>
      </div>
      {/* Right: Link Columns */}
      <div className="flex flex-col font-alexandria sm:flex-row gap-8 sm:gap-12 md:gap-20 max-w-4xl ml-0 md:ml-auto w-full md:w-auto">
        {/* Column 1 
        <div className="flex flex-col gap-2 sm:gap-4">
          <span className="text-white font-bold text-[16px] mb-1">COLLECTION</span> */}
          {/*<Link to="/shop3/man" className="text-white font-bold  text-[16px] hover:text-[#CCFF00]">MAN</Link>
          <Link to="/shop3/woman" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">WOMAN</Link>
          <Link to="/shop3/kids" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">KIDS</Link>
          <Link to="/shop3" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">SHOP</Link> */}
        {/* </div> */}
        
        {/* Column 2 */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <Link to="/shop3/refund" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">REFUND</Link>
          <Link to="/shop3" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">SHOP</Link>
          {/* <Link to="/shop3/size-chart" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">SIZE CHART</Link> */}
          <Link to="/shop3/blog" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">BLOG</Link>
          <Link to="/shop3/about" className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]">ABOUT</Link>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <a
            href="https://www.instagram.com/aoin.in?igsh=NGk3dml2ZHk2cjM4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white font-bold text-base  text-[16px] hover:text-[#CCFF00]"
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61578809217780"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]"
          >
            FACEBOOK
          </a>
         
          <a
            href="https://x.com/AOIN111111"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-white font-bold text-base text-[16px] hover:text-[#CCFF00]"
          >
            TWITTER
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
