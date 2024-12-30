import HeroSection from '@features/HeroSection/HeroSection';
import ProductsList from '@features/Product/List/ProductsList';
import Bio from '@features/Bio/Bio';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsList short filtered />
      <Bio />
      <ProductsList short />
    </>
  );
}

export default HomePage;
