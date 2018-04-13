/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-09 11:47:36
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-13 20:09:16
 */
'use strict';
// 常量
const consts = require('../common/consts');

// 获取并处理响应的json数据
// status 值等于 1:正常 0:获取数据出错
const getResJson = (
  status = 0,
  message = consts.MSGETDATAERROR,
  extData = {}
) => ({
  status,
  message,
  extData,
});
// 解析响应的json数据
const parseResJson = result => {
  if (result.data.errorStatus) {
    return getResJson(0, result.message || consts.MSGETDATAERROR);
  }
  return getResJson(
    1,
    result.message || consts.MSGETDATASUCCESS,
    result.data.length !== 0
      ? {
        count: result.data.length,
        data: result.data,
      }
      : {}
  );
};

module.exports = () => {
  return async function formatter(ctx, next) {
    await next();

    const { url } = ctx.request;
    const body = ctx.body;

    if (url === '/') return;
    if (!body) return;
    // application/octet-stream
    if (url.indexOf('/download/') !== -1 || url.indexOf('/getfile/') !== -1) {
      return;
    }

    // 解析并格式化响应的数据
    ctx.body = await parseResJson(body);
  };
};
