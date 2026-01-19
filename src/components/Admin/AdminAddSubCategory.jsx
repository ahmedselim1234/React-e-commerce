
import { Row, Col } from "react-bootstrap";
import { useAddSubcategoryMutation } from "../../redux/features/subCategory/subCategorySloce";
import { useGetCategoryQuery } from "../../redux/features/category/categorySlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastServerSError from "../../utils/errorHandler";
import { toast } from "react-toastify";
import {subCategoryValidation} from '../../utils/validation/subCategoryValidation.js'



const AdminAddSubCategory = () => {
  const {
    data,
    isError,
    isLoading: isLoadingCategories,
    error,
  } = useGetCategoryQuery();

  const [addSubcategory, { isLoading }] = useAddSubcategoryMutation();

  const categories =
    data?.data?.map((cat) => ({
      id: cat._id,
      name: cat.name,
    })) || [];


  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(subCategoryValidation(categories)),
  });

  const onSubmit = async (data) => {
    try {
      await addSubcategory(data).unwrap();
      toast.success("تمت إضافة التصنيف بنجاح", {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
    } catch (err) {
      ToastServerSError(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-start">
          <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
          <Col sm="8">
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم التصنيف الفرعي"
              {...register("name")}
            />
            {errors.name && (
              <h2 className="error-text">{errors.name.message}</h2>
            )}

            {isError && (
              <h2 className="error-text">
                {error?.data?.message || error?.message || "خطأ في تحميل التصنيفات"}
              </h2>
            )}

            <select
              className="select mt-3 px-2"
              {...register("category")}
              disabled={isLoadingCategories}
            >
              <option value="">اختر تصنيف رئيسي</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <h2 className="error-text">{errors.category.message}</h2>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end">
            <button
              disabled={isLoading || isLoadingCategories}
              type="submit"
              className="btn-save d-inline mt-2 p-2"
            >
              {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AdminAddSubCategory;