<template>
  <!-- 腾讯地图 -->
  <div>
      <div id="container" style="width:375px;height:620px;"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  created(){

    this.$store.commit("setNavTitle", "地图")
    // 隐藏标签栏
	this.$store.commit("setIsShowTabbar",false);
  },
  mounted(){
			 this.init();
  },
  methods:{
    init() {
        //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
        //设置地图中心点
        var myLatlng = new qq.maps.LatLng(39.90354,116.464388);
        //定义工厂模式函数
        var myOptions = {
            zoom:15,               //设置地图缩放级别
            center: myLatlng,      //设置中心点样式
            mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
        }
        //获取dom元素添加地图信息
        var map = new qq.maps.Map(document.getElementById("container"), myOptions);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
