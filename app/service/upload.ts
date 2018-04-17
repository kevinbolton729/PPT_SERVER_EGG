/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:42:41
 */
"use strict";

import { Ishare, Service } from "egg";

// 第三方库类
const moment = require("moment");

// 常量
const { UPDATEFAILTURE, UPDATESUCCESS } = require("../common/consts");

// 上传存储路径
const uploadUrl = {
  upload: "/uploads", // 根目录
  image: "/images", // 图片目录
  file: "/files", // 文件目录
  video: "/videos" // 视频目录
};

export default class UploadService extends Service {
  // [图片]
  // 修改个人信息
  public async UploadPortraitModel() {
    const { ctx } = this;
    const url = `${uploadUrl.upload}${uploadUrl.image}/portrait/${
      ctx.req.file.filename
    }`;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, compressImage } = ctx.helper;

    // 执行 model
    const { User } = ctx.model;
    const fields: Ishare["fields"] = {}; // 查询字段集
    const updatefields = {
      // 更新字段
      portrait: url,
      updateDate: moment().valueOf()
    };
    // 获取解析后的token信息
    const { token } = ctx.request;
    fields._id = token.data;

    // 执行修改用户头像
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

    // 图片压缩处理
    await compressImage(url, { maxWidth: 120, maxHeight: 120 });
    // console.log(result, 'result');
    return result;
  }
  // 上传react-quill 编辑器内的图片
  public async UploadArticleImagesModel() {
    const { ctx } = this;
    const { files } = ctx.req;
    // console.log(files, 'files');

    // helper 函数
    const result = ctx.helper.result();

    result.data = files.map(item => ({
      url: `${uploadUrl.upload}${uploadUrl.image}/article/${item.filename}`
    }));

    return result;
  }
  // 上传Product缩略图
  public async UploadProductThumbModel() {
    const { ctx } = this;
    const { file } = ctx.req;
    const url = `${uploadUrl.upload}${uploadUrl.image}/article/${
      file.filename
    }`;
    // console.log(file, 'file');

    // helper 函数
    const result = ctx.helper.result();
    const { thumbImage } = ctx.helper;

    result.data = [{ url }];

    // 生成Product缩略图
    await thumbImage(url);

    return result;
  }
  // 上传Channel图片
  public async UploadChannelImageModel() {
    const { ctx } = this;
    const { file } = ctx.req;
    const url = `${uploadUrl.upload}${uploadUrl.image}/channel/${
      file.filename
    }`;
    // console.log(files, 'files');

    // helper 函数
    const result = ctx.helper.result();
    const { compressImage } = ctx.helper;

    result.data = [{ url }];

    // 图片压缩处理
    await compressImage(url);

    return result;
  }
  // 上传Shop图片
  public async UploadShopImageModel() {
    const { ctx } = this;
    const { file } = ctx.req;
    const url = `${uploadUrl.upload}${uploadUrl.image}/shop/${file.filename}`;
    // console.log(files, 'files');

    // helper 函数
    const result = ctx.helper.result();
    const { compressImage } = ctx.helper;

    result.data = [{ url }];

    // 图片压缩处理
    await compressImage(url);

    return result;
  }
  // 上传Brand图片
  public async UploadBrandImageModel() {
    const { ctx } = this;
    const { file } = ctx.req;
    const url = `${uploadUrl.upload}${uploadUrl.image}/brand/${file.filename}`;
    // console.log(files, 'files');

    // helper 函数
    const result = ctx.helper.result();
    const { compressImage } = ctx.helper;

    result.data = [{ url }];

    // 图片压缩处理
    await compressImage(url);

    return result;
  }
  // 上传首页Silde图片
  public async UploadSildeImageModel() {
    const { ctx } = this;
    const { file, body } = ctx.req;
    const weight = parseInt(body.weight, 10);
    const url = `${uploadUrl.upload}${uploadUrl.image}/silde/${file.filename}`;
    // console.log(file, 'file');

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, compressImage } = ctx.helper;

    // 执行 model
    const { Silde } = ctx.model;
    const fields = { weight }; // 查询字段集
    const updatefields = {
      // 更新字段
      url,
      updateDate: moment().valueOf()
    };

    // 执行上传首页Silde图片
    await Silde.where(fields)
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
            result.data = [{ url }];
          }
        }
      });

    // 图片压缩处理
    await compressImage(url);

    // console.log(result, 'result');
    return result;
  }
  // 上传首页Adver图片
  public async UploadAdverImageModel() {
    const { ctx } = this;
    const { file, body } = ctx.req;
    const weight = parseInt(body.weight, 10);
    const url = `${uploadUrl.upload}${uploadUrl.image}/adver/${file.filename}`;
    // console.log(file, 'file');

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, compressImage } = ctx.helper;

    // 执行 model
    const { Adv } = ctx.model;
    const fields = { weight }; // 查询字段集
    const updatefields = {
      // 更新字段
      url,
      updateDate: moment().valueOf()
    };

    // 执行上传首页Silde图片
    await Adv.where(fields)
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
            result.data = [{ url }];
          }
        }
      });

    // 图片压缩处理
    await compressImage(url, { ratio: 0.75 });

    // console.log(result, 'result');
    return result;
  }
  // [视频]
  public async UploadHomeVideoModel() {
    const { ctx } = this;
    const { file, body } = ctx.req;
    const weight = parseInt(body.weight, 10);
    const url = "/images/default.png";
    const video = `${uploadUrl.upload}${uploadUrl.video}/home/${file.filename}`;
    // console.log(file, 'file');

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, compressImage } = ctx.helper;

    // 执行 model
    const { Adv } = ctx.model;
    const fields = { weight }; // 查询字段集
    const updatefields = {
      // 更新字段
      video,
      updateDate: moment().valueOf()
    };

    // console.log(updatefields, 'updatefields');
    // 执行存储上传的首页视频url
    await Adv.where(fields)
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
            result.data = [{ url }];
          }
        }
      });

    // 图片压缩处理
    await compressImage(url, { ratio: 0.75 });

    // console.log(result, 'result');
    return result;
  }
}
