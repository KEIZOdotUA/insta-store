import './ShareButton.css';
import PropTypes from 'prop-types';
import Button from '@components/Button/Button';
import ShareSvg from '@assets/share.svg';

function ShareButton({
  title,
  text,
  url,
  onShare,
}) {
  const onClick = () => {
    onShare();
    navigator.share({
      title,
      text,
      url,
    });
  };

  return (
    navigator.share && (
      <Button className="share-button" onClick={onClick}>
        <ShareSvg />
      </Button>
    )
  );
}

ShareButton.defaultProps = {
  onShare: () => {},
};

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onShare: PropTypes.func,
};

export default ShareButton;
