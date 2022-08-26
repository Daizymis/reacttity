import React, { Component } from "react";
import workspaceDefault from "@/assets/img/mobile/icon-workbench.png";
import workspaceActive from "@/assets/img/mobile/icon-workbench-click.png";
import myDefault from "@/assets/img/mobile/my.png";
import myActive from "@/assets/img/mobile/my-click.png";
import http from "../../../utils";
import axios from "axios";
import { Outlet } from "react-router-dom";
import "@/assets/css/layout.scss";
import { withRouter } from '../../../hoc/withRouter'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footMenu: [
        {
          id: 1,
          img: workspaceDefault,
          imgActive: workspaceActive,
          name: "工作台",
          url: "/workbench",
        },
        {
          id: 2,
          img: myDefault,
          imgActive: myActive,
          name: "我的",
          url: "/my",
        },
      ],
    };
    this.getMenu();
    console.log(props);
  }

  componentDidMount(){
  }
  getMenu() {
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
      method: "get",
      headers: {
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      const {
        data: { data },
      } = res;
      console.log(data);
    });
  }
  render() {
    let footMenu = [
      {
        img: workspaceDefault,
        imgActive: workspaceActive,
        name: "工作台",
        url: "/workbench",
      },
      {
        img: myDefault,
        imgActive: myActive,
        name: "我的",
        url: "/my",
      },
    ];
    return (
      <div>
        <Outlet />
        <div className="footer">
          {this.state.footMenu.map((item) => (
            <div className="item" key={item.id}>
              <img src={item.img} className="img-nav" />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Layout;