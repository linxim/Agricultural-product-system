// eslint-disable-next-line strict
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
// const jwt = require('jsonwebtoken');
// const qs = require('qs');
class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966',
    });
    return captcha;
  }
}
module.exports = ToolsService;
