import ImageSlider from '@components/ImageSlider/ImageSlider';
import useSpecialOffers from '@features/HeroSection/useSpecialOffers';

function HeroSection() {
  const items = useSpecialOffers();

  return (
    <ImageSlider items={items} />
  );
}

export default HeroSection;
