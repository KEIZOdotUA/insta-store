import './AboutPage.css';
import useAppContext from '@context/useAppContext';
import Heading from '@components/Heading/Heading';
import parse from 'html-react-parser';

function AboutPage() {
  const { whitelabel } = useAppContext();

  return (
    <div className="about">
      <center><Heading>ПРО НАС</Heading></center>
      {parse(whitelabel.shop.about)}
    </div>
  );
}

export default AboutPage;
