/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:21:49
 */
"use strict";

import { Service } from "egg";

// 第三方库类
const moment = require("moment");

// 常量
const {
  PAGEDEFAULTLIMIT,
  APPLYADDSUCCESS,
  APPLYADDFAIL,
  MSGETDATASUCCESS
} = require("../common/consts");

export default class ApplyService extends Service {
  // [服务端]
  // 获取文章列表
  public async ApplyListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { ApplyData } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1

    await ApplyData.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取时间
          const currentDate = moment().valueOf();
          const startDate =
            parseInt(currentDate, 10) - 6 * 30 * 24 * 60 * 60 * 1000;
          // 获取当前站点下的所有文章
          const arr = doc.filter(item => item.updateDate >= startDate);

          result.message = MSGETDATASUCCESS;
          result.data = arr.map(item => ({
            id: item._id,
            name: item.name,
            telphone: item.telphone,
            email: item.email,
            qq: item.qq,
            city: item.city,
            message: item.message,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // [客户端]
  // 添加加盟申请
  public async AddApplyModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { ApplyData } = ctx.model;
    const {
      name, // 姓名
      telphone, // 手机号码
      email, // 电子邮箱
      qq, // QQ
      city, // 意向城市
      message // 加盟申请
    } = ctx.request.body;
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields = {
      // 添加字段
      name,
      telphone,
      email,
      qq,
      city,
      message,
      createDate,
      updateDate
    };

    // console.log(savefields, 'savefields');
    const fetchAdd = await new ApplyData(savefields).save(error => !error);

    if (!fetchAdd) {
      result.message = APPLYADDFAIL;
      result.data = formatError(result.message);
    } else {
      result.message = APPLYADDSUCCESS;
      result.data = [];
    }

    // console.log(result, 'result');
    return result;
  }
}

module.exports = ApplyService;
