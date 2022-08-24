import React, { Component } from "react";
import { http } from "../../../utils";
import "@/assets/css/menu.scss";
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          id: 1,
          flowType: 1,
          muduleName: "合同",
          imgUrl: "module1",
        },
        {
          id: 2,
          flowType: 2,
          muduleName: "立项",
          imgUrl: "module2",
        },
        {
          id: 3,
          flowType: 3,
          muduleName: "开票",
          imgUrl: "module3",
        },
        {
          id: 4,
          flowType: 4,
          muduleName: "结算单",
          imgUrl: "module4",
        },
      ],
    };
  }
  componentDidMount() {
    this.getMenus();
  }
  getMenus() {
    http.get("/menus").then((res) => {
      if (res.code === 200) {
        this.setState({ menus: res.data });
        console.log(res.data);
      }
    });
  }
  toList() {}
  render() {
    return (
      <div>
        <div className="flex-wrap">
          {this.state.menus.map((item) => (
            <div key={item.id}>
              <p className="menu-title">{item.menuTypeName}</p>
              <div className="flex-wrap">
                {item.menuList?.map((menu) => (
                  <div key={menu.id}>
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
}
