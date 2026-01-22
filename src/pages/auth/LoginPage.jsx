import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastServerSError from "../../utils/errorHandler";
import { loginValidation } from "../../utils/validation/login";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [login, { data: response }] = useLoginMutation({});

  if (response?.accessToken) {
    localStorage.setItem("token", response?.accessToken);
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginValidation()),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data).unwrap();
      toast.success("تمت تسجبل الدخول بنجاح ", {
        position: "top-right",
        autoClose: 3000,
      });

      reset();
    } catch (err) {
      ToastServerSError(err);
    }
  };

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mx-auto title-login">تسجيل الدخول</label>
            <input
              placeholder="الايميل..."
              type="text"
              className="user-input my-3 text-center mx-auto"
              {...register("email")}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
            <input
              placeholder="كلمه السر..."
              type="password"
              className="user-input text-center mx-auto"
              {...register("password")}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
            <button type="submit" className="btn-login mx-auto mt-4">
              تسجيل الدخول
            </button>
          </form>
          <label className="mx-auto my-4">
            ليس لديك حساب ؟{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>
        </Col>

        <label className="mx-auto my-4">
          <Link to="/admin/allproducts" style={{ textDecoration: "none" }}>
            <span style={{ cursor: "pointer" }} className="text-danger">
              الدخول ادمن
            </span>
          </Link>

          <Link to="/user/allorders" style={{ textDecoration: "none" }}>
            <span style={{ cursor: "pointer" }} className="text-danger mx-3">
              الدخول مستخدم
            </span>
          </Link>
        </label>
      </Row>
    </Container>
  );
};

export default LoginPage;
