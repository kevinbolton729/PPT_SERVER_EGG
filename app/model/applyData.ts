/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-10 20:07:06
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Apply的Schema原型
  const applySchema = new Schema({
    name: { type: String },
    telphone: { type: String },
    email: { type: String },
    qq: { type: String },
    city: { type: String },
    message: { type: String },
    createDate: { type: String },
    updateDate: { type: String }
  });

  // 定义Apply的Model模型
  return mongoose.model("Applydata", applySchema);
};
