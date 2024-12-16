
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { UserRole } from "./UserRole";

function PrivateRoute({ children, allowedRoles }) {
  
  const role = UserRole();
 
  
  console.log(role);
  if (role) {
    return (
      <div>{allowedRoles.includes(role) ? children : <Navigate to="/" />}</div>
    );
  } else {
    // No valid token or role, redirect to the login page
    return <Navigate to="/login" />; // Adjust the redirect route as needed
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React element or valid renderable node
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensures allowedRoles is an array of strings
};

export default PrivateRoute;
