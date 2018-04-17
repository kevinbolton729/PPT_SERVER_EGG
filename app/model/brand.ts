/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-18 14:27:51
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Brand的Schema原型
  const brandSchema = new Schema({
    title: { type: String },
    entitle: { type: String },
    subtitle: { type: String },
    description: { type: String },
    tag: { type: String },
    url: { type: String },
    brandStatus: { type: Number },
    weight: { type: Number },
    createDate: { type: String },
    updateDate: { type: String }
  });

  // 定义Apply的Model模型
  return mongoose.model("Brand", brandSchema);
};
