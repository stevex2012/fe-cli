// const chalk = require('chalk');
import chalk  from 'chalk';
import { Command } from "commander";
// const {Command} =require('commander');

console.log('process.argv',process.argv)
let program = new Command('create-react-app');
program
.version('1.0.0')
.arguments('<must1> <must2> [option1] [option2]') //<>必须 []可选
.usage(`${chalk.green('<must1> <must2> [option1] [option2]')}`)
.action((must1,must2,option1,option2)=>{
  console.log(must1,must2,option1,option2)
})
.parse(process.argv);// 设置保本好