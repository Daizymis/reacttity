import { Divider, Steps } from "antd";
import { statusList, colorList } from "../../../utils/enum";
import "@/assets/css/flowLine.scss";

const flowLine = ({ processData, status }) => {
  console.log(statusList);
  const { Step } = Steps;
  console.log("iii");
  return (
    <div className="progress">
      <div class="progress-status font-PF-medium">
        <p>流程进度</p>
        <p className={statusList[status]?.color}>{statusList[status]?.title}</p>
      </div>
      <Steps progressDot current={status} direction="vertical">
        {processData?.map((item) => {
          return (
            <Step
              title={item.title}
              key={item.title}
              description={`${item.staffstr}` + item.timeStr}
              className={["progress-node", colorList[item.point]?.bg]}
            />
          );
        })}
      </Steps>
    </div>
  );
};
export default flowLine;
