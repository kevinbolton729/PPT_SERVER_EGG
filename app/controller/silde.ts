/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 12:48:15
 */
"use strict";

import { Controller } from "egg";

export default class SildeController extends Controller {
  // 获取getSildeList
  public async getSildeList() {
    const { ctx, service } = this;
    const { silde } = service;

    // 调用 Service 进行业务处理
    ctx.body = await silde.SildeListModel();
  }
  // 编辑轮播图片
  public async editSilde() {
    const { ctx, service } = this;
    const { silde } = service;

    // 调用 Service 进行业务处理
    ctx.body = await silde.EditSlideModel();
  }
  // [客户端]
}
