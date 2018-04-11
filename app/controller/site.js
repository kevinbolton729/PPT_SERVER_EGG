/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-02-11 17:25:56
 */
'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
  // 获取getSiteLists
  async getSiteLists() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteListModel();
  }
  // 获取getSiteQuantity
  async getSiteQuantity() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteQuantityModel();
  }
  // 获取getSiteType
  async getSiteType() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteTypeModel();
  }
  // 删除站点
  async delSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.DelSiteModel();
  }
  // 编辑站点
  async editSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.EditSiteModel();
  }
  // 添加站点
  async addSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.AddSiteModel();
  }
}

module.exports = SiteController;
