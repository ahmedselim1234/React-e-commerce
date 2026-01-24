import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApiSlice";

import { z } from "zod";
import ToastServerSError from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";

const forgetPasswordValidation = z.object({
  email: z.string().email("الايميل غير صحيح"),
});

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode:"onChange",
    resolver: zodResolver(forgetPasswordValidation),
  });

  const onSubmit = async (data) => {
    try {
      const result = await forgetPassword(data).unwrap();
      toast.success(result?.message);
      setTimeout(() => {
        navigate("/verifycode");
      }, 2000);
    } catch (err) {
      ToastServerSError(err);
    }
  };

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 justify-content-center">
        <Col sm="6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column"
          >
            <label className="title-login text-center mb-4">
              نسيت كلمة المرور
            </label>

            <input
              placeholder="ادخل الايميل"
              className="user-input text-center"
              {...register("email")}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}

            <button className="btn-login mt-4">إرسال</button>
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

export default ForgetPassword;
