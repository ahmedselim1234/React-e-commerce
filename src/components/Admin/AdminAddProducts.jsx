import React, { useState } from 'react';

const AdminAddProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceBeforeDiscount: '',
    price: '',
    mainCategory: '',
    brand: '',
  });
  
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [images, setImages] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#000000');

  // Available options
  const mainCategories = [
    { id: 1, name: 'التصنيف الاول' },
    { id: 2, name: 'التصنيف الثاني' },
    { id: 3, name: 'التصنيف الثالث' },
  ];

  const subCategories = [
    { id: 1, name: 'التصنيف الفرعي الاول' },
    { id: 2, name: 'التصنيف الفرعي الثاني' },
    { id: 3, name: 'التصنيف الفرعي الثالث' },
  ];

  const brands = [
    { id: 1, name: 'الماركة الاولي' },
    { id: 2, name: 'الماركة الثانيه' },
    { id: 3, name: 'الماركة الثالثه' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleSubCategory = (id) => {
    if (selectedSubCategories.includes(id)) {
      setSelectedSubCategories(selectedSubCategories.filter(cat => cat !== id));
    } else {
      setSelectedSubCategories([...selectedSubCategories, id]);
    }
  };

  const addColor = () => {
    if (!selectedColors.includes(newColor)) {
      setSelectedColors([...selectedColors, newColor]);
    }
    setShowColorPicker(false);
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.price) {
      alert('الرجاء ملء الحقول المطلوبة');
      return;
    }

    const productData = {
      ...formData,
      subCategories: selectedSubCategories,
      colors: selectedColors,
      images: images,
    };

    console.log('Product Data:', productData);
    alert('تم حفظ المنتج بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">اضافه منتج جديد</h1>

        {/* Product Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">صور المنتج</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt="" className="w-28 h-28 object-cover rounded border" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-4xl text-gray-400">+</span>
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اسم المنتج *"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="وصف المنتج"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            name="priceBeforeDiscount"
            value={formData.priceBeforeDiscount}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="السعر قبل الخصم"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="سعر المنتج *"
          />
        </div>

        {/* Main Category */}
        <div className="mb-4">
          <select
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">التصنيف الرئيسي</option>
            {mainCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Sub Categories */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">التصنيف الفرعي</label>
          <div className="border border-gray-300 rounded p-3 max-h-40 overflow-y-auto">
            {subCategories.map(cat => (
              <label key={cat.id} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(cat.id)}
                  onChange={() => toggleSubCategory(cat.id)}
                  className="ml-2 w-4 h-4"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">الماركة</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">الالوان المتاحه للمنتج</label>
          <div className="flex items-center gap-3 flex-wrap">
            {selectedColors.map((color, index) => (
              <div key={index} className="relative group">
                <div
                  className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
                <button
                  onClick={() => removeColor(color)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 items-center justify-center text-xs hidden group-hover:flex"
                >
                  ×
                </button>
              </div>
            ))}
            
            {showColorPicker ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <button
                  onClick={addColor}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  ✓
                </button>
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowColorPicker(true)}
                className="w-10 h-10 rounded border-2 border-dashed border-gray-400 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <span className="text-2xl text-gray-400">+</span>
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;