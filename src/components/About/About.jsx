import './About.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import parse from 'html-react-parser';

function About() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="about">
      <h1>Про нас</h1>
      {parse(whitelabel.shop.about)}
    </div>
  );
}

export default About;
