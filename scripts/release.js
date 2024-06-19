const { execSync } = require("child_process");
const util = require("util");
// 改为异步：包裹返回promise

const fs = require("fs");
const path = require("path");
const exec = util.promisify(require("child_process").exec);
const inquirer = require("inquirer");
// import("inquirer").then((res) => {
//   console.log("res", res);
// });

// const inquirer = require("inquirer");

// const inquirer = (async () => {
//   const _i = await import("inquirer");
//   return _i;
// })();

const projectRootPath = path.join(__dirname, "..");
const packageJsonPath = path.join(projectRootPath, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const packageName = packageJson.name;

const { questions } = require("./inquirer.config");

/**
 * 获取最新版本号
 * @returns Promise
 */
async function getLatestVersion() {
  try {
    const { stdout } = await exec(`npm show ${packageName} version`);
    const latestVersion = stdout.trim().replace(/^v/, ""); // 删除可能存在的前导 v
    return latestVersion;
  } catch (error) {
    console.error(`❌ 获取最新版本失败: ${error.message}`);
    throw error; // 抛出错误，以便可以在调用此函数的地方捕获并处理
  }
}

function createQuestion() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.log("您输入的用户名是：", answers.username);
      console.log("您选择的颜色是：", answers.color);
    })
    .catch((error) => {
      console.error("交互过程中出错：", error);
    });
}

async function main() {
  try {
    // const latestVersion = await getLatestVersion();
    createQuestion();
  } catch (error) {
    console.error("❌ 发生错误:", error);
  }
}

main();
