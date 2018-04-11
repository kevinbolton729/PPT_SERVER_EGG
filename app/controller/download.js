/*
 * @Author: Kevin Bolton
 * @Date: 2018-04-11 22:24:58
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-12 00:43:01
 */
'use strict';
const Controller = require('egg').Controller;

const fs = require('fs');
// 常量
const { UPLOADURLPREFIX } = require('../common/consts');

class DownloadController extends Controller {
  // [下载]
  async downloadFile() {
    const { ctx } = this;
    // const { download } = service;

    // const fileName = await download.downloadFileModel();
    const fileName = '1523455087238.txt';

    const filePath = `${UPLOADURLPREFIX}/public/uploads/images/portrait/${fileName}`;
    ctx.attachment('adfsdfasdfs.txt');
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = await fs.createReadStream(filePath);
    // Set Content-Disposition to "attachment" to signal the client to prompt for download.
    // Optionally specify the filename of the download.
    // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
    // 也可以直接设置 ctx.set("Content-disposition", "attachment; filename=" + fileName);
    // ctx.attachment(fileName);
    // await send(ctx, fileName, {
    //   root: `${UPLOADURLPREFIX}/public/uploads/images/adver`,
    // });
  }
}

module.exports = DownloadController;
