/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-10 11:20:34
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 获取userLists
  async getUserLists() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.UserListModel();
  }
  // 获取currentUser
  async getCurrentUser() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.CurrentUserModel();
  }
  // 登录
  async loginOn() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.LoginOnModel();
  }
  // 修改登录密码
  async updateLoginpwd() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.UpdateLoginPwdModel();
  }
  // 修改个人信息
  async updateCurrentUser() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.UpdateCurrentUserModel();
  }
}

module.exports = UserController;
