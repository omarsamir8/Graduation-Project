import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./TitleAnimation.scss";

const TitleAnimation = ({ loading }) => {
  return (
    <div className="Loader">
      {loading ? <></> : null}

      <Spinner animation="grow" variant="primary" className="circle-loader " />
    </div>
  );
};

export default TitleAnimation;
