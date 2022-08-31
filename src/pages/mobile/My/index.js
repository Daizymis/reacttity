import { useStore } from "react-redux";
import "@/assets/css/my.scss";
import { List, Popup } from "antd-mobile";
import { createPortal } from "react-dom";
import {
  UnorderedListOutline,
  TeamOutline,
  PhonebookOutline,
  FillinOutline,
} from "antd-mobile-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
function My(props) {
  const { userInfo } = useStore().getState();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("persist:reactivity");
    localStorage.setItem("locale", "zhCN");
    navigate("/login");
    dispatch({ type: "logout" });
  };
  return (
    <>
      <div className="top-nav">
        <img src={require("@/assets/img/mobile/my.png")} className="my-img" />
        <span>
          <div className="name-nav">{userInfo.username}</div>
          <div className="dept-nav">xx部门 | 开发工程师</div>
        </span>
      </div>
      <List>
        <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
          基本信息
        </List.Item>
        <List.Item prefix={<TeamOutline />} onClick={() => {}}>
          职位信息
        </List.Item>
        <List.Item prefix={<PhonebookOutline />} onClick={() => {}}>
          联系方式
        </List.Item>
        <List.Item prefix={<FillinOutline />} onClick={() => {}}>
          修改密码
        </List.Item>
      </List>
      <div id="exit" className="exit-btn" onClick={() => setVisible(true)}>
        {t("logOut")}
      </div>
      {/* {
        document.getElementById("exit") ? 
        (createPortal( */}
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div>
          <div className="exit-btn exit-tip border-bottom">
            {t("systemBaseInfo.logoutDialogText")}
          </div>
          <div className="exit-btn color-red" onClick={() => logout()}>
            {t("systemBaseInfo.loginOutBtn")}
          </div>
          <div className="gray-nav"></div>
          <div className="exit-btn" onClick={() => setVisible(false)}>
            {t("systemBaseInfo.logoutDialogCancel")}
          </div>
        </div>
      </Popup>
      {/* ),
        document.getElementById("exit")) :<></>
      } */}
    </>
  );
}
export default My;
