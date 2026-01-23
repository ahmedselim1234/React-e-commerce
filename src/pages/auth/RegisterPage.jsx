import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSignupMutation } from "../../redux/features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastServerSError from "../../utils/errorHandler";
import { signupValidation } from "../../utils/validation/signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";


const RegisterPage = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { data: response }] = useSignupMutation({});

  if (response?.accessToken) {
    localStorage.setItem("token", response?.accessToken);
    localStorage.setItem("user", JSON.stringify(response?.user));
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupValidation()),
  });

  const onSubmit = async (data) => {
    try {
    const result =  await signup(data).unwrap();

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
      <Row className="py-5 d-flex justify-content-center hieght-search">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">تسجيل حساب جديد</label>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              placeholder="اسم المستخدم..."
              type="text"
              className="user-input mt-3 text-center mx-auto"
              {...register("first_name")}
            />
            {errors.first_name && (
              <span className="error-text">{errors.first_name.message}</span>
            )}
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
              تسجيل الحساب
            </button>
          </form>
          <label className="mx-auto my-4">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
