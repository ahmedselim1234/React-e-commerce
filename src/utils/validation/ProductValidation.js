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
    title: z.string().min(3, "اسم المنتج يجب أن لا يقل عن ثلاثة أحرف").trim(),
    description: z
      .string()
      .min(10, "وصف المنتج يجب أن لا يقل عن عشرة أحرف")
      .trim(),
    category: z
      .string()
      .min(1, "يجب اختيار تصنيف رئيسي")
      .regex(/^[0-9a-fA-F]{24}$/, "التصنيف غير صالح"),

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

    subcategory: z.array(z.string()).optional(),
    colors: z
      .array(z.string().regex(/^#[0-9A-Fa-f]{6}$/, "صيغة اللون غير صحيحة"))
      .min(1, "يجب اختيار لون واحد على الأقل")
      .max(10, "الحد الأقصى 10 ألوان"),
    price: z.coerce
      .number({
        required_error: "سعر المنتج مطلوب",
        invalid_type_error: "سعر المنتج يجب أن يكون رقم",
      })
      .min(1, "سعر المنتج يجب أن يكون أكبر من صفر"),

    priceAfterDiscount: z.coerce
      .number({
        required_error: "السعر بعد الخصم مطلوب",
        invalid_type_error: "السعر بعد الخصم يجب أن يكون رقم",
      })
      .min(1, "السعر بعد الخصم يجب أن يكون أكبر من صفر"),

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

    availableImages: z.any().optional(),
  })
  .refine((data) => data.priceAfterDiscount < data.price, {
    message: "السعر بعد الخصم يجب أن يكون أقل من السعر الأصلي",
    path: ["priceAfterDiscount"],
  });

export const EditProductSchema = z
  .object({
    title: z
      .string()
      .min(3, "اسم المنتج يجب أن لا يقل عن ثلاثة أحرف")
      .trim()
      .optional(),
    description: z
      .string()
      .min(10, "وصف المنتج يجب أن لا يقل عن عشرة أحرف")
      .trim()
      .optional(),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "التصنيف غير صالح")
      .optional(),
    quantity: z
      .any()
      .refine(
        (val) =>
          val === "" ||
          val === null ||
          val === undefined ||
          !isNaN(Number(val)),
        "كمية المنتج يجب أن تكون رقم",
      )
      .refine(
        (val) =>
          val === "" || val === null || val === undefined || Number(val) > 0,
        "كمية المنتج يجب أن تكون أكبر من صفر",
      )
      .optional(),
    brand: z
  .union([
    z.string().regex(/^[0-9a-fA-F]{24}$/),
    z.literal(""),
  ])
  .optional()
  .transform(val => (val === "" ? undefined : val)),

    subcategory: z.array(z.string()).optional(),
    colors: z
      .array(z.string().regex(/^#[0-9A-Fa-f]{6}$/, "صيغة اللون غير صحيحة"))
      .min(1, "يجب اختيار لون واحد على الأقل")
      .max(10, "الحد الأقصى 10 ألوان")
      .optional(),
    price: z.coerce
      .number({
        invalid_type_error: "سعر المنتج يجب أن يكون رقم",
      })
      .min(1, "سعر المنتج يجب أن يكون أكبر من صفر")
      .optional(),
    priceAfterDiscount: z.coerce
      .number({
        invalid_type_error: "السعر بعد الخصم يجب أن يكون رقم",
      })
      .min(1, "السعر بعد الخصم يجب أن يكون أكبر من صفر")
      .optional(),
    imageCover: z.any().optional(),
    availableImages: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.price && data.priceAfterDiscount) {
        return data.priceAfterDiscount < data.price;
      }
      return true;
    },
    {
      message: "السعر بعد الخصم يجب أن يكون أقل من السعر الأصلي",
      path: ["priceAfterDiscount"],
    },
  )
  .refine(
    (data) => {
      // التحقق من وجود حقل واحد على الأقل للتحديث
      const hasAtLeastOneField = Object.values(data).some(
        (value) => value !== undefined && value !== null && value !== "",
      );
      return hasAtLeastOneField;
    },
    {
      message: "يجب تعديل حقل واحد على الأقل",
      path: ["title"], // يمكن تغييرها لأي حقل
    },
  );
