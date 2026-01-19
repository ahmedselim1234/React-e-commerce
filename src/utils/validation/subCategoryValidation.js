import z from "zod";

  export const subCategoryValidation = (categories)=>
    z.object({
    name: z
      .string()
      .min(3, { message: "اسم التصنيف الفرعي يجب ان لا يقل عن ثلاثه احرف" })
      .trim(),

    category: z
      .string()
      .min(1, "يجب اختيار تصنيف رئيسي")
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: "التصنيف غير صالح",
      })
      .refine(
        (id) =>
          categories.length === 0 || categories.some((cat) => cat.id === id),
        {
          message: "التصنيف غير موجود",
        }
      ),
  });
  