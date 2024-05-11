import React from 'react';
import './Bio.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function WeAre() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="bio">
      <h2>{whitelabel.shop.name}</h2>
      {whitelabel.shop.description.split('\n').map((item) => (
        <React.Fragment key={item}>
          {item}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

export default WeAre;
