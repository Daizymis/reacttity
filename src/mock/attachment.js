export default [
  {
    url: "/mock/file/uploadAttachmentMock",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: {
          empname: "lili",
          filetype: "xls",
          draftid: null,
          code: 200,
          dst: "attachment/ang/20221025/4f5191458deb49ecbfeac7a9059694b1.xls",
          caid: 586,
          name: "账号数据导出20221021.xls",
          cosResourceUrl:
            "http%3A%2F%2Fcuees-test-cos.cue.group%2Fbizv3%2Ftest%2Fhrsystem%2Fattachment%2Fang%2F20221025%2F4f5191458deb49ecbfeac7a9059694b1.xls%3Fsign%3Dq-sign-algorithm%253Dsha1%2526q-ak%253DAKIDSkn1lTYQbXEfrnhtXx71gV4PQHseIWZM%2526q-sign-time%253D1666683432%253B1666769832%2526q-key-time%253D1666683432%253B1666769832%2526q-header-list%253D%2526q-url-param-list%253D%2526q-signature%253D900c0d56f292f05a6c36b23f724f246a1990a7ad",
          id: 21553,
          sourceFileRemotePath:
            "/bizv3/test/hrsystem/attachment/ang/20221025/4f5191458deb49ecbfeac7a9059694b1.xls",
          url: "http://hrtest2.dev.cn2.corp.agrant.cn/biztest//materials/hrsystem/attachment/ang/20221025/4f5191458deb49ecbfeac7a9059694b1.xls",
        },
      };
    },
  },
];
