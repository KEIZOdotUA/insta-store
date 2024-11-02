import './About.css';
import useAppContext from '@contexts/App/useAppContext';
import parse from 'html-react-parser';

function About() {
  const { whitelabel } = useAppContext();

  return (
    <div id="about">
      <center><h1>ПРО НАС</h1></center>
      {parse(whitelabel.shop.about)}
    </div>
  );
}

export default About;
