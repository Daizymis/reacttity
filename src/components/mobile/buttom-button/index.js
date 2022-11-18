import { Popup, Button, Space, Dialog, CenterPopup, TextArea, Toast } from "antd-mobile";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCallback, useMemo } from "react";
import './bottomButton.scss'
const ButtomButton = (props) => {
  const {
    isShow,
    disagreeDisabled,
    isApproval,
    canMarked,
    canWithdraw,
    isApprover,
  } = props;
  const buttonNav = useRef();
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const buttonList = useMemo(() => {
    return {
      // 审批按钮list
      approval: {
        // 只是审批人
        0: [
          {
            type: "danger",
            label: "不同意",
            key: "disagree",
            size: "btn-medium",
            disabled: false,
          },
          {
            type: "success",
            label: "同意",
            key: "agree",
            size: "btn-medium",
            disabled: false,
          },
        ],
        // 既是审批人又可以撤回
        1: [
          {
            type: "danger",
            label: "不同意",
            key: "disagree",
            size: "btn-small",
            disabled: false,
          },
          {
            type: "success",
            label: "同意",
            key: "agree",
            size: "btn-small",
            disabled: false,
          },
          {
            type: "primary",
            label: "撤回",
            key: "withdraw",
            size: "btn-small",
            disabled: false,
          },
        ],
        // 只能撤回
        2: [
          {
            type: "primary",
            label: "撤回",
            key: "withdraw",
            size: "btn-large",
            disabled: false,
          },
        ],
      },
    };
  });
  useEffect(()=>{
    let element = buttonNav.current;
    const contentWidth = element.offsetWidth;
    const scrollWidth = element.scrollWidth;
    const offset = (scrollWidth - contentWidth) / 2;
    element.scrollLeft = offset;
  }, [canMarked])
  const getButtonList = useCallback(() => {
    console.log(canWithdraw());
    let btnList = [];
    if (isApproval) {
      if (isApprover && canWithdraw()) {
        btnList = buttonList.approval[1];
      } else if (isApprover) {
        btnList = buttonList.approval[0];
      } else if (canWithdraw()) {
        btnList = buttonList.approval[2];
      }
    }
    if (
      canMarked &&
      isApproval &&
      isApprover &&
      !btnList.find((item) => item.key === "marked")
    ) {
      btnList.unshift({
        type: "warning",
        label: "稍后处理",
        key: "marked",
        size: "btn-medium",
        disabled: false,
      });
    } else if (!canMarked && btnList.find((item) => item.key === "marked")) {
      btnList.shift();
    }
    if (disagreeDisabled) {
      let disabledIndex = btnList.findIndex((item) => item.key === "disagree");
      btnList[disabledIndex][disabled]= true;
    }
    return btnList;
  }, [canMarked, isApproval, isApprover, disagreeDisabled, canWithdraw]);
  const submit = (type) => {
    console.log(type);
    if (type === "disagree") {
      setShowReject(true);
      setRejectReason('');
    } else {
      props[type]();
    }
  };
  return (
    <div>
      <Popup visible={isShow} bodyStyle={{ height: "1.7rem" }} className="bottom-btn">
        <div ref={buttonNav} className={canMarked ? 'button-width' : 'button-list'}>
          {getButtonList().map((item) => (
            <Button
              shape='rounded'
              key={item.key}
              color={item.type}
              className={item.size}
              onClick={() => submit(item.key)}
              disabled={item.disabled}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Popup>
      <Dialog
        visible={showReject}
        title="提示"
        content= {
          <>
          <TextArea
          placeholder='请输入驳回原因'
          value={rejectReason}
          onChange={val => {
            setRejectReason(val)
          }}
        />
          </>
        }
        onClose={() => {
          setShowReject(false)
        }}
        actions={[
          [{
            key: "close",
            text: "取消",
            onClick: ()=> setShowReject(false)
          },
          {
            key: "confirm",
            text: "确定",
            danger: true,
            onClick: () => {
              if(!rejectReason) {
                Toast.show({
                  icon: "fail",
                  content: "请填写驳回原因",
                });
                return;
              }
              props['disagree'](rejectReason);
            }
          }]
        ]}
      />
    </div>
  );
};

export default ButtomButton;
