import React from 'react';
import LoadingLogo from '../loadingLogo/LoadingLogo.js';

import './Styles.scss';

const Button = (props) => {
  return (
    <div className={"submitButton"} onClick={props.handleSubmit} >
      {props.label}
      <LoadingLogo loadingActive={props.loadingActive} />
    </div>
  )
}

export default Button;