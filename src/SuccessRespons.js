import showToast from "./showToast"
const SuccessRespons = (res) => {
   if (res?.data?.msg) {
    showToast("success",res.data.msg)
   }else{
    showToast("success","Success")
   }
};

export default SuccessRespons;