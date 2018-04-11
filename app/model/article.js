/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:28:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-21 13:09:53
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;

  // 定义Article的Schema原型
  const ArticleSchema = new Schema({
    articleId: { type: String },
    articleSiteId: { type: String },
    articleTitle: { type: String },
    articleSubtitle: { type: String },
    articleSort: { type: String },
    articleChannel: { type: String },
    articleAuthor: { type: String },
    articleSource: { type: String },
    articleContent: { type: String },
    articleStatus: { type: Number },
    articleParams: { type: String },
    thumb: { type: String },
    likeNums: { type: Number },
    labels: {},
    tosites: {},
    createDate: { type: String },
    updateDate: { type: String },
  });

  // 定义Article的Model模型
  return mongoose.model('Article', ArticleSchema);
};
