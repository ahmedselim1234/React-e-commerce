import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useVerifyCodeMutation } from "../../redux/features/auth/authApiSlice";
import ToastServerSError from "../../utils/errorHandler";

const verifyCodeValidation = z.object({
  code: z.string().min(1, "اكتب الكود الصحيح"),
});

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, disabled },
  } = useForm({
    resolver: zodResolver(verifyCodeValidation),
  });

  const onSubmit = async (data) => {
    try {
      const result = await verifyCode({ enteredCode: data.code }).unwrap();

      toast.success(result?.message);
      setTimeout(() => navigate("/reset-password"), 1000);
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
            <h4 className="text-center mb-4">تحقق من الكود</h4>

            <input
              type="text"
              placeholder="أدخل الكود المرسل للإيميل"
              className="user-input text-center mb-2"
              {...register("code")}
            />
            {errors.code && (
              <span className="error-text text-center">
                {errors.code.message}
              </span>
            )}

            <button
              type="submit"
              className="btn-login mt-3"
              disabled={disabled}
            >
              تحقق من الكود
            </button>
          </form>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              جاري التحقق ...
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyCodePage;
