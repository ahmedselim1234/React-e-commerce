import { Row, Col } from "react-bootstrap";
import avatar from "../../images/avatar.png";
import { AddCategorySchema } from "../../utils/validation/createCategoryValidation";
import { useAddBrandMutation } from "../../redux/features/brand/brandSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastServerSError from "../../utils/errorHandler";
import { toast } from "react-toastify";
import { useState } from "react";

const AdminAddBrand = () => {
  const [img, setImg] = useState(avatar);
  const [addBrand, { isLoading }] = useAddBrandMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(AddCategorySchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await addBrand(data).unwrap();

      toast.success("تمت إضافة التصنيف بنجاح ", {
        position: "top-right",
        autoClose: 3000,
      });

      reset();
      setImg(avatar);
    } catch (err) {
      ToastServerSError(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-start ">
          <div className="admin-content-text pb-4">اضف ماركه جديده</div>

          <Col sm="8">
            <div className="text-form pb-2">صوره الماركه</div>
            {/* Preview + Upload */}
            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <div className="category-preview p-4">
                <img
                  src={img || avatar}
                  alt="category preview"
                  height="100"
                  width="120"
                  loading="lazy"
                />
              </div>
            </label>

            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              {...register("image", {
                required: true,
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImg(URL.createObjectURL(file));
                  }
                },
              })}
              style={{ display: "none" }}
            />
            {errors.image && (
              <span className="error-text">{errors.image.message}</span>
            )}

            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الماركه"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end ">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-save d-inline mt-2 p-2 "
            >
              حفظ التعديلات
            </button>
          </Col>
        </Row>
      </form>
      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
          جاري الإضافة...
        </div>
      )}
    </div>
  );
};

export default AdminAddBrand;
