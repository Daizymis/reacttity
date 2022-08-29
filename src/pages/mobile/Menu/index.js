import React, { Component, useEffect, useState } from "react";
import { http } from "../../../utils";
import "@/assets/css/menu.scss";
import { useLocation, useNavigate } from "react-router";
function Menu(props) {
  const [menus, setMenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMenus();
  }, []);
  const getMenus = () => {
    http.get("/menus").then((res) => {
      if (res.code === 200) {
        setMenu(res.data);
      }
    });
  };
  const toList = (menu) => {
    navigate(`/todolist/${menu.type}`);
  };
  return (
    <div>
      <div className="flex-wrap">
        {menus.map((item) => (
          <div key={item.id}>
            <p className="menu-title">{item.menuTypeName}</p>
            <div className="flex-wrap">
              {item.menuList?.map((menu) => (
                <div className="menu-nav" key={menu.id} onClick={()=>toList(menu)}>
                  <img
                    src={require(`../../../assets/img/mobile/module1.png`)}
                    className="img-nav"
                  />
                  <div className="menu-name">{menu.muduleName}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Menu;
