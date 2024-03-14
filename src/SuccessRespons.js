import showToast from "./showToast"
const SuccessRespons = (data) => {
   if (data?.msg) {
    showToast("success",data.msg)
   }else{
    showToast("success","Success")
   }
};

export default SuccessRespons;