import { Popup, Button } from "antd-mobile";
import { useCallback } from "react";
const ButtomButton = ({
  isShow,
  disagreeDisabled,
  isApproval,
  canMarked,
  canWithdraw,
  isApprover,
}) => {
  const getButtonList = useCallback(() => {
    let btnList = [];
    if (isApproval) {
      if (isApprover && canWithdraw) {
        btnList = buttonList.approval[1];
      } else if (isApprover) {
        btnList = buttonList.approval[0];
      } else if (canWithdraw) {
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
        label: $i18n.t("normalLang.resolve"),
        key: "marked",
        size: "btn-medium",
        disabled: false,
      });
    } else if (!canMarked && btnList.find((item) => item.key === "marked")) {
      btnList.shift();
    }
    if (disagreeDisabled) {
      let disabledIndex = btnList.findIndex((item) => item.key === "disagree");
      $set(btnList[disabledIndex], "disabled", true);
    }
    return btnList;
  }, [canMarked, isApproval, isApprover, disagreeDisabled]);
  return (
    <div>
      <Popup visible={isShow} bodyStyle={{ height: "1.7rem" }}>
        <div>
          {getButtonList().map((item) => (
            <Button
              shape="default"
              key={item.label}
              color="primary"
              onClick={() => submit(item.key)}
            >
              Default Button
            </Button>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default ButtomButton;
