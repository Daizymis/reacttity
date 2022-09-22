import React, { Component, useEffect, useState } from "react";
import { http } from "../../../utils";
import "@/assets/css/menu.scss";
import { useLocation, useNavigate } from "react-router";
import { SET_LISTDATAADAPT } from "../../../store/actionType";
import { connect } from "react-redux";
import { dataAdaptUrl } from "../../../utils/config";
function Menu(props) {
  const { setListDataAdapt } = props;
  const [menus, setMenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMenus();
  }, []);
  const getMenus = () => {
    http.get("api/getmenus?type=1").then((res) => {
      if (res.code === 200) {
        setMenu(res.data);
      }
    });
  };
  const toListPage = (menu) => {
    const _obj =
      menu.impurl == null
        ? null
        : {
            url: dataAdaptUrl,
            postData: JSON.parse(menu.impurl),
          };
    setListDataAdapt(_obj);
    navigate(`/${menu.route.replace("OListTable", "todolist")}`);
  };
  return (
    <div style={{ paddingBottom: "1.2rem" }}>
      <div className="flex-wrap">
        {menus.map((item) => (
          <div key={item.menuTypeName} style={{ width: "100%" }}>
            <p className="menu-title">{item.menuTypeName}</p>
            <div className="flex-wrap">
              {item.menuList?.map((menu) => (
                <div
                  className="menu-nav"
                  key={menu.id}
                  onClick={() => toListPage(menu)}
                >
                  <img
                    src={require(`../../../assets/img/mobile/module1.png`)}
                    className="img-nav"
                  />
                  <div className="menu-name">{menu.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setListDataAdapt(data) {
      dispatch({
        type: SET_LISTDATAADAPT,
        data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return { listDataAdapt: state.listDataAdapt };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
