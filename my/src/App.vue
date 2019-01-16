<template>
  <div id="app">
    
	<!-- 所有页面共用一个navbar -->
	<navbar></navbar>
	
    <router-view/>
	
	<!-- 所有页面共用一个tabbar -->
	<tabbar></tabbar>
	
  
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style> 
  @import "./../static/myfont/font.css";
.cinema-list .list-wrap .title-block .label-block div.snack, .cinema-list .list-wrap .title-block .label-block div.vipTag {
  color: #f90;
  border: 1px solid #f90;
}
.cinema-list .list-wrap .title-block .label-block>div {
    position: relative;
    display: inline-block;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size:12px;
}

</style>
