import showToast from "./showToast"
const ErrorResponse = (err) => {
    if (err?.response?.data?.msg) {
        showToast("error",err?.response?.data?.msg)
       }else{
        showToast("error","Something wrong")
       }
};

export default ErrorResponse;