// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Adver from '../../../app/controller/adver';
import Apply from '../../../app/controller/apply';
import Article from '../../../app/controller/article';
import Brand from '../../../app/controller/brand';
import Channel from '../../../app/controller/channel';
import Download from '../../../app/controller/download';
import Home from '../../../app/controller/home';
import Shop from '../../../app/controller/shop';
import Silde from '../../../app/controller/silde';
import Site from '../../../app/controller/site';
import Upload from '../../../app/controller/upload';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    adver: Adver;
    apply: Apply;
    article: Article;
    brand: Brand;
    channel: Channel;
    download: Download;
    home: Home;
    shop: Shop;
    silde: Silde;
    site: Site;
    upload: Upload;
    user: User;
  }
}
