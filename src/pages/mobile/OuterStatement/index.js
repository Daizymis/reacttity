import { Grid, Button } from "antd-mobile";
import { useEffect, useState, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MenuBar from "../../../components/mobile/menu-bar";
import { http } from "../../../utils";
import sideMenu from "./sideMenu";
import "@/assets/css/outerStatement.scss";
import FlowLine from "../../../components/mobile/flowline";
import Loading from "../Loading";
import Upload from "../../../components/mobile/upload";

function OuterStatement(props) {
  const { dataAdapt } = props;
  console.log(dataAdapt);
  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState();
  const [param] = useSearchParams();
  const sideMenus = useMemo(() => sideMenu);

  const [activeKey, setActiveKey] = useState("0");
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
  const Loading = useCallback(() => {
    <Loading></Loading>;
  });
  const getPublicMenuIndex = useCallback((key) => {
    return sideMenus?.findIndex((item) => item.key === key);
  });
  const log = (ev, file, uploadFiles) => {
    console.log(ev);
    console.log(file);
    console.log(uploadFiles);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Grid columns={24} gap={8} style={{ height: "100%" }}>
        <Grid.Item span={5}>
          <MenuBar
            sideMenus={sideMenus}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          ></MenuBar>
        </Grid.Item>
        <Grid.Item span={19} className="detail-nav">
          {activeKey === "0" &&
            (getData ? (
              <FlowLine
                status={getData?.workflowEntity?.status}
                processData={getData?.flowLine}
              ></FlowLine>
            ) : (
              Loading()
            ))}

          <Upload
            onSuccess={(ev, file, uploadFiles) => log(ev, file, uploadFiles)}
            onChange={log}
            onError={log}
            name="attachment"
            action="api/file/uploadAttachment"
            multiple={true}
          >
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Upload>
          {/* <input onChange={(e)=>onChange(e)} type="file"></input> */}
        </Grid.Item>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { dataAdapt: state.dataAdapt };
};
export default connect(mapStateToProps)(OuterStatement);
