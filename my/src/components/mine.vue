<template>
  <div class="body">
    <div class="my-center">
      <div class="header">
        <img src="../assets/675d3a8bbe27febcf1ccd8c2a25d891210399.png" alt="头像">
        <div class="name">qqq</div>
      </div>
      <div class="container">
        <div class="group">
          <div class="my-order">
            <div class="title">我的订单</div>
            <div class="title-line"></div>
            <div class="list">
              <div class="order-item movie">
                <router-link to="/movieOrder">
                  <p>电影</p>
                </router-link>
              </div>
              <div class="order-item store">
                <router-link to="/storeOrder">
                  <p>商城</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="coupon">
            <router-link to="/webMovie">在线观影</router-link>
          </div>
          <div class="coupon">
            <router-link to="/coupon">优惠券</router-link>
          </div>
          <div class="coupon">
            <router-link to="/discountCard">折扣卡</router-link>
          </div>
          <div class="coupon">
            <a @click="dealLogout">退出应用</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {
    realLogout() {
      //服务器退出
      var user = JSON.parse(localStorage.Maoyan_user);
      this.request.postUserLogoutUrl(
        { userId: user.id, token: user.token },
        data => {
          if (data.status == 0) {
            layer.open({
              content: "token销毁失败(message=" + data.message + ")",
              btn: "我知道了"
            });
          }
        }
      );

      //本地退出
      localStorage.removeItem("Maoyan_isLogin");
      localStorage.removeItem("Maoyan_user");

      this.$store.commit("setIsLogin", false);

      //退出到登录界面
      this.$router.replace("/login");
    },
    dealLogout() {
      var self = this;
      layer.open({
        content: "您真的要退出吗?",
        btn: ["是", "否"],
        yes: function(index) {
          self.realLogout();
          layer.close(index);
        }
      });
    }
  }
};
</script>
<style scoped>
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.body::-webkit-scrollbar {
  display: none;
}
a {
  text-decoration: none;
  color: #232323;
}

.header {
  height: 150px;
  background: url("../assets/bg.png") no-repeat center;
  background-size: 100% 150px;
  overflow: hidden;
  text-align: center;
}
.header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-top: 30px;
  margin: 20px auto 0;
}
.header .name {
  font-size: 16px;
  line-height: 22.5px;
  margin-top: 7px;
  color: #ffffff;
}
.group {
  margin-top: 10px;
  background-color: #fff;
}
.my-order {
  padding: 0 15px;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.my-order .title {
  font-size: 15px;
  height: 21px;
  line-height: 21px;
  color: #333;
  width: 80px;
  background-color: #fff;
  margin-top: 13px;
  display: inline-block;
  position: relative;
  z-index: 9;
}
.my-order .title-line {
  position: absolute;
  top: 23px;
  left: 50%;
  margin-left: -80px;
  width: 160px;
  height: 1px;
  background-color: #eee;
}
.my-order .list {
  display: flex;
}
.order-item {
  flex-grow: 1;
  height: 97px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: 42px auto;
  margin-top: 18px;
}
.order-item a {
  display: block;
  height: 90px;
}
.order-item a p {
  position: relative;
  top: 53px;
  font-size: 15px;
  line-height: 21px;
  height: 21px;
  margin: 0;
  color: #333;
}
.order-item.movie {
  background-image: url("../assets/order.png");
}
.order-item.store {
  background-image: url("../assets/shopping.png");
}
.coupon {
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background: url("../assets/coupon.png") repeat-x 0 bottom;
  background-size: 1px 1px;
  margin-left: 15px;
  position: relative;
}
.coupon::after {
  position: absolute;
  right: 15px;
  top: 18px;
  display: inline-block;
  content: "";
  width: 8px;
  height: 8px;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  transform: rotate(135deg);
}
.coupon a {
  display: block;
}
</style>
