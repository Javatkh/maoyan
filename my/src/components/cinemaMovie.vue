<template>
	<div class="body">
		<div class="movie-detail">
			<div class="movie-filter"></div>
			<div class="poster-bg" style="background-image:url(//p1.meituan.net/71.100/movie/a596474c1c29118d908d1eff0fd4293f1017066.jpg)"></div>
			<div @click=" $router.push('/movieDetail')" class="detail box-flex">
				<div class="poster">
					<img :src="detail.detailMovie?detail.detailMovie.img:'' | wh128x180">
				</div>
				<div class="content flex">
					<div class="title middle line-ellipsis">
						<!-- 来电狂响 -->
						{{detail.detailMovie?detail.detailMovie.nm:''}}
					</div>
					<div class="title-en-name line-ellipsis">
						{{detail.detailMovie?detail.detailMovie.enm:''}}
					</div>
					<div class="score line-ellipsis">
						{{detail.detailMovie?detail.detailMovie.sc:''}}
						<span class="snum">({{detail.detailMovie?(detail.detailMovie.snum/10000).toFixed(1):''}}万人评)</span>
					</div>
					<div class="type line-ellipsis">
						<span>{{detail.detailMovie?detail.detailMovie.cat:''}}</span>
						<div class="type-group">
						</div>
					</div>
					<div class="src line-ellipsis">{{detail.detailMovie?detail.detailMovie.src:''}}/{{detail.detailMovie?detail.detailMovie.dur:''}}分钟</div>
					<div class="pubDesc line-ellipsis">{{detail.detailMovie?detail.detailMovie.pubDesc:''}}</div>
				</div>
			</div>

			<div class="arrow-g">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAS5JREFUOBGVkktuwkAMhpOoJ+hhSouE2HbDgiVCNCAOVtQHnINHhbgMJ6g6/f9gR848kmDJeOzxZ3scskzEOfcKXUMLjXXZByYQhJlqMvz3PM//1E9Z7fJoEp5wXvWZoILRZQtg7xVYdhXQzuR2XoEB/NYCOSkVdKI/g441BnuBbmI7aMAE7ilgxyaboYOD4RMO9EWiTwhgJksBLtEvUNolRmGvwJG+yDNsXSB4s2aplR3M4Y80BnuGfiQ7m0Q2qP6JJvaLc/VpTKx5lPe9IfpibviMb+4lOXYXyGLRsRPgSTsSpASdW8Av+YQ3Er+NzgIuELdvZMcAZIUaBsgpCA55IZIEeV+NLSC32hskXCTAH9xFRyWkUsgSrhqAJfjpL8fch0dMMIGWMkmYEIn8Az5Wgp5LHlhmAAAAAElFTkSuQmCC">
			</div>




		</div>

		<!-- 显示日期 -->
		<div id="showDays" :class="headerFixed?'issFixed':''">
			<ul id="timeline" class="mb-line-b" v-if="movie.showDays">

				<li data-day="2019-01-08" class="showDay" :key="index" v-for="(item,index) in movie.showDays.dates" :class="{chosen:selectDayIndex==index}"
				 @click="dealClickDay(item,index)">
					{{item.date}}
				</li>
			</ul>
		</div>

		<!-- 显示区域/品牌/特色 -->
		<div class="filter-tap" :class="headerFixed?'isFixed':''">
			<filterCinemas></filterCinemas>
		</div>
		

		<div class="cinema-list cinema" >
			<div class="list-wrap" v-if="movie.cinemas">

				<!-- 一个影院 -->
				<div   @click="dealBuyTicket" class="item mb-line-b" data-id="24295" :key="index" data-bid="dp_wx_home_cinema_list" v-for="(item,index) in movie.cinemas">

					<div class="title-block box-flex middle">
						<div class="title line-ellipsis">
							<span>{{item.nm}}</span>

							<span class="price-block">
								<span class="price">45</span><span class="q">元起</span>
							</span>

						</div>
						<div class="location-block box-flex">
							<div class="flex line-ellipsis">大兴区开羊路18号院1号楼3层明星时代影城</div>

							<div class="distance">8.6km</div>
						</div>
						<div class="flex"></div>
						<div class="label-block">
							<div class="snack">小吃</div>
							<div class="vipTag">折扣卡</div>

						</div>
						<div class="discount-block">
							<div>
								<div class="discount-label normal card">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
									 alt="">
								</div>
								<div class="discount-label-text">开卡特惠，首单2张立减2元</div>
							</div>
						</div>
					</div>

					<div class="min-show-block  disabled  J-fload" data-bid="dp_wx_buy_cinema_list_spread">
						<span>近期场次：</span>
						<span class="time-line">21:55</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import filterCinemas from './common/filterCinemas'

	export default {
		name: 't',
		data() {
			return {
				detail: {},
				movie: {},
				selectDayIndex: 0,
				
				cinemas:[],

				headerFixed:0
			}
		},

		created() {

			//顶部
			//顶部电影信息使用接口  movieDetailUrl
			//有一个参数 movieId=1240159

			//中间-地区/品牌/特色 - 使用昨天组件filterCinemas

			//几天/影院
			//使用接口: movieUrl
			//	日期使用{showDays}
			//影院使用  {cinemas:}	
			// console.log(this.$route.params.name)
			// 设置nav名字
			this.$store.commit("setNavTitle", this.$route.params.name)
			// 拿到路由传进来的值
			var id = this.$route.params.id
			
			this.request.getMovieDetail({
				movieId: id
			}, (data) => {
				this.detail = data
			})

			//现在时间
			var now = new Date();
			var day = now.Format("yyyy-MM-dd")
			// console.log(day)
			
			var cityId = this.$store.getters.getSelectCity.id
			
			this.request.getMovie({
				movieId: id,
				day: day,
				cityId: cityId
			}, (data) => {
				this.movie = data
				this.cinemas = data.cinemas
			})


			// 隐藏底栏
			this.$store.commit("setIsShowTabbar", false);

		},
		destroyed(){
			// 显示标签栏
            this.$store.commit("setIsShowTabbar", true);
		},
		mounted() {
			// 吸顶
			// 监听dom渲染完成
			this.$nextTick(function(){
				// 这里fixedHeaderRoot是吸顶元素的ID
				let header = document.querySelector(".filter-tap");
				// 这里要得到top的距离和元素自身的高度
				this.offsetTop = header.offsetTop;
				this.offsetHeight = header.offsetHeight;
			});
			// handleScroll为页面滚动的监听回调
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed(){
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			dealClickDay(item, index) {

				console.log(index)

				this.selectDayIndex = index

				var box = document.getElementById("timeline")

				this.$nextTick(() => {
					var selectItem = document.querySelector(".showDay.chosen")
					box.scrollLeft = selectItem.offsetLeft - box.clientWidth / 3
				})

			},
			handleScroll(){
				// 得到页面滚动的距离
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				// 判断页面滚动的距离是否大于吸顶元素的位置
				this.headerFixed = scrollTop > (this.offsetTop - this.offsetHeight * 2);
			},
			// 跳转页面
			dealBuyTicket(){
				if(!this.$store.getters.getIsLogin){
					this.$router.push("/login");
					return;
				}
				this.$router.push("/seatingPlan")
			}
		},
		computed: {

		},
		watch: {

		},
		components: {
			filterCinemas
		}
	}
</script>

<style scoped>
.isFixed{
	position: fixed;
	top:45px;
	left: 0;
	right: 0;
	z-index: 4;
}	
.issFixed{
	position: fixed;
	top:0px;
	left: 0;
	right: 0;
	z-index: 4;
}
</style>
