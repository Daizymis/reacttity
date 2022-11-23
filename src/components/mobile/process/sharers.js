import { http } from "../../../utils";
import { SUBMIT_NO, SUBMIT_OK } from "../../../utils/config";
import { Tag } from "../tag/index";
import { Button, Space } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import "@/assets/css/sharer.scss";
export const Sharers = (props) => {
  let { owners, processInstanceId, flowType, isOwner, userInfo } = props;
  /**删除共享人操作*/
  const handleDelete = (item) => {
    http
      .post("api/deleteWorkFlowEmpRelation", {
        caid: item.caid,
        type: "owner",
        processinstanceid: processInstanceId,
      })
      .then((res) => {
        if (res.code === SUBMIT_OK) {
          Toast.show({
            icon: "success",
            content: "操作成功",
          });
          this.$emit("reloadPage");
        } else if (res.code === SUBMIT_NO) {
          Toast.show({
            icon: "danger",
            content: "系统异常",
          });
        }
      });
  };
  /**确认选择的共享人*/
  const selectSharers = (val) => {
    console.log(val);
    let users = [];
    users.push(val);
    console.log(users);

    http
      .post("api/addWorkFlowEmpRelation", {
        flowtype: flowType,
        processinstanceid: processInstanceId,
        type: "owner",
        users: users,
      })
      .then((res) => {
        if (res.code === SUBMIT_OK) {
          Toast.show({
            icon: "success",
            content: "操作成功",
          });
          this.showPicker = false;
          this.$emit("reloadPage");
        } else if (res.code == SUBMIT_NO) {
          Toast.show({
            icon: "danger",
            content: "系统异常",
          });
        }
      });
  };
  return (
    <div className="shares">
      <p className="font-PF-medium">流程共享人</p>
      {/* <van-button v-if="isOwner" round className="button" icon="plus"onClick="openPopup">
      流程共享人
    </van-button> */}
      {isOwner && (
        <Button
          style={{ "--background-color": "#E1F0FF", "--text-color": "#1890FF" }}
          shape="rounded"
          onClick={() => props.openPopup()}
        >
          <Space>
            <AddOutline />
            <span>流程共享人</span>
          </Space>
        </Button>
      )}
      <div className="share-list">
        {owners.map((item) => {
          return (
            <Tag
              key={item.caid}
              closeable={item.caid !== userInfo?.caid && isOwner}
              className="share-name"
              color="#E1F0FF"
              textcolor="#1890FF"
              close={() => handleDelete(item)}
            >
              {item.name}
            </Tag>
          );
        })}
      </div>
      {/* <fuzzy-search
      :show-picker="showPicker"
      :remote="true"
      :options="searchOptions"
      search-label="ename"
      search-value="caid"
      @search="searchParticipant"
      @close="closePopup"
      @confirm="selectSharers"
    ></fuzzy-search> */}
    </div>
  );
};
