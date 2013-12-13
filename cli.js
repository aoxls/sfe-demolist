#!/usr/bin/env node
var fs = require('fs')
  , ejs = require('ejs')
  , inquirer = require("inquirer")
  , args = process.argv.slice(1)
  , dir = args[1] || process.cwd();

// 判断目录是否存在
fs.exists(dir, cb_dirExists);

function cb_dirExists(exists) {
  if (exists) {
    // 判断__demolist文件是否已存在
    fs.exists(dir + '/__demolist.html', cb_listExists);
  }
  else {
    console.log('指定的目录不存在：' + dir);
  }
}

function cb_listExists(exists) {
  if (exists) {
    // 询问用户是否覆盖
    inquirer.prompt([
      { type:'confirm', name: 'replace', message: '__demolist.html文件已存在，是否替换？', default: true},
    ], function(answers) {
      answers.replace && create();
    });
  }
  else {
    create();
  }
}

function create() {
  // 获取基本信息
  inquirer.prompt([
    { name: 'name', message: '项目名称：'},
    { name: 'author', message: '作者姓名：', default: '前端开发部'},
    { name: 'date', message: '起止日期：'},
    { name: 'psd', message: '设计稿地址：'},
    { name: 'memo', message: '备注：', default: '无备注'}
  ], function(answers) {
    require('./sndemolist')(dir, answers);
  });
}