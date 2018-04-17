// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Adver from '../../../app/service/adver';
import Apply from '../../../app/service/apply';
import Article from '../../../app/service/article';
import Brand from '../../../app/service/brand';
import Channel from '../../../app/service/channel';
import Home from '../../../app/service/home';
import Shop from '../../../app/service/shop';
import Silde from '../../../app/service/silde';
import Site from '../../../app/service/site';
import Upload from '../../../app/service/upload';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    adver: Adver;
    apply: Apply;
    article: Article;
    brand: Brand;
    channel: Channel;
    home: Home;
    shop: Shop;
    silde: Silde;
    site: Site;
    upload: Upload;
    user: User;
  }
}
