// eslint-disable-next-line strict
const Contorller = require('egg').Controller;
class BaseController extends Contorller {
  async verify() {
    const { ctx } = this;
    const captcha = await this.service.tools.captcha();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha;
  }
}
module.exports = BaseController;
