/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-04 14:35:17
 */
'use strict';

const Service = require('egg').Service;
// const moment = require('moment');

// 常量
const {
  NODATA,
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  //   GLOBALDELFAIL,
  //   GLOBALDELSUCCESS,
  //   GLOBALEDITFAIL,
  //   GLOBALEDITSUCCESS,
  //   GLOBALADDFAIL,
  //   GLOBALADDSUCCESS,
} = require('../common/consts');

class HomeService extends Service {
  // [客户端]
  // 获取首页数据
  // Data: 1.slide 2.adv 3.article
  async AllHomeDataModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Silde, Adv, Article } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      other: {},
      article: {
        articleStatus: 1,
      },
    };
    // 排序 升序: 1 降序: -1
    const sort = { main: { updateDate: -1 }, other: { weight: 1 } };

    // 定义result.data结构
    result.data = { slide: [], adv: [], article: [] };

    // 获取Slide
    await Silde.where(filters.other)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort.other)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          result.message = MSGETDATASUCCESS;
          result.data.slide = doc.map(item => ({
            id: item._id,
            title: item.title || '',
            description: item.description || '',
            topath: item.topath || '',
            url: item.url || '',
            weight: item.weight,
            updateDate: item.updateDate,
          }));
        }
      });
    if (!result.data.errorStatus) {
      // 获取Adv
      await Adv.where(filters.other)
        .find(fields)
        .limit(PAGEDEFAULTLIMIT)
        .sort(sort.other)
        .exec((err, doc) => {
          if (err) {
            result.data = formatError();
          } else {
            result.message = MSGETDATASUCCESS;
            result.data.adv = doc.map(item => ({
              id: item._id,
              title: item.title || '',
              description: item.description || '',
              topath: item.topath || '',
              url: item.url || '',
              video: item.video || '',
              weight: item.weight,
              updateDate: item.updateDate,
            }));
          }
        });
    }
    if (!result.data.errorStatus) {
      // 获取Article
      await Article.where(filters.article)
        .find({ articleChannel: '5a9f87cdd2467c1d20c8ca64' })
        .limit(4)
        .sort(sort.main)
        .exec((err, doc) => {
          if (err) {
            result.data = formatError();
          } else {
            result.message = MSGETDATASUCCESS;
            result.data.article = doc.map(item => ({
              id: item._id,
              // siteid: item.articleSiteId,
              title: item.articleTitle,
              subtitle: item.articleSubtitle || NODATA,
              // sort: item.articleSort || NODATA,
              // channelid: item.articleChannel,
              // author: item.articleAuthor || NODATA,
              // source: item.articleSource || NODATA,
              // content: JSON.parse(item.articleContent),
              // status: item.articleStatus,
              // likenums: item.likeNums || NODATA,
              createDate: item.createDate,
              updateDate: item.updateDate,
            }));
          }
        });
    }

    // console.log(result, 'result');
    return result;
  }
}

module.exports = HomeService;
