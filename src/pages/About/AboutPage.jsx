import useAppContext from '@context/useAppContext';
import Heading from '@components/Heading/Heading';
import parse from 'html-react-parser';

function AboutPage() {
  const { whitelabel } = useAppContext();

  return (
    <div className="text-page">
      <Heading>ПРО НАС</Heading>
      {parse(whitelabel.shop.about)}
    </div>
  );
}

export default AboutPage;
