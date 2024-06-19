module.exports = {
  questions: [
    {
      type: "input",
      name: "username",
      message: "请输入您的用户名：",
    },
    {
      type: "list",
      name: "color",
      message: "请选择您喜欢的颜色：",
      choices: ["红色", "蓝色", "绿色"],
    },
  ],
};
