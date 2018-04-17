/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:29:17
 */
"use strict";

import { Service } from "egg";

// 第三方库类
const moment = require("moment");

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  GLOBALDELFAIL,
  GLOBALDELSUCCESS,
  GLOBALEDITFAIL,
  GLOBALEDITSUCCESS,
  GLOBALADDFAIL,
  GLOBALADDSUCCESS
} = require("../common/consts");

export default class BrandService extends Service {
  // [服务端]
  // 获取品牌列表
  public async BrandListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Brand } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      brandStatus: 1
    };
    const sort = { weight: 1, updateDate: -1 }; // 排序 升序: 1 降序: -1

    await Brand.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            brandid: item._id,
            title: item.title,
            entitle: item.entitle,
            subtitle: item.subtitle,
            tag: item.tag,
            description: item.description,
            url: item.url,
            weight: item.weight,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 删除品牌
  public async DelBrandModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Brand } = ctx.model;
    const { brandid } = ctx.request.body;
    const fields = { _id: brandid }; // 查询字段集
    const updatefields = {
      // 更新字段
      brandStatus: 0, // articleStatus 1:正常 0:已删除
      updateDate: moment().valueOf()
    };

    await Brand.where(fields)
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
  // 编辑品牌
  public async EditBrandModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Brand } = ctx.model;
    const {
      brandid, // 品牌编号
      title, // 品牌名称
      entitle, // 品牌英文名称
      subtitle, // 品牌副标题
      tag, // 品牌标签
      description, // 品牌详细描述
      url, // 品牌图片地址
      weight // 品牌权重
      // tel, // 品牌联系电话
      // address, // 品牌详细地址
    } = ctx.request.body;
    // console.log(JSON.stringify(content), 'edit content');
    const fields = { _id: brandid }; // 查询字段集
    const updatefields = {
      // 更新字段
      title,
      entitle,
      subtitle,
      tag,
      description,
      url,
      weight: weight || 0,
      // telphone: tel,
      // address,
      updateDate: moment().valueOf()
    };

    await Brand.where(fields)
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
  // 添加品牌
  public async AddBrandModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Brand } = ctx.model;
    const {
      title, // 品牌名称
      entitle, // 品牌英文名称
      subtitle, // 品牌副标题
      tag, // 品牌标签
      description, // 品牌详细描述
      url, // 品牌图片地址
      weight // 品牌权重
      // tel, // 品牌联系电话
      // address, // 品牌详细地址
    } = ctx.request.body;
    // console.log(JSON.stringify(content), 'add content');
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields = {
      // 添加字段
      title,
      entitle,
      subtitle,
      tag,
      description,
      url,
      weight: weight || 0,
      // telphone: tel,
      // address,
      brandStatus: 1, // brandStatus 1:正常 0:已删除
      createDate,
      updateDate
    };

    const fetchAdd = await new Brand(savefields).save(error => !error);

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
  // [客户端] AllBrandModel
  // 获取品牌列表
  public async AllBrandModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Brand } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      brandStatus: 1
    };
    const sort = { weight: 1, updateDate: -1 }; // 排序 升序: 1 降序: -1

    await Brand.where(filters)
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
            title: item.title,
            entitle: item.entitle,
            subtitle: item.subtitle,
            tag: item.tag,
            description: item.description,
            tel: item.telphone,
            address: item.address,
            url: item.url,
            weight: item.weight,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
}
