/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-17 17:27:47
 */
'use strict';

const Controller = require('egg').Controller;

class BrandController extends Controller {
  // 获取getBrandLists
  async getBrandLists() {
    const { ctx, service } = this;
    const { brand } = service;

    // 调用 Service 进行业务处理
    ctx.body = await brand.BrandListModel();
  }
  // 删除品牌
  async delBrand() {
    const { ctx, service } = this;
    const { brand } = service;

    // 调用 Service 进行业务处理
    ctx.body = await brand.DelBrandModel();
  }
  // 编辑品牌
  async editBrand() {
    const { ctx, service } = this;
    const { brand } = service;

    // 调用 Service 进行业务处理
    ctx.body = await brand.EditBrandModel();
  }
  // 添加品牌
  async addBrand() {
    const { ctx, service } = this;
    const { brand } = service;

    // 调用 Service 进行业务处理
    ctx.body = await brand.AddBrandModel();
  }
  // [客户端]
  // 获取全部品牌
  async getAllBrands() {
    const { ctx, service } = this;
    const { brand } = service;

    // 调用 Service 进行业务处理
    ctx.body = await brand.AllBrandModel();
  }
}

module.exports = BrandController;
