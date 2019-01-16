<template>
	<div class="search-wrapper">

		<!-- 搜索输入框 -->
		<div class="search-header">
			<div class="input-wrapper">
				<img class="search-icon" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/search.png" alt="">
				<input @blur="dealBlur" @change="dealBlur" v-model="kw" class="search-input" type="text" placeholder="搜电影、搜影院">
				<img class="del-input" style="display:none" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/close.png" alt="">
			</div>
			<div class="cancel">取消</div>
		</div>

		<div class="search-history">

			<div v-for="(item,index) in movie" :key="index" class="history-item" :data-index="index">
				<span class="history-icon"></span>
				<span class="word one-line">{{item}}</span>
				<div @click="dealDelItem(index)" class="del-word"></div>
			</div>
			<div class="hot-search" style="display: none;">
                <h3>热门搜索</h3>
                <div class="hot-movies-wrap">
                </div>
            </div>

            <div class="search-result" style="">
                <div class="result-wrapper">
                    <div class="result">
                        <h3>电影/电视剧/综艺</h3>
                        <div class="list">
                            <div v-for="(item,index) in movieList" :key="index" class="movie cell" data-id="344649">
                                <img class="poster" src="https://p1.meituan.net/128.180/movie/19efcfbf1a98c02cb5efd69a2edf766e2421917.jpg" alt="">
                                <div class="info">
                                    <div class="name-score">
                                        <p class="name">
                                            <span class="one-line">{{item.nm}}</span>
                                            <span class="version v2d imax"></span>
                                        </p>
                                        <span class="score">
                                            <span class="num">6.8</span>分
                                        </span>
                                    </div>
                                    <div data-v-4ad41bb8 class="detail-section">
                                        <div data-v-4ad41bb8 class="detail-items">
                                            <p class="ename one-line">Airpocalypse</p>
                                            <p class="catogary">剧情,喜剧,奇幻</p>
                                            <p class="release">2018-12-21</p>
                                        </div>
                                        <div data-v-4ad41bb8 class="buy-btn sale" data-id="344649">购票</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 这里是预售 -->
                            <!-- <div class="movie cell" data-id="1229697">
                                <img class="poster" src="https://p1.meituan.net/128.180/movie/5e8ddac4b2fc796cc3037d66d6e709ad395098.jpg" alt="">
                                <div class="info">
                                    <div class="name-score">
                                        <p class="name">
                                            <span class="one-line">四个春天</span>
                                            <span class="version "></span>
                                        </p>
                                        <span class="wish">
                                            <span class="num">6953</span>人想看
                                        </span>
                                    </div>
                                    <div class="detail-section">
                                        <div class="detail-items">
                                            <p class="ename one-line">Four Springs</p>
                                            <p class="catogary">家庭,纪录片</p>
                                            <p class="release">2019-01-04</p>
                                        </div>
                                        <div class="buy-btn presale" data-id="1229697">预售</div>
                                    </div>
                                </div>
                            </div> -->

                        </div>
                        <div class="more-result" data-target="movies" data-total="9182">查看全部9182部影视剧</div>
                    </div>
                    <div class="result">
                        <h3>影院</h3>
                        <div class="list">
                            <div v-for="(item,index) in cinemasList" :key="index" class="cinema cell" data-id="10901">
                                <div class="info">
                                    <p class="name-price">
                                        <span class="name one-line">{{item.nm}}</span>
                                        <span class="sell-price">
                                            <span class="price">19.9</span>
                                            元起
                                        </span>
                                    </p>
                                    <p class="address one-line">偃师市民主路35号（市政府西隔壁/三联商场对面）</p>
                                    <p class="feature-tags">
                                        <span>座</span>
                                        <span>改签</span>
                                        <span class="featrue">小吃</span>
                                        <span class="featrue">折扣卡</span>
                                    </p>
                                </div>
                                <div class="distance">81.8km</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				//历史搜索
				movie:[],
				// input框中内容
				kw:"",
				movieList:[],
				cinemasList:[]

			}
		},

		created() {
			this.$store.commit("setNavTitle", "搜索")
			
			//加载历史记录
			this.loadHistory()

			//下载数据
			this.request.getSearchList({},(data)=>{
				console.log(data)
				
				this.movieList = data.movies.list
				this.cinemasList = data.cinemas.list
            })
            
            
            // 加载历史信息
            var history = `{"movie":[],"cinema":[]}`
            if(!localStorage.search){
                localStorage.setItem("search",history)
            }
		},
		mounted() {

		},
		methods: {
			// 在缓存中删除对应节点的信息
			dealDelItem(index){
				console.log("index="+index)
				this.movie.splice(index,1)
				
				var history = JSON.parse(localStorage.search);
				history.movie = this.movie
				localStorage.search = JSON.stringify(history)
			},
			dealBlur(){
				console.log("dealBlur")
				
				var kw = this.kw;
				// 若内容为空 则不处理
				if(kw == ""){
					return 
				}
				if(localStorage.search){
                    var history = JSON.parse(localStorage.search);
                    var movie = history.movie
                    
                    // 插入到缓存数据的最前面
                    movie.unshift(kw)
                    localStorage.search = JSON.stringify(history)
                }
			},
			// 加载历史数据放在movie数组中
			loadHistory(){
                if(localStorage.search){

                    var history = JSON.parse(localStorage.search);
                    var movie = history.movie
                    var cinema = history.cinema
                    this.movie = movie
                }
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
	.search-wrapper {
		background-color: #f5f5f5;
		height: 100vh;
		overflow-y: scroll;
	}

	.search-header {
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		padding: 8px 0 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
		z-index: 1;
	}

	.search-header .input-wrapper {
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		-webkit-box-flex: 1;
		flex-grow: 1;
	}

	.search-header .search-icon {
		width: 15px;
		height: 15px;
		margin-right: 6px;
		float: left;
		position: relative;
		top: 6px;
	}

	.search-header .search-input {
		-webkit-box-flex: 1;
		flex: 1;
		border: none;
		font-size: 13px;
		color: #333;
		line-height: 20px;
		padding: 4px 0;
		width: calc(100% - 40px);
	}

	.search-header .del-input {
		width: 15px;
		height: 15px;
		float: right;
		top: 6px;
	}


	.search-header .cancel {
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		font-size: 16px;
		color: #f03d37;
	}


	.search-history {
		background-color: #fff;
	}

	.search-history .history-item {
		margin-left: 15px;
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
		line-height: 44px;
		-webkit-box-align: center;
		align-items: center;
	}

	.search-history .history-item .history-icon {
		width: 15px;
		height: 15px;
		margin-right: 10px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAVFBMVEUAAACrq6u2traqqqqrq6utra2vr6+qqqqqqqqrq6urq6urq6urq6usrKyqqqqrq6urq6urq6urq6urq6uqqqqsrKyrq6uqqqqvr6+qqqqrq6uqqqqL2Pn/AAAAG3RSTlMA7gf3nBcL5NSxqHFJNN/IwoWDeWNQTyQgNumZiWHTAAABnklEQVRIx5SS2xKDIAxEIwJVQGu91vb//7PdyEynigL74DjiSZZNKKjVyq4tyrJoO2kbSpOYTfH+U2FmEccGT+3YIYKOt/eJbuMF5ir/V1lbtygh1OJsXfqPlTvjHt6WnDTRT3qS3v4jiOl6a9brwFm/ta0DZ8/NplQUlJKb3eeBe3ECFzNrOLfXjtTc767oQurOPf/d8v2MiMzY8D0PeRqKyuyydexTxEHBbn/zrJCLogQpJFSR14gyDSWpwb+j748qkhIl4U4QNGBfDkZROWgWOzRwQyxiT6kg9VhntJzxotNBjUazn42kdJCknzkKTDngBItEK6LROaBGPCtZXr8ckBfbsmObB1pOpcPy5YFY7Y7a73PJA5fvUcuhqjxQcayISOSBAoP4dF4GJwDDQAzrAh2g+y/ap0BwGKR/IOR8tnMfFD54X1X4qvfjCD/OPQ7hcSCAgQWA5AaWHCIfSOQvazXQWrHIGy8y1rHBOjCric0Ke9xgj9mQawTU0MkxV4O1RnkuD7mu9ILUK1kvgb129qLbq3Uv8/v78D0AP8WcS0GTLxhaAAAAAElFTkSuQmCC) no-repeat;
		background-size: contain;
		display: inline-block;
		-webkit-box-flex: 0;
		flex: 0 0 auto;
	}

	.search-history .history-item .word {
		color: #333;
		font-size: 15px;
		-webkit-box-flex: 1;
		flex: 1 1 auto;
		display: inline-block;
	}

	.one-line {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.search-history .history-item .del-word {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAASFJREFUKBV9kj2OwjAQhWPTkwppL0ADXZIGutVKHICODglWVLtUXIIOuIBvshfIj4SUKhdAossBEt7LMsFEmJGcmWTeZ09mrOI4PiqlRliLIAiu3huD9hfpNbRzTaiu66+qqv7SNB24uCRJdsgdoB/D+wQXCHKssQsmhM330FbQrcIwTBQCjycRIoyVa60/pewXkIHGa0AGr2CcsuycZKiltSBfbBhlXQB9WOUZasSeQH4kDOB8h+DqbRRFJwHEawnEQ8jyeBIhbrzhZpIX/wTajQC0hcjZ7Ra0IQArlsfuuuDmH7sQ5mQANGY3DB/aUSkkfjBDXjsZrvlHHs8u7Pv+VAP6fgcR52Wwyy7LcuJlWTZEqeFjf3dUFEUfF32GxvVumtjRa2eCUPQAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: 15px;
		background-size: 10px;
		-webkit-align-self: center;
		align-self: center;
		padding: 17px 15px;
		width: 10px;
		height: 10px;
		-webkit-box-flex: 0;
		flex: 0 0 auto;
	}
.hot-search {
    padding:0 0 8px 15px;
    background-color:#fff;
    top:-1px
}
.hot-search h3 {
    border-top:1px solid #e5e5e5;
    padding-top:17px;
    font-size:15px;
    color:#666
}
.hot-search .hot-movies-wrap {
    margin-top:15px;
    padding-right:15px;
    overflow:hidden
}
.hot-search .hot-movies-wrap .hot-movie {
    float:left;
    padding:6px 12px;
    margin:0 12px 12px 0;
    background-color:#f5f5f5;
    border-radius:4px;
    font-size:12px;
    color:#333
}
.result-list {
    padding-left:15px;
    height:100%;
    overflow:auto;
    -webkit-overflow-scrolling:touch
}
.result {
    margin-bottom:10px;
    background-color:#fff;
}

.result .everyone-search {
    color:#999;
    font-size:13px;
    padding:6px 15px;
    background-color:#f5f5f5
}
.result .everyone-search+.list {
    border-top:none
}
.result .no-related-result {
    color:#999
}
.result h3 {
    font-size:15px;
    color:#999;
    padding:9px 15px
}
.result .list {
    padding-left:15px;
    border-top:1px solid #e6e6e6
}
.result .cell, .result .list {
    border-bottom:1px solid #e6e6e6
}
.result .cell:last-child {
    border-bottom:none
}
.result .more-result {
    color:#ef4238
}
.result .more-result, .result .no-related-result {
    text-align: center;
    line-height: 44px;
    height: 44px;
    font-size: 15px;
}
.result .movie {
    padding:12px 0;
    min-height:90px
}
.result .movie .name-score {
    font-size:16px;
    color:#222;
    display:-webkit-box;
    display:flex;
    -webkit-box-pack:justify;
    justify-content:space-between;
    margin-bottom:2px
}
.result .movie .name-score .name {
    display:-webkit-box;
    display:flex;
    -webkit-box-align:center;
    align-items:center;
    -webkit-box-flex:1;
    flex-grow:1;
    max-height:24px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis
}
.result .movie .name-score .name .one-line {
    display:inline-block;
    font-weight:700;
    font-size:17px
}
.version.v2d.imax{
    width: 43px;
    background-image:url(data:image/png;base64,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);
}
.version {
    background-size: contain;
    background-repeat: no-repeat;
    height: 14px;
    margin-left: 5px;
    display: inline-block;
}
.result .movie .name-score .score, .result .movie .name-score .wish {
    color:#fa0;
    font-size:10px;
    flex-shrink:0;
    padding-left:5px
}
.result .movie .name-score .num {
    font-size:16px
}
.result .movie .name-score .no-score {
    font-size:14px;
    color:#666;
    flex-shrink:0
}
.result .movie .detail-section .detail-items {
    -webkit-box-flex:1;
    flex-grow:1;
    overflow:hidden;
    padding-right:10px;
    margin-right:48px;
    min-height:27px
}
.result .movie .detail-section .catogary, .result .movie .detail-section .ename, .result .movie .detail-section .release {
    font-size:13px;
    color:#666;
    margin-top:2px
}

.result .movie .detail-section .sale {
    background-color:#ef4238
}
.result .movie .detail-section .presale {
    background-color:#3c9fe6
}
.result .movie .detail-section .btn, .result .movie .detail-section{
	position: relative;
}
.result .movie .detail-section .btn, .result .movie .detail-section .buy-btn {
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    align-self: flex-end;
    flex-shrink: 0;
    width: 48px;
    text-align: center;
    height: 27px;
    line-height: 27px;
    right: 0;
    position: absolute;
    top: -80px;
    bottom: 0;
    right: 10px;
    margin: auto;
}

.result .movie .detail-section .toggle-wish-btn[data-wishst="0"] {
    background-color:#faaf00;
    border:none;
    color:#fff
}
.result .movie .detail-section .toggle-wish-btn[data-wishst="1"] {
    background-color:#fff;
    border:1px solid #eaeaea;
    color:#666
}
.result .movie .poster {
    background-color:#eee;
    width:64px;
    height:90px;
    float:left;
    margin-right:10px
}
.result .movie .info {
    margin-right:15px;
    margin-top:1px
}
.result .cinema {
    display:-webkit-box;
    display:flex;
    -webkit-box-align:center;
    align-items:center;
    -webkit-box-pack:justify;
    justify-content:space-between;
    padding:15px 15px 15px 0
}
.result .cinema .info {
    -webkit-box-flex:1;
    flex:1;
    overflow:hidden
}
.result .cinema .name-price {
    font-size:16px;
    color:#000;
    margin-bottom:6px;
    display:-webkit-box;
    display:flex
}
.result .cinema .sell-price {
    font-size:11px;
    color:#999;
    white-space:nowrap;
    margin-left:10px
}
.result .cinema .price {
    font-size:17px;
    color:#ef4238
}
.result .cinema .address {
    font-size:13px;
    color:#999
}
.result .cinema .feature-tags {
    margin-top:7px
}
.result .cinema .feature-tags span {
    display:block;
    border:1px solid #589daf;
    color:#589daf;
    position:relative;
    display:inline-block;
    padding:0 3px;
    height:15px;
    line-height:15px;
    border-radius:2px;
    font-size:6px;
}
.result .cinema .feature-tags span.featrue {
    color:#f90;
    border-color:#f90
}
.result .cinema .distance {
    font-size:13px;
    color:#999
}
</style>
