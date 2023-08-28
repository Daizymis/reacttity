export default [
    {
        url: 'api/createWorkFlow/75',
        type: "post",
        response: () =>{
            return {
                code: 200,
                data: {"flowLine":[{"title":"Process Initiator","point":2,"time":null,"timeStr":null,"staffList":[{"caid":586,"name":"Victor","email":"yonggang.wang@cue.group1"}],"staffstr":"Victor ","taskDefKey":null}],"OuterStatementOrderTypes":[{"id":1441,"mark":"OuterStatementOrderType","key":1,"value":"Direct-Open Auction","pid":null,"remark":null},{"id":1445,"mark":"OuterStatementOrderType","key":10,"value":"Customer Rebate-Customer Refund","pid":null,"remark":null},{"id":1442,"mark":"OuterStatementOrderType","key":2,"value":"Direct-Insertion PO","pid":null,"remark":null},{"id":1444,"mark":"OuterStatementOrderType","key":7,"value":"Agency Fee","pid":null,"remark":null},{"id":1443,"mark":"OuterStatementOrderType","key":9,"value":"Special PO","pid":null,"remark":null}],"CustType":[{"id":1254,"mark":"CustomerType","key":"代理商","value":"Agency","pid":null,"remark":null},{"id":1253,"mark":"CustomerType","key":"直属客户","value":"Direct","pid":null,"remark":null}],"isSalesAssistant":true,"Observer":[],"OuterStatementOrderStatus":[],"OuterStatementTypes":[{"id":1415,"mark":"OuterStatementType","key":0,"value":"Top-up/Agency Fee Settlement","pid":null,"remark":null},{"id":1416,"mark":"OuterStatementType","key":1,"value":"Consumption/Agency Fee Settlement","pid":null,"remark":null}],"OuterStatementRelateStatementType":[{"id":1449,"mark":"OuterStatementRelateStatementType","key":1,"value":"Consume Data","pid":null,"remark":"外部结算单 关联内部对账的类型"},{"id":1450,"mark":"OuterStatementRelateStatementType","key":2,"value":"Agency Fee","pid":null,"remark":"外部结算单 关联内部对账的类型"}],"PeriodTypes":[{"id":1413,"mark":"OuterStatementPeriodType","key":0,"value":"Prepay","pid":null,"remark":null},{"id":1414,"mark":"OuterStatementPeriodType","key":1,"value":"Advance","pid":null,"remark":null}]}
            }
        }
    },
    {
        url: 'api/getWorkFlowDetail',
        type: "post",
        response: () => {
            return {
                code: 200,
                data: {
                    "hasOperationPermit": true,
                    "attachments": [],
                    "comments": [],
                    "Recipients": [{
                        "id": 1,
                        "caid": 1,
                        "name": "xun.wu",
                        "empid": "0015",
                        "deptid": "N9999",
                        "photourl": "0015.jpg"
                    }, {
                        "id": 2,
                        "caid": 2,
                        "name": "xun.lin",
                        "empid": "0090",
                        "deptid": "N9999",
                        "photourl": "0090.jpg"
                    }, {"caid": 3, "name": "xiaobai",}, {
                        "caid": 3,
                        "name": "xiaoran",
                    },
                        {"id": 4,"caid": 4, "name": "lili", },
                        {
                            "id": 5,
                        "caid": 5,
                        "name": "test",
                        "email": "bi_test@cue.group1"
                    }],
                    "workflowEntity": {
                        "id": 123284,
                        "processinstanceid": "4b7abb7afd9d11ec8767ea2567a70977",
                        "caid": 586,
                        "empid": "0202",
                        "deptid": "CUE0004",
                        "title": null,
                        "status": 0,
                        "flowtype": "75",
                        "deleted": "0",
                        "createtime": "2022-07-07 10:34:16",
                        "updatetime": "2022-07-07 10:34:16",
                        "transferstatus": "0",
                        "rejectreson": null,
                        "oldprocessinstanceid": "fa54b193fc4511ecb995ea2567a70977",
                        "taskid": ""
                    },
                    "owners": [],
                    "historyData": [{
                        "processinstanceid": "fa54b193fc4511ecb995ea2567a70977",
                        "finallytime": "2022-07-05 17:38:32",
                        "updatetime": "2022-07-05 17:38:32",
                        "status": 2,
                        "rejectreson": null,
                        "finallyname": "Victor"
                    }],
                    "flowLine": [{
                        "title": "Process Initiator",
                        "point": 1,
                        "time": "2022-07-07 10:34:16",
                        "timeStr": "2022-07-07 10:34:16",
                        "staffList": [{"caid": 586, "name": "Victor", "email": "yonggang.wang@cue.group1"}],
                        "staffstr": "Victor ",
                        "taskDefKey": null
                    }, {
                        "title": "BI",
                        "point": 2,
                        "time": null,
                        "timeStr": null,
                        "staffList": [{
                            "caid": 544,
                            "name": "Sky",
                            "email": "kshi@cue.group1",
                            "TASK_DEF_KEY_": "BI",
                            "stepname": "BI复核"
                        }, {
                            "caid": 586,
                            "name": "Victor",
                            "email": "yonggang.wang@cue.group1",
                            "TASK_DEF_KEY_": "BI",
                            "stepname": "BI复核"
                        }, {
                            "caid": 933,
                            "name": "fei.zheng",
                            "email": "fei.zheng@cue.group1",
                            "TASK_DEF_KEY_": "BI",
                            "stepname": "BI复核"
                        }, {
                            "caid": 20005,
                            "name": "bi_test",
                            "email": "bi_test@cue.group1",
                            "TASK_DEF_KEY_": "BI",
                            "stepname": "BI复核"
                        }],
                        "staffstr": "Sky Victor fei.zheng bi_test ",
                        "taskDefKey": null
                    }, {
                        "title": "Reviewers",
                        "point": 0,
                        "time": null,
                        "timeStr": null,
                        "staffList": [{"caid": 544, "name": "Sky", "email": "kshi@cue.group1"}, {
                            "caid": 586,
                            "name": "Victor",
                            "email": "yonggang.wang@cue.group1"
                        }],
                        "staffstr": "Sky Victor ",
                        "taskDefKey": null
                    }],
                    "candidates": [],
                    "processinstanceid": "4b7abb7afd9d11ec8767ea2567a70977",
                    "isOwner": false,
                    "Observer": [{"name": "jun.xiao"}, {"name": "xia.lin"}],
                    "isCandidate": true,
                    "hasLaterProcessingButton": true,
                    "isStarter": true,
                    "modifyLogs": [{
                        "auditid": 65465,
                        "id": "456b138847b34700bcb32aacecb4bc46",
                        "caid": 586,
                        "ordertype": "OuterStatement",
                        "currdate": "2022-07-07 10:38:47",
                        "modify": {"modifyDate": "2022-07-07 10:34:16", "modifyName": "王勇刚", "modifyEmpid": "0202"},
                        "modifykeys": [{
                            "modifyKey": "本次结算账显",
                            "before": 1.0,
                            "isAmountField": true,
                            "after": 0.0,
                            "type": "OuterStatementOrderDetail",
                            "operation": "update"
                        }],
                        "createtime": null,
                        "updatetime": null,
                        "sourceModule": null
                    }, {
                        "auditid": 65464,
                        "id": "456b138847b34700bcb32aacecb4bc46",
                        "caid": 586,
                        "ordertype": "OuterStatement",
                        "currdate": "2022-07-07 10:38:47",
                        "modify": {"modifyDate": "2022-07-07 10:34:16", "modifyName": "王勇刚", "modifyEmpid": "0202"},
                        "modifykeys": [{
                            "modifyKey": "结算标识",
                            "before": "正常",
                            "isAmountField": false,
                            "after": "改单",
                            "type": "OuterStatement"
                        }],
                        "createtime": null,
                        "updatetime": null,
                        "sourceModule": null
                    }],
                    "step": "BI",
                    "isParticipant": true,
                    "entity": {
                        "id": 533,
                        "createtime": "2022-07-07 10:34:16",
                        "updatetime": "2022-07-07 10:34:16",
                        "processinstanceid": "4b7abb7afd9d11ec8767ea2567a70977",
                        "workflowid": null,
                        "previousOuterStatementId": 522,
                        "outerStatementSeq": "JS202207050002",
                        "outerStatementStatus": 2,
                        "custId": 1,
                        "custCid": "9574-1-7",
                        "custName": "北京AnG有限公司",
                        "custType": "直属客户",
                        "receiptCompanyId": 50,
                        "receiptCompanyName": "北京AnG技有限公司",
                        "saleAssistantCaid": 586,
                        "saleAssistantName": "王勇刚",
                        "saleAssistantPrincipalCaid": 776,
                        "saleAssistantPrincipalName": "张斌1",
                        "saleCaid": 586,
                        "saleName": "王勇刚",
                        "salePrincipalCaids": "544",
                        "salePrincipalNames": "施侃",
                        "periodType": 1,
                        "outerStatementType": 1,
                        "outerStatementIntervalStartDate": "2022-08-01",
                        "outerStatementIntervalEndDate": "2022-08-05",
                        "outerStatementBillDisplayTotalAmount": 0.00,
                        "outerStatementPayableTotalAmount": 45.00,
                        "paymentDueDate": "2022-07-05",
                        "oldPaymentDueDate": null,
                        "retractReason": null,
                        "memo": null,
                        "groupId": "456b138847b34700bcb32aacecb4bc46",
                        "history": false,
                        "contractPeriodDesc": "1",
                        "approvalPassTime": null,
                        "currencyCode": "CNY",
                        "orders": [{
                            "id": 556,
                            "createTime": "2022-07-07 10:34:16",
                            "updateTime": "2022-07-07 10:34:16",
                            "outerStatementId": 533,
                            "outerStatementSeq": "JS202207050002",
                            "orderId": 8105,
                            "orderPaymentId": 18203,
                            "orderSeq": "OR202201240001",
                            "orderProcId": "589cae147ce911ec875eea2567a70977",
                            "orderGroupId": "3A626D86CB074F4D91679D3F92740B00",
                            "settleBillDisplayAmount": 0.00,
                            "settlePayableAmount": 45.00,
                            "orderSeqNum": "OR202201240001-01",
                            "projectSeq": "TP202007200003",
                            "projectId": "110364",
                            "mediaId": 5,
                            "mediaName": "百度KA",
                            "advertiseId": 725,
                            "advertise": "1",
                            "putInStartDate": "2020-07-01",
                            "putInEndDate": "2020-07-30",
                            "billDisplayTotalAmount": 5,
                            "customerPayableAmount": 4545.00,
                            "unReturnAmount": 4500.00,
                            "unTicketAmountByOrder": 4545.00,
                            "ticketAmountByOrder": 0.0,
                            "ticketAmount": 0.0,
                            "registerFormTotalAmount": 45.00,
                            "remainSettleBillDisplayAmount": 5.00,
                            "remainSettlePayableAmount": 4500.00,
                            "saleTeamId": 1,
                            "saleTeamName": "张杪团队",
                            "salePrincipalNames": null,
                            "orderType": 2,
                            "orderTypeValue": "即充即返-刊例价类型",
                            "producttype": "商店",
                            "operationType": null,
                            "status": null
                        }],
                        "innerStatements": [],
                        "returnCustomers": [],
                        "custConfirmFiles": [{
                            "id": 19864,
                            "processinstanceid": "OuterStatementCustConfirmFile4b7abb7afd9d11ec8767ea2567a70977",
                            "name": "1 - 副本 （2）.png",
                            "dst": "attachment/ang/20220705/5a6b6d13728149388c0d5005a03cd273.png",
                            "url": "http://hrtest2.dev.cn2.corp.agrant.cn/biztest//materials/hrsystem/attachment/ang/20220705/5a6b6d13728149388c0d5005a03cd273.png",
                            "createtime": "2022-07-07 10:34:17",
                            "updatetime": "2022-07-07 10:34:17",
                            "filetype": "png",
                            "caid": 586,
                            "draftid": "null",
                            "commentid": null,
                            "empname": "王勇刚",
                            "sourceFileRemotePath": "/bizv3/test/hrsystem/attachment/ang/20220705/5a6b6d13728149388c0d5005a03cd273.png"
                        }],
                        "oldProcessinstanceid": null,
                        "isDraft": false
                    },
                    "isObserver": false,
                    "observers": []
                }
            }
        }
    }
]
