import Entrance from "./child/entrance";
import "@/assets/css/pc/menu.scss";
import TopBar from "./child/topbar";

const Menu = () => {
  return (
    <>
      <div className="home-page clearfix">
        <div className="head-bar">
          <TopBar></TopBar>
        </div>
        <div className="content-wrap">
          <div className="menu-content">
            <Entrance></Entrance>
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;
