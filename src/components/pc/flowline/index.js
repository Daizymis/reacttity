import { Divider, Steps } from "antd";
import { statusList, colorList } from "../../../utils/enum";
import "@/assets/css/flowLine.scss";

const flowLine = ({ processData, status }) => {
  console.log(statusList);
  const { Step } = Steps;

  return (
    <div className="progress">
      <div className="progress-status font-PF-medium">
        <p>流程进度</p>
        <p className={statusList[status]?.color}>{statusList[status]?.title}</p>
      </div>
      <Steps
        progressDot
        current={status}
        direction="vertical"
        style={{
          "--title-font-size": "44px",
          "--description-font-size": "15px",
          "--indicator-margin-right": "12px",
          "--icon-size": "24px",
        }}
      >
        {processData?.map((item) => {
          return (
            <Step
              title={item.title}
              key={item.title}
              description={`${item.staffstr} ${item.timeStr || ""}`}
              className={["progress-node", colorList[item.point]?.bg]}
            />
          );
        })}
      </Steps>
    </div>
  );
};
export default flowLine;
