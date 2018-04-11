/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-11 10:02:57
 */
'use strict';

const Controller = require('egg').Controller;

class ApplyController extends Controller {
  // 获取getApplyLists
  async getApplyLists() {
    const { ctx, service } = this;
    const { apply } = service;

    // 调用 Service 进行业务处理
    ctx.body = await apply.ApplyListModel();
  }
  // [客户端]
  // 添加文章
  async addApply() {
    const { ctx, service } = this;
    const { apply } = service;

    // 调用 Service 进行业务处理
    ctx.body = await apply.AddApplyModel();
  }
}

module.exports = ApplyController;
