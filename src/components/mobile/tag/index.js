import './index.scss'
import { CloseOutline } from "antd-mobile-icons";
export const Tag = (props) => {
  const { closeable, close, textcolor, color, className } = props;
  const nativeClose = e => {
      props.close();
      e.stopPropagation();
  }
  return (
    <span className={"tag " + className} style={{ background: color, color: textcolor }}>
      <span>
        {props.children}
      </span>
      { (
        <span onClick={nativeClose} className="delete-icon">
          <CloseOutline />
        </span>
      )}
    </span>
  );
};
