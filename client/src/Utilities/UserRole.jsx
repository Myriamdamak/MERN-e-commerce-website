import { jwtDecode } from "jwt-decode";
export function UserRole() {
  const token = localStorage.getItem("token")?.trim();
  
  console.log("Retrieved token:", token);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
    
      return decodedToken.role;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }
  return null;
}
