import React from 'react';

import './ErrorMessage.scss';

function ErrorMessage({ msg, clear }) {
  return (
    <div className='error-msg'>
      <p>{msg}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default ErrorMessage;
