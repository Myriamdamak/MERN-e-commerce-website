
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
 import { UserRole } from "../Utilities/UserRole";
"use client";
export function UserDropdown({ logoutHandler }) {
  const role = UserRole();
  
  return (
    <Dropdown label={role} dismissOnClick={false}>
      {role === "user" && (
      <Link to="/order-history">
        <Dropdown.Item>Order History</Dropdown.Item>
      </Link>
    )}
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}


// Prop validation for UserDropdown component
UserDropdown.propTypes = {
  logoutHandler: PropTypes.func.isRequired,  // Validates that logoutHandler is passed as a prop
};
