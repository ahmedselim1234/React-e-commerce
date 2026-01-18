import { InputError } from "./InputError";

const ImageUpload = ({ 
  name, 
  register, 
  validation,
  error, 
  preview, 
  defaultImage,
  multiple = false,
  label = "صورة التصنيف",
  previews = [] // للصور المتعددة
}) => {
  const isMultiple = multiple && previews.length > 0;
  
  return (
    <div className="form-group mb-4">
      <label className="text-form mb-2">
        {label} <span className="text-danger">*</span>
        {multiple && <span className="text-muted ms-2">(يمكنك اختيار أكثر من صورة)</span>}
      </label>

      <div className="category-upload-wrapper">
        {/* عرض صورة واحدة */}
        {!isMultiple && (
          <div className="category-upload">
            <label
              htmlFor={name}
              style={{ cursor: "pointer" }}
              className={error ? "border-danger" : ""}
            >
              <div className="category-preview">
                <img
                  src={preview || defaultImage}
                  alt="category preview"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />

                <div className="upload-overlay">
                  <i className="fas fa-camera mb-2"></i>
                  <p className="mb-0">
                    {preview === defaultImage
                      ? "اضغط لاختيار صورة"
                      : "اضغط لتغيير الصورة"}
                  </p>
                </div>
              </div>
            </label>

            <input
              type="file"
              id={name}
              name={name}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple={multiple}
              aria-label={label}
              {...register(name, validation)}
              style={{ display: "none" }}
            />
          </div>
        )}

        {/* عرض صور متعددة */}
        {isMultiple && (
          <div className="multiple-images-container">
            <div className="images-grid">
              {previews.map((img, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={img}
                    alt={`preview ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = defaultImage;
                    }}
                  />
                  <div className="image-number">{index + 1}</div>
                </div>
              ))}
              
              {/* زر إضافة صور جديدة */}
              <label
                htmlFor={name}
                className="add-more-images"
                style={{ cursor: "pointer" }}
              >
                <div className="add-more-content">
                  <i className="fas fa-plus mb-2"></i>
                  <p className="mb-0">إضافة صور</p>
                </div>
              </label>
            </div>

            <input
              type="file"
              id={name}
              name={name}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple={multiple}
              aria-label={label}
              {...register(name, validation)}
              style={{ display: "none" }}
            />
          </div>
        )}
      </div>

      {error && <InputError message={error.message} />}
      
      {isMultiple && previews.length > 0 && (
        <div className="text-muted mt-2">
          <i className="fas fa-info-circle me-1"></i>
          تم اختيار {previews.length} صورة
        </div>
      )}
    </div>
  );
};

export default ImageUpload;