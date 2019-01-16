<template>
	<div>
		<!-- 区域/品牌/特色 选择 -->
		<div class="nav-wrap filter-nav-wrap">
			<div class="tab mb-line-b">
				<div @click="dealClickIndex(1)" class="item" :class="{chosenTitle:showIndex==1}" data-tab=".region">
					<!-- 朝阳区 -->
					{{showDistrictName}}
					<span class="drop"></span></div>
				<div @click="dealClickIndex(2)" class="item" :class="{chosenTitle:showIndex==2}" data-tab=".brand">
					<!-- 全部 -->
					{{selectBrandId==-1?'品牌':selectBrandName}}
					<span class="drop"></span></div>
				<div @click="dealClickIndex(3)" class="item" :class="{chosenTitle:showIndex==3}" data-tab=".special">{{(tempSelectServiceId==-1 && tempSelectHallTypeId == -1)?'特色':tempSelectServiceName+'/'+tempSelectHallTypeName}}<span class="drop"></span></div>
			</div>
			<div class="close-tab" :style="showIndex>0?'display:block':''">

				<!-- 显示商圈/地铁 -->
				<div v-if="showIndex==1">
					<div class="district-title">
						<div @click="districtType=0" :class="{chosen:districtType==0}">
							商区

						</div>
						<div @click="districtType=1" :class="{chosen:districtType==1}">
							地铁站</div>
					</div>
					<div class="district-content">
						<div v-if="districtType==0">
							<div  class="left-show" v-if="filterCinemas.district">
								<div v-for="(item,index) in filterCinemas.district.subItems" :class="{chosen:selectDistrictId == item.id}"
								 @click="dealSelectDistrict(item,index)" :key="index">
									{{item.name}}({{item.count}})
								</div>
							</div>
							<div class="right-show">
								<div class="item_2" v-for="(item,index) in filterCinemas.district.subItems[selectDistrictIndex].subItems" :class="{chosen:selectAreaId == item.id}"
								 @click="dealSelectArea(item,index)"  :key="index">
									{{item.name}}
								</div>
							</div>
						</div>
						<div v-if="districtType==1">
							<div class="left-show" v-if="filterCinemas.subway">
								<div v-for="(item,index) in filterCinemas.subway.subItems"  :key="index" :class="{chosen:selectLineId == item.id}" @click="dealSelectLine(item,index)">
									{{item.name}}({{item.count}})
								</div>
							</div>
							<div class="right-show">
								<div v-for="(item,index) in filterCinemas.subway.subItems[selectLineIndex].subItems"  :key="index" :class="{chosen:selectStationId == item.id}"
								 @click="dealSelectStation(item,index)">
									{{item.name}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 显示品牌 -->
				<div v-if="showIndex==2">
					<div v-if="filterCinemas.brand != undefined">

						<div  :key="index" class="brand-list" v-for="(item,index) in filterCinemas.brand.subItems" @click="dealSelectBrand(item.id,item.name)" :class="{chosen:item.id == selectBrandId}">
							<span>{{item.name}}</span> <span>{{item.count}}</span> 
						</div>
					</div>
				</div>
				<!-- 显示特色 -->
				<div v-if="showIndex==3">
					<div class="listTap">
						<h4>特色功能</h4>
						<ul class="item-list" v-if="filterCinemas.service != undefined">
							<li  :key="index" class="item_1" v-for="(item,index) in filterCinemas.service.subItems" :class="{chosen:item.id==tempSelectServiceId}" @click="dealSelectService(item.id,item.name)">
								{{item.name}}
							</li>
						</ul>
					</div>
					<br>
					<br>
					<div class="listTap">
						<h4>特殊厅</h4>
						<ul class="item-list" v-if="filterCinemas.hallType != undefined">
							<li  :key="index" class="item_1" v-for="(item,index) in filterCinemas.hallType.subItems" :class="{chosen:item.id==tempSelectHallTypeId}"
							 @click="dealSelectHallType(item.id,item.name)">
								{{item.name}}
							</li>
						</ul>
					</div>
					
					<div class="listTap">
						<button @click="dealReset()">重置</button>
						<button class="confirm-btn" @click="dealConfim()">确认</button>
					</div>
				</div>
			</div>
		</div>

		<div class="blacker" :style="showIndex>0?'display:block':'display:none'"></div>
	</div>
</template>

<script>
	export default {
		name: 't',
		data() {
			return {
				filterCinemas: {},

				//选项卡: 不显示为0, 显示某一个为1,2,3
				showIndex: 0,

				//选择的品牌id
				selectBrandId: -1,
				selectBrandName: "",

				tempSelectServiceId: -1,
				tempSelectServiceName:"",
				tempSelectHallTypeId: -1,
				tempSelectHallTypeName:"",

				selectServiceId: -1,
				selecthallTypeId: -1,

				//区域类型  商圈=0,地铁=1
				districtType: 0,

				selectDistrictId: -1,
				selectDistrictName: "全部",
				selectDistrictIndex: 0,

				selectAreaId: -1,
				selectAreaName: "全部",

				selectLineId: -1,
				selectLineName: "全部",
				selectLineIndex: 0,

				selectStationId: -1,
				selectStationName: "全部",

				//那个地方显示的值....
				showDistrictName: "地区"
			}
		},

		created() {

			this.request.getFilterCinemas({}, (data) => {

				// console.log(data)

				this.filterCinemas = data

			})
		},
		mounted() {

		},
		methods: {
			dealSelectLine(item, index) {
				this.selectLineId = item.id
				this.selectLineIndex = index
				this.selectLineName = item.name
			},
			dealSelectStation(item, index) {
				this.selectStationId = item.id
				this.showIndex = 0
				this.selectStationName = item.name

				if (item.id == -1) {
					this.showDistrictName = this.selectLineName
				} else {
					this.showDistrictName = item.name
				}
			},
			dealSelectDistrict(item, index) {
				this.selectDistrictId = item.id
				this.selectDistrictIndex = index
				this.selectDistrictName = item.name
			},
			dealSelectArea(item, index) {
				this.selectAreaId = item.id
				this.showIndex = 0
				this.selectAreaName = item.name

				//选择全部
				if (item.id == -1) {
					this.showDistrictName = this.selectDistrictName
				} else {
					this.showDistrictName = item.name
				}
			},

			dealConfim() {
				this.selectServiceId = this.tempSelectServiceId
				this.selecthallTypeId = this.tempSelectHallTypeId
				this.showIndex = 0
			},
			dealReset() {
				this.selectServiceId = -1
				this.selecthallTypeId = -1
				this.tempSelectServiceId = -1
				this.tempSelectHallTypeId = -1
			},
			dealSelectBrand(id, name) {
				this.selectBrandId = id
				this.selectBrandName = name

				this.showIndex = 0
			},
			dealSelectService(id, name) {
				this.tempSelectServiceId  = id
				this.tempSelectServiceName = name

				// this.showIndex = 0
			},
			dealSelectHallType(id, name) {
				this.tempSelectHallTypeId  = id
				this.tempSelectHallTypeName = name

				// this.showIndex = 0
			},
			dealClickIndex(index) {
				if (index == this.showIndex) {
					this.showIndex = 0
					return
				}
				this.showIndex = index
			}
		},
		computed: {

		},
		watch: {
			showIndex() {
				if (this.showIndex == 3) {
					this.tempSelectServiceId = this.selectServiceId
					this.tempSelectHallTypeId = this.selecthallTypeId
				}
			}
		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.item_2{
		position: relative;
		height: 40px;
		line-height: 45px;
		padding: 0 0 0 25px;
	}
	.brand-list{
			position: relative;
		line-height: 44px;
		height: 44px;
		padding: 0 15px 0 26px;
		border-bottom: 1px solid #e5e5e5;
		color: #333;
		display: flex;
		justify-content: space-between;
	}
	button{
		display: inline-block;
		height: 34px;
		width: 21.3%;
		margin: 13px 11px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		text-align: center;
		line-height: 34px;
		font-size: 14px;
	}
	button.confirm-btn{
		float: right;
		background: #f03d37;
		border: 1px solid #f03d37;
		color: #fff;
	}
	.item_1.chosen {
		background: #fcf0f0;
		color: #f03d37;
		border: 1px solid #f03d37;
	}
	.item_1 {
		float: left;
		width: 20%;
		height: 20px;
		padding: 3px 35px;
		margin-right:17px;
		margin-top: 10px;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: 	wrap;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size:8px;
	}
	.listTap{
		width: 100%;
	}
	h4{
		margin-left: 12px;
		margin-top: 11px;
		font-size: 15px;
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

	.blacker {
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .3);
	}

	.nav-wrap.filter-nav-wrap {
		z-index: 100;
	}

	.close-tab {
		position: relative;
		width: 100%;
		background: #fff;
		z-index: 100;
		overflow: scroll;
		display: none;
	}

	.close-tab .chosen {
		color: #dd403b;
	}

	.district-title {
		display: flex;
		justify-content: space-around;
		line-height: 40px;
	}

	.district-title>div.chosen {
		color: red;
	}

	.right-show {
		width: 75%;
		height: 300px;
		position: absolute;
		top: 40px;
		right: 0;
		background-color: #eaeaea;
		overflow: hidden;
		overflow-y: scroll;
		color: #000;
	}
	.left-show{
		
		height: 300px;
		overflow: hidden;
		overflow-y: scroll;
	}
</style>
