import { Navbar, Container, FormControl, Nav, Dropdown } from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

   const handleLogout = () => {
    dispatch(logout());
      navigate("/");
  };

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" alt="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto flex flex-row">
            {user ? (
              <Dropdown ref={menuRef}>
                <Dropdown.Toggle
                  variant="link"
                  className="nav-text d-flex mt-3 justify-content-center text-decoration-none"
                  style={{ color: "white" }}
                >
                  <img src={login} className="login-img" alt="user" />
                  <p style={{ color: "white", margin: 0 }}>
                    {user.name || "المستخدم"}
                  </p>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item href="/user/profile">الملف الشخصي</Dropdown.Item>
                  <Dropdown.Item href="/orders">طلباتي</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="login" />
                <p style={{ color: "white", margin: 0 }}>دخول</p>
              </Nav.Link>
            )}

            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-3 justify-content-center"
              style={{ color: "white" }}
            >
              <img src={cart} className="login-img" alt="cart" />
              <p style={{ color: "white", margin: 0 }}>العربة</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
