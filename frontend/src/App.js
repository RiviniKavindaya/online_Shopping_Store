import "./App.css";
import AddProduct from "./Pages/Admin/AddProduct";
import Admin from "./Pages/Admin/Admin";
import AllProducts from "./Pages/Admin/Product/AllProducts";
import EditProduct from "./Pages/Admin/Product/EditProduct";
import Orders from "./Pages/Admin/Orders";
import Users from "./Pages/Admin/User/Users";
import Login from "./Pages/Login";
import Order from "./Pages/Order";
import Products from "./Pages/Products";
import Register from "./Pages/Register";
import { Routes,Route } from "react-router-dom";
import EditUser from "./Pages/Admin/User/EditUser";

function App() {
  
  return(
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order" element={<Order />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin/> } />
        <Route path="/admin/orders" element={ <Orders/> } />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/allproducts" element={<AllProducts/>}/>
        <Route path="/admin/editproduct/:id" element={<EditProduct />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/edituser/:userId" element={<EditUser />} />
      </Routes>
  )
}

export default App;
