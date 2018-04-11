/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:46:08
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-11 21:38:33
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

// 常量
const {
  PAGEDEFAULTLIMIT,
  MSGETDATASUCCESS,
  NODATA,
  ARTICLEDELFAIL,
  ARTICLEDELSUCCESS,
  ARTICLEEDITFAIL,
  ARTICLEEDITSUCCESS,
  ARTICLEADDFAIL,
  ARTICLEADDSUCCESS,
} = require('../common/consts');

// const SELECTSITEID = '59607e3c682e090ca074ecfd';

class ArticleService extends Service {
  // [服务端]
  // 获取文章列表
  async ArticleListModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { siteid } = ctx.request.query;
    const articleSiteId = siteid;
    // const articleSiteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1
    const csid = [];

    await Article.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有文章
          const arr = doc.filter(
            item =>
              csid
                .concat(item.articleSiteId.split(','))
                .indexOf(articleSiteId) !== -1
          );

          result.message = MSGETDATASUCCESS;
          result.data = arr.map(item => ({
            articleid: item._id,
            siteid: item.articleSiteId,
            title: item.articleTitle,
            subtitle: item.articleSubtitle,
            sort: item.articleSort,
            channelid: item.articleChannel,
            author: item.articleAuthor,
            source: item.articleSource,
            content: JSON.parse(item.articleContent),
            // status: item.articleStatus,
            likenums: item.likeNums,
            thumb: item.thumb,
            params: item.articleParams,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取文章的数量(doc.length则为发布的文章数)
  async ArticleQuantityModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { siteid } = ctx.request.query;
    const articleSiteId = siteid;
    // const articleSiteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };
    const sort = { articleId: -1 }; // 排序 升序: 1 降序: -1
    const csid = [];

    await Article.where(filters)
      .find(fields)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有文章
          const arr = doc.filter(
            item =>
              csid
                .concat(item.articleSiteId.split(','))
                .indexOf(articleSiteId) !== -1
          );

          result.message = MSGETDATASUCCESS;
          result.data = arr.map(item => ({
            articleid: item._id,
            siteid: item.articleSiteId,
            title: item.articleTitle,
            subtitle: item.articleSubtitle,
            sort: item.articleSort,
            channelid: item.articleChannel,
            author: item.articleAuthor,
            source: item.articleSource,
            content: JSON.parse(item.articleContent),
            status: item.articleStatus,
            likenums: item.likeNums,
            thumb: item.thumb,
            params: item.articleParams,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取今日发布的文章(arr.length则为发布的文章数)
  async ArticleTodayQuantityModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    // console.log(ctx.request.query, 'ctx.request.query');
    const { siteid } = ctx.request.query;
    const articleSiteId = siteid;
    // const articleSiteId = SELECTSITEID;
    const fields = {}; // 查询字段集
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };
    const sort = { articleId: -1 }; // 排序 升序: 1 降序: -1'
    const csid = [];

    await Article.where(filters)
      .find(fields)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取当前站点下的所有文章
          const arr = doc.filter(
            item =>
              csid
                .concat(item.articleSiteId.split(','))
                .indexOf(articleSiteId) !== -1
          );

          const today = parseInt(moment().format('YYYYMMDD'), 10); // 获取当前日期
          const handleArr = arr.filter(
            item =>
              today ===
              parseInt(
                moment(parseInt(item.createDate, 10)).format('YYYYMMDD'),
                10
              )
          );
          result.message = MSGETDATASUCCESS;
          result.data = handleArr.map(item => ({
            articleid: item._id,
            siteid: item.articleSiteId,
            title: item.articleTitle,
            subtitle: item.articleSubtitle,
            sort: item.articleSort,
            channelid: item.articleChannel,
            author: item.articleAuthor,
            source: item.articleSource,
            content: JSON.parse(item.articleContent),
            status: item.articleStatus,
            likenums: item.likeNums,
            thumb: item.thumb,
            params: item.articleParams,
            createDate: item.createDate,
            updateDate: item.updateDate,
          }));
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 获取文章隐射表(所有文章ID)
  async ArticleTypeModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const arr = [];
    const fields = {}; // 查询字段集
    const filters = {}; // 筛选字段集
    const sort = { articleId: -1 }; // 排序 升序: 1 降序: -1

    await Article.where(filters)
      .find(fields)
      .limit(PAGEDEFAULTLIMIT)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取所有文章隐射表
          for (let i = 0; i < doc.length; i += 1) {
            if (doc[i].articleStatus !== 0) {
              arr.push({
                articleid: doc[i]._id,
                title: doc[i].articleTitle,
              });
            }
          }

          result.message = MSGETDATASUCCESS;
          result.data = arr;
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 删除文章
  async DelArticleModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const { articleid } = ctx.request.body;
    const fields = { _id: articleid }; // 查询字段集
    const updatefields = {
      // 更新字段
      articleStatus: 0, // articleStatus 1:正常 0:已删除
      updateDate: moment().valueOf(),
    };

    await Article.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = ARTICLEDELFAIL;
            result.data = formatError();
          }

          result.message = ARTICLEDELSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 编辑文章
  async EditArticleModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, thumbImage } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const {
      articleid, // 文章编号
      siteid, // 文章所属站点id
      title, // 文章标题
      subtitle, // 文章副标题
      channel, // 文章所属栏目
      author, // 文章作者
      source, // 文章来源
      content, // 文章（正文）内容
      likenums, // 文章阅读（点击）次数
      thumb,
      productParmas,
      isUploadThumbed, // 是否已上传缩略图 true:已上传 false:未上传
    } = ctx.request.body;
    let newThumb = thumb;
    if (!isUploadThumbed) {
      for (let i = 0; i < content.length; i += 1) {
        const { image } = content[i].insert;
        if (image) {
          newThumb = thumbImage(image);
          break;
        }
      }
    }

    // console.log(JSON.stringify(content), 'edit content');
    const fields = { _id: articleid }; // 查询字段集
    const updatefields = {
      // 更新字段
      articleSiteId: siteid,
      articleTitle: title,
      articleSubtitle: subtitle,
      articleChannel: channel,
      articleAuthor: author,
      articleSource: source,
      articleContent: JSON.stringify(content),
      articleParams: productParmas || '',
      likeNums: likenums,
      updateDate: moment().valueOf(),
    };
    if (newThumb) updatefields.thumb = newThumb;

    // console.log(updatefields, 'updatefields');
    await Article.where(fields)
      .update({ $set: updatefields })
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          if (doc.nModified === 0) {
            result.message = ARTICLEEDITFAIL;
            result.data = formatError();
          }

          result.message = ARTICLEEDITSUCCESS;
          result.data = [];
        }
      });

    // console.log(result, 'result');
    return result;
  }
  // 添加文章
  async AddArticleModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, thumbImage } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const {
      siteid, // 文章所属站点id
      title, // 文章标题
      subtitle, // 文章副标题
      channel, // 文章所属栏目
      author, // 文章作者
      source, // 文章来源
      content, // 文章（正文）内容
      likenums, // 文章阅读（点击）次数
      thumb,
      productParmas,
    } = ctx.request.body;
    let newThumb = thumb;
    if (!newThumb) {
      for (let i = 0; i < content.length; i += 1) {
        const { image } = content[i].insert;
        if (image) {
          newThumb = thumbImage(image);
          break;
        }
      }
    }

    // console.log(JSON.stringify(content), 'add content');
    const createDate = moment().valueOf();
    const updateDate = createDate;
    const savefields = {
      // 添加字段
      articleSiteId: siteid,
      articleTitle: title,
      articleSubtitle: subtitle,
      articleChannel: channel,
      articleAuthor: author,
      articleSource: source,
      articleContent: JSON.stringify(content),
      articleParams: productParmas || '',
      thumb: newThumb || '',
      likeNums: likenums,
      articleStatus: 1, // articleStatus 1:正常 0:已删除
      createDate,
      updateDate,
    };

    const fetchAdd = await new Article(savefields).save(error => !error);

    if (!fetchAdd) {
      result.message = ARTICLEADDFAIL;
      result.data = formatError(result.message);
    } else {
      result.message = ARTICLEADDSUCCESS;
      result.data = [];
    }

    // console.log(result, 'result');
    return result;
  }
  // [客户端]
  // 获取所有文章
  async AllArticleFrontModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, getCurArr } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const { query } = ctx.request;
    const fields = { articleSiteId: query.sid || '59607e3c682e090ca074ecfd' }; // 查询字段集
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1
    const currentPage = parseInt(query.currentPage, 10) || 1; // 当前页码
    const pageSize = parseInt(query.pageSize, 10) || 20; // 页长
    const pageLimit = parseInt(query.pageTotal, 10) || PAGEDEFAULTLIMIT; // 总条数

    await Article.where(filters)
      .find(fields)
      .limit(pageLimit)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取分页后的数组
          const newDoc = getCurArr(doc, currentPage, pageSize);

          const arr = newDoc.map(item => ({
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
            thumb: item.thumb,
            params: item.articleParams,
            // createDate: item.createDate,
            updateDate: item.updateDate,
          }));

          result.message = MSGETDATASUCCESS;
          result.data = arr;
        }
      });

    // console.log(result, 'result front');
    return result;
  }
  // 根据栏目id，获取文章列表
  async ArticleByIdFrontModel() {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, getCurArr } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const { query } = ctx.request;
    // 查询字段集
    const fields = {
      articleSiteId: query.sid || '59607e3c682e090ca074ecfd',
      articleChannel: query.id,
    };
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };
    const sort = { updateDate: -1 }; // 排序 升序: 1 降序: -1
    const currentPage = parseInt(query.currentPage, 10) || 1; // 当前页码
    const pageSize = parseInt(query.pageSize, 10) || 20; // 页长
    const pageLimit = parseInt(query.pageTotal, 10) || PAGEDEFAULTLIMIT; // 总条数

    await Article.where(filters)
      .find(fields)
      .limit(pageLimit)
      .sort(sort)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          // 获取分页后的数组
          const newDoc = getCurArr(doc, currentPage, pageSize);

          const arr = newDoc.map(item => ({
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
            thumb: item.thumb,
            params: item.articleParams,
            // createDate: item.createDate,
            updateDate: item.updateDate,
          }));

          result.message = MSGETDATASUCCESS;
          result.data = arr;
        }
      });

    // console.log(result, 'result front');
    return result;
  }
  // 根据文章id，获取文章详细内容
  async ArticleDetailFrontModel(articleid = null) {
    const { ctx } = this;

    // helper 函数
    const result = ctx.helper.result();
    const { formatError, converTohtml } = ctx.helper;

    // 执行 model
    const { Article } = ctx.model;
    const { query } = ctx.request;
    // 查询字段集
    const fields = {
      _id: articleid || query.id,
    };
    const filters = {
      // 筛选字段集
      articleStatus: 1,
    };

    await Article.where(filters)
      .find(fields)
      .limit(1)
      .exec((err, doc) => {
        if (err) {
          result.data = formatError();
        } else {
          const arr = doc.map(item => ({
            id: item._id,
            title: item.articleTitle,
            subtitle: item.articleSubtitle || NODATA,
            sort: item.articleSort || NODATA,
            channelid: item.articleChannel,
            author: item.articleAuthor || NODATA,
            source: item.articleSource || NODATA,
            content: converTohtml(JSON.parse(item.articleContent)),
            likenums: item.likeNums || NODATA,
            thumb: item.thumb,
            params: item.articleParams,
            // createDate: item.createDate,
            updateDate: item.updateDate,
          }));

          result.message = MSGETDATASUCCESS;
          result.data = arr;
        }
      });

    // console.log(result, 'result front');
    return result;
  }
}

module.exports = ArticleService;
