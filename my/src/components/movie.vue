<template>
	<div class="">
		<div class="body" style="display: block;">

			<!-- tobar -->
			<div class="topbar">
				<div class="white-bg topbar-bg ">

					<!-- 城市选择  跳转到城市列表页-->  
					<div @click="$router.push('/cityList')" class="city-entry">
						<!-- 拿到store中的城市信息 -->
						<span class="city-name">{{$store.getters.getSelectCity.nm}}</span>
						<i class="city-entry-arrow"></i>
					</div>

					<!-- 热门切换  按钮下面的红色横线由showIndex确定-->
					<div class="switch-hot" :data-active="showIndex==1?'.n-hot':'.f-hot'">
						<!-- 点击按钮改变按钮样式以及showIndex值 -->
						<div @click="showIndex=1" class="hot-item " :class="{active:showIndex==1}" data-tab=".n-hot">正在热映</div>
						<div @click="showIndex=2" class="hot-item " :class="{active:showIndex==2}" data-tab=".f-hot">即将上映</div>
					</div>

					<!-- 搜索按钮 -->
					<div @click="$router.push('/search')" class="search-entry search-icon" data-type="movie"></div>

				</div>
			</div>


			<section class="movie" style="height: 224px;">

				<div class="page-wrap">

					<div class="tab-block">
						<div  class="tab-content">
							<!-- 首先显示正在热映 -->
							<div v-if="showIndex==1" class="page active n-hot">
								<div class="list-wrap">
									<!-- 遍历数据 -->
									<div @click="$router.push('/cinemaMovie/'+item.id+'/'+item.nm)" v-for="(item,index) in list" :key="index" class="item" data-id="1240159" data-bid="dp_wx_home_movie_list">
										<div class="main-block">

											<!-- 左侧图片 -->
											<div class="avatar" sort-flag="">
												<div class="default-img-bg">
													<img :src="item.img|wh128x180" onerror="this.style.visibility='hidden'">
												</div>
											</div>

											<!-- 右侧信息 - 购票 -->
											<div v-if="item.showst==3" class="mb-outline-b content-wrapper">
												<div class="column content">
													<div class="box-flex movie-title">
														<div class="title line-ellipsis ">{{item.nm}}</div>
													</div>
													<div class="detail column">
														<div class="score line-ellipsis">
															<span class="score-suffix">观众评 </span>
															<span class="grade">{{item.sc}}</span>
														</div>
														<div class="actor line-ellipsis">主演: {{item.star}}</div>
														<div class="show-info line-ellipsis">{{item.showInfo}}</div>

													</div>
												</div>

												<div class="button-block" data-id="1240159">
													<div class="btn normal"><span class="fix" data-bid="dp_wx_home_movie_btn">购票</span></div>
												</div>

											</div>
											<!-- 右侧信息 - 预售 -->
											<div v-if="item.showst==4" class="mb-outline-b content-wrapper">
												<div class="column content">
													<div class="box-flex movie-title">
														<div class="title line-ellipsis ">{{item.nm}}</div>
													</div>
													<div class="detail column">
														<div class="score line-ellipsis">
															
															<span class="grade">{{item.wish}}</span>
															<span class="score-suffix">人想看 </span>
														</div>
														<div class="actor line-ellipsis">主演: {{item.star}}</div>
														<div class="show-info line-ellipsis">{{item.showInfo}}</div>

													</div>
												</div>

												<div class="button-block" data-id="1240159">
													<div class="btn pre"><span class="fix" data-bid="dp_wx_home_movie_btn">预售</span></div>
												</div>

											</div>
											
											
										</div>
									</div>


								</div>


							</div>
							<!-- 显示即将上映 -->
							<div v-if="showIndex==2" class="page active f-hot">
								<div class="list-wrap">
									
									<!-- 最受期待 -->
									<div class="most-expected">
										<p class="title">近期最受期待</p>
										<div class="most-expected-list">
											<div v-for="(item,index) in mostExpected" :key="index" class="expected-item" data-id="344869">
												<div class="poster default-img-bg">
													<img :src="item.img|wh128x180" onerror="this.style.visibility='hidden'">
													<span class="wish-bg"></span>
													<span class="wish"><span class="wish-num">{{item.wish}}</span>人想看</span>
													<div class="toggle-wish" data-wishst="0" data-movieid="344869">
														<span></span>
													</div>
												</div>
												<h5 class="name line-ellipsis">{{item.nm}}</h5>
												<p class="date">{{item.rt}}</p>
											</div>
									</div>
									</div>
									
									<!-- 即将上映 -->
									<div class="coming-list">
										<div>
											
											<div v-for="(item,index) in comingList" :key="index" class="item" data-id="1206875" data-bid="dp_wx_home_movie_list">
												<div class="main-block">
													<div class="avatar" sort-flag="">
														
														<div class="default-img-bg">
															<img :src="item.img|wh128x180" onerror="this.style.visibility='hidden'">		
														</div>
													</div> 
													
													<!-- 即将上映 - 预售 -->
													<div v-if="item.showst==4" class="mb-outline-b content-wrapper">
									
														<div class="column content">
															<div class="box-flex movie-title">
																<div class="title line-ellipsis v3dimax_title">{{item.nm}}</div>
																
																	<span class="version v3d imax"></span>
															</div>

															<div class="detail column">
															
																		<div class="wantsee line-ellipsis">
																			<span class="person">{{item.wish}}</span>
																			<span class="p-suffix">人想看</span>
																		</div>							
																	<div class="actor line-ellipsis">主演: {{item.star}}</div>

																	<div class="actor line-ellipsis">{{item.comingTitle}}</div>

															</div>
														</div>

														<div class="button-block" data-id="1206875">
															<div class="btn pre" data-id="1206875"><span class="fix" data-bid="dp_wx_home_movie_btn">预售</span></div>

														</div>
													</div>
													<!-- 即将上映 - 想看 -->
													<div v-if="item.showst==1" class="mb-outline-b content-wrapper">
									
														<div class="column content">
															<div class="box-flex movie-title">
																<div class="title line-ellipsis v3dimax_title">{{item.nm}}</div>
																
																	<span class="version v3d imax"></span>
															</div>

															<div class="detail column">
															
																		<div class="wantsee line-ellipsis">
																			<span class="person">{{item.wish}}</span>
																			<span class="p-suffix">人想看</span>
																		</div>							
																	<div class="actor line-ellipsis">主演: {{item.star}}</div>
																	<div class="actor line-ellipsis">{{item.comingTitle}}</div>
															</div>
														</div>
														<div class="button-block" data-id="1206875">
															<div class="btn toggle-wish-btn" data-id="1206875" data-wishst="0"><span class="fix" data-bid="dp_wx_home_movie_btn">想看</span></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'movie',
		data() {
			return {
				
				// 选项卡切换
				showIndex:1,
				
				// 正在热映
				list:[],
				// 即将上映
				comingList:[],
				// 近期最受期待
				mostExpected:[]
				
			}
		},

		created() {
			this.$store.commit("setTabIndex",0)
			// 显示标签栏
			this.$store.commit("setIsShowTabbar", true);
			// nav名称
			this.$store.commit("setNavTitle","猫眼电影")
			// 标签栏返回箭头
			this.$store.commit("setIsShowTabbarReturn",false)

			//下载数据
			this.request.getMovieOnInfoList({},(data)=>{
				console.log(data)
				
				this.list = data.movieList
			})

		
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
			// 监听，如果点击即将上映后再去下载数据
			showIndex(){
				if(this.showIndex == 2){
					//console.log("2222")
					
					this.request.getComingList({},(data)=>{
						//console.log(data)
						this.comingList = data.coming
					})
					
					this.request.getMostExpected({},(data)=>{
						//console.log(data)
						this.mostExpected = data.coming
					})
				}
			}
		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* topbar */
	.topbar {
		border-bottom: 1px solid #e6e6e6;
		height: 44px
	}

	.topbar-bg {
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		height: 44px;
		-webkit-box-pack: justify;
		justify-content: space-between
	}

	/* 城市选择 */
	.city-entry {
		padding-left: 15px;
		font-size: 15px;
		color: #666;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center
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
		margin-top: 5px
	}

	.city-entry .city-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 70px;
		max-width: 19.2vw
	}

	/* 热门切换 */
	.switch-hot {
		display: -webkit-box;
		display: flex;
		height: 44px;
		line-height: 44px;
		position: relative
	}

	.switch-hot .hot-item {
		font-size: 15px;
		color: #666;
		width: 80px;
		width: 21.33333vw;
		text-align: center;
		margin: 0 12px;
		font-weight: 700
	}

	.switch-hot .hot-item.active {
		color: #ef4238
	}

	.switch-hot:after {
		content: "";
		display: block;
		position: absolute;
		bottom: -1px;
		width: 80px;
		width: 21.33333vw;
		height: 2px;
		background-color: #ef4238;
		-webkit-transition: left .2s;
		transition: left .2s
	}

	.switch-hot[data-active=".n-hot"]:after {
		left: 12px;
		left: 3.2vw
	}

	.switch-hot[data-active=".f-hot"]:after {
		right: 12px;
		right: 3.2vw
	}

	/* 搜索按钮 */
	.search-icon {
    width:20px;
    height:20px;
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABC1JREFUWAntWEtrU1EQPpO+ArYm1Y1I3VRXgu5EoSpVQaxCxUVxYTeCv8CtoFVxW0F/gBsLiguxoBaxWHyLS0EEdWWobrRprZC+cpzv3NyTOfeR3DS3duOF5M6ZMzPflzmvOVHq/9NcBqhRdz001D43UziktR5k35382ao1bUUcIj3NL3w+EtH4xu6eZ3Tv3iL6VvskJjh/vH/Lcql0UZM6o7TamAiQ1BxpNdaazV7pfDT1I5FPwKguQT0w0FFcLF5QSp9nYhsC/smapP5wfkfz7flr9PjxQjInz6omQZO1hdJ9rdW+RoLG2RKpt60d2VONZDOW4PyRA7uX9NJDBuuJACzwhHuQ0ZmHPNe+dm1qxbxTv38t83zU28tUPqG0Phnn25ah451P33yIiBtSRRJE5pZKpfchAKJp0vpSbvO2Wzz5V0LRhIIXU8vsz29nNdFlJmsWkegutGWze5JkMkQQc252cWYqYljH850twzT+6rcAqivqwb6u4vzKbTbEqrcPhjvX3t1fb05mrEdFwIIIkSN1I3/w2KlGySEkfOCrVOamxAKGt/ikNiw7GTRDu1D6Elit44bcyEg57J5co0dGMsXnE/fZo5pJXt1tHdkdtYbaySD2OYcczzkzrE2Sw88gjoFYvLjMgjI/jbctg2ka0V+WIE4IswkLOyyI1QyrCOGIiIWYUglMYEudlC1BHF+BE6KA1SqN05ArMQs2Fp9KBtsqXMESrJyt1V7e5+ptJVXj5JKJybGlRwhbdFqCrMPBbx9swraRshAR28GWcJKgs5nihJCGacoRsR1siWUJ+iWT3+kfX347zXcwdhBbYlmCUrkOso7DtAQrxaa1w8FvGykLwdiM/T0OwhJkg+oGyg1UJXFOzeojYjvYMr4k+FF2mJJJKlKUI2I72BLKEsQdQnagnkPJ5OhSaJiYXq1oo4WwbQ+XGL6MC47iO4Tf5ncP6jnRTkWsxKwWwYxpsGOiW4K4feGCI+1QbKKek7pmZMQyBawIAkxgC5UjWoLQ4vbFWeQLTuXhShjFJkolX7Xatym3ULjK6pqxDGaNoA6wV5fRaMB+sPhi4nozJL1a8IlbCxoQGq1VC8LEKVih+Icl/2cu+Xc1XPLDAVdD5loticCcK+Hin/Kn4uF955KsbtjAFj7wNRGcL+qdW5wFTs0nlEHfeg2vnT4EF9e0QoqGc5Ov71hlQIglCLs1uLh/5lnVyyeJ3V9Bkne7M/nJV3cD3EzTWSRBA0xgXA35p151VnfQsF4bOwPHwJwDGY+U5+SRLY8Vj/SdjgpTM4PSwWQzpT+PPDLlsSSZTEzQJ8uTP5W/35KSbJigTzSNdxxJamnpyz15+Q4YNedgGiRqxfAWRnhO6pWy3ZbWlSDIR5EkpV/4P2xdh9gngffs0f17kTmQy02+mZB9/+VmMvAXE7/38O8tTYkAAAAASUVORK5CYII=) 10px no-repeat;
    background-size:20px;
    padding:10px 15px 10px 10px
	}



	.page-wrap {
		position: absolute;
		width: 105%;
		height: 78%;
		overflow: auto;

	}

	.page.active {
		display: block;
	}

	/* 每个电影 */
	.tab-content .list-wrap {
		background-color: #f5f5f5;

	}

	.tab-content .list-wrap .item {
		padding-left: 15px;
		background-color: #fff;

		min-height: 114px;
	}

	.tab-content .list-wrap .item .main-block {
		position: relative;
		width: 100%;
	}

	.tab-content .list-wrap .item .avatar {
		width: 64px;
		height: 90px;
		position: relative;
		margin-top: 12px;
		float: left;
	}

	.default-img-bg {
		background-color: #e1e1e1;
		background-size: 100% 100%;
	}


	/* 右侧 */
	.tab-content .list-wrap .item .content-wrapper {
		padding: 12px 14px 12px 0;
		margin-left: 74px;
		height: 90px;
		max-height: 90px;
		position: relative;
	}

	.tab-content .list-wrap .item .content {
		padding-right: 5px;
		margin-right: 48px;
		overflow: hidden;
	}

	.tab-content .list-wrap .item .movie-title {
		max-height: 24px;
		margin-bottom: 7px;
		line-height: 24px;
		overflow: hidden;
	}

	.box-flex {
		display: -webkit-box;
		display: flex;
	}

	.tab-content .list-wrap .item .name,
	.tab-content .list-wrap .item .title {
		font-size: 17px;
		color: #333;
		font-weight: 700;
		padding-right: 5px;
		flex-shrink: 1;
	}

	.line-ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.tab-content .list-wrap .item .detail {
		box-sizing: border-box;
		line-height: 1;
		overflow: hidden;
	}

	.tab-content .list-wrap .item .detail .actor,
	.tab-content .list-wrap .item .detail .score,
	.tab-content .list-wrap .item .detail .show-date,
	.tab-content .list-wrap .item .detail .show-info {
		font-size: 13px;
		color: #666;
	}

	.line-ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.tab-content .list-wrap .item .detail .actor,
	.tab-content .list-wrap .item .detail .score,
	.tab-content .list-wrap .item .detail .show-date,
	.tab-content .list-wrap .item .detail .show-info {
		font-size: 13px;
		color: #666;
	}

	.tab-content .list-wrap .item .detail .score .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}

	.tab-content .list-wrap .item .detail>div+div {
		margin-top: 6px;
		line-height: 15px;
	}


	.tab-content .list-wrap .item .button-block {
		font-size: 12px;
		position: absolute;
		right: 14px;
		top: 0;
		bottom: 0;
		height: 27px;
		margin: auto;
	}

	.tab-content .list-wrap .item .button-block .btn {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		box-sizing: border-box;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 12px;
		cursor: pointer;
	}
	
	.tab-content .list-wrap .item .button-block .btn.pre {
    background-color: #3c9fe6;
	}
	
	/* 最受期待 */
	.tab-content .list-wrap .most-expected {
    padding:12px 0 12px 15px;
    background-color:#fff;
    margin-bottom:10px
}
.tab-content .list-wrap .most-expected .title {
    margin:0 0 12px;
    font-size:14px;
    color:#333
}
.tab-content .list-wrap .most-expected-list {
    overflow:scroll;
    white-space:nowrap
}
.tab-content .list-wrap .expected-item {
    display:inline-block;
    width:85px;
    overflow:hidden;
    margin-right:10px
}
.tab-content .list-wrap .expected-item .poster {
    width:85px;
    height:115px;
    position:relative;
    margin-bottom:6px
}
.tab-content .list-wrap .expected-item .poster img {
    height:100%
}
.tab-content .list-wrap .expected-item .poster .wish-bg {
    display:inline-block;
    width:100%;
    height:35px;
    position:absolute;
    bottom:0;
    background-image:-webkit-linear-gradient(top, rgba(77, 77, 77, 0), #000);
    background-image:linear-gradient(-180deg, rgba(77, 77, 77, 0), #000)
}
.tab-content .list-wrap .expected-item .poster .wish {
    position:absolute;
    left:4px;
    bottom:2px;
    color:#faaf00;
    font-size:11px;
    font-weight:600
}
.tab-content .list-wrap .expected-item .poster .toggle-wish {
    width:28px;
    line-height:28px;
    background:rgba(61, 63, 71, .6);
    text-align:center;
    border-bottom-right-radius:10px;
    position:absolute;
    top:0;
    left:0
}
.tab-content .list-wrap .expected-item .poster .toggle-wish[data-wishst="1"] span {
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAABDBJREFUWAnVmE1oVFcUgM+58xIzZJzJohjRWrR1URei4E8yykwmxkypdlUMFPEHcWHRpUHdKFl0oWIXLVQUhKK4KBiyUySimcwYk9QGLApGxB/UKBHRTBxJjG/e7TlveOPLy5t/rde7mHvPuefny8kZ5t6LkGdIKfF105ogzZsAZVACzEfAOTS/QJCPafumB8VfvnXRGHZ0GHlCgezoEKkr3ZG0NH5ClEsl4AIE+EKCfE7zCEjsR8TO2b3XeKYU7oNs3Ucy3LABAH8l2G/dLWxaxBEU8kAgNnjWps0uk5GGLdLAwyDl/Kwyx4JghwHk3kB88IKbyQxgGY3WJifHz1DwH90c8uvwchVUba1NJJ6x3ZvWtfPeTabPEEBLfj+XXcSuQI1/G3Z3v7HvTgNOtTTU61NwngxW2I1KWVPL3Kuepa1jn6m3+hX6l39Tir/Ddkirho2+y4Ojlj4LLNvaqsdHHyeoBVZbm+XP+CjjK78qP0bGk1rkb3/9ghCeOzfFGmEFfD366PcPA8sRGbRyWDMSFZDZLE6zwmORtSshrV+3lErOHm1VXazvH7PCaOi/KAlpg7IYMRkJLpZp465tT91llWexAMPYqC7hdDLU0z9QS+B309UqSxjlHl6oMqKDbZGQEuY6lMqKzCoQwassoQOMWanC8qlDr6zIrIJ++z8bYKrwiADEIWVLOhNsSBBx10y9mhpErUvQbeEqldo8v6qJmaFixtnNrX2Zw084uAukcUJlYEDxc128/6R5+AnUf3mKevmWssDEZjISYPYAn4qsWa4bRoKuRj6lwBFTmhAhX+zaDeYyK8wLVqDANjrh6yyrMJiFmSxYZsoCsxCI9V+km0I7r9UYsj3D9J5mGjCr6Xr9G/XJofcmn2ZF1T3ILM7s2R52boyFGo9Qtfc59f+PjEfrEgP73XLlBGbjZLjxD/r93u3m+LF0VNnjgfjAnlzx8wITLI43Bf+keXuuAB9ST7Cn/b39O2jO+VQ1o4ftAOxIbwI7Sddp13+kdSfnygfLefMCswE9YKQDS5ZtpkCub11sU+ng2GYOylUoVt6WsDvLSKQmaUxcAAnNdn3Fa4SegPBuwFhssphYRQNzMIL2jRsTl+iq0lhM8EI2dKAZ8AtvK8GmCtla+yUBsxNB11Gle6jSy60gZc0IN6iyzQQ7Vop/wR52BuMEntrqKPXdsHOvWJl8b5sxSoTl+CVX2ILKvP3qCZK/tnRFzverarRQ7aW+sq5mZQMz3EQ4vOgtTPEJr+DLuvnHIDyZJTDkjQ08NOUyPkpuCXsObzz+QHg8LXSRfW7Xu63ZRni09ZXActyKgDmAv6fvjkfTotRdr1h2H/iKbdjWfb94bcXAnMrXc/Vf1OB7quJLZ2rW8R7bOPfKkSvqYWdC/iLqk/oxqnZTZk/2ajVae7lfMGd8lv8DidRU804Sf28AAAAASUVORK5CYII=)
}
.tab-content .list-wrap .expected-item .poster .toggle-wish[data-wishst="0"] span {
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAAAytJREFUWAnVmLtrFFEUh3cWFAtRE5FEEUREsFAkooUIgl3+CUEU7LVR1LBIMERCLFLZRG1CrFJYpLBQENRGC4n4wBeKRUQ2PlAQX+v3m70z7MzemZ3HZp05cPbce86553w7O7Mzc51KjDQaDYfwDvSAseux69Cv6Ef0LXoHXXAc5y82UqhVJbgLPYhuQTega9DPaB19ht6VpVYDaxUBWYUGewkcQzdbE4LOJabXaHQ76G7OqHWI0RG0v+mJ/XxPdJpaD2xZbcAUX0XiSXS/bUEH3yPil2imL1Chln6RE+huzVPKffJV60frugAwDfoI1tBtrUkpx4vknzVrLmAHU65vTX/F5DzQnzynDwzsCpwX0e1eMIfV+S3ReZpXXlDgFNC/VEgXgifHGXQDVvUE2g1Y1RKT2FxxgTm6cg4bXxHNsGH0j/DhIlKGmFzGKuSbCAyFgkWcDsG6UaeE/m/LIvsEvKcstGIV8ECJgAcErJtFWaRPwCvLQitWAbv3/ZJALwlYj3ZlkbqA9YBRFnkp4HtloRWrgJ+g/uNbgeHF+LTKY5tebWYLDOqhzYpVR1hyE33njor5ITYxNp/WIP/DeBINvI4ooQAipknD6D9eVnC8JjCOxr799vgLiGXcsLmtvVPCnRB4yGDanRTjQ2/PYvIlACwvCTcwM37G/xvMGJYAQRuwoiRex8wFMns7mTMMbV2twMpiwVXMfNuK5XfMm97WTpHAJvsy9pZ15fI41Us9IyUWmG+qPa4ptBe3b/WYMj2zAWsVBfQfPYEGrlbFuiiqPWF6xZaNPcLeSgr9ZjyGLni+LlrVHDM9OpZNBKwqFPyJGUWfa94lUa1RUztRSX9vLVE2SewNrMboaG9NuiYi7w3+M8B+i4hb3amBVQXotRjdxpPsHWtJWLQHfBrYL+FAp3kmYBUFWnu/2u1Mu03wgTXajaxjU0tmYHUCehAj6H7NE4ggBSvoTJL4orNVp/Eifm1eJ/lplXMuD6wYcgGrAAA6H0fQ75pHiGIjJjciJZk7N7DaAKIrvobarnj5aiaHYT7JdQ6HW5sL8Sj+nSb2GHsF2EwXWLi+5v8ArR6xIZ+h44wAAAAASUVORK5CYII=)
}
.tab-content .list-wrap .expected-item .poster .toggle-wish span {
    display:inline-block;
    width:10px;
    height:10px;
    background-size:100%;
    background-repeat:no-repeat
}
.tab-content .list-wrap .expected-item .name {
    margin:0 0 3px;
    font-size:13px;
    color:#222
}
.tab-content .list-wrap .expected-item .date {
    margin:0;
    font-size:12px;
    color:#999
}
.tab-content .list-wrap .item .button-block .btn.toggle-wish-btn[data-wishst="0"] {
    background-color: #faaf00;
    border: none;
    color: #fff;
}

.tab-content .list-wrap .item .detail .wantsee .person {
    color: #faaf00;
    font-size: 15px;
    font-weight: 600;
}
</style>
