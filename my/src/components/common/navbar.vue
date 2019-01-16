<template>
	
  <header class="navbar  ">
    <div v-if="$store.getters.getIsShowTabbarReturn" class="nav-wrap-left">
        <a class="back" href="#" onclick="javascript: window.history.back();return false;"><i class="icon-back"></i></a>
    </div>
    <h1 class="nav-header">
		{{$store.getters.getNavTitle}}
	</h1>
  </header>
	
</template>

<script>
export default {
  name: 't',
  data () {
    return {
    }
  },
	
	created(){
		
	},
	mounted(){
		
	},
	methods:{
		
	},
	computed:{
		
	},
	watch:{
		
	},
	components:{
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
