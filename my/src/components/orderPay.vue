<template>
  <div class="body">
    <section class="pay-section">
      <!-- 剩余时间 -->
      <div class="count-down">
        支付剩余时间:
        <span class="cd-time">{{minute}}:{{second}}</span>
      </div>

      <!-- 电影信息 -->
      <div class="movie-info">
        <div class="box-flex middle">
          <div class="title">{{orderData.movie?orderData.movie.movieName:''}}</div>
          <div class="flex"></div>
          <div class="logo"></div>
        </div>
        <div
          class="date"
        >{{orderData.show?orderData.show.showDate:''}} {{orderData.show?orderData.show.showTime:''}} ({{orderData.show?orderData.show.lang:''}} {{orderData.show?orderData.show.dim:''}})</div>
        <div class="local">{{orderData.cinema?orderData.cinema.cinemaName:''}}</div>
        <div class="seats">
          {{orderData.hall?orderData.hall.hallName:''}} {{orderData.seats?orderData.seats.sectionName:''}}
          <!-- <div class="seat">A排01座</div>&nbsp;&nbsp;
          <div class="seat">B排01座</div>&nbsp;&nbsp;-->
          <div
            class="seat"
            v-for="(item,index) in orderData.seats"
            :key="index"
          >{{item.rowId}}排{{item.columnId}}座&nbsp;&nbsp;</div>
        </div>
      </div>

      <!-- 支付信息 -->
      <div class="pay-info mb-outline-b">
        <div class="box-flex mb-line-t">
          <div>手机号码</div>

          <div class="flex"></div>
          <div class="blk">{{orderData.userPhone?orderData.userPhone:''}}</div>
        </div>

        <div class="box-flex mb-line-t">
          <div>小计</div>
          <div class="flex"></div>
          <div class="red">
            <span class="icon">¥</span>
            <span class="paymoney">{{orderData.sellMoney?orderData.sellMoney:''}}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="price-section">
      <div class="price-block mb-outline-t">
        <div class="box-flex" style="margin-bottom:10px;justify-content: space-between;">
          <div id="refundmigrateDetail" class="refundmigrateDetail support" style="display: none;">
            <span style="color: #FF9900;">退改签须知</span>
            <span class="arrow up"></span>
          </div>
          <div class="refundmigrateDetail nosupport" style>
            <span style="color: #999;">不支持退票、改签</span>
            <span class="arrow up"></span>
          </div>
          <div
            id="priceDetail"
            class="price tips-money"
            style="padding: 12px 0 6px 0;line-height: 0;"
          >
            <span class="also">应付:</span>
            <span class="d">¥</span>
            <span class="last-amount">{{orderData.sellMoney?orderData.sellMoney:''}}</span>
            <span class="arrow up"></span>
          </div>
        </div>
        <form
          id="order"
          action="http://api.chinashouzhi.com/zhtest/alipay-web/pagepay/pagepay.php"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="WIDout_trade_no" :value="Date.now()">
          <input type="hidden" name="WIDsubject" value="猫眼电影票">
          <input
            type="hidden"
            name="WIDtotal_amount"
            :value="this.orderData.sellMoney?this.orderData.sellMoney:''"
          >
          <input
            type="hidden"
            name="WIDbody"
            :value="this.orderData.seats?('电影票'+this.orderData.seats.length+'张'):''"
          >
        </form>
        <div @click="dealPayOrder" class="price-btn" data-bid="dp_wx_order_pay_btn">确认支付</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "orderPay",
  data() {
    return {
      orderData: {},
      minute: "",
      second:""
    };
  },

  created() {
    this.$store.commit("setNavTitle", "支付订单");

    var orderId = this.$route.params.id;

    var user = JSON.parse(localStorage.Maoyan_user);

    var dict = {
      userId: user.id,
      token: user.token,
      orderId: orderId
    };

    var self = this;
    this.request.getOrderInfo(dict, data => {
      self.orderData = data.data;
    });
  },
  mounted() {},
  methods: {
    dealPayOrder() {
      var orderForm = document.getElementById("order");
      order.submit();
    }
  },
  computed: {},
  watch: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section.pay-section {
  color: #333;
  padding-bottom: 57px;
}

/* 时间 */
section.pay-section .count-down {
  color: #f90;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: #fef3d9;
  background-size: 17px 17px;
  text-align: center;
  line-height: 38px;
  box-sizing: border-box;
  height: 38px;
  font-size: 13px;
}
section.pay-section .count-down .time-icon {
  display: inline-block;
  width: 17px;
  height: 17px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAMAAADbwBjtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpceacQdeMNdeNNdiONdeNNNeONNeNNNeMNNeMNNaTNdaNNtaMNN6UOdaNNNqMNNaNNdaMNNaPNNaMNNaMNP+ZZtaMNNVZyLAAAAAWdFJOUwALW3NF3CaAwK0TOPAfpDHO91Kc8wVF1mq0AAAA70lEQVR42pWU6w7CIAxGC3Kdc3fP+z+qiS7dJhLi+ctJ+Epb5D/Msia/bT6ti/kpjHlGmfNYCI+BL4bH1XA9wBRdMCa4OAH07mzcAHIQJWSA29Xwd7lw92fHAamTL7oEuD1pD+kpBc8E/SfzAL6TH3Qehvd7AEcOa895gFFEMuTDAHX0zMxwVBshykGA2cgCk9QUmWCRFWJdibBKAldXHCTxEOpKAC8bmLpiYCuVFN9YVYqLFKsXXePak6Jx96LViTtWi9anK9Gn0wYoRQO0jSV6psOgFMPQGqn2YLbHu70k7VVrL2x77ZufR/sL+osX2REcVb8a8qcAAAAASUVORK5CYII=)
    no-repeat;
  background-size: contain;
  vertical-align: sub;
  margin-right: 6px;
}

/* 电影信息 */
section.pay-section .movie-info {
  background-color: #fff;
  padding: 15px;
  line-height: 1;
  color: #333;
  font-size: 13px;
}
section.pay-section .movie-info .title {
  font-family: PingFangSC-Medium, Hiragino Sans GB, sans-serif;
  font-size: 16px;
  line-height: 23px;
}
section.pay-section .movie-info .local {
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
}
section.pay-section .movie-info .date {
  font-size: 14px;
  line-height: 20px;
  margin-top: 7px;
  color: #f34d41;
}
section.pay-section .movie-info .seats {
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
}
section.pay-section .movie-info .seats .seat {
  display: inline-block;
}
section.pay-section .movie-info .pay-desc {
  line-height: 1;
  margin-top: 14px;
  font-size: 12px;
  color: #999;
  -webkit-transform: scale(0.916);
  transform: scale(0.916);
  -webkit-transform-origin: left center;
  transform-origin: left center;
}
section.pay-section .movie-info .pay-desc .s {
  display: inline-block;
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
  width: 7px;
  margin-right: 5px;
}
section.pay-section .movie-info .logo {
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 14px;
  width: 81px;
  background-image: url(data:image/png;base64,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);
  background-size: cover;
}
section.pay-section .movie-info .logo-container {
  line-height: 23px;
}

/* 钱和手机号 */
section.pay-section .pay-info {
  background-color: #fff;
  padding: 0 15px;
}
section.pay-section .pay-info .blk {
  color: #333;
  font-size: 13px;
}
section.pay-section .pay-info .red {
  color: #ef4238;
  font-size: 18px;
}
section.pay-section .pay-info .red .icon {
  font-size: 13px;
}
section.pay-section .pay-info .grey {
  color: #999;
  font-size: 13px;
}
section.pay-section .pay-info > div {
  line-height: 45px;
  font-size: 15px;
  color: #666;
  margin-right: -15px;
  padding-right: 15px;
}
section.pay-section .pay-info .coupon-desc,
section.pay-section .pay-info .discount-desc {
  font-size: 12px;
}
section.pay-section .pay-info .coupon-desc.hide,
section.pay-section .pay-info .discount-desc.hide {
  display: none;
}

/* 退票,改签,总价, 支付按钮 */
section.price-section {
  color: #333;
  padding-bottom: 57px;
}

section.price-section .arrow {
  width: 8px;
  height: 8px;
  margin-left: -2px;
}
section.price-section .price-block {
  padding: 10px 15px;
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
  box-sizing: border-box;
}
section.price-section .price-block .price {
  font-size: 21px;
  color: #ef4238;
}
section.price-section .price-block .price .d {
  font-size: 13px;
}
section.price-section .price-block .price .also {
  font-weight: 400;
  color: #333;
  font-size: 14px;
}
section.price-section .price-block .price-btn {
  line-height: 45px;
  width: 100%;
  background-color: #ff9e05;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
section.price-section .refundmigrateDetail {
  -webkit-box-flex: 1;
  flex: 1;
  padding: 12px 0 6px;
  line-height: 0;
}
</style>
