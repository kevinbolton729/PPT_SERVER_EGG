/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:44:04
 */
"use strict";

import { Service } from "egg";
const moment = require("moment");

// 常量
const {
  COOKIESKEY,
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  MSGETDATANODATA,
  MSGLOGINSUCCESS,
  MSGLOGINFAIL,
  MSGLOGINNOINPUT,
  EXPIRESIN,
  UPDATEPWDINPUTPWD,
  UPDATEOLDNEWERROR,
  UPDATEPWDERR,
  UPDATEPWDSUCCESS,
  UPDATEFAILTURE,
  UPDATESUCCESS
} = require("../common/consts");

export default class UserService extends Service {
  // 获取用户列表
  public async UserListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { User } = ctx.model;

    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { uid: -1 }; // 排序 升序: 1 降序: -1

    await User.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data = doc.map(item => ({
            userid: item._id,
            role: item.role,
            nickname: item.nickname,
            portrait: item.portrait,
            sex: item.sex,
            tel: item.tel,
            email: item.email,
            createDate: item.createDate,
            updateDate: item.updateDate
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }

  // 获取当前登录用户信息
  public async CurrentUserModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { User } = ctx.model;
    const fields = {}; // 查询字段集

    // 获取解析后的token信息
    const { token } = ctx.request;
    // console.log(token, 'token');

    fields._id = token.data;

    await User.findOne(fields).exec((err, doc) => {
      if (err) {
        result.data = formatError();
      } else if (doc) {
        result.message = MSGETDATASUCCESS;
        result.data = [
          {
            userid: doc._id,
            role: doc.role,
            nickname: doc.nickname,
            portrait: doc.portrait,
            sex: doc.sex,
            tel: doc.tel,
            email: doc.email,
            createDate: doc.createDate,
            updateDate: doc.updateDate
          }
        ];
      } else {
        result.message = MSGETDATANODATA;
        result.data = formatError(result.message);
      }
    });

    // console.log(result, 'result');
    return result;
  }

  // 登录
  public async LoginOnModel() {
    const { ctx } = this;
    const { cookies } = ctx;
    const { username, password } = ctx.request.body;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, setHmac, signToken } = ctx.helper;

    if (username !== "" && password !== "") {
      const pwd = setHmac(password);
      // console.log(pwd, 'pwd');
      const fields = {
        // 查询字段集
        username,
        pwd
      };

      // 执行 model
      const { User } = ctx.model;

      // console.log(fields, 'fields');
      await User.findOne(fields).exec((err, doc) => {
        // console.log(doc, 'doc');
        if (err) {
          result.data = formatError();
        } else if (doc) {
          // 签名 Token
          const userToken = {
            name: doc._id, // eslint-disable-line
            // 设置时除以1000 生产unix时间戳，使用时须乘以1000
            iat: Math.floor(moment().valueOf() / 1000),
            exp: Math.floor(moment().valueOf() / 1000) + EXPIRESIN
          };
          const token = signToken(userToken);

          // 调用 rotateCsrfSecret 刷新用户的 CSRF token
          // ctx.rotateCsrfSecret();

          // 生成token的cookies
          const SETCOOKIESOPTS = {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            overwrite: true,
            signed: true,
            encrypt: true
          };
          cookies.set(COOKIESKEY, token, SETCOOKIESOPTS);
          // console.log(token, 'token');
          // console.log(cookies, 'login cookies');

          result.message = MSGLOGINSUCCESS;
          result.data = [];
        } else {
          result.message = MSGLOGINFAIL;
          result.data = formatError(result.message);
        }
      });
    } else {
      result.message = MSGLOGINNOINPUT;
      result.data = await formatError(result.message);
    }

    // console.log(result, 'result');
    return result;
  }
  // 修改登录密码
  public async UpdateLoginPwdModel() {
    const { ctx } = this;
    const { oldpwd, newpwd } = ctx.request.body;
    const isFetchUpdate = { fetch: false }; // 是否执行修改登录密码

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, setHmac } = ctx.helper;

    // 执行 model
    const { User } = ctx.model;
    const fields = {}; // 查询字段集
    const updatefields = {
      // 更新字段
      pwd: setHmac(newpwd),
      updateDate: moment().valueOf()
    };
    // 获取解析后的token信息
    const { token } = ctx.request;
    fields._id = token.data;

    if (!oldpwd || !newpwd) {
      result.message = UPDATEPWDINPUTPWD;
      result.data = await formatError(result.message);
      return result;
    }
    if (oldpwd === newpwd) {
      result.message = UPDATEOLDNEWERROR;
      result.data = await formatError(result.message);
      return result;
    }

    // 获取当前用户的登录密码
    await User.findOne(fields).exec((err, doc) => {
      if (err || !doc || doc.pwd !== setHmac(oldpwd)) {
        result.message = MSGLOGINFAIL;
        result.data = formatError(result.message);
      } else {
        isFetchUpdate.fetch = true;
      }
    });
    if (!isFetchUpdate.fetch) return result;

    // 执行修改用户登录密码
    await User.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = UPDATEPWDERR;
            result.data = formatError(result.message);
          } else {
            result.message = UPDATEPWDSUCCESS;
            result.data = [];
          }
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 修改个人信息
  public async UpdateCurrentUserModel() {
    const { ctx } = this;
    const { nickname, sex, tel, email } = ctx.request.body;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { User } = ctx.model;
    const fields = {}; // 查询字段集
    const updatefields = {
      // 更新字段
      nickname,
      sex,
      tel,
      email,
      updateDate: moment().valueOf()
    };
    // 获取解析后的token信息
    const { token } = ctx.request;
    fields._id = token.data;

    // 执行修改用户登录密码
    await User.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = UPDATEFAILTURE;
            result.data = formatError(result.message);
          } else {
            result.message = UPDATESUCCESS;
            result.data = [];
          }
        }
      });

    // console.log(result, 'result');
    return result;
  }
}
