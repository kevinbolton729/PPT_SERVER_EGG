/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-04 13:41:36
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Adv的Schema原型
  const advSchema = new Schema({
    title: { type: String },
    description: { type: String },
    topath: { type: String },
    url: { type: String },
    weight: { type: Number },
    video: { type: String },
    isVideo: { type: Number },
    createDate: { type: String },
    updateDate: { type: String }
  });

  // 定义Apply的Model模型
  return mongoose.model("Adv", advSchema);
};
