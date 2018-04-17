/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-17 12:39:02
 */
"use strict";

import { Controller } from "egg";

export default class ChannelController extends Controller {
  // 获取channeLists
  public async getChanneLists() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChanneListModel();
  }
  // 获取channeLists
  public async getChannelType() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChannelTypeModel();
  }
  // 删除栏目
  public async delChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.DelChannelModel();
  }
  // 编辑栏目
  public async editChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.EditChannelModel();
  }
  // 添加栏目
  public async addChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.AddChannelModel();
  }
  // [客户端]
  // 获取getAllChannels
  public async getAllChannels() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.AllChannelFrontModel();
  }
  // 获取getAllChannelType
  public async getAllChannelType() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChannelTypeFrontModel();
  }
}
