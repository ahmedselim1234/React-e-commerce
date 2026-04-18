import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProductSchema } from "../../utils/validation/ProductValidation";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpeceficProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productSlice";
import { useGetCategoryQuery } from "../../redux/features/category/categorySlice";
import { useGetbrandQuery } from "../../redux/features/brand/brandSlice";
import { toast } from "react-toastify";
import ToastServerSError from "../../utils/errorHandler";

const AdminEditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==================== API ====================
  const { data, isLoading: isFetching } = useGetSpeceficProductQuery(id);
  const { data: categoriesData } = useGetCategoryQuery();
  const { data: brandsData } = useGetbrandQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const product = data?.data;
  const categories = categoriesData?.data;
  const brands = brandsData?.data || [];

  // ==================== Form ====================
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(EditProductSchema),
    mode: "onChange"
  });

  // ==================== State ====================
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("#000000");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [availableSubs, setAvailableSubs] = useState([]);

  // ==================== Load Product Data ====================
  useEffect(() => {
    if (!product) return;

    reset({
      title: product.title,
      description: product.description,
      price: product.price,
      priceAfterDiscount: product.priceAfterDiscount || "",
      quantity: product.quantity,
      category: product.category?._id || product.category,
      brand: product.brand?._id || product.brand,
    });

    setColors(product.colors || []);
    setSubcategories(product?.subcategory?.map(s => s._id || s) || []);
    setCoverPreview(product.imageCover || null);
    setCoverImage(null);
    setExtraImages([]);
    setExtraPreviews([]);
  }, [product, reset]);

  // ==================== Update Available Subcategories ====================
  const categoryId = watch("category") || product?.category?._id || product?.category;
  
  useEffect(() => {
    if (!categoryId || !categories?.length) return;
    const cat = categories.find(c => c._id === categoryId);
    setAvailableSubs(cat?.subcategories || []);
  }, [categoryId, categories]);

  // ==================== Color Handlers ====================
  const addColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
    }
  };

  const removeColor = (color) => {
    setColors(colors.filter(c => c !== color));
  };

  // ==================== Cover Image Handler ====================
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeCover = () => {
    setCoverImage(null);
    setCoverPreview(product?.imageCover || null);
    document.getElementById("coverInput").value = "";
  };

  // ==================== Extra Images Handler ====================
  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setExtraImages([...extraImages, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setExtraPreviews(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeExtraImage = (index) => {
    setExtraImages(extraImages.filter((_, i) => i !== index));
    setExtraPreviews(extraPreviews.filter((_, i) => i !== index));
  };

  // ==================== Subcategory Toggle ====================
  const toggleSubcategory = (subId) => {
    setSubcategories(prev =>
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  // ==================== Submit ====================
  const onSubmit = async (formData) => {
    try {
      const data = new FormData();

      // النصوص والأرقام
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", Number(formData.price));
      data.append("quantity", Number(formData.quantity));
      if (formData.priceAfterDiscount) {
        data.append("priceAfterDiscount", Number(formData.priceAfterDiscount));
      }

      // التصنيف والماركة
      data.append("category", formData.category);
    //   data.append("brand", formData.brand);
    if (formData.brand) {
  data.append("brand", formData.brand);
}


      // التصنيفات الفرعية
      subcategories.forEach(subId => data.append("subcategory", subId));

      // الألوان
      colors.forEach(color => data.append("colors", color));

      // الصور
      if (coverImage) data.append("imageCover", coverImage);
      extraImages.forEach(file => data.append("availableImages", file));

    //   console.log(coverImage)

      await updateProduct({ id, productData: data }).unwrap();

      toast.success("تم تعديل المنتج بنجاح");
      navigate("/admin/allproducts");
    } catch (err) {
      ToastServerSError(err);
    }
  };

  // ==================== Loading State ====================
  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg">المنتج غير موجود</p>
        <button
          onClick={() => navigate("/admin/allproducts")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          العودة
        </button>
      </div>
    );
  }

  // ==================== Render ====================
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">تعديل المنتج</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* اسم المنتج */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              {...register("title")}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف المنتج</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              {...register("description")}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          {/* التصنيف والماركة */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" {...register("category")}>
                <option value="">اختر التصنيف</option>
                {categories?.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الماركة</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" {...register("brand")}>
                <option value="">اختر الماركة</option>
                {brands?.map(brand => (
                  <option key={brand._id} value={brand._id}>{brand.name}</option>
                ))}
              </select>
              {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message}</span>}
            </div>
          </div>

          {/* التصنيفات الفرعية */}
          {availableSubs.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التصنيفات الفرعية</label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto bg-gray-50">
                {availableSubs?.map(sub => (
                  <label key={sub._id} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-white p-2 rounded">
                    <input
                      type="checkbox"
                      checked={subcategories.includes(sub._id)}
                      onChange={() => toggleSubcategory(sub._id)}
                      className="w-4 h-4"
                    />
                    <span>{sub.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* السعر والخصم */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">السعر</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                {...register("price")}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">السعر بعد الخصم</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                {...register("priceAfterDiscount")}
              />
              {errors.priceAfterDiscount && <span className="text-red-500 text-sm">{errors.priceAfterDiscount.message}</span>}
            </div>
          </div>

          {/* الكمية */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              {...register("quantity")}
            />
            {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity.message}</span>}
          </div>

          {/* الألوان */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الألوان</label>
            <div className="flex gap-2 mb-3">
              <input
                type="color"
                value={colorInput}
                onChange={e => setColorInput(e.target.value)}
                className="w-16 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={colorInput}
                onChange={e => setColorInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
                maxLength={7}
              />
              <button type="button" onClick={addColor} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                إضافة
              </button>
            </div>

            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {colors?.map((color, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border">
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: color }}></div>
                    <span className="text-sm font-mono">{color}</span>
                    <button type="button" onClick={() => removeColor(color)} className="text-red-500 hover:text-red-700 font-bold">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* صورة الغلاف */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة الغلاف {coverImage && <span className="text-blue-600">(جديدة)</span>}
            </label>
            <input
              id="coverInput"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
            />
            {coverPreview && (
              <div className="mt-3 relative inline-block">
                <img src={coverPreview} alt="الغلاف" className="w-40 h-40 object-cover rounded-lg border-2" />
                {coverImage && (
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* الصور الإضافية */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">إضافة صور</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleExtraImagesChange}
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
            />

            {/* الصور القديمة */}
            {product.availableImages?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">الصور الحالية ({product.availableImages.length})</p>
                <div className="flex flex-wrap gap-3">
                  {product?.availableImages?.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} alt={`صورة ${i + 1}`} className="w-32 h-32 object-cover rounded-lg border-2" />
                      <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">موجودة</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الصور الجديدة */}
            {extraPreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">صور جديدة ({extraPreviews.length})</p>
                <div className="flex flex-wrap gap-3">
                  {extraPreviews?.map((preview, i) => (
                    <div key={i} className="relative">
                      <img src={preview} alt={`جديدة ${i + 1}`} className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500" />
                      <button
                        type="button"
                        onClick={() => removeExtraImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 hover:bg-red-600"
                      >
                        ×
                      </button>
                      <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">جديدة</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
            >
              {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/allproducts")}
              disabled={isLoading}
              className="px-8 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-400 font-medium"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProducts;
