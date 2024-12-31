import './HeroSection.css';
import useAppContext from '@context/useAppContext';

function HeroSection() {
  const { whitelabel } = useAppContext();

  return (
    whitelabel.shop.heroSection.imgSrc.length > 0 && (
      <img
        src={whitelabel.shop.heroSection.imgSrc}
        className="hero-section-img"
        alt={whitelabel.shop.weAre}
      />
    )
  );
}

export default HeroSection;
