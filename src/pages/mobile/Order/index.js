import { Grid } from "antd-mobile";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useRoutes } from "react-router";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { http } from "../../../utils";
import { createWorkFlowUrl } from "../../../utils/config";
import MenuBar from "../../../components/mobile/menu-bar";
import sideMenu from "./sideMenu";
function Order(props) {
  const {dataAdapt} = props;
  const [search] = useSearchParams();
  const [sideMenus,setSideMenus] = useState();
  const [data, setData] = useState({
    showLoading: false,
    orderType: '',
    flowType: 57,
    operateStep: '',
    getData: {}
  })
  const [postData, setPostData] = useState();
  const [showZeroType, setShowZeroType] = useState();
  const specialOperationForMedia = useCallback(() =>{
    return data.orderType === '9' && ['2', '3'].includes(postData.cleanType)
  }, [data.orderType, postData.cleanType]);
  useEffect(() => {
    // getDetailsData();
  });
  const getDetailsData = async () => {
    this.showLoading = true;
    let getFirstData = await http.post({
      url: createWorkFlowUrl + data.flowType,
    });
    http.post(
      !search.get('postData')
        ? this.dataAdapt[search.get('timestamp')]
        : JSON.parse(search.get('postData'))
    ).then((res) => {
      this.showLoading = false;
      setData(prevState =>({
        orderType: res.data.entity.ordertype,
        operateStep: res.data.step,
        getData: JSON.parse(
          JSON.stringify({ ...getFirstData.data, ...res.data })
        ),
     processData : res.data.flowLine,
     processStatus: res.data.workflowEntity.status,
     observer: res.data.Observer,
     interimObserver : res.data.observers,
     processPromoters: res.data.candidates

      }));
      setPostData(prevState => (Object.assign(prevState,  JSON.parse(JSON.stringify(res.data.entity)))))
      this.modifyOrder = [2, 3].includes(Number(res.data.entity.reorderstatus));
      this.$forceUpdate();
      getSideMenu(res.data.ShowType, res.data.entity.ordertype, res.data.entity.cverificationtype, res.data.entity.reorderstatus);
      this.specialOperationForMedia && this.handleSpecialOrderForMedia();
      // this.getData.hasOperationPermit = false;
      (this.getData.attachments || []).map((item) => {
        //decodeURI防止乱码
        item.name = this.myDecodeURI(item.name);
        // 处理文件类型
        this.$set(item, "type", (item.dst || "").split(".")[1].toLowerCase());
      });
      (this.postData.CustomerOrderFile || []).map((item) => {
        //decodeURI防止乱码
        item.name = this.myDecodeURI(item.name);
      });
      (this.postData.MediaOrderFile || []).map((item) => {
        //decodeURI防止乱码
        item.name = this.myDecodeURI(item.name);
      });
      this.activeKey = !this.activeKey ? 0 : this.activeKey;
      if (this.postData.reorderstatus === 3) {
        this.$set(this.postData, "rewindOrder", true);
      }
      this.handleCusBaseListData();
      if (["1", "2", "9"].includes(this.orderType)) {
        this.handleCusPayInfo();
      }
      this.handleMediaBaseInfo();
      // 后台返回数组为空时，初始化保证组件展示
      (this.postData.mpayment || []).length === 0 && this.handleMediaPayInfo();
      this.getPolicyData().then(() => {
        this.handleRechargeTableItemData();
      });
      if (this.orderType === "8") {
        if (
          ["MediumsAudit", "ReMediumsAudit", "RewindMediumsAudit"].includes(
            res.data.step
          ) &&
          this.postData.mresourcetype === "非直签媒体"
        )
          this.postData.mpamount = this.postData.mediaamount = null;
      }
    });
  };
  const getSideMenu = (ShowType, orderType,cverificationtype, reorderstatus) =>{
    const stepList = {
      1: 'starter',
      2: 'media',
      3: 'other'
    };
    let sideMenus;
    // this.getData.ShowType 1-发起人 2-媒介 3-除发起人、媒介以外所有步骤
    const step = stepList[ShowType];
    // 政策修改核销（5、6）下面还有分返货 / 返现、补返单，数据格式不同，单独处理
    if (['5', '6'].includes(orderType)) {
      const underwrite = cverificationtype === '返货' ? 'RETURN_GOODS' : 'OTHER';
      sideMenuss = deepClone(sideMenu[orderType][underwrite][step]);
    } else {
      sideMenus = deepClone(sideMenu[orderType][step]);
    }
    if (reorderstatus == 1) {
      sideMenus.push({
        key: 'withdrawReason',
        label: '撤单原因'
      });
    }
    setSideMenus(sideMenu);
  };
  return (
    <>
      <Grid columns={3} gap={8}>
        <Grid.Item>
          {
            useMemo(() =>{
              <MenuBar sideMenus={sideMenus}></MenuBar>
            }, [sideMenu])
          }
          
        </Grid.Item>
        <Grid.Item span={2}>
          <div>B</div>
        </Grid.Item>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) =>{
  return {dataAdapt: state.dataAdapt}
}

export default connect(mapStateToProps)(Order);
