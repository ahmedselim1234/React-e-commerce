
import {
  useGetUserQuery,
  useUpdatePasswordMutation,
} from "../../redux/features/user/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import ToastServerSError from "../../utils/errorHandler";

//  Zod Schema
const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    newPassword: z
      .string()
      .min(6, "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

const UserProfile = () => {
  const { data, isLoading: userLoading } = useGetUserQuery();
  const user = data?.data;

  const [updatePassword, { isLoading: updating }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updatePassword({
        currentPassword: data.currentPassword,
        password: data.newPassword,
        confermPassword: data.confirmPassword,
        
      }).unwrap();

      toast.success("تم تغيير كلمة المرور بنجاح!");
      reset();
    } catch (err) {
      ToastServerSError(err);
    }
  };

  if (userLoading)
    return <div className="text-center p-4">جاري التحميل...</div>;

  return (
    <div>
      <div className="admin-content-text mb-3">الصفحة الشخصية</div>

      {/* User Info */}
      <div className="user-address-card my-3 px-4 py-3">
        <div className="mb-3">
          <span className="text-muted">الاسم: </span>
          <span className="fw-bold">{user?.first_name}</span>
        </div>

        {user?.phone && (
          <div className="mb-3">
            <span className="text-muted">رقم الهاتف: </span>
            <span className="fw-bold">{user.phone}</span>
          </div>
        )}

        <div className="mb-3">
          <span className="text-muted">البريد الإلكتروني: </span>
          <span className="fw-bold">{user?.email}</span>
        </div>
      </div>

      {/* Change Password */}
      <div className="user-address-card my-3 px-4 py-3">
        <div className="admin-content-text mb-3">تغيير كلمة المرور</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="mb-3">
            <input
              type="password"
              {...register("currentPassword")}
              className={`input-form ${errors.currentPassword ? "border-danger" : ""}`}
              placeholder="كلمة المرور القديمة"
            />
            {errors.currentPassword && (
              <small className="text-danger d-block mt-1">
                {errors.currentPassword.message}
              </small>
            )}
          </div>

          {/* New Password */}
          <div className="mb-3">
            <input
              type="password"
              {...register("newPassword")}
              className={`input-form ${errors.newPassword ? "border-danger" : ""}`}
              placeholder="كلمة المرور الجديدة"
            />
            {errors.newPassword && (
              <small className="text-danger d-block mt-1">
                {errors.newPassword.message}
              </small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              {...register("confirmPassword")}
              className={`input-form ${errors.confirmPassword ? "border-danger" : ""}`}
              placeholder="تأكيد كلمة المرور الجديدة"
            />
            {errors.confirmPassword && (
              <small className="text-danger d-block mt-1">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={updating} className="btn-save">
            {updating ? "جاري الحفظ..." : "حفظ كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
