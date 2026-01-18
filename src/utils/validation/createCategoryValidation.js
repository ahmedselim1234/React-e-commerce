import z from "zod";
export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AddCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "اسم التصنيف يجب ان لا يقل عن ثلاثه احرف " })
    .trim(),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, {
      message: "صورة التصنيف مطلوبة",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: "حجم الصورة يجب أن يكون أقل من 2 ميجا",
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "نوع الملف غير مدعوم. استخدم JPG, PNG أو WEBP",
    }),
});
