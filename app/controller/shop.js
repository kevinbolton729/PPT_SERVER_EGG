/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-17 17:19:50
 */
'use strict';

const Controller = require('egg').Controller;

class ShopController extends Controller {
  // 获取getShopLists
  async getShopLists() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.ShopListModel();
  }
  // 删除店铺
  async delShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.DelShopModel();
  }
  // 编辑店铺
  async editShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.EditShopModel();
  }
  // 添加店铺
  async addShop() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.AddShopModel();
  }
  // [客户端]
  // 获取全部店铺
  async getAllShops() {
    const { ctx, service } = this;
    const { shop } = service;

    // 调用 Service 进行业务处理
    ctx.body = await shop.AllShopModel();
  }
}

module.exports = ShopController;
