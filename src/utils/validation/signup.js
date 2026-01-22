import z from "zod";

export const signupValidation = () =>
  z.object({
    first_name: z
      .string({ message: "اسم المستخدم مطلوب" })
      .min(3, { message: "اسم المستخدم يجب ألا يقل عن ثلاث أحرف" })
      .max(32, { message: "اسم المستخدم يجب ألا يزيد عن 32 حرف" })
      .trim(),

    password: z
      .string({ message: "كلمة المرور مطلوبة" })
      .min(6, { message: "كلمة المرور يجب ألا تقل عن ستة أحرف" })
      .max(32, { message: "كلمة المرور يجب ألا تزيد عن 32 حرف" })
      .trim(),

    email: z
      .string({ message: "الايميل مطلوب" })
      .email({ message: "صيغة الايميل غير صحيحة" }),
  });
