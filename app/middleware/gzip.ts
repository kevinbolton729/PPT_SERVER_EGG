/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-09 11:32:51
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-02-09 14:51:15
 */
"use strict";

import { Context } from "egg";

const isJSON = require("koa-is-json");
const zlib = require("zlib");

export default options => {
  return async function gzip(ctx: Context, next: any) {
    await next();

    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) {
      return;
    }

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) {
      return;
    }

    if (isJSON(body)) {
      body = JSON.stringify(body);
    }

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set("Content-Encoding", "gzip");
  };
};