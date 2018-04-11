/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-17 22:43:01
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // [客户端]
  // 获取首页数据
  async getAllHomeData() {
    const { ctx, service } = this;
    const { home } = service;

    // 调用 Service 进行业务处理
    ctx.body = await home.AllHomeDataModel();
  }
}

module.exports = HomeController;
