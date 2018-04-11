/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-04 13:55:11
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

class AdverService extends Service {
  // [服务端]
  // 获取广告图列表
  async AdverListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Adv } = ctx.model;
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { weight: 1 }; // 排序 升序: 1 降序: -1

    await Adv.where(filters)
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
            video: item.video || '',
            isVideo: item.isVideo || 0,
            weight: item.weight,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑广告图片
  async EditAdverModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Adv } = ctx.model;
    const {
      id, // 广告编号
      title, // 广告名称
      description, // 广告详细描述
      topath, // 广告跳转地址
      url, // 广告图片地址
    } = ctx.request.body;
    // console.log(JSON.stringify(content), 'edit content');
    const fields = { _id: id }; // 查询字段集
    const updatefields = {
      // 更新字段
      title,
      description,
      url,
      topath,
      updateDate: moment().valueOf(),
    };

    await Adv.where(fields)
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

module.exports = AdverService;
