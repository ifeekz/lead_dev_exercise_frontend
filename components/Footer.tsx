
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from 'react-bootstrap';

export default (props: any) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section ps-3 pe-3 py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright &copy; {`${currentYear} `} | {' '} 
              <Card.Link href="https://olist.ng" target="_blank" className="text-blue text-decoration-none fw-normal">
                Powered by Olist data
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="#" target="_blank">
                  Terms
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="#" target="_blank">
                  Privacy Policy
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="#" target="_blank">
                  Data Protection
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="#" target="_blank">
                  Contact
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
