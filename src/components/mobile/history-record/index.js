import {Grid} from "antd-mobile";
import style from './index.scss'
export function HistoryRecord({ records = [] }) {
    const recordTitleList = [
        {
            label: '最终审批时间',
            key: 'finallytime'
        },
        {
            label: '最终审批人',
            key: 'finallyname'
        },
        {
            label: '流程状态',
            key: 'status'
        },
        {
            label: '驳回原因',
            key: 'rejectreson'
        }
    ];
    return (
        <div className={style.history}>
            <p className="history-title font-PF-medium">  {`历史记录（${records?.length}）`}</p>
            {
                records.map((item, index) =>
                    <div key={item.id + index} className="history-detail">
                        {
                            recordTitleList.map((itemT, index) =>
                                <div key={index} className="history-detail-info">
                                    <Grid columns={3} gap={8} >
                                        <Grid.Item className="history-detail-item">{ itemT.label }</Grid.Item>
                                        <Grid.Item span={2} className="history-detail-item text-align-right">
                                            { itemT.key === 'status' ? <span>
                                                    {item.status === 0 && item.isrefund !== 1 &&
                                                    <p style={{color: '#f9c247'}}>已提交</p>}
                                                    {item.status === 1 && <p style={{color: '#f9c247'}}>处理中</p>}
                                                    {item.status === 2 && item.isrefund !== 1 &&
                                                    <p style={{color: '#00CE6D'}} >已完成</p>}
                                                    {item.status === 3 && item.isrefund !== 1 && <p style={{color: 'red'}}>已驳回</p>}
                                                    {item.status === 6 && <p style="color: red;">已撤回</p>}
                                                    {item.status === 0 && item.isrefund === 1 && (<p style={{color: '#f9c247'}}>
                                                        退票已提交
                                                    </p>)}
                                                    {item.status === 3 && item.isrefund === 1 &&
                                                    <p style={{color: 'red'}}>退票已驳回</p>}
                                                    {item.status === 2 && item.isrefund === 1 &&
                                                    <p style={{color: 'green'}}>已退票</p>}
                                                </span>
                                                : <span>
                                                    {item[itemT.key] || '/'}
                                                </span>}
                                        </Grid.Item>
                                    </Grid>
                                </div>)
                        }
                        <div className="history-detail-divider" />
                    </div>
                )
            }
        </div>
    );
}

