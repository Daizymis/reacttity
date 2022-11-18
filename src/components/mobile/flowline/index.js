import { Divider, Steps } from "antd-mobile";
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
      <Steps progressDot current={status} direction="vertical" style={{
            '--title-font-size': '0.32rem',
            '--description-font-size': '0.26rem',
            '--indicator-margin-right': '12px',
            '--icon-size': '0.32rem',
          }}>
        {processData?.map((item) => {
          return (
            <Step
              title={item.title}
              key={item.title}
              description={`${item.staffstr} ${item.timeStr || ''}`}
              className={["progress-node", colorList[item.point]?.bg]}
            />
          );
        })}
      </Steps>
    </div>
  );
};
export default flowLine;
