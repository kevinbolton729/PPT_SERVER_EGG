/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 12:48:03
 */
"use strict";

import { Controller } from "egg";

export default class ShopController extends Controller {
  // 获取getShopLists
  public async getShopLists() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.ShopListModel();
  }
  // 删除店铺
  public async delShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.DelShopModel();
  }
  // 编辑店铺
  public async editShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.EditShopModel();
  }
  // 添加店铺
  public async addShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.AddShopModel();
  }
  // [客户端]
  // 获取全部店铺
  public async getAllShops() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.AllShopModel();
  }
}
