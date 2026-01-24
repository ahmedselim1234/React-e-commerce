import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import ToastServerSError from "../../utils/errorHandler";
import { loginValidation } from "../../utils/validation/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

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
    try {
      const result = await login(data).unwrap();

      toast.success("تم تسجيل الدخول بنجاح", {
        position: "top-right",
        autoClose: 1500,
      });

      dispatch(
        setCredentials({
          user: result?.user,
          token: result?.accessToken,
        }),
      );

      reset();
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      localStorage.clear();
      ToastServerSError(err);
    }
  };


  return (
  <Container fluid className="min-vh-100">
    <Row className="justify-content-center align-items-center min-vh-100">
      <Col sm="10" md="6" lg="4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column p-4 shadow rounded bg-white"
        >
          <h4 className="text-center mb-4 title-login">
            تسجيل الدخول
          </h4>

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="user-input text-center mb-2"
            {...register("email")}
          />
          {errors.email && (
            <span className="error-text text-center mb-2">
              {errors.email.message}
            </span>
          )}

          <input
            type="password"
            placeholder="كلمة المرور"
            className="user-input text-center mb-2"
            {...register("password")}
          />
          {errors.password && (
            <span className="error-text text-center mb-2">
              {errors.password.message}
            </span>
          )}

          <button type="submit" className="btn-login mt-3">
            تسجيل الدخول
          </button>

          <Link
            to="/forgetpassword"
            className="text-center text-danger mt-3"
            style={{ textDecoration: "none" }}
          >
            نسيت كلمة المرور؟
          </Link>

          <div className="text-center mt-3">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-danger">
              إنشاء حساب
            </Link>
          </div>
        </form>
      </Col>
    </Row>
  </Container>
);

};

export default LoginPage;
