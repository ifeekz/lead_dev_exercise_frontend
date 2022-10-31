
import React from 'react';
import { Image } from 'react-bootstrap';

import ReactLogo from "../assets/images/technologies/react-logo-transparent.svg";

export default (props: any) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} />
    </div>
  );
};
