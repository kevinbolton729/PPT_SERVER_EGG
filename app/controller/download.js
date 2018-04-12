/*
 * @Author: Kevin Bolton
 * @Date: 2018-04-11 22:24:58
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-12 23:23:36
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
    // console.log(ctx.params.id, 'id');

    // const fileName = await download.downloadFileModel();
    const file = '1523455087238.jpeg';
    const fileExt = file.split('.')[1];

    const filePath = `${UPLOADURLPREFIX}/public/uploads/images/portrait/${file}`;
    ctx.attachment(`adfsdfasdfs.${fileExt}`);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = await fs.readFileSync(filePath);
  }
}

module.exports = DownloadController;
