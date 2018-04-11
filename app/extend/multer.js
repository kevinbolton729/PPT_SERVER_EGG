'use strict';

const fs = require('fs');
const moment = require('moment');
// 加载koa-multer模块
const multer = require('koa-multer');

// 常量
const { UPLOADURLPREFIX } = require('../common/consts');
// 上传存储的根目录
const dirPrefix = `${UPLOADURLPREFIX}/public/uploads`;
// 判断目录是否存在
// 目录不存在则新建该目录
const mkDir = newDir => {
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
  }

  return newDir;
};
// 生成上传存储目录
const uploadDir = (dir, flag) => {
  // 定义上传目录地址
  const newDir = `${dirPrefix}/${flag}/${dir}/`;

  return mkDir(newDir);
};

// 配置
// 图片上传
const storageImage = (dir = 'portrait', isThumb = false) =>
  multer.diskStorage({
    // 文件保存路径
    destination(req, file, cb) {
      // console.log(file, 'destination file');
      // 生成上传目录
      cb(null, uploadDir(dir, 'images'));
    },
    // 修改文件名称
    filename(req, file, cb) {
      // console.log(file, 'filename file');
      const fileFormat = file.mimetype.split('/');
      cb(
        null,
        (isThumb ? 'thumb-' : 'img-') +
          `${moment().valueOf()}.${fileFormat[fileFormat.length - 1]}`
      );
    },
  });
// 视频上传
const storageVideo = (dir = 'home') =>
  multer.diskStorage({
    // 文件保存路径
    destination(req, file, cb) {
      // console.log(file, 'destination file');
      // 生成上传目录
      cb(null, uploadDir(dir, 'videos'));
    },
    // 修改文件名称
    filename(req, file, cb) {
      // console.log(file, 'filename file');
      const fileFormat = file.mimetype.split('/');
      cb(null, `v${moment().valueOf()}.${fileFormat[fileFormat.length - 1]}`);
    },
  });
// 文件上传
/* eslint-disable no-unused-vars */
const storageFile = (dir = 'home') =>
  multer.diskStorage({
    // 文件保存路径
    destination(req, file, cb) {
      // console.log(file, 'destination file');
      // 生成上传目录
      cb(null, uploadDir(dir, 'files'));
    },
    // 修改文件名称
    filename(req, file, cb) {
      // console.log(file, 'filename file');
      const fileFormat = file.mimetype.split('/');
      cb(null, `f${moment().valueOf()}.${fileFormat[fileFormat.length - 1]}`);
    },
  });
/* eslint-enable no-unused-vars */

// 输出配置
// [图片]
// 上传头像 Portrait Images
exports.uploadPortraitOptions = multer({ storage: storageImage() });
// 上传文章内容图片 Article Images
exports.uploadArticleOptions = multer({ storage: storageImage('article') });
// 上传产品缩略图 Product Thumb
exports.uploadProductThumbOptions = multer({
  storage: storageImage('article', true),
});
// 上传栏目图片 Channel Images
exports.uploadChannelOptions = multer({ storage: storageImage('channel') });
// 上传店铺图片 Shop Images
exports.uploadShopOptions = multer({ storage: storageImage('shop') });
// 上传品牌图片 Brand Images
exports.uploadBrandOptions = multer({ storage: storageImage('brand') });
// 上传轮播图片 Silde Show Images
exports.uploadSildeOptions = multer({ storage: storageImage('silde') });
// 上传广告图片 Adver Images
exports.uploadAdverOptions = multer({ storage: storageImage('adver') });
// [视频]
exports.uploadVideoHomeOptions = multer({ storage: storageVideo() });
