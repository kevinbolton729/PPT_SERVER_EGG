/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-03-17 23:22:02
 */
'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  // 获取getArticleLists
  async getArticleLists() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleListModel();
  }
  // 获取getArticleQuantity
  async getArticleQuantity() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleQuantityModel();
  }
  // 获取getTodayArticleQuantity
  async getArticleTodayQuantity() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleTodayQuantityModel();
  }
  // 获取getArticleType
  async getArticleType() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleTypeModel();
  }
  // 删除文章
  async delArticle() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.DelArticleModel();
  }
  // 编辑文章
  async editArticle() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.EditArticleModel();
  }
  // 添加文章
  async addArticle() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.AddArticleModel();
  }
  // [客户端]
  // 获取全部文章
  async getAllArticles() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.AllArticleFrontModel();
  }
  // 根据栏目id，获取文章列表
  async getArticleByidChannel() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleByIdFrontModel();
  }
  // 根据文章id，获取文章详细内容
  async getArticleDetail() {
    const { ctx, service } = this;
    const { article } = service;

    // 调用 Service 进行业务处理
    ctx.body = await article.ArticleDetailFrontModel();
  }
}

module.exports = ArticleController;
