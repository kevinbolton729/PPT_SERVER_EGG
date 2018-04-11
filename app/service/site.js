/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-02 12:29:42
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  SITEDELFAIL,
  SITEDELSUCCESS,
  SITEEDITFAIL,
  SITEEDITSUCCESS,
  SITEADDFAIL,
  SITEADDSUCCESS,
} = require('../common/consts');

class SiteService extends Service {
  // 获取全部站点的列表
  async SiteListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { uid: -1 }; // 排序 升序: 1 降序: -1

    await Site.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            siteid: item._id,
            name: item.siteName,
            info: item.siteInfo,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取全部站点的数量
  async SiteQuantityModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const fields = {}; // 查询字段集
    const filters = { siteStatus: 1 }; // 筛选字段集
    const sort = { siteId: -1 }; // 排序 升序: 1 降序: -1

    await Site.where(filters)
      .find(fields)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            siteid: item._id,
            name: item.siteName,
            info: item.siteInfo,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取站点隐射表（所有站点）
  async SiteTypeModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const arr = [];
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { createDate: -1 }; // 排序 升序: 1 降序: -1

    await Site.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取所有站点隐射表
          for (let i = 0; i < doc.length; i += 1) {
            if (doc[i].siteStatus !== 0) {
              arr.push({
                siteid: doc[i]._id,
                name: doc[i].siteName,
              });
            }
          }

          result.message = MSGETDATASUCCESS;
          result.data = arr;
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 删除站点
  async DelSiteModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const { siteid } = ctx.request.body;
    const fields = { _id: siteid }; // 查询字段集
    const updatefields = {
      // 更新字段
      siteStatus: 0, // siteStatus 1:正常 0:已删除
      updateDate: moment().valueOf(),
    };

    await Site.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = SITEDELFAIL;
            result.data = formatError(result.message);
          }

          result.message = SITEDELSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑站点
  async EditSiteModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const {
      siteid, // 站点编号
      name, // 站点名称
      info, // 站点介绍
    } = ctx.request.body;
    const fields = { _id: siteid }; // 查询字段集
    const updatefields = {
      // 更新字段
      siteName: name,
      siteInfo: info,
      updateDate: moment().valueOf(),
    };

    await Site.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = SITEEDITFAIL;
            result.data = formatError(result.message);
          }

          result.message = SITEEDITSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 添加站点
  async AddSiteModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Site } = ctx.model;
    const {
      name, // 站点名称
      info, // 站点介绍
    } = ctx.request.body;
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields = {
      // 添加字段
      siteName: name,
      siteInfo: info,
      siteStatus: 1, // siteStatus 1:正常 0:已删除
      createDate,
      updateDate,
    };

    const fetchAdd = await new Site(savefields).save(error => !error);

    if (!fetchAdd) {
      result.message = SITEADDFAIL;
      result.data = formatError(result.message);
    } else {
      result.message = SITEADDSUCCESS;
      result.data = [];
    }

    // console.log(result, 'result');
    return result;
  }
}

module.exports = SiteService;
