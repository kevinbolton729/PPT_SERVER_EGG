/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-18 14:28:01
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Shop的Schema原型
  const ShopSchema = new Schema({
    name: { type: String },
    description: { type: String },
    telphone: { type: String },
    address: { type: String },
    url: { type: String },
    traffic: { type: String },
    shopStatus: { type: Number },
    weight: { type: Number },
    createDate: { type: String },
    updateDate: { type: String },
  });

  // 定义Apply的Model模型
  return mongoose.model('Shop', ShopSchema);
};
