import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useResetPasswordMutation } from "../../redux/features/auth/authApiSlice";
import ToastServerSError from "../../utils/errorHandler";

const resetPasswordValidation = z
  .object({
    email: z.string().email("الايميل غير صحيح"),

    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["confirmPassword"],
  });

const ResetPasswordPage = () => {
  const { token } = useParams(); // Token من اللينك
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, disabled },
  } = useForm({
    mode:"onChange",
    resolver: zodResolver(resetPasswordValidation),
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const result = await resetPassword({
        token,
        password: data.password,
        email: data.email,
      }).unwrap();
      toast.success(result?.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      ToastServerSError(err);
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col sm="10" md="6" lg="4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 shadow rounded d-flex flex-column"
          >
            <h4 className="text-center mb-4">إعادة تعيين كلمة المرور</h4>

            <input
              type="email"
              placeholder="الايميل "
              className="user-input text-center mb-2"
              {...register("email")}
            />
            {errors.email && (
              <span className="error-text text-center">
                {errors.email.message}
              </span>
            )}

            <input
              type="password"
              placeholder="كلمة المرور الجديدة"
              className="user-input text-center mb-2"
              {...register("password")}
            />
            {errors.password && (
              <span className="error-text text-center">
                {errors.password.message}
              </span>
            )}

            <input
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
              className="user-input text-center mb-2"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="error-text text-center">
                {errors.confirmPassword.message}
              </span>
            )}

            <button
              disabled={disabled}
              type="submit"
              className="btn-login mt-3"
            >
              تحديث كلمة المرور
            </button>
          </form>
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              جاري ارسال الكود...
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
