/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-21 19:04:27
 */
'use strict';

const Controller = require('egg').Controller;

class ChannelController extends Controller {
  // 获取channeLists
  async getChanneLists() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChanneListModel();
  }
  // 获取channeLists
  async getChannelType() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChannelTypeModel();
  }
  // 删除栏目
  async delChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.DelChannelModel();
  }
  // 编辑栏目
  async editChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.EditChannelModel();
  }
  // 添加栏目
  async addChannel() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.AddChannelModel();
  }
  // [客户端]
  // 获取getAllChannels
  async getAllChannels() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.AllChannelFrontModel();
  }
  // 获取getAllChannelType
  async getAllChannelType() {
    const { ctx, service } = this;
    const { channel } = service;

    ctx.body = await channel.ChannelTypeFrontModel();
  }
}

module.exports = ChannelController;
