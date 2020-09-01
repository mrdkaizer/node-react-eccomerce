import React from "react";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3 align-self-center"></div>
        <div className="col-md-6 d-flex justify-content-center">
          <h2>PAGE NOT FOUND</h2>
        </div>
        <div className="col-md-3"></div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-3 align-self-center"></div>
        <div className="col-md-6 d-flex justify-content-center">
          The page you requested does not exist.
        </div>
        <div className="col-md-3"></div>
      </div>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-3 align-self-center"></div>
        <div className="col-md-6 d-flex justify-content-center">
          <Button href="/" variant="primary" className="p-3" type="submit">
            CONTINUE SHOPPING
          </Button>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default NotFound;
