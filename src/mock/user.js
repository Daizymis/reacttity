import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: "/api/loginCheck",
    type: "post",
    response: (config) => {
      let request = JSON.parse(config.body);
      if (request.username === "guest" && request.password === "guest") {
        return {
          code: 201,
          token: "youaretheappleinmyeyes",
          userInfo:
            {id:1,caid:1,"empid":"1","deptid":"1","name":"guest","leadercaid":544,"leadername":"mary"},
        };
      }
      return {
        code: 300,
        data: { msg: "用户名或密码不正确" },
      };
    },
  },
  {
    url: "/user/file",
    type: "get",
    response: () => {
      let fileList = [];
      for (let i = 0; i < 6; i++) {
        let file = {};
        file.uid = Random.id();
        file.name = Random.title(3, 5);
        file.url = Random.image("200x100", "#50B347", "#FFF", Random.title(1));
        fileList.push(file);
      }
      return {
        code: 200,
        data: {
          fileList,
        },
      };
    },
  },
];
