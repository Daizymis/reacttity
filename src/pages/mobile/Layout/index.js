import React, { Component, useEffect, useState } from "react";
import workspaceDefault from "@/assets/img/mobile/icon-workbench.png";
import workspaceActive from "@/assets/img/mobile/icon-workbench-click.png";
import myDefault from "@/assets/img/mobile/my.png";
import myActive from "@/assets/img/mobile/my-click.png";
import http from "../../../utils";
import axios from "axios";
import { Outlet } from "react-router-dom";
import "@/assets/css/layout.scss";
import { withRouter } from "../../../hoc/withRouter";
import { useTranslation } from "react-i18next";

function Layout(props) {
  const [footMenu, setFootMenu] = useState([]);
  const {t} = useTranslation();
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
      method: "get",
      headers: {
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      setFootMenu([
        {
          img: workspaceDefault,
          imgActive: workspaceActive,
          name: "workbench",
          url: "/workbench",
        },
        {
          img: myDefault,
          imgActive: myActive,
          name: "my",
          url: "/my",
        },
      ]);
    });
  };
  return (
    <div>
      <Outlet />
      <div className="footer">
        {footMenu.map((item) => (
          <div className="item" key={item.name}>
            <img src={item.img} className="img-nav" />
            <div>{t(item.name)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Layout;
