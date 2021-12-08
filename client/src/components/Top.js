import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Nav,
  NavLink,
} from "reactstrap";
import { isAuthenticated, logout } from "../helpers";
const Top = () => {
  return (
    <div className="top">
      <Navbar color="light" expand fixed="top">
        <NavbarBrand href="/">Notes!</NavbarBrand>
        <NavbarToggler onClick={function implementIfNeeded() {}} />
        <Collapse navbar>
          <Nav className="me-auto"></Nav>
          <Nav className="nav-right">
            <NavItem>
              {isAuthenticated() ? (
                <NavLink onClick={logout} href="/">
                  Logout
                </NavLink>
              ) : (
                <NavLink href="/login">Login/Register</NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Top;
