/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:38:04
 */
"use strict";

import { Ichannel, Ishare, Service } from "egg";

// 第三方库类
const moment = require("moment");

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  CHANNELDELFAIL,
  CHANNELDELSUCCESS,
  CHANNELEDITFAIL,
  CHANNELEDITSUCCESS,
  CHANNELADDFAIL,
  CHANNELADDSUCCESS
} = require("../common/consts");

// const SELECTSITEID = '59607e3c682e090ca074ecfd';

export default class ChannelService extends Service {
  // 获取当前站点的栏目列表
  public async ChanneListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { siteid } = ctx.request.query;
    const siteId = siteid;
    // const siteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      channelStatus: 1
    };
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1

    const csid: Ishare["csid"] = [];

    await Channel.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有栏目
          const arr = doc.filter(
            item =>
              csid.concat(item.channelSiteId.split(",")).indexOf(siteId) !== -1
          );

          result.message = MSGETDATASUCCESS;
          result.data = arr.map(item => ({
            channelid: item._id,
            siteid: item.channelSiteId,
            name: item.channelName,
            text: item.channelText,
            thumb: item.channelImage,
            href: item.channelHref,
            setHref: item.isHref,
            // status: item.channelStatus,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取栏目隐射表(所有栏目)
  public async ChannelTypeModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { siteid } = ctx.request.query;
    const siteId = siteid;
    // const siteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { channelId: -1 }; // 排序 升序: 1 降序: -1
    const csid: Ishare["csid"] = [];
    const resultArr: Ishare["arr"] = [];

    await Channel.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有栏目
          const arr = doc.filter(
            item =>
              csid.concat(item.channelSiteId.split(",")).indexOf(siteId) !== -1
          );
          // 获取所有栏目隐射表
          // for (let i = 0; i < arr.length; i += 1) {
          //   if (arr[i].channelStatus !== 0) {
          //     resultArr.push({
          //       channelid: arr[i]._id,
          //       name: arr[i].channelName
          //     });
          //   }
          // }
          for (let i in arr) {
            if (arr[i].channelStatus !== 0) {
              resultArr.push({
                channelid: arr[i]._id,
                name: arr[i].channelName
              });
            }
          }

          result.message = MSGETDATASUCCESS;
          result.data = resultArr;
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 删除栏目
  public async DelChannelModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    const { channelid } = ctx.request.body;
    const fields = { _id: channelid }; // 查询字段集
    const updatefields = {
      // 更新字段
      channelStatus: 0, // channelStatus 1:正常 0:已删除
      updateDate: moment().valueOf()
    };

    await Channel.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = CHANNELDELFAIL;
            result.data = formatError();
          }

          result.message = CHANNELDELSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑栏目
  public async EditChannelModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    const {
      channelid, // 栏目编号
      siteid, // 栏目所属站点ID
      name, // 栏目名称
      text, // 栏目介绍
      thumb, // 栏目图片
      href, // 栏目外链地址
      setHref // 栏目是否使用外链
    } = ctx.request.body;
    const fields = { _id: channelid }; // 查询字段集
    // console.log(setHref, 'setHref');
    const updatefields: Ichannel["fields"] = {
      // 更新字段
      channelSiteId: siteid,
      channelName: name,
      channelText: text,
      channelHref: href || "",
      isHref: setHref || 0,
      updateDate: moment().valueOf()
    };
    if (thumb) updatefields.channelImage = thumb;

    await Channel.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = CHANNELEDITFAIL;
            result.data = formatError();
          }

          result.message = CHANNELEDITSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 添加栏目
  public async AddChannelModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    const {
      siteid, // 栏目所属站点ID
      name, // 栏目名称
      text, // 栏目介绍
      thumb, // 栏目图片
      href, // 栏目外链地址
      setHref // 栏目是否使用外链
    } = ctx.request.body;
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields: Ichannel["fields"] = {
      // 添加字段
      channelSiteId: siteid,
      channelName: name,
      channelText: text,
      channelStatus: 1, // channelStatus 1:正常 0:已删除
      channelHref: href || "",
      isHref: setHref || 0,
      createDate,
      updateDate
    };
    if (thumb) savefields.channelImage = thumb;

    const fetchAdd = await new Channel(savefields).save(error => !error);

    if (!fetchAdd) {
      result.message = CHANNELADDFAIL;
      result.data = formatError(result.message);
    } else {
      result.message = CHANNELADDSUCCESS;
      result.data = [];
    }

    // console.log(result, 'result');
    return result;
  }
  // [客户端]
  // 获取所有栏目列表
  public async AllChannelFrontModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { query } = ctx.request;
    const siteId = query.sid || "59607e3c682e090ca074ecfd";
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      channelStatus: 1
    };
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1

    const csid: Ishare["csid"] = [];

    await Channel.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有栏目
          const arr = doc.filter(
            item =>
              csid.concat(item.channelSiteId.split(",")).indexOf(siteId) !== -1
          );

          result.message = MSGETDATASUCCESS;
          result.data = arr.map(item => ({
            channelid: item._id,
            siteid: item.channelSiteId,
            name: item.channelName,
            text: item.channelText,
            thumb: item.channelImage,
            path: item.channelPath,
            href: item.channelHref,
            setHref: item.isHref,
            // status: item.channelStatus,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取栏目隐射表(所有栏目)
  public async ChannelTypeFrontModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Channel } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { query } = ctx.request;
    const siteId = query.sid || "59607e3c682e090ca074ecfd";
    // const siteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { channelId: -1 }; // 排序 升序: 1 降序: -1
    const csid: Ishare["csid"] = [];
    const resultArr: Ishare["arr"] = [];

    await Channel.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有栏目
          const arr = doc.filter(
            item =>
              csid.concat(item.channelSiteId.split(",")).indexOf(siteId) !== -1
          );
          // 获取所有栏目隐射表
          // for (let i = 0; i < arr.length; i += 1) {
          //   if (arr[i].channelStatus !== 0) {
          //     resultArr.push({
          //       channelid: arr[i]._id,
          //       name: arr[i].channelName,
          //       path: arr[i].channelPath
          //     });
          //   }
          // }
          for (let i in arr) {
            if (arr[i].channelStatus !== 0) {
              resultArr.push({
                channelid: arr[i]._id,
                name: arr[i].channelName,
                path: arr[i].channelPath
              });
            }
          }

          result.message = MSGETDATASUCCESS;
          result.data = resultArr;
        }
      });

    // console.log(result, 'result');
    return result;
  }
}
