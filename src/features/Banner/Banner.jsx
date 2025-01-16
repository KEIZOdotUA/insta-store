import './Banner.css';
import { Link } from 'react-router-dom';
import useBanner from '@features/Banner/useBanner';

function Banner() {
  const banner = useBanner();

  return (
    <div className="banner__placeholder">
      {banner && (
        <Link to={banner.link}>
          <div className="banner">
            <div
              className="banner__content"
              style={{
                backgroundColor: banner.backgroundColor,
                color: banner.color,
              }}
            >
              {banner.text}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Banner;
