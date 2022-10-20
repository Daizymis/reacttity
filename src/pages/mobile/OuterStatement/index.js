import { Grid } from "antd-mobile";
import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MenuBar from "../../../components/mobile/menu-bar";
import { http } from "../../../utils";
import sideMenu from "./sideMenu";
import "@/assets/css/outerStatement.scss";
import FlowLine from "../../../components/mobile/flowline";

function OuterStatement(props) {
  const { dataAdapt } = props;
  console.log(dataAdapt);
  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState();
  const [param] = useSearchParams();
  const sideMenus = useMemo(() => sideMenu);
  useEffect(() => {
    getDetailsData();
  }, []);
  const getDetailsData = () => {
    let obj = param.get("postData")
      ? JSON.parse(param.get("postData"))
      : dataAdapt[param.get("timestamp")];
    obj.postData.statementOperate = 1;
    http.post(`api/${obj.url}`, obj.postData).then((res) => {
      setPostData(res.data.entity);
      setGetData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Grid columns={24} gap={8} style={{ height: "100%" }}>
        <Grid.Item span={5}>
          <MenuBar sideMenus={sideMenus}></MenuBar>
        </Grid.Item>
        <Grid.Item span={19} className="detail-nav">
          {/* {useMemo(() => { */}
          getData && <FlowLine status={getData?.workflowEntity?.status} processData={getData?.flowLine}></FlowLine>;
          {/* }, [])} */}
        </Grid.Item>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { dataAdapt: state.dataAdapt };
};
export default connect(mapStateToProps)(OuterStatement);
