import { toast } from "react-toastify";

const ToastServerSError = (err) => {
  if (err.status === 409) {
    toast.error("التصنيف موجود بالفعل");
  } else if (err.status === 400) {
    toast.error(err.data?.message || "بيانات غير صحيحة");
  } else if (err.status === 500) {
    toast.error("خطأ في الخادم، حاول مرة أخرى");
  } else if (err.status === "FETCH_ERROR") {
    toast.error("تحقق من الاتصال بالإنترنت");
  } else {
    toast.error(err.data?.message || "حدث خطأ غير متوقع");
  }
};

export default ToastServerSError;
