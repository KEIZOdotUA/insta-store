import PropTypes from 'prop-types';
import Button from '@components/shared/Button/Button';
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
      <Button onClick={share}>
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
