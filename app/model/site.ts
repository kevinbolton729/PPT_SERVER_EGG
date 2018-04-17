/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-02-08 15:35:22
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Site的Schema原型
  const siteSchema = new Schema({
    siteId: { type: String },
    siteName: { type: String },
    siteInfo: { type: String },
    siteStatus: { type: Number },
    createDate: { type: Number },
    updateDate: { type: Number }
  });

  // 定义Site的Model模型
  return mongoose.model("Site", siteSchema);
};
