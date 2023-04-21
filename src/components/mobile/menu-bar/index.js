import { SideBar } from "antd-mobile";

function MenuBar({ activeKey, sideMenus, setActiveKey }) {
  return (
    <>
      <SideBar style={{'--width': '100%'}} activeKey={activeKey} onChange={setActiveKey}>
        {sideMenus.map((item, index) => (
          <SideBar.Item key={index} title={item.label} />
        ))}
      </SideBar>
    </>
  );
}

export default MenuBar;
