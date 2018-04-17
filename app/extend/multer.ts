"use strict";

const fs = require("fs");
const moment = require("moment");
// 加载koa-multer模块
const multer = require("koa-multer");

// 常量
const { UPLOADURLPREFIX } = require("../common/consts");

// 生成上传存储目录
const uploadDir = (dir, flag) => {
  // 上传存储的根目录
  const dirPrefix = `${UPLOADURLPREFIX}/public/uploads`;
  // 定义上传目录地址
  const newDir = `${dirPrefix}/${flag}/${dir}/`;

  // 判断目录是否存在
  if (!fs.existsSync(newDir)) {
    // 目录不存在则新建该目录
    fs.mkdirSync(newDir);
  }

  return newDir;
};

// 配置
const storageBase = (
  dir = "portrait",
  options = { flag: "images", isThumb: false }
) =>
  multer.diskStorage({
    // 文件保存路径
    destination(req, file, cb) {
      // console.log(file, 'destination file');
      // 生成上传目录
      cb(null, uploadDir(dir, options.flag || "images"));
    },
    // 修改文件名称
    filename(req, file, cb) {
      // console.log(file, 'filename file');
      const fileFormat = file.mimetype.split("/");
      cb(
        null,
        (options.isThumb ? "thumb-" : "") +
          `${moment().valueOf()}.${fileFormat[fileFormat.length - 1]}`
      );
    }
  });

// 输出配置
// [图片]
// 上传头像 Portrait Images
exports.uploadPortraitOptions = multer({ storage: storageBase() });
// 上传文章内容图片 Article Images
exports.uploadArticleOptions = multer({ storage: storageBase("article") });
// 上传产品缩略图 Product Thumb
exports.uploadProductThumbOptions = multer({
  storage: storageBase("article", { isThumb: true })
});
// 上传栏目图片 Channel Images
exports.uploadChannelOptions = multer({ storage: storageBase("channel") });
// 上传店铺图片 Shop Images
exports.uploadShopOptions = multer({ storage: storageBase("shop") });
// 上传品牌图片 Brand Images
exports.uploadBrandOptions = multer({ storage: storageBase("brand") });
// 上传轮播图片 Silde Show Images
exports.uploadSildeOptions = multer({ storage: storageBase("silde") });
// 上传广告图片 Adver Images
exports.uploadAdverOptions = multer({ storage: storageBase("adver") });
// [视频]
exports.uploadVideoHomeOptions = multer({
  storage: storageBase("home", { flag: "videos" })
});
