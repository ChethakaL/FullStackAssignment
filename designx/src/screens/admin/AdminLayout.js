import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <nav className="navbar">
        <div class="container">
          <div class="logo">
            <img src="../assets/Logo.png" alt="Logo" width="120px"/>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div class="icons">
            <a href="#"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-shopping-cart"></i></a>
            <a href="#"><i class="fa fa-user"></i></a>
          </div>
        </div>
      </nav>
      <div className="admin-layout">
        <div className="sidebar-layout">
            <AdminSidebar height={'100%'}/>
        </div>
        <div className="admin-main">
            <Outlet />
        </div>
      </div>
    </>
  )
};

export default AdminLayout;