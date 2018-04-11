/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-18 14:59:58
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  GLOBALDELFAIL,
  GLOBALDELSUCCESS,
  GLOBALEDITFAIL,
  GLOBALEDITSUCCESS,
  GLOBALADDFAIL,
  GLOBALADDSUCCESS,
} = require('../common/consts');

class ShopService extends Service {
  // [服务端]
  // 获取店铺列表
  async ShopListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Shop } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      shopStatus: 1,
    };
    const sort = { weight: 1, updateDate: -1 }; // 排序 升序: 1 降序: -1

    await Shop.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            shopid: item._id,
            name: item.name,
            description: item.description,
            tel: item.telphone,
            address: item.address,
            url: item.url,
            traffic: item.traffic,
            weight: item.weight,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 删除店铺
  async DelShopModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Shop } = ctx.model;
    const { shopid } = ctx.request.body;
    const fields = { _id: shopid }; // 查询字段集
    const updatefields = {
      // 更新字段
      shopStatus: 0, // articleStatus 1:正常 0:已删除
      updateDate: moment().valueOf(),
    };

    await Shop.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = GLOBALDELFAIL;
            result.data = formatError();
          }

          result.message = GLOBALDELSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑店铺
  async EditShopModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Shop } = ctx.model;
    const {
      shopid, // 店铺编号
      name, // 店铺名称
      description, // 店铺详细描述
      url, // 店铺图片地址
      tel, // 店铺联系电话
      address, // 店铺详细地址
      traffic, // 店铺交通
      weight, // 店铺权重
    } = ctx.request.body;
    // console.log(JSON.stringify(content), 'edit content');
    const fields = { _id: shopid }; // 查询字段集
    const updatefields = {
      // 更新字段
      name,
      description,
      url,
      telphone: tel,
      address,
      traffic,
      weight: weight || 0,
      updateDate: moment().valueOf(),
    };

    await Shop.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = GLOBALEDITFAIL;
            result.data = formatError();
          }

          result.message = GLOBALEDITSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 添加店铺
  async AddShopModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Shop } = ctx.model;
    const {
      name, // 店铺名称
      description, // 店铺详细描述
      url, // 店铺图片地址
      tel, // 店铺联系电话
      address, // 店铺详细地址
      traffic, // 店铺交通
      weight, // 店铺权重
    } = ctx.request.body;
    // console.log(JSON.stringify(content), 'add content');
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields = {
      // 添加字段
      name,
      description,
      url,
      telphone: tel,
      address,
      traffic,
      weight: weight || 0,
      shopStatus: 1, // shopStatus 1:正常 0:已删除
      createDate,
      updateDate,
    };

    const fetchAdd = await new Shop(savefields).save(error => !error);

    if (!fetchAdd) {
      result.message = GLOBALADDFAIL;
      result.data = formatError(result.message);
    } else {
      result.message = GLOBALADDSUCCESS;
      result.data = [];
    }

    // console.log(result, 'result');
    return result;
  }
  // [客户端]
  // 获取店铺列表
  async AllShopModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Shop } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      shopStatus: 1,
    };
    const sort = { weight: 1, updateDate: -1 }; // 排序 升序: 1 降序: -1

    await Shop.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            id: item._id,
            name: item.name,
            description: item.description,
            tel: item.telphone,
            address: item.address,
            url: item.url,
            traffic: item.traffic,
            weight: item.weight,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
}

module.exports = ShopService;
