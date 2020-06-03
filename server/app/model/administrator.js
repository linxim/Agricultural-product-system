'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const administratorSchema = new Schema({
    // 管理员用户名
    username: { type: String },
    // 手机号
    telephone: { type: Number },
    // 密码
    passwd: { type: String },
    // 头像
    headerimg: { type: String },
    status: { type: Number, default: 1 },
  });
  return mongoose.model('administrator', administratorSchema);
};
