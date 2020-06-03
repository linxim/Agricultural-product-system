'use strict';
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class commodityService extends Service {
  // 数据添加
  async add(data) {
    const { ctx } = this;
    return ctx.model.Commodity.create(data).then(() => {
      return {
        code: 1,
        msg: '添加成功！',
      };
    }).catch(error => {
      console.log(error);
      return {
        code: 0,
        msg: '添加失败！',
      };
    });
  }
  // 商品上传图片
  async upimg(data) {
    const dest = '/public/upload/';
    const file = data.files[0];
    const to = path.dirname(__dirname) + dest + path.basename(file.filepath);
    await fs.copyFileSync(file.filepath, to);
    fs.unlinkSync(file.filepath);
    const cluster = this.app.config.cluster.listen;
    return `http://localhost:${cluster.port}${dest}${path.basename(file.filepath)}`;
  }
  // 数据查找
  async list() {
    const { ctx } = this;
    return ctx.model.Commodity.find({ status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
  }
  // 商品删除()
  async delete(data) {
    const { ctx } = this;
    const res = ctx.model.Commodity.updateOne({ _id: data.id }, { $set: { status: 0 } }).then(() => {
      return {
        msg: '删除成功',
        code: 1,
      };
    }).catch(error => {
      console.log(error);
      return {
        msg: '删除失败',
        code: 0,
      };
    });
    return res;
  }
  // 商品修改()
  async update(data) {
    const { ctx } = this;
    const res = ctx.model.Commodity.updateOne({ _id: data.id },
      { $set: {
        name: data.name,
        address: data.address,
        picture: data.picture,
        number: data.number,
        NetContent: data.NetContent,
        Price: data.Price,
        Phonenumber: data.Phonenumber,
        Commoditytype: data.Commoditytype,
        Salestype: data.Salestype,
        quality: data.quality,
      } }).then(() => {
      return {
        msg: '修改成功',
        code: 1,
      };
    }).catch(error => {
      console.log(error);
      return {
        msg: '修改失败',
        code: 0,
      };
    });
    return res;
  }
  // 结算减库存 参数商品id 结账数量
  async Stock(data) {
    const { ctx } = this;
    const res = ctx.model.Commodity.find({ _id: data.id }, { number: 1 }).then(resp => {
      const nun1 = resp[0].number;
      const nun2 = data.number;
      const nun3 = nun1 - nun2;
      console.log(nun3);
      if (nun3 >= 0) {
        ctx.model.Commodity.updateOne({ _id: data.id }, {
          $set: {
            number: nun3,
          },
        }).then(() => {
        }).catch(error => {
          console.log(error);
        });
        return {
          code: 1,
          msg: '成功',
        };
      } else if (nun3 < 0) {
        return {
          code: 0,
          msg: '库存不足',
        };
      }
    });
    return res;
  }
}
module.exports = commodityService;
