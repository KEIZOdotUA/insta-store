import './ShareButton.css';
import PropTypes from 'prop-types';
import Button from '@components/Button/Button';
import ShareSvg from '@assets/share.svg';

function ShareButton({ title, text, url }) {
  const share = () => {
    navigator.share({
      title,
      text,
      url,
    });
  };

  return (
    navigator.share && (
      <Button className="share-button" onClick={share}>
        <ShareSvg />
      </Button>
    )
  );
}

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ShareButton;
