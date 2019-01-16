<template>
  <div class="body">
    <div class="seat-block">
      <!-- 顶部显示电影信息 -->
      <div class="info-block">
        <div class="movie-info box-flex middle">
          <div class="flex">
            <div class="title line-ellipsis">大黄蜂</div>
            <div class="info line-ellipsis">
              <span>2019-01-11&nbsp;20:10</span>
              <span style="margin-left: 5px; ">原版3D</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间选座区域  @touchstart="touchstart" @touchmove="touchmove"-->
      <div  class="select-block" style="height: 321.234px;">
        <div class="seat-block-wrap" style="visibility: visible;" v-if="seatData.seat">
            <!-- 影院厅号 -->
            <div class="hall-name-wrapper animate" style="transform: translate3d(108.5px, 0px, 0px) scale(1, 1) rotate3d(0, 0, 0, 0deg);">
              <span class="hall-name">4号厅(激光)</span>
            </div>
             <!-- 侧边排号 -->
            <div  ref="rows" class="row-nav animate" style="transform: translate3d(-0.8px, -92.3905px, 0px) scale(0.9, 0.9) rotate3d(0, 0, 0, 0deg);">          
              <div>1</div>          
              <div>2</div>          
              <div>3</div>         
              <div>4</div>        
              <div>5</div>         
              <div>6</div>         
              <div>7</div>          
              <div>8</div>          
              <div>9</div>          
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <div>15</div>
            </div>

          <div class="seats-block animate">
            <!-- hall-name -->
            <!-- row-nav -->
            <!-- m-line -->
            <!-- m-line -->
            <div class="m-line" style="-webkit-transform: translateX(-23px);transform: translateX(-23px);">
              <div class="divider" style="-webkit-transform: translateX(-23px);transform: translateX(-23px);"></div>
            </div>
            <!-- s-line -->
            <!-- 普通区 -->
            <div class="seats-wrap">
              <!-- 双层for循环  for-->
              <div
                v-for="(rowItem,rowIndex) in seatData.seat.sections[0].seats"
                :key="rowIndex"
                style="width: 1518px;"
              >
                <!-- 行内每一列 -->
                <div
                  v-for="(columnItem,columnIndex) in rowItem.columns"
                  :key="columnIndex"
                  class="wrap"
                  :class="{active:columnItem.active}"
                  :data-status="{'E':-1,'N':'0','LK':1}[columnItem.st]"
                  @click="dealSelectSeat(columnItem,rowIndex,columnIndex,0)"
                >
                  <div class="seat">
                    <div class="name">
                      <div>{{rowItem.rowId}}排</div>
                      <div>{{columnItem.columnId}}座</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- s-line -->
            <!-- 贵宾区 -->
            <div></div>
          </div>
        </div>
      </div>

      <!-- 底部购买信息 -->
      <div class="buy-block" :data-show="selectSeatList.length==0?'recommend':'submit'">
        <!-- 1小块 - 电影类型 -->
        <div class="cinema-info">
          <div class="seat-type-info">
            <span class="text-middle">
              <span class="c icon"></span>
              <span class="text">可选</span>
            </span>
            <span class="text-middle">
              <span class="u icon"></span>
              <span class="text">已选</span>
            </span>
            <span class="text-middle">
              <span class="s icon"></span>
              <span class="text">已售</span>
            </span>
            <span class="text-middle">
              <span class="l icon"></span>
              <span class="text">情侣座</span>
            </span>
          </div>
        </div>

        <!-- 2小块 推荐座位 -->
        <div class="recommend-price-block" v-if="selectSeatList.length==0">
          <div class="recommend-block">
            <div class="title">推荐座位</div>
            <div class="recommend-list grid-4">
              <div class="wrap" data-bid="dp_wx_seat_recommend">
                <div
                  class="button"
                  data-desc="{&quot;img&quot;:&quot;http://p0.meituan.net/movie/e01b7b9d694e93ecbc7ead28b92d94395702298.png&quot;,&quot;remind&quot;:&quot;大家都爱的好位置哦！&quot;}"
                  data-obj="[{&quot;columnId&quot;:&quot;20&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;}]"
                  @click="dealSelectRecommend(1)"
                >1人</div>
              </div>

              <div class="wrap" data-bid="dp_wx_seat_recommend">
                <div
                  class="button"
                  data-desc="{&quot;img&quot;:&quot;http://p0.meituan.net/movie/e01b7b9d694e93ecbc7ead28b92d94395702298.png&quot;,&quot;remind&quot;:&quot;大家都爱的好位置哦！&quot;}"
                  data-obj="[{&quot;columnId&quot;:&quot;20&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;21&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;}]"
                  @click="dealSelectRecommend(2)"
                >2人</div>
              </div>

              <div class="wrap" data-bid="dp_wx_seat_recommend">
                <div
                  class="button"
                  data-desc="{&quot;img&quot;:&quot;http://p0.meituan.net/movie/e01b7b9d694e93ecbc7ead28b92d94395702298.png&quot;,&quot;remind&quot;:&quot;大家都爱的好位置哦！&quot;}"
                  data-obj="[{&quot;columnId&quot;:&quot;20&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;21&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;22&quot;,&quot;rowId&quot;:&quot;L&quot;,&quot;rowNum&quot;:10,&quot;sectionId&quot;:&quot;0000000000000001&quot;}]"
                  @click="dealSelectRecommend(3)"
                >3人</div>
              </div>

              <div class="wrap" data-bid="dp_wx_seat_recommend">
                <div
                  class="button"
                  data-desc="{&quot;img&quot;:&quot;http://p0.meituan.net/movie/e01b7b9d694e93ecbc7ead28b92d94395702298.png&quot;,&quot;remind&quot;:&quot;大家都爱的好位置哦！&quot;}"
                  data-obj="[{&quot;columnId&quot;:&quot;22&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;23&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;24&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;25&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;}]"
                  @click="dealSelectRecommend(4)"
                >4人</div>
              </div>

              <div class="wrap" data-bid="dp_wx_seat_recommend">
                <div
                  class="button"
                  data-desc="{&quot;img&quot;:&quot;http://p0.meituan.net/movie/e01b7b9d694e93ecbc7ead28b92d94395702298.png&quot;,&quot;remind&quot;:&quot;大家都爱的好位置哦！&quot;}"
                  data-obj="[{&quot;columnId&quot;:&quot;22&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;23&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;24&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;25&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;},{&quot;columnId&quot;:&quot;26&quot;,&quot;rowId&quot;:&quot;K&quot;,&quot;rowNum&quot;:9,&quot;sectionId&quot;:&quot;0000000000000001&quot;}]"
                  @click="dealSelectRecommend(5)"
                >5人</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3小块 选座后显示 -->
        <div class="price-block" v-if="selectSeatList.length>0">
          <div class="title-block">已选座位</div>
          <div class="box-flex selected-block">
            <!-- selectSeatList -->
            <div
              v-for="(item,index) in selectSeatList"
              :key="index"
              class="selected-seat-item"
              data-id="0000000000000001-L-20"
              @click="dealCancleSeat(item,0)"
            >
              <p class="selected-seat-info">{{item.rowId}}排{{item.columnId}}座</p>

              <p class="price-info">¥{{item.price}}</p>

              <span class="close"></span>
            </div>

            <!-- <div class="selected-seat-item" data-id="0000000000000001-L-20">
              <p class="selected-seat-info">L排20座</p>

              <p class="price-info">¥99.5</p>

              <span class="close"></span>
            </div>

            <div class="selected-seat-item" data-id="0000000000000001-L-21">
              <p class="selected-seat-info">L排21座</p>

              <p class="price-info">¥99.5</p>

              <span class="close"></span>
            </div>-->
          </div>
        </div>

        <!-- 4小块 确认按钮 -->
        <div class="submit-block box-flex">
          <div
            class="submit flex"
            data-bid="b_212zq"
            @click="dealBuyTicket"
          >{{selectSeatList.length>0?'¥'+totalPrice+' 确认选座':'请先选座'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "t",
  data() {
    return {
        seatData: {},
        // 鼠标坐标
        lastPosX:"",
        lastPosY:"",
        curPosX:"",
        curPosY:"",
        diffX:"",
        diffY:"",
    };
  },

  created() {
      
    // 下载数据
    this.request.postSeatingPlan({ seqNo: 1212 }, data => {
      this.seatData = data.seatData;

        // // 监听dom渲染完成
        // this.$nextTick(function(){
            
        //     //获取左边导航的坐标
        //     let left = this.$refs.rows
        //     // 这里要得到top的距离和元素自身的高度
        //     left.offsetTop = this.diffX;
        //     console.log(left.offsetTop)
        // });
    });
    // 修改rem布局样式
    document.documentElement.style.fontSize = "100px";
    window.addEventListener("resize", function() {
      document.documentElement.style.fontSize = "100px";
    });
    // 隐藏标签栏
    this.$store.commit("setIsShowTabbar", false);

  },
  destroyed() {
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 7.5 + "px";
    window.addEventListener("resize", function() {
      document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 7.5 + "px";
    });
    // 显示标签栏
    this.$store.commit("setIsShowTabbar", true);
  },
  mounted() {

        
  },
  methods: {
    dealSelectRecommend(count) {
      var sectionIndex = 0;

      var map = {
        1: "bestOne",
        2: "bestTwo",
        3: "bestThree",
        4: "bestFour",
        5: "bestFive"
      };

      var dict = this.seatData.seat.bestRecommendation[map[count]];

      /*
      switch (count) {
        case 1:
          dict = this.seatData.seat.bestRecommendation.bestOne;
          break;
        case 2:
          dict = this.seatData.seat.bestRecommendation.bestTwo;
          break;
        case 3:
          dict = this.seatData.seat.bestRecommendation.bestThree;
          break;
        case 4:
          dict = this.seatData.seat.bestRecommendation.bestFour;
          break;
        case 5:
          dict = this.seatData.seat.bestRecommendation.bestFive;
          break;

        default:
          break;
      }
      */

    //   console.log(dict);

      for (var recommendIndex in dict.seats) {
        //每个推荐的座位
        var recommendItem = dict.seats[recommendIndex];

        //把每个座位在  所有的行列里找
        for (var rowIndex in this.seatData.seat.sections[0].seats) {
          //每一列
          var rowItem = this.seatData.seat.sections[0].seats[rowIndex];
          for (var columnIndex in rowItem.columns) {
            var columnItem = rowItem.columns[columnIndex];

            if (
              recommendItem.rowId == rowItem.rowId &&
              recommendItem.columnId == columnItem.columnId
            ) {
              console.log("找到");
              this.$set(
                this.seatData.seat.sections[sectionIndex].seats[rowIndex]
                  .columns[columnIndex],
                "active",
                true
              );
            }
          }
        }
      }
    },
    dealCancleSeat(item, sectionIndex) {
      this.$set(
        this.seatData.seat.sections[sectionIndex].seats[item.rowIndex].columns[
          item.columnIndex
        ],
        "active",
        false
      );
    },
    dealSelectSeat(columnItem, rowIndex, columnIndex, sectionIndex) {
      console.log(columnItem);
      console.log(rowIndex);
      console.log(columnIndex);

      if (columnItem.st == "N") {
        /*
        if (
          this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
            columnIndex
          ].active == undefined
        ) {
          this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
            columnIndex
          ].active = false;
        }
        this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
          columnIndex
        ].active = !this.seatData.seat.sections[sectionIndex].seats[rowIndex]
          .columns[columnIndex].active;

        this.$forceUpdate();*/

        var isActive = this.seatData.seat.sections[sectionIndex].seats[rowIndex]
          .columns[columnIndex].active;
        if (isActive == undefined) {
          isActive = false;
        }

        if (isActive == false) {
          if (this.selectSeatList.length >= 6) {
            layer.open({
              content: "最多选择6个座位",
              btn: "我知道了"
            });
            return;
          } else {
            this.$set(
              this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
                columnIndex
              ],
              "active",
              true
            );
          }
        } else {
          this.$set(
            this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
              columnIndex
            ],
            "active",
            false
          );
        }

        //this.$forceUpdate();
      }
    },

    // 点击创建订单发送post请求 先从user中拿到信息，再把信息传出去
    dealBuyTicket() {
      //发送请求
      console.log("dealBuyTicket");

      var user = JSON.parse(localStorage.Maoyan_user);

      var sectionIndex = 0;

      var dict = {
        seqNo: this.seatData.show.seqNo,
        sectionId: this.seatData.seat.sections[sectionIndex].sectionId,
        sectionName: this.seatData.seat.sections[sectionIndex].sectionName,
        // 转成对象
        seats: JSON.stringify(this.selectSeatList),
        userPhone: user.mobile,

        //自己
        cinema: JSON.stringify(this.seatData.cinema),
        movie: JSON.stringify(this.seatData.movie),
        hall: JSON.stringify(this.seatData.hall),
        show: JSON.stringify(this.seatData.show),
        userId: user.id,
        token: user.token
      };
      // console.log(dict)
      // 发送post请求
      this.request.postCreateOrder(dict, data => {
        if (data.status == 0) {
          console.log("创建失败");

          layer.open({
            content: "订单创建失败(message=" + data.message + ")",
            btn: "我知道了"
          });
        } else {
          console.log("创建成功");

          var orderId = data.data.orderId;
          this.$router.push("/orderPay/" + orderId);
        }
      });
    },

    // // 当鼠标点击时触发，类似onclick事件
    // touchstart(e) {
    //     // console.log('touchstart')
    //         // 获取起始坐标位置x
    //     this.lastPosX = e.targetTouches[0].clientX
    //     this.lastPosY = e.targetTouches[0].clientY
    //     // console.log(this.lastPosX)

    // },
    // // 当鼠标移动时触发
    // touchmove(e) {
    //     // console.log('touchmove')
    //     // 获取当前位置x
    //     this.curPosX = e.targetTouches[0].clientX
    //     this.curPosY = e.targetTouches[0].clientY

    //     // 计算差值  鼠标移动距离
    //     this.diffX = +(this.curPosX - this.lastPosX)
    //     this.diffY = +(this.curPosY - this.lastPosY)
    //     // console.log(this.diffX)
    //     // console.log(this.diffY)

    //     // 其他业务逻辑
    //     // ...

    //     // 更新lastPosX
    //     // this.lastPosX = this.curPosX
    // }

    
  },
  computed: {
    totalPrice() {
      var sum = 0;
      for (var index in this.selectSeatList) {
        var item = this.selectSeatList[index];
        sum += parseFloat(item.price);
      }
      sum = sum.toFixed(1);
      return sum;
    },
    selectSeatList() {
    //   console.log("selectSeatList");

      var price = 0;
      if (this.seatData.price) {
        if (this.seatData.price.seatsPrice["1"]) {
          price = this.seatData.price.seatsPrice["1"].totalPrice;
        }
      }

      var list = [];

      //计算所有被选择的座位
      if (this.seatData.seat) {
        //每一行

        for (var rowIndex in this.seatData.seat.sections[0].seats) {
          //每一列
          var rowItem = this.seatData.seat.sections[0].seats[rowIndex];
          for (var columnIndex in rowItem.columns) {
            var columnItem = rowItem.columns[columnIndex];
            if (columnItem.active == true) {
              console.log("选择了");

              columnItem.rowId = rowItem.rowId;
              columnItem.price = price;
              columnItem.rowIndex = rowIndex;
              columnItem.columnIndex = columnIndex;
              list.push(columnItem);
            }
          }
        }
      }

      return list;
    }
  },
  watch: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seat-block {
  position: relative;
}

/* 电影信息- 开始 */

.seat-block .info-block {
  position: relative;
}
.seat-block .info-block .default-notice {
  position: absolute;
  background-color: #ffe9cd;
  width: 100%;
  text-align: center;
}
.seat-block .info-block .default-notice-text {
  display: inline-block;
  margin: 0.06rem 0;
  width: 2.86rem;
  font-size: 0.12rem;
}
.seat-block .info-block .movie-info {
  padding: 0.15rem;
}
.seat-block .info-block .movie-info .title {
  width: 3rem;
  height: 0.24rem;
  line-height: 0.24rem;
  font-size: 0.16rem;
  font-weight: 700;
  color: #333;
}
.seat-block .info-block .movie-info .info {
  font-size: 0.13rem;
  padding-top: 0.02rem;
  line-height: 1;
}
.seat-block .info-block .movie-info .change {
  color: #39b54d;
  line-height: 0.39rem;
}

/* 电影信息 - 结束 */

/* 购买信息 - 开始 */

.seat-block .cinema-info {
  background-color: #f0f0f0;
  opacity: 0.8;
  font-size: 0.12rem;
}
.seat-block .cinema-info .seat-type-info {
  text-align: center;
  padding: 0.1rem 0 0.08rem;
}
.seat-block .cinema-info .seat-type-info > span + span {
  margin-left: 0.05rem;
}
.seat-block .cinema-info .seat-type-info .text {
  font-size: 0.12rem;
}
.seat-block .cinema-info .seat-type-info .icon {
  display: inline-block;
  width: 0.17rem;
  height: 0.15rem;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 0.04rem;
}
.seat-block .cinema-info .seat-type-info .icon.c {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAABw0lEQVRYhe2XP0vDQBiHnzZJG6RpbReFFkQdtCWIEPMt1G/g5qwoqIO66VJBxNnNj1C/RcgWEEE6iIOTgh7F/3XoH+J5RWlTpzzj3fH+Hu7e4b1Es9lEhecHS8AG4AIZ5aG/IwAPOHYd+0J1IKES8fzgANgdMLwXh65j7/0q4vnBIlADMNMpSqVxslYGTUv2lfrx8cnjk+D29o7nl9fO8rLr2LXwOVX1TQDTTFMpT5MfzfYtAaBpSfKjWSrlaUwz3VnekM+pEhYASsUxNE3rW+CnkEapOPYt4zcRCyBrDdqfPwnVtOQ93fODFHAErAD5zsYgz9GLcE3PD5rAA3AObOlAFViLPPVv5NvZzzqtm6A8M0UmMwKA5wdDTXcdGwAhGlxe1QFWk0AB6Er8J6HMQvSN0CexiEwsIhOLyMQiMrGITCwioxQxDB0hGpGHCdHAMHTlnnJ1cqLIdf2Gt7f3SEVShsHkRLGnyD1QEKLRnQ9yOYv5udlIJVSEbv1epzUzrrcnJaA1sJRnpoYSfnlVVz37WRLYBk5pDbJd02H1iFT3oZ29r/rpnQDrkVt8p+o69k54QdWs20AC6XsREZ3vw7688QX1n3jvKJJ2bAAAAABJRU5ErkJggg==);
}
.seat-block .cinema-info .seat-type-info .icon.u {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAABrklEQVRYhe3XP24TQRSA8Z/DxpJjWyiWJWhiJCLZF4ADpKFA5Ah01ERBAoSACqqAED103CCBlgPACewykaDJnwZYFEWBYmxsTyYyIhuq/bqdN/Pep5ld7bzKzU1J+gOrWMd1NNKz/ppv+IxXva73k4EPq7/A3CkSz7GJlQIkDHOsYKs/8Cw1IUtI3MJjqFZpt6kvMJdUns3xMd9/sLvL4SF40h/41OvampyXSn9vJHGlQ7Px7xKEtc1GyFWt/hlePzEvsfYaYSfOIpASarena8wSaRKOo2gmcjbjWGX5pSpe4DYWR4Fet3gR6A+mHg/wDvczbODu+ZSdyeKw9s9M2AmdJWq1EI2sC2e023nO9g64M4cWY4n/yUTNVoHfxdkoRWJKkZhSJKYUiSlFYkqRmKRIloVfdNHkecidrJkavHyJL185OipWJMtC7tNE9tHK8/H9oF5n+WqxEikmdn0/E+6Ma8ObEoJQZ+l8im/vJI/97YXWDR9xEV3UCEdSX2B+vliJPGdvb2roAG/wqBL3vv2B11grVuEEG72uh4x739TL+gAVUXtREKP24Wkc+A1Agljtpb+OfQAAAABJRU5ErkJggg==);
}
.seat-block .cinema-info .seat-type-info .icon.s {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAABzElEQVRYhe2XsU7bUBSGv+tcuzEONjHiBWDJHKVdOlld6SN0Yy6iUmFA3ZhAQjxAN96gdKzkGVVi6tpXcHRR2kbtDe6QxJibi4rgQhd/k6Vzdc7n35J9LEavXmAjL9RrYAd4DnSsh+7OCPgKHGdp8rleiL6cA+DdInEAfAIyBxLMemTA2az3AtIisQnsC6Dd8tgI23R9iRTiXga6LBn+0Xz/NWY8uaKE/bxQ51manNXP2RJ5BxC2PAZxh7XAv7cEgBSCtcBnEHcIW9W4HfOcTWQAsB62HyRgE1oP2zdm/EtkGaDrLzy1B5Ne91w2azIvVAAcAW+AblVwmMacVq1nXqgSGNLvnQLvJXAIvHU+9W50Z7PHkmkS9OOIRE6jywv1qNOzNAFAac3F5Q+ALQ9IgUriKanNTK0vtP9BI2LSiJg0IiaNiEkjYtKImFhFAk+gtHY+TOkJgWdfuKzf/l60xLfRT35flU5FnnkevWjpVpECSJXW1X6w6ktersROJWwoPZlfFhI4BbZnmxIwXVj6cfQowy8uR3WBOR8lsAsIasuz0pp6Qq5QemJKDJkG8UGY/755oU6AbacGixxmabIH1/++tlteSMghVQJm4S8WlHmSlwvIogAAAABJRU5ErkJggg==);
}
.seat-block .cinema-info .seat-type-info .icon.l {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAMAAAB+ITwmAAAAXVBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP/v8/9+/zz8/Xv8PL/7PH/8PT/3eb/097/z9vQ0dj/wtH/6e//xNP/1+HW2N3S1NrS09n/ytf/xNL8SgegAAAACnRSTlMA7pEG876JhE1McY9omAAAAN1JREFUOMu10ssOgjAQheGC4GVOS7kKXt//MZUBaTVHFib+m0nolwmLMVP7PMNHWX4wUTvQdkEcgKt38pbzV2C/kByXAAK6IF9IBi8kj2whgGPEAfq8SRMAQgOQpBuTAmsE2JoEhchEypu9lc/RDu1ziH4ukBjdoKSyY32vo1KimyLS6tsw6GgpOdqo46+kiUlDSRWTihKpg6iFEzm9xEk4CXtq4UQr79bee1kj4prGCSdxfyRdwUTRRcR3IHVeiZ7U9/Sk9DDPQjvrYc7nzf9lPu+xFCzdMKebSPOGB/ZBKDh4lRXcAAAAAElFTkSuQmCC);
}
.seat-block .cinema-info .address-block .line {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAA6AQMAAABCjQHeAAAABlBMVEXy8fbh4eETLJufAAAAD0lEQVQI12NABj+AkA4AAMYUAfFAh+NYAAAAAElFTkSuQmCC)
    repeat-x;
  background-size: contain;
}
.seat-block .cinema-info .address-block .text {
  line-height: 0.34rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV8AAAA6BAMAAADl1UfvAAAAKlBMVEUAAAD////////////h4eHh4eHh4eHh4eHh4eHh4eHh4eH////k5OT29vb0HWJ2AAAACnRSTlMA8a0m7o/EPAbD8Jk90gAAAJFJREFUaN7t1D0KwmAMh/E/qPgx6ujk7KJ3cXB08lwdKkJwsWtvUOgNepjCC4VM3QoJPL8l6zMkUbF7WHT1U87G4vvIWX8V3baWc6gUnhG8MJtmkSG4qPIFp1sJgp3lgvcvhfcWAAAAAAAAAAAAMG91aaM73uTc2/hOcq6DRdc3cs6dRff7pw5OtxLpji7PWxsBJ76F2Hqt84EAAAAASUVORK5CYII=)
    no-repeat;
  padding: 0 0.2rem;
  height: 0.34rem;
  box-sizing: border-box;
  background-size: 100% 100%;
}

.seat-block .buy-block {
  position: fixed;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}

.seat-block .buy-block[data-show="recommend"] .recommend-price-block {
  min-height: 0.5rem;
}
.seat-block .buy-block[data-show="recommend"] .submit {
  background-color: #ffddb2 !important;
}
.seat-block .buy-block[data-show="recommend"] .recommend-block {
  display: block;
  float: left;
  width: 100%;
}
.seat-block .buy-block[data-show="recommend"] .price-block,
.seat-block .buy-block[data-show="submit"] .recommend-block {
  display: none;
}
.seat-block .buy-block[data-show="selected-seats"] .recommend-price-block {
  min-height: 0.68rem;
  display: none;
}
.seat-block .buy-block[data-show="submit"] .submit {
  background-color: #f90 !important;
}
.seat-block .buy-block[data-show="submit"] .price-block {
  display: block;
}
.seat-block .buy-block .recommend-block {
  width: 100%;
  float: left;
  padding: 0.1rem 0.1rem 0.07rem;
}
.seat-block .buy-block .recommend-block .title {
  float: left;
  font-size: 0.13rem;
  color: #333;
  height: 0.3rem;
  line-height: 0.3rem;
}
.seat-block .buy-block .recommend-block .recommend-list {
  float: left;
}
.seat-block .buy-block .recommend-block .recommend-list .wrap {
  display: block;
  float: left;
  margin-left: 0.08rem;
  text-align: center;
  box-sizing: border-box;
  width: 0.5rem;
  height: 0.3rem;
}
.seat-block .buy-block .recommend-block .recommend-list .wrap .button {
  line-height: 0.3rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.02rem;
  font-size: 0.11rem;
}

.seat-block .buy-block .submit-block {
  padding: 0.1rem;
  height: 0.45rem;
}
.seat-block .buy-block .submit-block .input-wrap {
  margin-right: 0.04rem;
  border: 0.01rem solid #e1e1e1;
  border-radius: 0.04rem;
  width: 65%;
  position: relative;
}
.seat-block .buy-block .submit-block .input-wrap input {
  border: none;
  background: 0 0;
  width: 100%;
  line-height: 0.43rem;
  height: 0.43rem;
  box-sizing: border-box;
  padding: 0 0.3rem;
  font-size: 0.18rem;
  color: #333;
  font-weight: 700;
}
.seat-block .buy-block .submit-block .input-wrap .phone-icon {
  position: absolute;
  width: 0.12rem;
  height: 0.2rem;
  left: 0.1rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAoBAMAAAAWIydmAAAAIVBMVEWIiIiIiIiIiIgAAACIiIiIiIiIiIj////09PSrq6uqqqqYmaSCAAAABnRSTlPxrScAKCUTY3tgAAAASklEQVQoz2MwFUiDAsZgBoU0OGBiEENwEhnYEJwEhjQkgMZJL4eCslEOKRwEIMhZ0YXEaa/A5EAia0YnOLJQo9EBwWFhMEJEvTIAtxHJ4Sy49wkAAAAASUVORK5CYII=)
    no-repeat;
  background-size: contain;
}
.seat-block .buy-block .submit-block .input-wrap .cancel-icon {
  position: absolute;
  width: 0.3rem;
  height: 100%;
  right: 0.02rem;
  top: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAOVBMVEUAAADX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19f////l5eXbky1cAAAAEHRSTlMA6gSSV0wQlfmAxa36x8aB8Jt08QAAAKxJREFUKM+Fk+sSxBAMRhPq1uvH+z/sTrdZyraT80fGGQQJVYyzO8fIu3WGRnxiVDj53k6MDp6oYQL+CKbaBQ8sP2/xSJBz8cL3fM9vms/80xWXnMsYJSIji3OW2XJGstyQg2jxJTcNV9Mul5cBF5ZmdL6zmInR/GjBFNH8aBEVrWyupKZcTHkW5VGVL1E+VCmHk/Bsg1KKWiHrbSD4g2/y8M20Ftx4XXm7t+AHo78rW230ARoAAAAASUVORK5CYII=)
    50% no-repeat;
  background-size: 0.15rem;
  cursor: pointer;
}
.seat-block .buy-block .submit-block .submit {
  background-color: #ffddb2;
  line-height: 0.45rem;
  font-size: 0.18rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  border-radius: 0.04rem;
}

.seat-block .buy-block .price-block {
  padding: 0 0.1rem;
  /* font-size: 0; */
}
.seat-block .title-block {
  position: relative;
  margin: 0;
  padding-top: 0.05rem;
  height: 0.2rem;
  color: #333;
  font-size: 0.11rem;
}
.seat-block .selected-block {
  display: block;
}

.box-flex {
  display: -webkit-box;
  display: flex;
}
.seat-block .selected-block .selected-seat-item {
  position: relative;
  float: left;
  background-image: url(data:image/png;base64,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);
  margin: 0.05rem 0.02rem;
  width: 0.825rem;
  height: 0.37rem;
  background-size: 0.825rem 0.37rem;
  text-align: center;
}
.seat-block .selected-block .selected-seat-info {
  padding-top: 0.03rem;
  font-size: 0.12rem;
  color: #333;
}
.seat-block .selected-block .price-info,
.seat-block .selected-block .selected-seat-info {
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
}
.seat-block .selected-block .price-info {
  position: relative;
  font-size: 0.11rem;
  color: #fa5939;
  line-height: 0.15rem;
}
.seat-block .selected-block .close {
  position: absolute;
  top: 0.15rem;
  right: 0.05rem;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAYJJREFUOBGdlD1ugzAUxzHlHt07gAQod0gPkUZRpQ5Zql6gQw/AVqlShVAP0C1D56x8DDlAT5FMRe7/AQ8Zx4ATS8bG772f3wcPUVXVfV3Xr47j7KIoehNCSOwvGnmeP8BuK6XM4jh+9zrgApRFWZa3EDxeAi6K4hk2CaYDuzusHy5gO3YLBxuAP7EKPptaGajo/ABcu13IKQtswToQsL3neSviNB6RZ52HG4ZDKQ3D0JiKEeAyCIJjD6WNLXgOOIDagG2AZ9ApMGQHRJOQDo0uh33I7Wn7NFbZlIqBUVsUI5D0jFASjIGnPCQ7GvSdGgeMqbMOuhCX/fq+f9LP1fdRqF4UxWg11yBGqA6kkAH9YjC8ney8M6gJiE5ZovPWgFt13qBQY0DuFFPx6CK983roHFAJfbalG6gt0BYs6AcL5YwNqCiUQw6Zz/V1JBUJcv/iArJlA1sg6UNXdrlUi/eEyzwXjwwKR8xvGw/ZAQ1M/4QTGCnmX6NDdFX5mj0YN2z3DxmoW/WF8UdWAAAAAElFTkSuQmCC);
  background-size: 0.07rem 0.07rem;
  width: 0.07rem;
  height: 0.07rem;
}
/* 购买信息结束 */

/* 选座 - 开始 */
.seat-block .select-block {
  background-color: #f2f1f6;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  margin-top: 0 !important;

  /* 自己添加, 利用原生 */
  overflow: scroll;
}
.seat-block .select-block .seats-block {
  position: relative;
  z-index: 1;
}
.animate {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.seat-block .select-block .seats-wrap{
  /* font-size: 0; */
}
.seat-block .select-block .seats-wrap .wrap {
  display: inline-block;
  padding: 0.06rem 0.03rem;
}
.seat-block .select-block .seats-wrap .wrap .seat {
  width: 0.4rem;
  height: 0.36rem;
  font-size: 0.1rem;
  padding: 0.03rem 0.06rem;
  box-sizing: border-box;
  line-height: 1.2;
  text-align: center;
  background-size: contain;
  color: #fff;
  position: relative;
}
.seat-block .select-block .seats-wrap .wrap .seat > .name {
  display: none;
  position: absolute;
  line-height: 1;
  width: 100%;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.seat-block .select-block .seats-wrap .wrap[data-status="0"] .seat {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAWlBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP8/P3p6u3Y2d7z8/XLzdT4+PnS1NrP0dfw8PLQ0dhOVyJQAAAAEnRSTlMA8r5NhGoRCOLVs3njyiAcsnjlsKc3AAABFElEQVRYw+3Yy3KDMAyFYewA4ZJLqyPbAdL3f80mbWY8LaYTZDad6N/zDdZOKn5VV12DZzNtV9XFX+17g5WZfr/snVrAu4GebnAeaE9L3vmAMdDKwojDeeG9R3im1bHHMf3qd4xMgnhEn/Jqg0CiAkydACt4EuZRJcA3OCno0CXABoMUHNAkQIDEAf8L3FmDW1ngV8bu7l4JIB98VN7+DxfHdE8Ixk/ZXbArLBxRPvidgy0MeDuQYQqAtgMJUFBBBRVUUEEFFVRQQQUVfCVwClIvTEnwOkHYx3UGZhdBA97OY5i4L2+Rg40bfV5xo483By+nPB6VP64iLB9dvIrELFzO6GbFYcpGl6iEuHKuxWGuKDW6T1dge519C3laAAAAAElFTkSuQmCC);
}
.seat-block .select-block .seats-wrap .wrap[data-status="0"].love .seat {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAhFBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP/v8/7+/zo6ez/xtT/9vj/1uDY2d7/zNn/wtHz8/X/7/P/2+T/0t78/P3/4un/3+f4+Pnq6+7/6O7S1NrP0dfw8PLQ0diylW+SAAAAE3RSTlMAvvVN8YTjeR4RCNWzymtqT0yytIS7BgAAAbVJREFUWMPt2G1vgjAUhmFExHedO0+Rd1BR0f3//zeUsCZAFzlliUu4P/nFK/UQaVqj1ny7sk28mLlcbefGby2mFjpmTRdqb7YEgsuZXu58CYDlTOnZyGPqWJzDVoiLNYIjde4YYN3+q6fIC48h5pi2eXMLMbGKYbU96w0CYhZg0wJ+4sIFL1i1gDbOXPAMuwU0QexgtoDQAfGn4HhkokgLfGaOdg9vAkAbrJoYxg7YO/SICcqvOntgbIywJ9IHy/YYGRac/kAHlgFQfyABA1gv8V3h+gk989LQDVNPB8xEWUpFqSg78cGTqPKJfFF14oJeJH66XuXnyGOCmZC5rpBlTDAUikIm6KpAlwkKVdG7rPCgAn0meFWBCROkUPWQuWCiWCAbpLRu8f/L6ufikw54bIgH3ResX18fB1TPMetjC7hGFRcl/ewpXlh6odfbJpVFxfJOfe563uHgvec2OoADOIAD+A/AW8z14lsreL+B2de9BvYXIE+jfeTAlOdlveR5efw80WsnT/TyziHgU4G8cyj6qG5FHPbSqluRsSGTw+SNrpEcJnN0zSZgN2lqcpidao7uG3v6l8qmi9dyAAAAAElFTkSuQmCC);
}
.seat-block .select-block .seats-wrap .wrap.active .seat {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAUVBMVEUAAAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjABKsgAjjABHsAA5ogBAqQAslgAokQBErQA6owCuT/9rAAAAEnRSTlMA8r5NhOPRs3keEQj3vWtqT0wAlaAzAAABGUlEQVRYw+3Yu3KDMBCFYS3iZsB2oiMkwfs/aBKl0EyyZMzKqbx/QUHxzXC6xfxoug/dggejfrhP5q/mkXAyGudj79IDcd/cw217BPrLodchBXeykNAdiHOP6N3pfETPf/WI5J0gnzBy3kQITlQATQx4Q3TCIm4MOGCXgjsGBuywScENHQMucOKwMCBqQPwraK+EXAWYo6v98lrkqsFca8w7sPr8tgbMT78C1jRYnasHv1vRGIJ/HuhBBnD1YDGgoIIKKqigggoqqKCCCir4SmAKUi8kFgwJwlJgwMoKSPDP8zyo3Mt1lXvZ5ou+unLRl38OUU7F8s/hM9sQcl4+XY4aa0plTNl0v8tjyqdjaiGuNWxvDeFU3HQfazZ7bQoGO5kAAAAASUVORK5CYII=);
}
.seat-block .select-block .seats-wrap .wrap.active .seat > .name {
  display: block;
}
.seat-block .select-block .seats-wrap .wrap.active.love .seat {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAVFBMVEUAAAD3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z/jLP3V4z/iLD8daP9f6n5ZJb+ha34X5L4XJCR3rPOAAAAE3RSTlMAvvRN8ITjs3keEQj51cprak9OY3X2yAAAARlJREFUWMPt2MtugzAQhWEbzCVckrRzfAHe/z2bUFWWiqnCmK4y/4LlJ3F2Y/Wr7t7UA16sGJt7p/6qbw0OZtp+37uMQHATvdzkAjBedr0as6eD+Rn1jthfESwdzgZc03/dYrbEyM5oU15n4ImVh+kS4A2BmAXcEmADxwUdmgRYY+KCE+oEOIDYYUiAyAHxr2CpCzzKAtcKXT69CkA2+FOlVAk4S89ywPVrHVAqDUeUD37noJWBPQ+0MAqg80ACBBRQQAEFFFBAAQUUUEAB3wlcPNfzSxL0C5gtfgNmF0EDe55nUcR7+YwcdLzo84oXfXxzCHwqxDeHRx+6wJrlT7dW6E8Vi2PyptsUx+RNl6gCu2qrxTEPlJruCxQdkHeLrlCUAAAAAElFTkSuQmCC);
}
.seat-block .select-block .seats-wrap .wrap[data-status="1"] .seat {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAVFBMVEUAAACzMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSf0QzazMSfZOy/vQjXkPjLENSu1MSfxQjXrQDS9NCm5MyjljUErAAAAEXRSTlMA8r5NhdGzeR4RCPfi42tqTDUQPiwAAAEbSURBVFjD7djLboMwEIVhm2u4JOkcX2Lg/d+zgkayWkwVxumq8y9YfhJnN1Y/6u7NOODFdN3cO/VbfatxMt32x96lBryZAr1YmIwH6suhd8Xs6GRuxvVA7Gt4S6cLHnX6r1vMlhjZGW3K6zQcsXLQXQK8wRMzj1sCbGC4oEGTAEdMXHDCmAAHBC4YMCRAgNgBfwqWhcZaDrili3L1KgD54LNKqQ88jKW1HHD7WvNAqQoYonzwK4NCadj3gRZaAZQPRgMCCiiggAIKKKCAAgoooID/CVwc13NLEnQLmC1uB2YXQQ37Ps9Cx3s5r3gvl9tFn1286OObg+dTHs+qb68ilj9dfBWJFTA50+2KY/KmS1SBXbXX4pgnSk33CZj5ZtQDyuLIAAAAAElFTkSuQmCC);
}
/* 影院厅号*/

.seat-block .hall-name-wrapper {
    position: absolute;
    width: 2rem;
    text-align: center;
    z-index: 10;
}
.animate {
    -webkit-transition: all .3s;
    transition: all .3s;
}
.seat-block .hall-name {
    display: inline-block;
    width: 2rem;
    height: .18rem;
    background: #e3e3e3;
    border-radius: 0 0 30px 30px;
    z-index: 99;
}
.seat-block .hall-name-wrapper {
    position: absolute;
    width: 2rem;
    text-align: center;
    z-index: 10;
}
/* 侧边栏排号 */
.seat-block .select-block .row-nav {
    position: absolute;
    z-index: 2;
    width: 16px;
    font-size: 13px;
    text-align: center;
    top:40px;
    background-color: rgba(0,0,0,.05);
    pointer-events: none;

}
.seat-block .select-block .row-nav div {
    height:62px;
    line-height: 65px;
}

/* 虚线 */
.seat-block .select-block .seats-block .m-line {
    position: absolute;
    height: 100%;
    left:100%;
    z-index: 1;
    border-right: 1px dashed #c3c3c3;
}
/* 选座 -结束 */
</style>
