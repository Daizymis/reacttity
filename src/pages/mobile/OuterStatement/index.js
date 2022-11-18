import { Grid, Button, Dialog, Toast } from "antd-mobile";
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
import ButtomButton from "../../../components/mobile/buttom-button";
import { useRef } from "react";
import { FLOWTYPE, SUBMIT_NO, SUBMIT_OK } from "../../../utils/enum";
import { approvalWorkFlowUrl } from "../../../utils/config";

function OuterStatement(props) {
  const flowType = FLOWTYPE.OTERSTATEMENT;
  const { dataAdapt } = props;
  console.log(dataAdapt);
  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState();
  const [param] = useSearchParams();
  const sideMenus = useMemo(() => sideMenu);

  const [activeKey, setActiveKey] = useState("0");
  const showLoading = useRef(false);
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
  const canWithdraw = useCallback(() => {
    return (
      (getData?.isOwner || getData?.isStarter) &&
      getData?.workflowEntity?.status === 0 &&
      postData?.outerStatementStatus === 0
    );
  });
  const isShowBottom = useCallback(() => {
    return !(!getData?.hasOperationPermit && !canWithdraw());
  });
  const Loading = useCallback(() => {
    <Loading></Loading>;
  });
  const getPublicMenuIndex = useCallback((key) => {
    return sideMenus?.findIndex((item) => item.key === key);
  });
  //撤回
  const withdraw = () => {
    Dialog.show({
      title: "提示",
      content: "确定撤回?",
      closeOnAction: true,
      actions: [
        [
          {
            key: "close",
            text: "取消",
          },
          {
            key: "confirm",
            text: "确定",
            danger: true,
            onClick: () => {
              showLoading.current = true;
              http
                .post(`/workflow/retract/${flowType}`, {
                  processinstanceid: getData.workflowEntity.processinstanceid,
                })
                .then((res) => {
                  showLoading.current = false;
                  if (res.code == SUBMIT_OK) {
                    Toast.show({
                      icon: "success",
                      content: "撤回成功",
                    });
                    getDetailsData();
                  } else if (res.code !== 200) {
                    Toast.show({
                      icon: "fail",
                      content: res.message,
                    });
                  }
                });
            },
          },
        ],
      ],
    });
  };
  //不同意
  const disagree = (rejectReason) => {
    showLoading.current = true;
    const processinstanceid = getData.workflowEntity.processinstanceid;
    http
      .post("api" + approvalWorkFlowUrl + flowType, {
        ispass: false,
        processinstanceid: processinstanceid,
        rejectreson: rejectReason,
        step: getData.step,
      })
      .then((res) => {
        if (SUBMIT_OK === Number(res.code)) {
          showLoading.current = false;
          getDetailsData();
          Toast.show({
            icon: "success",
            content: "操作成功",
          });
        } else if (SUBMIT_NO === Number(res.code)) {
          showLoading.current = false;
          Toast.show({
            icon: "fail",
            content: res.message,
          });
        }
      });
  };
  //同意
  const agree = () => {
    showLoading.current = true;
    const processinstanceid = getData.workflowEntity.processinstanceid;
    http
      .post("api" + approvalWorkFlowUrl + flowType, {
        ispass: true,
        processinstanceid: processinstanceid,
        step: this.getData.step,
      })
      .then((res) => {
        if (SUBMIT_OK === Number(res.code)) {
          showLoading.current = false;
          getDetailsData();
          Toast.show({
            icon: "success",
            content: res.message,
          });
        } else if (SUBMIT_NO === Number(res.code)) {
          showLoading.current = false;
          Toast.show({
            icon: "fail",
            content: res.message,
          });
        }
      });
  };
  //稍后处理
  const marked = () => {
    showLoading.current = true;

    http
      .post(`/api/saveLaterProcessing`, {
        processInstanceId: getData.workflowEntity.processinstanceid,
        flowType: getData.workflowEntity.flowtype,
        approvalNode: getData.step,
      })
      .then((res) => {
        showLoading.current = false;
        if (Number(res.code) === SUBMIT_OK) {
          Toast.show({
            icon: "success",
            content: res.message,
          });
          getDetailsData();
        } else if (Number(res.code) !== SUBMIT_OK) {
          Toast.show({
            icon: "fail",
            content: res.message,
          });
        }
      });
  };
  const log = (ev, file, uploadFiles) => {
    console.log(ev);
    console.log(file);
    console.log(uploadFiles);
  };
  return (
    <div style={{ height: "100vh" }}>
      {/* {showLoading && Loading()} */}
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
            action="mock/file/uploadAttachmentMock"
            multiple={true}
          >
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Upload>
          {/* <input onChange={(e)=>onChange(e)} type="file"></input> */}
        </Grid.Item>
      </Grid>
      {isShowBottom() && (
        <ButtomButton
          isShow={isShowBottom}
          isApproval={isShowBottom}
          isApprover={getData?.hasOperationPermit}
          canWithdraw={canWithdraw}
          canMarked={getData?.hasLaterProcessingButton}
          agree={agree}
          disagree={disagree}
          marked={marked}
          withdraw={withdraw}
        ></ButtomButton>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { dataAdapt: state.dataAdapt };
};
export default connect(mapStateToProps)(OuterStatement);
