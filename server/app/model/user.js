'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userSchema = new Schema({
    // 用户名
    username: { type: String },
    // 密码
    passwd: { type: String },
    // 头像
    headerimg: { type: String },
    // 收货人
    cname: { type: String },
    // 手机号
    telephone: { type: Number },
    // 地址
    address: { type: String },
    // 状态
    status: { type: Number, default: 1 },
  });
  return mongoose.model('user', userSchema);
};
