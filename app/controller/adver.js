/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-14 16:38:43
 */
'use strict';

const Controller = require('egg').Controller;

class AdverController extends Controller {
  // 获取getAdverList
  async getAdverList() {
    const { ctx, service } = this;
    const { adver } = service;

    // 调用 Service 进行业务处理
    ctx.body = await adver.AdverListModel();
  }
  // 编辑广告图片
  async editAdver() {
    const { ctx, service } = this;
    const { adver } = service;

    // 调用 Service 进行业务处理
    ctx.body = await adver.EditAdverModel();
  }
  // [客户端]
}

module.exports = AdverController;
