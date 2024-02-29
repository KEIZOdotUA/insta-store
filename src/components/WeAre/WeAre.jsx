import React from 'react';
import './WeAre.css';
import useWhitelabelContext from '@context/useWhitelabelContext';
import LogoAndLink from './LogoAndLink/LogoAndLink';

function WeAre() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="weAre">
      <LogoAndLink />
      <div id="text-container">
        <h2>{whitelabel.shop.name}</h2>
        {whitelabel.shop.description.split('\n').map((item) => (
          <React.Fragment key={item}>
            {item}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default WeAre;
