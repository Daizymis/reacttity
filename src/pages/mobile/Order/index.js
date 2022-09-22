import { Grid } from "antd-mobile";
import { useEffect } from "react";
function Order(props) {
  useEffect(() => {
    // getDetailsData();
  });
  const getDetailsData = async () => {
    this.showLoading = true;
    let getFirstData = await communication({
      url: createWorkFlowUrl + this.flowType,
    });
    console.log(this.getData);
    communication(
      !this.$route.query.postData
        ? this.dataAdapt[this.$route.query.timestamp]
        : JSON.parse(this.$route.query.postData)
    ).then((res) => {
      this.showLoading = false;
      this.orderType = res.data.entity.ordertype;
      this.orderType === "9" && (this.showZeroType = res.data.entity.cleanType);
      this.operateStep = res.data.step;
      this.getData = JSON.parse(
        JSON.stringify({ ...getFirstData.data, ...res.data })
      );
      this.postData = JSON.parse(JSON.stringify(res.data.entity));
      this.processData = res.data.flowLine;
      this.processStatus = res.data.workflowEntity.status;
      this.observer = res.data.Observer;
      this.interimObserver = res.data.observers;
      this.processPromoters = res.data.candidates;
      this.modifyOrder = [2, 3].includes(Number(this.postData.reorderstatus));
      this.$forceUpdate();
      this.getSideMenu();
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
            this.operateStep
          ) &&
          this.postData.mresourcetype === "非直签媒体"
        )
          this.postData.mpamount = this.postData.mediaamount = null;
      }
    });
  };
  return (
    <>
      <Grid columns={3} gap={8}>
        <Grid.Item>
          <div>A</div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div>B</div>
        </Grid.Item>
      </Grid>
    </>
  );
}
export default Order;
