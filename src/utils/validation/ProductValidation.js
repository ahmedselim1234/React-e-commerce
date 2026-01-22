import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AddProductSchema = z
  .object({
    /* =======================
       اسم المنتج
    ======================== */
    title: z.string().min(3, "اسم المنتج يجب أن لا يقل عن ثلاثة أحرف").trim(),

    /* =======================
       وصف المنتج
    ======================== */
    description: z
      .string()
      .min(10, "وصف المنتج يجب أن لا يقل عن عشرة أحرف")
      .trim(),

    /* =======================
       التصنيف الرئيسي
    ======================== */
    category: z
      .string()
      .min(1, "يجب اختيار تصنيف رئيسي")
      .regex(/^[0-9a-fA-F]{24}$/, "التصنيف غير صالح"),

    /* =======================
       الكمية
    ======================== */
    quantity: z
      .any()
      .refine(
        (val) => val !== "" && val !== null && val !== undefined,
        "كمية المنتج مطلوبة",
      )
      .refine((val) => !isNaN(Number(val)), "كمية المنتج مطلوبة")
      .refine((val) => Number(val) > 0, "كمية المنتج يجب أن تكون أكبر من صفر"),

    /* =======================
       الماركة
    ======================== */
    brand: z
      .string()
      .min(1, "يجب اختيار ماركة")
      .regex(/^[0-9a-fA-F]{24}$/, "الماركة غير صالحة"),

    /* =======================
       التصنيفات الفرعية
    ======================== */
    subcategory: z.array(z.string()).optional(),

    /* =======================
       الالوان 
    ======================== */
    colors: z
      .array(z.string().regex(/^#[0-9A-Fa-f]{6}$/, "صيغة اللون غير صحيحة"))
      .min(1, "يجب اختيار لون واحد على الأقل")
      .max(10, "الحد الأقصى 10 ألوان"),

    /* =======================
       سعر المنتج
    ======================== */
    price: z.coerce
      .number({
        required_error: "سعر المنتج مطلوب",
        invalid_type_error: "سعر المنتج يجب أن يكون رقم",
      })
      .min(1, "سعر المنتج يجب أن يكون أكبر من صفر"),

    /* =======================
       السعر بعد الخصم
    ======================== */
    priceAfterDiscount: z.coerce
      .number({
        required_error: "السعر بعد الخصم مطلوب",
        invalid_type_error: "السعر بعد الخصم يجب أن يكون رقم",
      })
      .min(1, "السعر بعد الخصم يجب أن يكون أكبر من صفر"),

    /* =======================
       صورة الغلاف
    ======================== */
    imageCover: z
      .any()
      .refine((files) => files?.length > 0, "صورة الغلاف مطلوبة")
      .refine(
        (files) => !files || files[0]?.size <= MAX_FILE_SIZE,
        "حجم الصورة يجب أن يكون أقل من 2 ميجا",
      )
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        "نوع الملف غير مدعوم. استخدم JPG أو PNG أو WEBP",
      ),

    /* =======================
       صور إضافية
    ======================== */
    availableImages: z.any().optional(),
  })
  .refine((data) => data.priceAfterDiscount < data.price, {
    message: "السعر بعد الخصم يجب أن يكون أقل من السعر الأصلي",
    path: ["priceAfterDiscount"],
  });

