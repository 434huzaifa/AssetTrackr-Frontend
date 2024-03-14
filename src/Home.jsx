import { Spin } from "antd";
import useAuth from "./useAuth";

const Home = () => {
    const {company,loading}=useAuth()
    
    return (
        <Spin spinning={loading}>
            
        </Spin>
    );
};

export default Home;