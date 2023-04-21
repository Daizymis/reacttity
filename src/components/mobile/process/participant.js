import propTypes from "prop-types";
import { Button, Toast } from "antd-mobile";
import { Tag } from "../tag";
import Filter from "../filter";
import { useStore } from "react-redux";
import { debounce } from "../../../utils/util";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addParticipant, delParticipant } from "../../../utils/config";
import { SUBMIT_NO, SUBMIT_OK } from "../../../utils/code";
import { http } from "../../../utils";
import "@/assets/css/mobile/processParticipants.scss";

export function Participant(props) {
  const { t } = useTranslation();
  const {
    interimObserver,
    processPromoters,
    isProcessIncomplete,
    isCandidate,
    operateStep,
    starterName,
    processInstanceId,
  } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [addType, setAddType] = useState(null);
  const { userInfo } = useStore().getState();
  const openPopup = (type) => {
    setSearchOptions([]);
    setShowPicker(false);
    setAddType(type);
  };
  const closePopup = () => {
    setAddType(null);
    setShowPicker(false);
  };
  const searchParticipant = debounce(function (val) {
    if (!val || val === "") {
      setSearchOptions([]);
      return;
    }
    http
      .post("/api/getNormalEmployees", {
        postData: {
          condition: val,
        },
      })
      .then((res) => {
        setSearchOptions(res.empList);
      });
  }, 500);
  const selectParticipant = (val) => {
    // 若选择的人是流程发起人 不允许添加
    if (val.name === starterName.replace(/\s+/g, "")) {
      Toast.show({
        icon: "danger",
        content: t("normalLang.initiatorCantAddWarning"),
      });
      return;
    }
    http
      .post(addParticipant, {
        postData: {
          step: operateStep, //流程审批步骤
          processinstanceid: processInstanceId, //流程id
          type: addType, // 添加参与者or推进者
          caid: val.caid, // 所选择用户的caid
        },
      })
      .then((res) => {
        if (res.code === SUBMIT_OK) {
          Toast.show({
            icon: "success",
            content: t("listPage.submitSuccess"),
          });
          setShowPicker(false);
          props.reloadPage();
        } else if (res.code === SUBMIT_NO) {
          Toast.show({
            icon: "danger",
            content: res.message || t("normalLang.systemException"),
          });
        }
      });
  };
  const handleDelete = (item) => {
    http
      .post(delParticipant, {
        postData: {
          caid: item.caid,
          type: item.type,
          oldStep: item.step,
          curStep: operateStep,
          processinstanceid: item.processinstanceid,
        },
      })
      .then((res) => {
        if (res.code === SUBMIT_OK) {
          Toast.show({
            icon: "success",
            content: t("listPage.submitSuccess"),
          });
          setShowPicker(false);
          props.reloadPage;
        } else if (res.code === SUBMIT_NO) {
          Toast.show({
            icon: "danger",
            content: res.message || t("normalLang.systemException"),
          });
        }
      });
  };

  return (
    <div className="participants">
      {/*临时流程参与者 */}
      <p className="font-PF-medium">临时流程参与者</p>
      <div>
        {isProcessIncomplete && (
          <Button
            shape="rounded"
            className="par-button"
            icon="plus"
            onClick={() => openPopup("observer")}
          >
            流程观察者
          </Button>
        )}
        {isProcessIncomplete && isCandidate && (
          <Button
            shape="rounded"
            className="par-button"
            icon="plus"
            onClick={() => openPopup("candidate")}
          >
            流程推进者
          </Button>
        )}
      </div>
      {/*临时流程观察者 */}
      <p className="font-PF-medium">临时流程观察者</p>
      <div className="observer-list">
        {interimObserver.map((item) => (
          <Tag
            key={item.caid}
            closeable={
              item.creater === userInfo.caid &&
              isProcessIncomplete &&
              item.step === operateStep
            }
            className="observer-name"
            color="#E1F0FF"
            textcolor="#1890FF"
            close={() => handleDelete(item)}
          >
            {item.name}
          </Tag>
        ))}
      </div>
      {/*流程推进者 */}
      <p className="font-PF-medium">流程推进者</p>
      <div className="observer-list">
        {processPromoters.map((item) => (
          <Tag
            key={item.caid}
            closeable={
              item.creater === userInfo.caid &&
              isProcessIncomplete &&
              item.step === operateStep
            }
            className="observer-name"
            color="#E1F0FF"
            textcolor="#1890FF"
            close={() => handleDelete(item, index)}
          >
            {item.name}
          </Tag>
        ))}
      </div>
      {/*<fuzzy-search
      :show-picker="showPicker"
:remote="true"
:options="searchOptions"
search-label="ename"
search-value="item"
@search="searchParticipant"
@close="closePopup"
@confirm="selectParticipant"
></fuzzy-search>*/}
      {showPicker && (
        <Filter
          setShowPicker={setShowPicker}
          options={recipients}
          label="ename"
          search-value="item"
        ></Filter>
      )}
    </div>
  );
}
Participant.propTypes = {
  interimObserver: propTypes.array, // 临时流程观察者
  processPromoters: propTypes.array, // 流程推进者
  isProcessIncomplete: propTypes.bool, // 流程是否在进行中
  isCandidate: propTypes.bool, // 是否为流程审批人
  operateStep: propTypes.number, // 审批当前步骤
  starterName: propTypes.string, // 发起人姓名
  processInstanceId: propTypes.string, // 流程id
};
Participant.defaultProps = {
  interimObserver: [],
  processPromoters: [],
  isProcessIncomplete: true,
  isCandidate: false,
  operateStep: null,
  starterName: "",
  processInstanceId: "",
};
