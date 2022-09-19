import { SideBar } from "antd-mobile";

function MenuBar(props) {
  let { sideMenus } = props;
  return (
    <>
      <SideBar>
        {sideMenus.map((item, index) => (
          <SideBar.Item key={item.label + index} title={item.label} />
        ))}
      </SideBar>
    </>
  );
}

export default MenuBar;
