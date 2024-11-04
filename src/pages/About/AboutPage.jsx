import './AboutPage.css';
import useAppContext from '@contexts/App/useAppContext';
import Heading from '@components/shared/Heading/Heading';
import parse from 'html-react-parser';

function AboutPage() {
  const { whitelabel } = useAppContext();

  return (
    <main className="about">
      <center><Heading>ПРО НАС</Heading></center>
      {parse(whitelabel.shop.about)}
    </main>
  );
}

export default AboutPage;
