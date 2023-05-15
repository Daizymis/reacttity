import { NumFormat } from "../../../../utils/common";
import { Collapse, Grid } from "antd-mobile";

export function StatementList({ innerStatements = [], orders = [] }) {
    return (
        <div className="basic-info">
            <div className="title">结算信息</div>
            {
                innerStatements.length > 0 && <Collapse className="grid-table" defaultActiveKey={["1"]}>
                    {innerStatements.map((row, index) => (
                        <Collapse.Panel
                            key={row.innerStatementSeq + index}
                            title={row.innerStatementSeq}
                        >
                            <Grid columns={2} gap={2} className="grid-table">
                                <Grid.Item className="orange">
                                    <div className="grid-title">序号</div>
                                    <div className="grid-content">{index + 1}</div>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">对账单号</span>
                                    <span className="grid-content">{row.innerStatementSeq}</span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">核对数据类型</span>
                                    <span className="grid-content">{row.statementTypeStr}</span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">媒体简称</span>
                                    <span className="grid-content">{row.mediaName || "-"}</span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">对账月份</span>
                                    <span className="grid-content">{row.consumeMonth}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">对账总账显</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settlementBillDisplayAmountTotal)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">对账应付总金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settlementAmountTotal)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">剩余可结算账显</span>
                                    <span className="grid-content">
                                        {NumFormat(row.remainSettleBillDisplayAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">剩余可结算应付金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.remainSettlePayableAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">本次结算账显</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settleBillDisplayAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">本次结算应付金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settlePayableAmount)}
                                    </span>
                                </Grid.Item>
                            </Grid>
                        </Collapse.Panel>
                    ))}
                </Collapse>}
            {
                orders.length > 0 && <Collapse className="grid-table">
                    {orders.map((row, index) => (
                        <Collapse.Panel key={row.orderSeq + index} title={row.orderSeqNum}>
                            <Grid columns={2} gap={2} className="grid-table">
                                <Grid.Item className="orange">
                                    <div className="grid-title">序号</div>
                                    <div className="grid-content">{index + 1}</div>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">下单单号</span>
                                    <span className="grid-content">{row.orderSeqNum}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">立项单号</span>
                                    <span className="grid-content">{row.projectSeq || "-"}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">下单类型</span>
                                    <span className="grid-content">{row.orderTypeValue}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">媒体简称</span>
                                    <span className="grid-content">{row.mediaName}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">推广主体名称</span>
                                    <span className="grid-content">{row.advertise}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">媒体采购产品</span>
                                    <span className="grid-content">{row.producttype}</span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">投放周期</span>
                                    <span className="grid-content">
                                        {" "}
                                        {row.putInStartDate || "-"} 至 {row.putInEndDate || "-"}{" "}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">账显金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.billDisplayTotalAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">客户应付款金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.customerPayableAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">未开票金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.unTicketAmountByOrder)}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">未回款金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.unReturnAmount)}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">剩余可结算账显</span>
                                    <span className="grid-content">
                                        {NumFormat(row.remainSettleBillDisplayAmount)}
                                    </span>
                                </Grid.Item>

                                <Grid.Item>
                                    <span className="grid-title">剩余可结算应付金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.remainSettlePayableAmount)}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">本次结算账显</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settleBillDisplayAmount)}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">本次结算应付金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.settlePayableAmount)}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <span className="grid-title">结算已回款金额</span>
                                    <span className="grid-content">
                                        {NumFormat(row.registerFormTotalAmount)}
                                    </span>
                                </Grid.Item>
                            </Grid>
                        </Collapse.Panel>
                    ))}
                </Collapse>}
        </div>
    );
}
