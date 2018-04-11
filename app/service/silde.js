/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-14 16:45:32
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  GLOBALEDITFAIL,
  GLOBALEDITSUCCESS,
} = require('../common/consts');

class SildeService extends Service {
  // [服务端]
  // 获取轮播图列表
  async SildeListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Silde } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { weight: 1 }; // 排序 升序: 1 降序: -1

    await Silde.where(filters)
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
            title: item.title || '',
            description: item.description || '',
            topath: item.topath || '',
            url: item.url || '',
            weight: item.weight,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑轮播图片
  async EditSlideModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Silde } = ctx.model;
    const {
      id, // 轮播编号
      title, // 轮播名称
      description, // 轮播详细描述
      topath, // 轮播跳转地址
      url, // 轮播图片地址
    } = ctx.request.body;
    const fields = { _id: id }; // 查询字段集
    const updatefields = {
      // 更新字段
      title,
      description,
      url,
      topath,
      updateDate: moment().valueOf(),
    };

    await Silde.where(fields)
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
  // [客户端]
}

module.exports = SildeService;
