import menus from "./menu.data";
import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import {http} from "../../../../utils";

function Entrance() {
  const { t, i18n } = useTranslation();
  const [permission, setPermission] = useState([]);

  useEffect(() =>{
      http.post('/user/permissions').then(res =>{
          if(res.code === 200) {
              setPermission(res.data.permissions)
          }
      })
  },[]);
  const getPermission = (key) => {
    return permission.includes(key);
  };
  return (
    <>
      <div className="entrance-wrap">
        <div className="entrance-wrap-left">
          <div className="business-type advertising">广告代理</div>
          <div className="business-type marketing">营销服务/经销业务</div>
        </div>
        <div className="entrance-wrap-right">
          {menus.map((menuList, index) => {
            return (
              <div
                key={index}
                className="system-step"
                style={{ flex: menuList.list.length }}
              >
                <div className="system-step-title">
                  <div className="step-circle">
                    <div
                      className={`step-line ${index === 0 ? "step-line-hidden" : ""}`}
                    ></div>
                    <span>{index + 1}</span>
                    <div
                      className={`step-line ${index === menus.length - 1 ? "step-line-hidden" : ""}`
                      }
                    ></div>
                  </div>
                  <div className="step-desc" desc-title={menuList.title}>
                    {menuList.step}
                  </div>
                </div>
                <div className="step-content">
                  {menuList.list.map((menuChild, childIndex) => (
                    <div key={childIndex} className="step-content-child-max">
                      {menuChild.map((childList, i) => (
                        <div
                          key={i}
                          className="step-content-child"
                          style={{ marginTop: i > 0 ? "0.1rem" : "" }}
                        >
                          {childList.map((item) => {
                            return (
                              <div
                                key={item.title}
                                className={`step-menu`}
                              >
                                <div
                                  className={`step-menu-item ${
                                      item.noOpen === true
                                          ? "not-open"
                                          : !getPermission(item.permissionKey)
                                          ? "no-permissions"
                                          : null
                                  }  ${
                                      i18n.locale === "US"
                                          ? "step-menu-EN248"
                                          : null
                                  }`}
                                  desc-title={item.title}
                                  menu-key="Statement"
                                >
                                  <img
                                    className="menu-icon"
                                    src={item.icon}
                                    alt=""
                                  />
                                  <div className="menu-title">{item.title}</div>
                                  {item.unread && (
                                    <div className="unread">{item.unread}</div>
                                  )}
                                  {item.noOpen ? (
                                    <div
                                      className={`menu-item-tips ${
                                        i18n.locale === "US"
                                          ? "menu-item-tips-EN"
                                          : ""
                                      }`}
                                    >
                                      {/*暂无操作权限*/}
                                      {t("normalLang.noPermissions")}
                                    </div>
                                  ) : !getPermission(item.permissionKey) ? (
                                    <div
                                      className={`menu-item-tips , ${
                                        i18n.locale === "US"
                                          ? "menu-item-tips-EN"
                                          : ""
                                      }`}
                                    >
                                       {/*功能未开放*/}
                                      { t("normalLang.notOpen") }
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Entrance;
