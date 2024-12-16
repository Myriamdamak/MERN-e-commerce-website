
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/PlaceOrder";
import OrderConfirmation from "./pages/OrderConfirm";
import { OrderHistory } from "./pages/OrderHistory";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./Utilities/PrivateRoute";

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/admindash" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>}></Route>
          <Route exact path="/products/:id" element={<PrivateRoute allowedRoles={["user"]}><ProductDetail /></PrivateRoute>}>
           </Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
            <Route 
            path="/order/:id" 
            element={
              <PrivateRoute allowedRoles={['user']}>
            <OrderConfirmation /> 
            </PrivateRoute>
          
        } />
          <Route path="/order-history" element={<PrivateRoute allowedRoles={['user']}><OrderHistory /></PrivateRoute> } />

          <Route exact path="/checkout" element={<PrivateRoute allowedRoles={['user']}><Checkout /></PrivateRoute>}></Route>
          <Route exact path="/placeorder" element={<PrivateRoute allowedRoles={['user']}><PlaceOrder /></PrivateRoute>}> </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
