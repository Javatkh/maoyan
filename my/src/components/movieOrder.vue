<template>
  <div>
    <div v-if="orderList.length == 0" class="wrapper">
      <div class="tip-text">您最近还没有新订单，赶快去下一单吧</div>
    </div>
    <div class="order-list">
      <div
        class="order-item mb-line-tb"
        v-for="(item,index) in orderList"
        :key="index"
        @click="$router.push('/orderPay/'+item.id)"
      >
        <div class="order-title mb-line-b">
          <a class="cinema-name line-ellipsis">{{item.cinema.cinemaName}}</a>
        </div>
        <a data-link="/order/20579641457?$from=canary&amp;_v_=yes" class="order-detail-link">
          <div class="order-info">
            <img src="//p1.meituan.net/114.160/movie/a596474c1c29118d908d1eff0fd4293f1017066.jpg">
            <div class="order-desc">
              <div class="movie-name line-ellipsis">
                {{item.movie.movieName}}&nbsp;&nbsp;
                <span>{{item.seats.length}}张</span>
              </div>
              <div class="showTime line-ellipsis">{{item.show.showDate}} {{item.show.showTime}}</div>
              <div class="position line-ellipsis">
                {{item.hall.hallName}}
                <span
                  v-for="(seatItem,seatIndex) in item.seats"
                  :key="seatIndex"
                >{{seatItem.rowId}}排 {{seatItem.columnId}}座</span>

                <!-- <span>4排1座</span>
                <span>4排2座</span>
                <span>4排3座</span>
                <span>4排4座</span>-->
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- <div class="order-item mb-line-tb">
        <div class="order-title mb-line-b">
          <a class="cinema-name line-ellipsis">大地院线影城(珠江摩尔店)</a>
        </div>
        <a data-link="/order/20579641457?$from=canary&amp;_v_=yes" class="order-detail-link">
          <div class="order-info">
            <img src="//p1.meituan.net/114.160/movie/a596474c1c29118d908d1eff0fd4293f1017066.jpg">
            <div class="order-desc">
              <div class="movie-name line-ellipsis">
                来电狂响&nbsp;&nbsp;
                <span>4张</span>
              </div>
              <div class="showTime line-ellipsis">2018-12-29 周六 20:25</div>
              <div class="position line-ellipsis">
                3厅
                <span>4排1座</span>
                <span>4排2座</span>
                <span>4排3座</span>
                <span>4排4座</span>
              </div>
            </div>
          </div>
        </a>
        <div class="order-more mb-line-t">
          <div class="price">
            总价：
            <span>143.8元</span>
          </div>
          <div class="status">已完成</div>
        </div>
      </div>
      <div class="order-item good mb-line-tb">
        <div class="order-title mb-line-b">
          <div class="cinema-name line-ellipsis">中影国际影城</div>
        </div>
        <a data-link="/deal/orderdetail/3291113363">
          <div class="order-info">
            <img src="//p1.meituan.net/mmdb/1154a185dc3954a364f403a348faaf6952489.jpg@388_388m" alt>
            <div class="order-desc">
              <div class="movie-name line-ellipsis">16oz机打可乐2杯+64oz爆米花1桶</div>
              <div class="showTime line-ellipsis">数量: 1</div>
            </div>
          </div>
        </a>
        <div class="order-more mb-line-t">
          <div class="price">总价: 40.6元</div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: []
    };
  },
  created() {
    this.$store.commit("setNavTitle", "我的电影订单");

    var user = JSON.parse(localStorage.Maoyan_user);

    var dict = {
      userId: user.id,
      token: user.token,
      userPhone: user.mobile
    };

    var self = this;
    this.request.getMyOrderList(dict, data => {
      self.orderList = data.data;
    });
  }
};
</script>
<style scoped>
.order-list {
  background: #eee;
  position: fixed;
  width: 100%;
  height: calc(100% - 48.5px);
  overflow-y: scroll;
}
.order-list::-webkit-scrollbar {
  display: none;
}
.order-list .order-item {
  background-color: #fff;
  margin-bottom: 10px;
}
.order-list .order-item .order-title {
  display: -webkit-box;
  display: flex;
  padding: 0 15px;
}
.order-list .order-item .order-title .cinema-name {
  display: inline-block;
  text-align: left;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  line-height: 38px;
  height: 38px;
  font-size: 13px;
  color: #666;
  margin-right: 6px;
}
.order-list .order-item .order-title .cinema-name:after {
  display: inline-block;
  content: "";
  width: 7px;
  height: 7px;
  border-left: 1px solid #777;
  border-top: 1px solid #777;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
.order-list .order-item .order-info {
  margin: 12px 15px;
  overflow: hidden;
  position: relative;
  display: -webkit-box;
  display: flex;
}
.order-list .order-item .order-info img {
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  width: 57px;
  height: 80px;
}
.order-list .order-item .order-info .order-desc {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  margin-left: 12px;
  margin-top: 4px;
  overflow: hidden;
}
.order-list .order-item .order-info .order-desc .movie-name {
  font-size: 15px;
  color: #000;
  line-height: 21px;
  height: 21px;
}
.order-list .order-item .order-info .order-desc .position,
.order-list .order-item .order-info .order-desc .showTime {
  font-size: 12px;
  color: #888;
  line-height: 18px;
  height: 18px;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.order-list .order-item .order-info .order-desc .showTime {
  margin-top: 5px;
}
.order-list .order-item .order-more {
  margin-left: 15px;
  padding: 0 15px 0 0;
}
.order-list .order-item .order-more .price,
.order-list .order-item .order-more .status {
  line-height: 42px;
  height: 42px;
  font-size: 13px;
  color: #888;
  display: inline-block;
}
.order-list .order-item .order-more .status {
  color: #333;
  float: right;
}
.order-list .order-item.good .order-title .cinema-name:after {
  display: none;
}
.order-list .order-item.good .order-title .left-time {
  color: #666;
}
.order-list .order-item.good .order-info img {
  width: 57px;
  height: 57px;
}
.wrapper {
  background: url("../assets/nothing.png") no-repeat top;
  background-size: 110px 110px;
  height: 715px;
  text-align: center;
  display: block;
  margin-top: 100px;
}
.wrapper .tip-text {
  display: block;
  padding-top: 120px;
  font-size: 16px;
  height: 28px;
  line-height: 28px;
  color: #999;
}
</style>

