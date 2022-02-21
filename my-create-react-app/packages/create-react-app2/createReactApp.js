// const { default: chalk } = require('chalk')
import chalk from "chalk";
// const {Command} = require('commander')
import { Command } from "commander";
import path from "path";
// const packJson = require('./package.json')
import packJson from "./package.json";
import { log } from "./utils/log.js";
import fs from "fs-extra";
import { spawn } from "child_process";
// const log = require('./utils/log')

async function init(){
  log('init')
  let projectName;

  new Command(packJson.name)
  .version(packJson.version)// 版本还好
  .arguments('<project-directory>')//项目的目录名
  .usage(`${chalk.red('<project-directory>')}`)
  .action((name)=>{
    projectName = name;
  }).parse(process.argv);
  log('projectName', projectName)

  await createApplication(projectName)
}

async function createApplication(appName) {
  let root = path.resolve(appName);
  fs.ensureDirSync(appName);
  log(`creating a new React app in ${chalk.greenBright(root)}`)
  const packageJSON = {
    name: appName,
    version: '0.1.0',
    private: true,
  }
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJSON, null, 2)
  )
  
  const originalDirectory = process.cwd();//原始工作目录
  process.chdir(root);// change 工作目录
  log('root', root);
  log('appName', appName);
  log('originalDirectory', originalDirectory)

  await run({
    root,
    appName,
    originalDirectory,
  })

}

/**
 * 
 * @param {*} param0 
 */
async function run({
  root,
  appName,
  originalDirectory,
}) {
  let scriptName = 'react-scripts'; //create 
  let templateName = 'cra-template';
  const allDependencies= ['react', 'react-dom', scriptName, templateName];
  log('Installing packages, This might take a couple of minutes')
  log(`
    Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan(scriptName)}
    ${1 ? `with ${chalk.cyan(templateName)}}` : ''}...
  `)
  await install(root, allDependencies)
  let data = [root,appName, true,originalDirectory,templateName]
  let source = `
    var init = import init from '${scriptName}/script/init.js';
    init.apply(null, JSON.parse(process.argv[1]));
  `
  await executeNodeScript({cwd: process.cwd()}, data, source)
  log('Done.');
  process.exit(0)
}

async function executeNodeScript({cwd}, data, source) {
  return new Promise((resolve)=>{
    const child = spawn(
      process.execPath,// node 可执行文件路径
      ['-e', source, '--', JSON.stringify(data)],
      {cwd, stdio: 'inherit'}
    )
    child.on('close', resolve)
  })
}

async function install(root, allDependencies) {
  return new Promise(resolve=>{
    const command = 'yarnpkg';
    const args  = ['add', '--exact', ...allDependencies, '--cwd', root]
    // 开子进程
    const child = spawn(command, args, {stdio: 'inherit'})
    child.on('close', resolve)
  })
}

export {
  init
}

// module.exports = {
//   init,
// }