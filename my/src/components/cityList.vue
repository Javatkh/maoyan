<template>
	<section class="city-list-container">

		<!-- 定位城市 -->
		<section>
			<div id="locate" class="city-title">
				定位城市
			</div>
			<div class="city-list city-list-inline clearfix">
				<div class="location-city" >
					
					<span v-if="locationState==1">
						正在定位...
					</span>
					<!-- 定位完成 -->
					<span v-if="locationState==2" @click="dealSelectCity($event)" :data-nm="locationCity.nm" :data-id="locationCity.id">
						{{locationCity.nm}}
					</span>
					<!-- 定位失败，请点击重试 -->
					<span v-if="locationState==3">
						定位失败，请点击重试
					</span>
					
				</div>
		
			</div>
		</section>

		<!-- 最近访问城市 -->
		<section class="history-city-list">
			<div id="history" class="city-title">
				最近访问城市
			</div>
			<div class="city-list city-list-inline clearfix">

				<div class="city-item" data-nm="广州" data-id="20">
					广州
				</div>

				<div class="city-item" data-nm="北京" data-id="1">
					北京
				</div>

				<div class="city-item" data-nm="上海" data-id="10">
					上海
				</div>

			</div>
		</section>

		<!-- 热门城市 -->
		<section>
			<div id="hot" class="city-title">
				热门城市
			</div>
			<div class="city-list city-list-inline clearfix">

				<div v-for="(item,index) in hot" @click="dealSelectCity($event)" :key="index" class="city-item" :data-nm="item.nm" :data-id="item.id">
					{{item.nm}}
				</div>


			</div>
		</section>

		<!-- 城市列表(分组) -->
		<section>

			<div v-for="(item,index) in group" :key="index" v-if="item.list.length>0" >
				<div :id="item.big" class="city-title city-title-letter">
					{{item.big}}
				</div>
				<div  class="city-list city-list-block clearfix">

					<div class="city-item" v-for="(city,index) in item.list" :key="index" @click="dealSelectCity($event)"  :data-nm="city.nm" :data-id="city.id">
						{{city.nm}}
					</div>
				</div>

			</div>

			<!-- <div id="B" class="city-title city-title-letter">
				B
			</div>
			<div class="city-list city-list-block clearfix">
				<div class="city-item" data-nm="北京" data-id="1">
					北京
				</div>
				<div class="city-item" data-nm="保定" data-id="84">
					保定
				</div>
			</div>
			-->
		</section>

		<!-- nav -->
		<section class="nav">
			<div @click="dealClickIndex($event)" class="  nav-item" data-id="locate">
				定位
			</div>

			<div @click="dealClickIndex($event)" class="  nav-item" data-id="history">
				最近
			</div>

			<div @click="dealClickIndex($event)" class="  nav-item" data-id="hot">
				热门
			</div>

			<div @click="dealClickIndex($event)" v-for="(item,index) in group"  v-if="item.list.length>0" :key="index" class="nav-letter  nav-item" :data-id="item.big">
				{{item.big}}
			</div>

		</section>


	</section>
</template>

<script>
	export default {
		name: 't',
		data() {
			return {
				// 列表
				list: [],
				// 热门城市
				hot: [],

				//分组城市   格式如下
				/*
					[
						{
							big:"A",
							small:"a",
							list:[
								{
									id:00,
									nm:"阿拉善盟",
									py:"alasshameng"
								}
							]
							
						}
						
					]
				*/
				group: [],
				
				// 定位响应数据
				locationState:1,
				// 对象
				locationCity:{}

			}
		},

		created() {

			// 下载数据
			this.request.getCityList({}, (data) => {
				console.log(data)

				this.hot = data.hot

				// 城市列表
				var list = data.cts;
				this.list = list
				
				this.hot = data.hot

				//分组
				var group = []
				//添加A-Z 26个小分组
				for (var i = 0; i < 26; i++) {
					//传入字符的ascil码,返回这个字符  第一个是A  得到A-Z的组
					var c = String.fromCharCode(65 + i).toString()
					//console.log(c)
					var dict = {
						"big": c,
						"list": []
					}
					group.push(dict)
					//console.log("a")
				}
				// console.log(group)

				//处理每个城市
				for (var i = 0; i < list.length; i++) {

					var city = list[i]
					//console.log(city.nm)
					//console.log(city.py)
					//console.log(city.py.charAt(0))
					//console.log(city.py.charAt(0).charCodeAt())
					// 得到拼音的第一个字母  转成ascil码 - 97就是下标  a = 97  所以a对应的就是组里面第一组数据
					var index = city.py.charAt(0).charCodeAt() - 97
					//console.log(index)
					// 在group组里面每个对象里面添加一个list分组，把对应的城市加进去
					group[index].list.push(city)

				}
				//console.log(group)
				this.group = group
				
				
				// 调用定位
				this.startLocation()

			})
			
			
			

		},
		mounted() {

		},
		methods: {
			startLocation(){
				if (navigator.geolocation)
				{
					
					// console.log("开始定位")
					navigator.geolocation.getCurrentPosition((position)=>{
						var lan = position.coords.latitude
						var lon = position.coords.longitude
						// console.log("lan = "+lan)
						// console.log("lon = "+lon)
						
						//lan = 40.1445387
						//lon = 116.28328359999999
						
						this.request.getCurrentCity(lan,lon,(cityName)=>{
							// console.log("cityName="+cityName)

							// 获取城市名字最后一个字
							var lastChar = cityName.charAt(cityName.length-1)
							// console.log(lastChar)
							if(lastChar == "市"){
								// 字符串截取，把最后一个字符截取掉
								cityName = cityName.substr(0,cityName.length-1);
								// console.log("cityName="+cityName)
								
								//根据城市名找id
								for(var city of this.list){
									if(city.nm == cityName){
										// 状态改成2  也就是显示当前城市
										this.locationState = 2
										// 把城市信息放在locationCity对象中
										this.locationCity = city
										// console.log("isLocation = true")
									}
								}
						
							}
						},(error)=>{
							console.log("定位失败 error="+error)
							this.locationState = 3
						})
					});
				}else{
					console.log("环境不支持定位")
					this.locationState = 3
				}
			},

			// 选择城市
			dealSelectCity(event){
				var id = event.target.dataset.id
				var nm = event.target.dataset.nm
				// console.log(id)
				// console.log(nm)
				var city = {
					id:id,
					nm:nm
				}
				//存储到localStore  作为其他页面用
				this.$store.commit("setSelectCity",city)
				var saveData = {
					expire_data:Date.now().toString(),
					data:city
				}
				// 放在缓存里
				localStorage.Maoyan_cityConfirm = JSON.stringify(saveData)
				// 跳转
				this.$router.push("/movie")
			},

			// 锚点跳转
			dealClickIndex(event){
				var id = event.target.dataset.id
				console.log("id = "+id)
				
				//根据id的值, 得到对应的分组的标题标签
				var tag = document.getElementById(id)
				console.log("top="+tag.offsetTop)
				
				var container = document.querySelector(".city-list-container")
				container.scrollTop = tag.offsetTop
			}
		},
		computed: {

		},
		watch: {

		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.city-list-container {
		display: none;
		background-color: #ebebeb;
		font-size: 14px;
		color: #333;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 1000;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.city-list-container {
		display: block;
	}

	.city-title {
		padding-left: 15px;
		line-height: 30px;
	}

	.city-list-inline {
		background-color: #f5f5f5;
		padding-bottom: 8px;
	}

	.city-list {
		padding-right: 30px;
	}

	.city-list-inline .location-city {
		width: auto;
		min-width: 30%;
		padding: 0 20px;
	}

	.city-list-inline .city-item,
	.city-list-inline .location-city {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 4%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.city-list-inline .location-city {
		width: auto;
		min-width: 30%;
		padding: 0 20px;
	}

	.city-list-block {
		background-color: #f5f5f5;
	}

	.city-list-block .city-item {
		height: 44px;
		line-height: 44px;
		margin-left: 15px;
		border-bottom: 1px solid #c8c7cc;
	}

	.city-list-block .city-item:last-child {
		border-bottom: none;
	}

	.nav {
		position: fixed;
		top: 75px;
		top: 11vh;
		right: 0;
		width: 35px;
		z-index: 10;
		text-align: center;
		font-size: 12px;
	}

	.nav .nav-item {
		height: 16px;
		height: 2.8vh;
	}
</style>
