import './About.css';
import useAppContext from '@contexts/App/useAppContext';
import Heading from '@components/shared/Heading/Heading';
import parse from 'html-react-parser';

function About() {
  const { whitelabel } = useAppContext();

  return (
    <main className="about">
      <center><Heading>ПРО НАС</Heading></center>
      {parse(whitelabel.shop.about)}
    </main>
  );
}

export default About;
