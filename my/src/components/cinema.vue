<template>
	<div class="body" >
	<!-- <div class="body"> -->

		<!-- 搜索框 -->
		<section class="topbar" style="">
			<div class="gray-bg topbar-bg ">
				<div class="city-entry">
					<span class="city-name">{{$store.getters.getSelectCity.nm}}</span><i class="city-entry-arrow"></i>
				</div>
				<div class="search-entry search-input" data-type="cinema">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwFJREFUSA3FVs1qU0EUTibBRQiCRF3UB3BTcFHwJ0XRJ+gDhDaQ5vcJ3PgCfYL80AYSyQP4BIKQiosuhLoQXOjCbqQIJUgoyY3fdzNnmCRzk3uvBQfmzrlzzvm+OTNzz7mJxH9qyTC83W733mQyeTKbzbbQc8lk8hL9Ip1OfyqVSr/CYCzbBBKDQHU6nX2MZfQ8HNWyM949LOAU/bharb7F6DlsnFNOYhDmp9NpGx7bTi/35HkqlaphAadu9eLsCjFIS57nNRHlLct0AnmIiL5ivETPQf8Q4y56Gt1v0F8rpRog78pc0LhATFJEemIZXwHoKJvNNguFwm9r3hcHg8Gd0WjUwEJfY+K26BH54SZyQ8ztBcB7K9IzAO01Go2fAhg0NpvNB9C9Q9+hjY781bpt9y8MyBTP1CZFpC/CkJKIdrSHyMUmiKPxXBeSJvOb2mq1DiDLRbqCvFer1f7QIGzT9nuwpz/bNnZxfy6uPv0VYWvKouKZho1UfGTUkR/JOyI3uDIno2JygMEzPTHhRRJlnFH78yvglueJ78JRzEhQyFkMXbfX5Rg0p/2HWi/4K+YKq9qSWf2dymvs0cax8W1AEuesCSaHm2gGZwnfYCuszhhh1l6EMYohGJwlfANF4gt5w+qYBv+52Tg2vg2sWNowIVVll2nQNogqa3/mcDZP48/frKdiPcWqpKKkmXstfWRR+/uFg7hB9VpSpikMTPg690YmpR/834gjiI9FXh79IoEzUUibn6GUtHnG3Bslbbbb7QxIfwDjriY5r9frj0Aux7jALSnTYxGH0bXW7gDkQ9jIdaRfLFLCfEefUXA1UxapvKl6bBF1EXUZAa0sYIFYyBFt7D8QHBu/kuebyFeINXnsf65KpfIR94WXqrSO3ElMB33hDrBNh5DX/mVCf4It7ctFwntyE3kgsbXaRL/fvz8ejx8DMPR/9SbyUMT2IqLIa8mjAMWxdZB/y2QyT80/cRzQMD78lNDKOHOa84fwZbFYtCtiGJj4Noy81+uZcvkXH+aXwmK6+EsAAAAASUVORK5CYII=">
					<span>搜影院</span>
				</div>
			</div>

		</section>


		<div class="cinema singleton page active">
			<div class="page-wrap">

				<filterCinemas></filterCinemas>
			
			</div>
		</div>
		<div class="cinema-list" data-cid="c_5ovvtlp2" style="margin-bottom: 55px;">
			<div class="list-wrap" style="margin-top: 0px; min-height: 528px;">
				<div v-for="(item,index) in cinemas" class="item mb-line-b" data-id="24963" :key="index" data-bid="dp_wx_home_cinema_list">
					<div class="title-block box-flex middle" @click="$router.push('/shows/'+item.id+'/'+item.nm)">
						<div class="title line-ellipsis">
							<span>{{item.nm}}</span>
							<span class="price-block">
								<span class="price">{{item.sellPrice}}</span><span class="q">元起</span>
							</span>
						</div>
						<div class="location-block box-flex">
							<div class="flex line-ellipsis">{{item.addr}}</div>
							<div class="distance">{{item.distance}}</div>
						</div>
						<div class="flex"></div>
						<div class="label-block">
							<div class="allowRefund">退</div>
							<div class="endorse">改签</div>
							<div class="snack">小吃</div>
							<div class="vipTag">{{item.tag.vipTag}}</div>
						</div>
						<div class="discount-block">
							<div>
								<div class="discount-label normal card">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
									alt="">
								</div>
								<div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="more"></div>
		</div>

	</div>
</template>

<script>
	import filterCinemas from './common/filterCinemas'
	
	export default {
		name: 'cinema',
		data() {
			return {
				cinemas: [],
			}
		},
		created() {
			this.$store.commit("setTabIndex",1)
			this.$store.commit("setNavTitle", "影院")
			this.request.getCinemaList({}, (data) => {
				this.cinemas = data.cinemas
				// console.log(this.cinemas)
			})

			// 标签栏返回箭头
			this.$store.commit("setIsShowTabbarReturn",false)
			console.log(this.$store.getIsShowTabbarReturn)
		},
		destroyed() {
			// vue销毁前显示标签栏返回箭头
			this.$store.commit("setIsShowTabbarReturn",true)
		},
		mounted() {

		},
		methods: {
			
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.body{
		overflow-y: hidden
	}
	.page.active {
		display: block;
	}
	
	.topbar {
		border-bottom: 1px solid #e6e6e6;
		height: 44px;
	}

	.gray-bg {
		background: #f5f5f5;
	}

	.topbar-bg {
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		height: 44px;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.city-entry {
		padding-left: 15px;
		font-size: 15px;
		color: #666;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.city-entry .city-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 70px;
		max-width: 19.2vw;
	}

	.city-entry {
		padding-left: 15px;
		font-size: 15px;
		color: #666;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.city-entry-arrow {
		margin-right: 5px;
		width: 0;
		height: 0;
		border: 4px solid #b0b0b0;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		display: inline-block;
		margin-left: 4px;
		margin-top: 5px;
	}

	.topbar .search-input {
		-webkit-box-flex: 1;
		flex-grow: 1;
	}

	.search-input {
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		height: 28px;
		font-size: 13px;
		color: #b2b2b2;
		margin-left: 18px;
		border: .5px solid #e6e6e6;
		border-radius: 5px;
		margin-right: 15px;
	}

	.search-input,
	.white-bg {
		background-color: #fff;
	}

	.search-input img {
		width: 14px;
		height: 14px;
		margin-left: 3px;
		margin-right: 4px;
	}
	.cinema-list{
		width: 105%;
		height: 481px;
	}
	.cinema-list .item{
		margin-top: -5px;
	}
	.cinema-list .list-wrap .title-block .label-block{
		height: 30px;
	}
	.cinema-list .list-wrap .title-block .label-block>div{
		font-size: 12px;
	}
	.discount-block{
		margin-top: -10px;
	}
	.close-tab .tab-content .page.special #special-content .item-list .item {
		float: left;
		width: 21.3%;
		height: 30px;
		padding: 3px 0;
		margin-right: 3%;
		margin-top: 10px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 12px;
	}
</style>
