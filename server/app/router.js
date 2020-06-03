'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 管理员操作
  router.post('/admin/login', controller.administrator.login);
  router.post('/admin/reg', controller.administrator.reg);
  // 管理员信息修改
  router.post('/admin/update', controller.administrator.update);
  // 管理员头像上传
  router.post('/admin/upheadimg', controller.user.upheadimg);
  // 用户登录
  router.post('/user/login', controller.user.login);
  // 用户注册
  router.post('/user/reg', controller.user.reg);
  // 用户列表
  router.post('/user/list', controller.user.list);
  // 用户信息查看
  router.post('/user/find', controller.user.find);
  // 用户删除
  router.post('/user/delete', controller.user.delete);
  // 用户修改
  router.post('/user/update', controller.user.update);
  // 用户头像上传
  router.post('/user/upheadimg', controller.user.upheadimg);
  // 用户订单功能数据
  router.post('/user/orderlist', controller.user.orderlist);
  // 图片上传
  router.post('/upimg', controller.commodity.upimg);
  // 验证码
  router.get('/verify', controller.base.verify);
  // 商品管理
  router.post('/commodity/list', controller.commodity.list);
  router.post('/commodity/add', controller.commodity.add);
  router.post('/comodity/delete', controller.commodity.delete);
  router.post('/comodity/update', controller.commodity.update);
  // 订单管理
  router.post('/order/list', controller.order.list);
  router.post('/order/update', controller.order.update);
  router.post('/order/delete', controller.order.delete);
  router.post('/order/add', controller.order.add);
  // 用户自己的订单详情
  router.post('/order/userlist', controller.order.userlist);
  // 订单不同的类型
  router.post('/order/type', controller.order.type);
  // 购物车管理
  router.post('/shopping/list', controller.shopping.list);
  router.post('/shopping/update', controller.shopping.update);
  router.post('/shopping/delete', controller.shopping.delete);
  router.post('/shopping/add', controller.shopping.add);
  // 根据不同商品查找
  router.post('/page', controller.page.find);
  // 购买商品减库存
  router.post('/commodity/Stock', controller.commodity.Stock);
};
