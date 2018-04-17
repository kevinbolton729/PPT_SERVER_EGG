/*
 * @Author: Kevin Bolton
 * @Date: 2018-04-11 22:24:58
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 12:46:41
 */
"use strict";

import { Controller } from "egg";

// 第三方库类
const fs = require("fs");
// 常量
const { UPLOADURLPREFIX } = require("../common/consts");

export default class DownloadController extends Controller {
  // [下载]
  // 获取文件
  public async getFile() {
    const { ctx } = this;
    // const { download } = service;
    // console.log(ctx.params.id, 'id');

    // const fileName = await download.downloadFileModel();
    const file = "1523455087238.jpeg"; // 1523602022946
    // const fileExt = file.split('.')[1];

    const filePath = `${UPLOADURLPREFIX}/public/uploads/images/portrait/${file}`;
    // ctx.attachment(`www.ppt.com-abcd.${fileExt}`);
    // ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = await fs.createReadStream(filePath);
  }
  // 下载文件
  public async downloadFile() {
    const { ctx } = this;

    const file = "1523455087238.jpeg"; // 1523455087238
    const fileExt = file.split(".")[1];

    const filePath = `${UPLOADURLPREFIX}/public/uploads/images/portrait/${file}`;
    ctx.attachment(`www.ppt.com-abcd.${fileExt}`);
    ctx.set("Content-Type", "application/octet-stream");
    ctx.body = fs.readFileSync(filePath);
  }
}
