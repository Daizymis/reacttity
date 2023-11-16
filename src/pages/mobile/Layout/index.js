import React, { useEffect, useState } from "react";
import workspaceDefault from "@/assets/img/mobile/icon-workbench.png";
import workspaceActive from "@/assets/img/mobile/icon-workbench-click.png";
import myDefault from "@/assets/img/mobile/my.png";
import myActive from "@/assets/img/mobile/my-click.png";
import notificationDefault from '@/assets/img/mobile/icon-notification.png';
import notificationActive from '@/assets/img/mobile/icon-notification-active.png';
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import "@/assets/css/layout.scss";
import { useTranslation } from "react-i18next";

function Layout(props) {
  const [footMenu, setFootMenu] = useState([]);
  const { t } = useTranslation();

  const param = useLocation().pathname;
  console.log(param);
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    // axios({
    //   url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
    //   method: "get",
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    setFootMenu([
      {
        img: notificationDefault,
        imgActive: notificationActive,
        name: '通知',
        url: '/notificationCenter',
        showCount: true
      },
      {
        img: workspaceDefault,
        imgActive: workspaceActive,
        name: "workbench",
        url: "/menu",
      },
      {
        img: myDefault,
        imgActive: myActive,
        name: "my",
        url: "/my",
      },
    ]);
    // });
  };
  const location = useNavigate();
  const to = (url) => {
    location(url);
  };
  return (
    <div>
      <Outlet />
      <div className="footer">
        {footMenu.map((item) => (
          <div className="item" key={item.name} onClick={() => to(item.url)}>
            <img
              src={~param.indexOf(item.url) ? item.imgActive: item.img}
              className="img-nav"
            />
            <div style={{ color: ~param.indexOf(item.url) ?  "#3d87fc"  : ""}}>
              {t(item.name)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Layout;
