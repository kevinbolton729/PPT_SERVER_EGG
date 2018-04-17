/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 13:47:59
 */
"use strict";

import { Controller } from "egg";

export default class HomeController extends Controller {
  // [客户端]
  // 获取首页数据
  public async getAllHomeData() {
    const { ctx, service } = this;
    const { home } = service;

    // 调用 Service 进行业务处理
    ctx.body = await home.AllHomeDataModel();
  }
}
