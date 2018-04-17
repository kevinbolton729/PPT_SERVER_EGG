/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-23 10:49:27
 */
"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Channel的Schema原型
  const channelSchema = new Schema({
    channelId: { type: String },
    channelSiteId: { type: String },
    channelName: { type: String },
    channelText: { type: String },
    channelImage: { type: String },
    channelPath: { type: String },
    channelHref: { type: String },
    channelStatus: { type: Number },
    isHref: { type: Number },
    createDate: { type: String },
    updateDate: { type: String }
  });

  // 定义Channel的Model模型
  return mongoose.model("Channel", channelSchema);
};
