import React from "react";
import { withRouter } from "react-router";
import { Navbar, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Container className="navbar">
        <Navbar>
          <Row>
            <Link className="fw anchor" to="/">
              &nbsp; Hacker News
            </Link>
          </Row>
          <Row className="ml-auto">
            
          </Row>
        </Navbar>
      </Container>
    </div>
  );
}

export default withRouter(Header);
