'use strict';

// 获取上传配置
const {
  uploadPortraitOptions,
  uploadArticleOptions,
  uploadProductThumbOptions,
  uploadChannelOptions,
  uploadShopOptions,
  uploadBrandOptions,
  uploadSildeOptions,
  uploadAdverOptions,
  uploadVideoHomeOptions,
} = require('./extend/multer');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // controller
  const {
    home,
    user,
    site,
    article,
    channel,
    upload,
    download,
    apply,
    silde,
    adver,
    shop,
    brand,
  } = controller;

  router.get('/', ctx => {
    // 生成环境版
    ctx.redirect('/public');
  });

  // [CMS端接口]
  // 接口 api: users
  // -- 获取 后台用户列表
  router.get('/api/server/users', user.getUserLists);
  // -- 获取 登录用户信息
  router.get('/api/server/currentUser', user.getCurrentUser);
  // -- 登录用户 loginon
  router.post('/api/server/loginon', user.loginOn);
  // -- 更新登录密码
  router.post('/api/server/updatepwd', user.updateLoginpwd);
  // -- 更新个人信息
  router.post('/api/server/updateuser', user.updateCurrentUser);

  // 接口 api: sites
  // -- 获取 站点列表
  router.get('/api/server/sites', site.getSiteLists);
  // -- 获取 站点的数量
  router.get('/api/server/sitequantity', site.getSiteQuantity);
  // -- 获取 站点隐射表(所有站点)
  router.get('/api/server/sitetype', site.getSiteType);
  // -- 删除 站点
  router.post('/api/server/delsite', site.delSite);
  // -- 编辑 站点
  router.post('/api/server/editsite', site.editSite);
  // -- 添加 站点
  router.post('/api/server/addsite', site.addSite);

  // 接口 api: articles
  // -- 获取 文章列表
  router.get('/api/server/articles', article.getArticleLists);
  // -- 获取 文章的数量
  router.get('/api/server/articlequantity', article.getArticleQuantity);
  // // -- 获取 今日发布的文章的数量
  router.get(
    '/api/server/todayarticlequantity',
    article.getArticleTodayQuantity
  );
  // -- 获取 文章隐射表(所有文章ID)
  router.get('/api/server/articletype', article.getArticleType);
  // -- 删除 文章
  router.post('/api/server/delarticle', article.delArticle);
  // -- 编辑 文章
  router.post('/api/server/editarticle', article.editArticle);
  // -- 添加 文章
  router.post('/api/server/addarticle', article.addArticle);

  // 接口 api: shops
  // -- 获取 店铺列表
  router.get('/api/server/shops', shop.getShopLists);
  // -- 删除 店铺
  router.post('/api/server/delshop', shop.delShop);
  // -- 编辑 店铺
  router.post('/api/server/editshop', shop.editShop);
  // -- 添加 店铺
  router.post('/api/server/addshop', shop.addShop);

  // 接口 api: brands
  // -- 获取 品牌列表
  router.get('/api/server/brands', brand.getBrandLists);
  // -- 删除 品牌
  router.post('/api/server/delbrand', brand.delBrand);
  // -- 编辑 品牌
  router.post('/api/server/editbrand', brand.editBrand);
  // -- 添加 品牌
  router.post('/api/server/addbrand', brand.addBrand);

  // 接口 api: channels
  // -- 获取 当前站点的栏目列表
  router.get('/api/server/channels', channel.getChanneLists);
  // -- 获取 栏目隐射表(所有栏目)
  router.get('/api/server/channeltype', channel.getChannelType);
  // -- 删除 栏目
  router.post('/api/server/delchannel', channel.delChannel);
  // -- 编辑 栏目
  router.post('/api/server/editchannel', channel.editChannel);
  // -- 添加 栏目
  router.post('/api/server/addchannel', channel.addChannel);

  // 接口 api: sildes
  // -- 获取 首页轮播图片列表
  router.get('/api/server/sildes', silde.getSildeList);
  router.post('/api/server/editsilde', silde.editSilde);

  // 接口 api: advers
  // -- 获取 首页广告图片列表
  router.get('/api/server/advers', adver.getAdverList);
  router.post('/api/server/editadver', adver.editAdver);

  // 接口 api: applys
  // -- 获取 当前站点的加盟申请列表
  router.get('/api/server/applys', apply.getApplyLists);

  // 接口 api: upload
  // [图片]
  // -- 上传头像 portrait images
  router.post(
    '/api/server/upload/portrait',
    uploadPortraitOptions.single('portrait'),
    upload.uploadPortrait
  );
  // -- 上传内容图片 article images
  router.post(
    '/api/server/upload/articleimages',
    uploadArticleOptions.array('articleImages'),
    upload.uploadArticleImages
  );
  // -- 上传产品缩略图 product thumb
  router.post(
    '/api/server/upload/producthumb',
    uploadProductThumbOptions.single('productThumb'),
    upload.uploadProductThumb
  );
  // -- 上传栏目图片 channel images
  router.post(
    '/api/server/upload/channelimages',
    uploadChannelOptions.single('channelImage'),
    upload.uploadChannelImage
  );
  // -- 上传店铺图片 shop images
  router.post(
    '/api/server/upload/shopimages',
    uploadShopOptions.single('shopImage'),
    upload.uploadShopImage
  );
  // -- 上传品牌图片 brand images
  router.post(
    '/api/server/upload/brandimages',
    uploadBrandOptions.single('brandImage'),
    upload.uploadBrandImage
  );
  // -- 上传首页轮播图片 silde show images
  router.post(
    '/api/server/upload/sildeimages',
    uploadSildeOptions.single('sildeShow'),
    upload.uploadSildeImage
  );
  // -- 上传首页广告图片 adver images
  router.post(
    '/api/server/upload/adverimages',
    uploadAdverOptions.single('adverImage'),
    upload.uploadAdverImage
  );
  // [视频]
  // -- 上传首页视频 home videos
  router.post(
    '/api/server/upload/homevideos',
    uploadVideoHomeOptions.single('homeVideo'),
    upload.uploadHomeVideo
  );

  // 接口 api: download
  // -- 下载 根据id获取不同文件的下载链接
  router.get('/api/server/download/:id', download.downloadFile);

  // [客户端接口]
  // >> 首页
  // -- 获取 首页数据
  router.get('/api/front/allhome', home.getAllHomeData);
  // >> 文章
  // -- 获取 全部文章
  router.get('/api/front/allarticles', article.getAllArticles);
  // -- 获取 根据栏目id，获取栏目文章列表
  router.get('/api/front/articlebycid', article.getArticleByidChannel);
  // -- 获取 根据文章id，获取文章详细内容
  router.get('/api/front/articledetail', article.getArticleDetail);
  // >> 栏目
  // -- 获取 全部栏目
  router.get('/api/front/allchannels', channel.getAllChannels);
  // >> 店铺
  // -- 获取 全部店铺
  router.get('/api/front/allshops', shop.getAllShops);
  // >> 品牌
  // -- 获取 全部品牌
  router.get('/api/front/allbrands', brand.getAllBrands);
  // -- 获取 栏目隐射表
  router.get('/api/front/allchanneltype', channel.getAllChannelType);
  // -- 添加 加盟申请
  router.post('/api/front/addapply', apply.addApply);
};
