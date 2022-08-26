import "@/assets/css/loading.scss";
import {RedoOutlined } from "@ant-design/icons";
function Loading () {
    return <div className='loading'>
        <RedoOutlined className="loading-icon" />
        <p className="loading-text">loading....</p>
    </div>
}
export default Loading;