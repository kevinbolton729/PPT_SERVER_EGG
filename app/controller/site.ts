/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 12:49:51
 */
"use strict";

import { Controller } from "egg";

export default class SiteController extends Controller {
  // 获取getSiteLists
  public async getSiteLists() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteListModel();
  }
  // 获取getSiteQuantity
  public async getSiteQuantity() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteQuantityModel();
  }
  // 获取getSiteType
  public async getSiteType() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.SiteTypeModel();
  }
  // 删除站点
  public async delSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.DelSiteModel();
  }
  // 编辑站点
  public async editSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.EditSiteModel();
  }
  // 添加站点
  public async addSite() {
    const { ctx, service } = this;
    const { site } = service;

    // 调用 Service 进行业务处理
    ctx.body = await site.AddSiteModel();
  }
}
