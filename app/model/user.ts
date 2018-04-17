/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-02-08 00:06:32
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义User的Schema原型
  const userSchema = new Schema({
    uid: { type: String },
    role: { type: Number },
    username: { type: String },
    pwd: { type: String },
    nickname: { type: String },
    portrait: { type: String },
    sex: { type: Number },
    tel: { type: String },
    email: { type: String },
    createDate: { type: Number },
    updateDate: { type: Number }
  });

  // 定义User的Model模型
  return mongoose.model("User", userSchema);
};
