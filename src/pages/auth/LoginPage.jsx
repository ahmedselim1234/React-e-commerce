import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastServerSError from "../../utils/errorHandler";
import { loginValidation } from "../../utils/validation/login";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

import { useDispatch } from "react-redux";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation({});

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
      const result = await login(data).unwrap();

      toast.success("تمت عمل  الحساب بنجاح ", {
        position: "top-right",
        autoClose: 1000,
      });

      dispatch(
        setCredentials({
          user: result?.user,
          token: result?.accessToken,
        }),
      );

      

      setTimeout(() => {
        navigate("/");
      }, 1000);

      reset();
    } catch (err) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      ToastServerSError(err);
    }
  };

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
        </label>
      </Row>
    </Container>
  );
};

export default LoginPage;
