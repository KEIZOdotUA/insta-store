import React from 'react';
import './Bio.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function Bio() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="bio">
      <h2>
        {whitelabel.shop.description}
      </h2>
      Замовлення на сайті або
      <a href={whitelabel.instagramProfile.url}> intagram сторінці</a>
      <br />
      {whitelabel.shop.bulletPoints.map((item) => (
        <React.Fragment key={item}>
          {item}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Bio;
