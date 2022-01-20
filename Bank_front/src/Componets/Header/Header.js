import React, { useEffect, useMemo, useState, useContext } from "react";

import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Modal,
  Offcanvas,
  Navbar,
} from "react-bootstrap";

export const Header = (props) => {
  return (
    <div>
      <Navbar fixed="top" bg="light">
        <Navbar.Brand className="d-flex align-items-center justify-content-center">
          {" "}
          <div style={{ marginLeft: "10px" }}>{"Raifaissen"}</div>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};
