<template>
  <div>
    <!-- <div  v-for="(item,index) in shopobject" :key="index" class="boxdiv"> -->
    <div class="boxdiv">
      <el-checkbox class="brad" v-model="radio"  @change="radiochange"></el-checkbox>
      <div class="tp">
        <img :src="shopobject.Img" :alt="shopobject.name" />
      </div>
      <div class="tpafter">
        <span class="name">{{shopobject.name}}</span>
        <span>￥{{shopobject.UnitPrice}}</span>
      </div>

      <div ref="keer" class="buttg">
        <span class="countprice">小计：￥{{price}}</span>
        <div class="shuliang">
          <button @click="mus">-</button>
          <span ref="count">{{count}}</span>
          <button @click="plus">+</button>
        </div>
      </div>
      <div class="buttg1">
        <button type="button" class="btn btn-success btn-sm" @click="delCart">删除</button>
      </div>
      <!-- </div>  -->
    </div>
  </div>
</template>
<script>

export default {
  name: "shopItem",
  props: {
    shopobject: Object
  },
  data() {
    return {
      radio: "",
      radios: [], //选择的商品
      count: 0,
      thisprice: 0,
      select:false,  //是否选中
      sum:0,
    };
  },
  mounted() {
  },
  computed: {
    price() {
      let setprice = this.shopobject.UnitPrice * this.count;
      this.thisprice = setprice;
      return setprice;
    }
  },
  methods: {
    mus() {
      let $this = this;
      if ($this.count <= 0) {
        $this.count = 0;
        return;
      } else {
        $this.count--;
      }
      this.$emit("getprice", $this.price,$this.shopobject.keyid);
    },
    plus() {
      let $this = this;
      $this.count++;
      this.$emit("getprice", $this.price,$this.shopobject.keyid);
    },
    delCart() {
        this.$emit("deleteon",this.shopobject._id);
    },
    radiochange() {
      this.$emit("getshop", this.radio,this.price,this.shopobject.keyid,this.shopobject);
    }
  }
};
</script>
<style scoped>
.boxdiv {
  width: 980px;
  height: 150px;
  margin: 0 auto;
  display: inline-block;
  text-align: left;
}
.brad {
  display: inline-block;
  position: relative;
  top: -30px;
  width: 200px;
}
.tp {
  display: inline-block;
  width: 110px;
  height: 110px;
  position: relative;
  top: 8px;
  right: 170px;
}
.tp img {
  width: 110px;
  height: 110px;
}
.tpafter {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 150px;
}
.buttg {
  display: inline-block;
  position: relative;
  left: 60px;
}
.buttg1 {
  display: inline-block;
  position: relative;
  right: -240px;
}
.name {
  position: relative;
  right: 95px;
}
.shuliang {
  position: relative;
}
</style>