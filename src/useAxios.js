import axios from 'axios'
const caxios =axios.create({
	baseURL:'http://127.0.0.1:8000/',
})
const useAxios = () => {
	return caxios
};
	
export default useAxios;