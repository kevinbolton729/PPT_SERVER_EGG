'use strict';

// had enabled by egg
// exports.static = true;
// install plugin egg-mongoose
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

// 解决跨域
// install plugin egg-cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
