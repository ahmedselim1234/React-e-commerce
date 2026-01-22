import z from "zod";

export const loginValidation = () =>
  z.object({
    password: z
      .string({ message: "كلمة المرور مطلوبة" })
      .min(6, { message: "كلمة المرور يجب ألا تقل عن ستة أحرف" })
      .max(32, { message: "كلمة المرور يجب ألا تزيد عن 32 حرف" })
      .trim(),

    email: z
      .string({ message: "الايميل مطلوب" })
      .email({ message: "صيغة الايميل غير صحيحة" }),
  });
