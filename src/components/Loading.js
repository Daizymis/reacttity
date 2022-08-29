import { createPortal } from "react-dom"
const Loading = (props) => {
    return createPortal(<div>
        loading...
    </div>, document.getElementById(''));
}