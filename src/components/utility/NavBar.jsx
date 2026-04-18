import { Navbar, Container, FormControl, Nav, Dropdown } from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { logout } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

const handleChange = (e) => {
  const value = e.target.value;
  navigate(`/products?keyword=${value}`);
};

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search */}
          <FormControl
            onChange={handleChange}
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />

          {/* Right Side Nav */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* User */}
            {user ? (
              <Dropdown align="end" ref={menuRef}>
                <Dropdown.Toggle
                  as="div"
                  className="nav-text d-flex align-items-center text-white"
                  style={{ cursor: "pointer" }}
                >
                  <img src={login} className="login-img me-1" alt="user" />
                  <span>{user.name || "المستخدم"}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/user/profile">
                    الملف الشخصي
                  </Dropdown.Item>

                  <Dropdown.Item as={Link} to="/orders">
                    طلباتي
                  </Dropdown.Item>

                  {user.role === "admin" && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/admin/allproducts">
                        الداشبورد
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    تسجيل الخروج
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="nav-text d-flex align-items-center text-white"
              >
                <img src={login} className="login-img me-1" alt="login" />
                <span>دخول</span>
              </Nav.Link>
            )}

            {/* Cart */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="nav-text d-flex align-items-center text-white"
            >
              <img src={cart} className="login-img me-1" alt="cart" />
              <span>العربة</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
