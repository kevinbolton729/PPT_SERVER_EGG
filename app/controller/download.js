/*
 * @Author: Kevin Bolton
 * @Date: 2018-04-11 22:24:58
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-12 00:45:27
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
    const fileName = '1523455087238.jpeg';

    const filePath = `${UPLOADURLPREFIX}/public/uploads/images/portrait/${fileName}`;
    ctx.attachment('adfsdfasdfs.jpeg');
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = await fs.createReadStream(filePath);
  }
}

module.exports = DownloadController;
