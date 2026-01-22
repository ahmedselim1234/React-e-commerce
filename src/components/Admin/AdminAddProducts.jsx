import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "../../utils/validation/ProductValidation";
import {
  useGetCategoryQuery,
  useGetSubForSpeceficCategoryQuery,
} from "../../redux/features/category/categorySlice";
import { useGetbrandQuery } from "../../redux/features/brand/brandSlice";
import { useAddProductMutation } from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";

import ToastServerSError from "../../utils/errorHandler";

const AdminAddProducts = () => {
  const [coverPreview, setCoverPreview] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [currentColor, setCurrentColor] = useState("#000000");

  // API Queries
  const { data } = useGetCategoryQuery();
  const categories = data?.data;

  const { data: brand } = useGetbrandQuery({});
  const brands = brand?.data;

  const { data: sub, refetch } = useGetSubForSpeceficCategoryQuery(
    { catId: selectedCategory },
    { skip: !selectedCategory },
  );
  const subCategories = sub?.data || [];

  // Add Product Mutation
  const [addProduct, { isLoading }] = useAddProductMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      colors: [],
    },
  });

  const removeCoverImage = () => {
    setCoverPreview("");
    setCoverFile(null);
    setValue("imageCover", null);
    trigger("imageCover");
  };

  const removeImage = (index) => {
    const newPreviews = imagesPreview.filter((_, i) => i !== index);
    const newFiles = imagesFiles.filter((_, i) => i !== index);
    setImagesPreview(newPreviews);
    setImagesFiles(newFiles);
    setValue("availableImages", newFiles);
  };

  const resetForm = () => {
    reset();
    setCoverPreview("");
    setImagesPreview([]);
    setCoverFile(null);
    setImagesFiles([]);
    setSelectedCategory("");
    setSelectedColors([]);
    setSelectedSubCategories([]);
    setCurrentColor("#000000");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const productData = {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        priceAfterDiscount: data.priceAfterDiscount || undefined,
        colors: selectedColors,
        imageCover: coverFile,
        availableImages: imagesFiles,
        category: data.category,
        subcategory: data.subcategory,
        brand: data.brand || undefined,
      };
      console.log("Sending data:", data);

      const response = await addProduct(productData).unwrap();

      toast.success("تمت إضافة التصنيف بنجاح ", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log("Response:", response);

      // resetForm();
    } catch (err) {
     ToastServerSError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          إضافة منتج جديد
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:gap-16 gap-8">
            {/* صورة الغلاف */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                صورة الغلاف
              </h3>

              <div className="flex flex-wrap gap-3">
                {coverPreview && (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Cover"
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <span className="absolute top-0.5 left-0.5 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                      غلاف
                    </span>
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}

                {!coverPreview && (
                  <label className="relative w-20 h-20 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("imageCover", {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setCoverPreview(URL.createObjectURL(file));
                            setCoverFile(file);
                          }
                        },
                      })}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-2xl text-gray-400">
                      +
                    </span>
                  </label>
                )}
              </div>
              {errors.imageCover && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.imageCover.message}
                </span>
              )}
            </div>

            {/* الصور الإضافية */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                الصور الإضافية
              </h3>

              <div className="flex flex-wrap gap-3">
                {imagesPreview.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`صورة ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <label className="relative w-20 h-20 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const previews = files.map((file) =>
                        URL.createObjectURL(file),
                      );
                      const newImagesFiles = [...imagesFiles, ...files];
                      setImagesPreview([...imagesPreview, ...previews]);
                      setImagesFiles(newImagesFiles);
                      setValue("availableImages", newImagesFiles);
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl text-gray-400">
                    +
                  </span>
                </label>
              </div>
              {errors.availableImages && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.availableImages.message}
                </span>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اسم المنتج"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="وصف المنتج"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="سعر المنتج"
                {...register("price")}
              />
              {errors.price && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="السعر بعد الخصم"
                {...register("priceAfterDiscount")}
              />
              {errors.priceAfterDiscount && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.priceAfterDiscount.message}
                </span>
              )}
            </div>
          </div>

          {/* Main Category */}
          <div className="mb-4">
            <select
              {...register("category")}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                setSelectedSubCategories([]);
                setValue("category", value);
                setValue("subcategory", []);
                if (value) {
                  refetch();
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">التصنيف الرئيسي</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Sub Categories */}
          {selectedCategory && subCategories.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                التصنيف الفرعي
              </label>
              <div className="border border-gray-300 rounded p-3 max-h-40 overflow-y-auto">
                {subCategories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={cat._id}
                      {...register("subcategory")}
                      className="ml-2 w-4 h-4"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
              {errors.subcategory && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.subcategory.message}
                </span>
              )}
            </div>
          )}

          {/* Brand */}
          <div className="mb-4">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("brand")}
            >
              <option value="">الماركة</option>
              {brands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.brand.message}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="كمية المنتج"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.quantity.message}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              الألوان المتاحة
            </label>

            <div className="flex gap-3 items-center mb-3">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    !selectedColors.includes(currentColor) &&
                    selectedColors.length < 10
                  ) {
                    const newColors = [...selectedColors, currentColor];
                    setSelectedColors(newColors);
                    setValue("colors", newColors);
                    trigger("colors");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                إضافة اللون
              </button>
            </div>

            {selectedColors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedColors.map((color, index) => (
                  <div key={index} className="relative">
                    <div
                      className="w-10 h-10 rounded border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newColors = selectedColors.filter(
                          (_, i) => i !== index,
                        );
                        setSelectedColors(newColors);
                        setValue("colors", newColors);
                        trigger("colors");
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.colors && (
              <span className="text-red-500 text-sm block mt-2">
                {errors.colors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-gray-600 transition font-medium text-sm sm:text-base"
              disabled={isLoading}
            >
              إعادة تعيين
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "جاري الإضافة..." : "حفظ المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProducts;
