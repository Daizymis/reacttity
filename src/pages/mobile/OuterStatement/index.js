import { Grid, Skeleton, Dialog, Toast } from "antd-mobile";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useTransition,
} from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MenuBar from "../../../components/mobile/menu-bar";
import { http } from "../../../utils";
import sideMenu from "./sideMenu";
import "@/assets/css/outerStatement.scss";
import "@/assets/css/mobile/common.scss";
import "@/assets/css/mobile/detail.scss";
import FlowLine from "../../../components/mobile/flowline";
import Loading from "../Loading";
import Upload from "../../../components/mobile/upload";
import ButtomButton from "../../../components/mobile/buttom-button";
import { useRef } from "react";
import { FLOWTYPE, SUBMIT_NO, SUBMIT_OK } from "../../../utils/enum";
import { approvalWorkFlowUrl, createWorkFlowUrl } from "../../../utils/config";
import { Sharers } from "../../../components/mobile/process/sharers";
import { Comments } from "../../../components/mobile/comments";
import ModifyRecord from "../../../components/mobile/modify-record";
import { useTranslation } from "react-i18next";
import { StatementList } from "./child/statementList";
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
  const [selectData, setSelectData] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    getDetailsData();
    getSelectData();
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
  const getSelectData = () => {
    http.post("api/" + createWorkFlowUrl + flowType, {}).then((res) => {
      setSelectData(res.data);
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
    console.log(key);
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
    <div className="detail" style={{ height: "100vh" }}>
      {/* {showLoading && Loading()} */}
      <Grid columns={24} gap={2} style={{ height: "100%" }}>
        <Grid.Item className="detail-sidebar" span={5}>
          <MenuBar
            sideMenus={sideMenus}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          ></MenuBar>
        </Grid.Item>
        <Grid.Item span={19} className="detail-nav">
          {(() => {
            switch (activeKey) {
              case "0":
                return getData ? (
                  <FlowLine
                    status={getData?.workflowEntity?.status}
                    processData={getData?.flowLine}
                  ></FlowLine>
                ) : (
                  <>
                    <Skeleton.Title animated />
                    <Skeleton.Paragraph lineCount={6} animated />
                  </>
                );
              case getPublicMenuIndex("processSharers") + "":
                return (
                  getData && (
                    <Sharers
                      owners={getData.owners}
                      isOwner={getData.isOwner}
                      flowType={getData.workflowEntity.flowtype}
                      processInstanceId={
                        getData.workflowEntity.processinstanceid
                      }
                      userInfo={props.userInfo}
                    ></Sharers>
                  )
                );
              case getPublicMenuIndex("detail") + "":
                return (
                  <div className="basic-info">
                    <Grid columns={3} gap={8} className="detail-row">
                      <Grid.Item className="content-title">
                        外部结算单号
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.outerStatementSeq || "- -"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">客户属性</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.custType}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">客户名称</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.custName}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">收款主体</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.receiptCompanyName}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/* <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        {" "}
                        {t("normalLang.selectCurrency")}
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.currencyCode || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">销助</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.saleAssistantName}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        销助负责人
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.saleAssistantPrincipalName || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">销售</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.saleName}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        销售负责人
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.salePrincipalNames || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/* <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">账期类型</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {(
                          (selectData.PeriodTypes || []).find(
                            (item) => item.key == postData.periodType
                          ) || {}
                        ).value || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">结算类型</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {(
                          (selectData.OuterStatementTypes || []).find(
                            (item) => item.key == postData.outerStatementType
                          ) || {}
                        ).value || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">结算周期</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.outerStatementIntervalStartDate +
                          "至" +
                          postData.outerStatementIntervalEndDate}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        结算总账显
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {numberFormatFixedSix(
                          postData.outerStatementBillDisplayTotalAmount
                        )}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        结算应付总金额
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {numberFormatFixedSix(
                          postData.outerStatementPayableTotalAmount
                        )}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        应付款日期
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        <div>{postData.paymentDueDate}</div>
                      </Grid.Item>
                      <Grid.Item
                        v-if="postData.oldPaymentDueDate && postData.paymentDueDate !== postData.oldPaymentDueDate"
                        className="content-title"
                        style={{ color: "red" }}
                      >
                        原始日期
                      </Grid.Item>
                      <Grid.Item
                        v-if="postData.oldPaymentDueDate && postData.paymentDueDate !== postData.oldPaymentDueDate"
                        span={2}
                        className="content-content"
                        style={{ color: "red" }}
                      >
                        <div>{postData.oldPaymentDueDate}</div>
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        客户确认附件上传
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {/*<attachment-index :attachments="postData.custConfirmFiles" :is-upload="false" />*/}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row content-title">*/}
                      <Grid.Item className="content-title">
                        合同账期描述
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.contractPeriodDesc || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid className="detail-row content-title">*/}
                      <Grid.Item className="content-title">备注</Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.memo || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      <Grid.Item span={3} className="content-title">
                        <div className="title" style={{ color: "red" }}>
                          关联回款
                        </div>
                      </Grid.Item>
                      {/*<Grid className="detail-row content-title" style="color: red;">*/}
                      <Grid.Item
                        span={3}
                        className="detail-row content-title"
                        style={{ color: "red" }}
                      >
                        请注意，如客户存在关联回款/代付情况时请填写客户回款主体，如无则无需填写
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*<Grid className="detail-row">*/}
                      <Grid.Item className="content-title">
                        客户回款主体
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.returnCustomers
                          .map((item) => item.custName)
                          .toString() || "-"}
                      </Grid.Item>
                      {/*</Grid>*/}
                      {/*  <Grid v-if="postData.outerStatementStatus === 1 && processStatus !== STATUS.REFUSE" className="detail-row">*/}
                      <Grid.Item className="content-title">
                        {t("outerStatementLang.retractReason")}
                      </Grid.Item>
                      <Grid.Item span={2} className="content-content">
                        {postData.retractReason}
                      </Grid.Item>
                    </Grid>
                  </div>
                );
              case getPublicMenuIndex("statement") + "":
                return (
                  <StatementList
                    innerStatements={postData.innerStatements}
                    orders={postData.orders}
                  ></StatementList>
                );
              case getPublicMenuIndex("postComments") + "":
                return (
                  getData && (
                    <Comments
                      commentsList={getData.comments}
                      recipients={getData.Recipients}
                      flow-type={getData.workflowEntity.flowtype}
                      process-instance-id={
                        getData.workflowEntity.processinstanceid
                      }
                      reloadPage={getDetailsData}
                    ></Comments>
                  )
                );
              case getPublicMenuIndex("modifyRecords") + "":
                return (
                  getData && (
                    <ModifyRecord records={getData.modifyLogs}></ModifyRecord>
                  )
                );
              default:
                return null;
            }
          })()}

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
function numberFormatFixedSix(value) {
  if (value === "-") {
    return value;
  }
  if (value == "" || !value || value === 0 || isNaN(value)) return "0.00";
  return Number(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //将整数部分逢三一断
}
const mapStateToProps = (state) => {
  return { dataAdapt: state.dataAdapt, userInfo: state.userInfo };
};
export default connect(mapStateToProps)(OuterStatement);
