/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-03 16:48:27
 */
'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  // [图片]
  // 上传头像 portrait images
  async uploadPortrait() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadPortraitModel();
  }
  // 上传Article图片 article images
  async uploadArticleImages() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadArticleImagesModel();
  }
  // 上传Product缩略图 product thumb
  async uploadProductThumb() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadProductThumbModel();
  }
  // 上传Channel图片 channel images uploadProductThumb
  async uploadChannelImage() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadChannelImageModel();
  }
  // 上传Shop图片 shop images
  async uploadShopImage() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadShopImageModel();
  }
  // 上传Brand图片 brand images
  async uploadBrandImage() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadBrandImageModel();
  }
  // 上传Silde图片 silde show images
  async uploadSildeImage() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadSildeImageModel();
  }
  // 上传Adver图片 adver images
  async uploadAdverImage() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadAdverImageModel();
  }
  // [视频]
  // 上传Home视频 home videos
  async uploadHomeVideo() {
    const { ctx, service } = this;
    const { upload } = service;

    ctx.body = await upload.UploadHomeVideoModel();
  }
}

module.exports = UploadController;
