import api from './api'
import axios from 'axios'

//import api from '@/request/api'
//axios本版本不支持jsonp 自己拓展一个
axios.jsonp = (url) => {
    if(!url){
        console.error('Axios.JSONP 至少需要一个url参数!')
        return;
    }
    return new Promise((resolve,reject) => {
        window.jsonCallBack =(result) => {
            resolve(result)
        }
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=`${url}&callback=jsonCallBack`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        },500)
    })
}


const request = {
	
	//传入经纬度,返回当前城市
	getCurrentCity(lan,lon,success,failure){
		//http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=40.1445387,116.28328359999999&output=json&pois=0
	
		var url = `http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=${lan},${lon}&output=json&pois=0`
	
		axios.jsonp(url).then((res)=>{
			
			var result = res.result
			var cityName = result.addressComponent.city
			
			success(cityName)
			
		}).catch((error)=>{
			failure(error)
		})
	
	},
	// 电影列表
	getMovieOnInfoList(option,success,failure){
		
		var url = api.movieOnInfoListUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	// 最受期待
	getMostExpected(option,success,failure){
		
		var url = api.mostExpectedUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	// 即将上映
	getComingList(option,success,failure){
		
		var url = api.comingListUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	// 城市列表
	getCityList(option,success,failure){
		
		var url = api.cityListUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	// 搜索列表
	getSearchList(option,success,failure){
		
		var url = api.searchUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	
	//影院列表
	getCinemaList(option,success,failure){
		
		var url = api.cinemaListUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	// 影院过滤接口（也就是分类）
	getFilterCinemas(option,success,failure){
		
		var url = api.filterCinemasUrl
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	//请求获取影视详情数据
	getMovieDetailUrl(option,success,failure){
		
		var url = api.movieDetailUrl+"?movieId="+option.id
		
		axios.get(url).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			
		})
	},
	// 请求movieDetialUrl
	//movieDetailUrl
	getMovieDetail(option,success,failure){
		
		var url = api.movieDetailUrl
		
		axios.get(url,{params:option}).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	//movieUrl
	getMovie(option,success,failure){
			
		var url = api.movieUrl

		
		axios.get(url,{params:option}).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	
	//cinemaDetailUrl
	getCinemaDetail(option,success,failure){
				
		var url = api.cinemaDetailUrl

		
		axios.get(url,{params:option}).then( (res) => {
			var rd = res.data
			if(success){
				success(rd)
			}
		}).catch((error)=>{
			failure(error)
		})
	},
	//signupUrl

	postSignup(option, success, failure) {
		var url = api.signupUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //signupCheckUrl
	  postSignupCheck(option, success, failure) {
		var url = api.signupCheckUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //signupSetPasswordUrl
	  postSignupSetPassword(option, success, failure) {
		var url = api.signupSetPasswordUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //userPasswordLoginUrl
	  postUserPasswordLogin(option, success, failure) {
		var url = api.userPasswordLoginUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //mobileLoginCodeUrl
	  postMobileLoginCode(option, success, failure) {
		var url = api.mobileLoginCodeUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //userMobileLoginUrl
	  postUserMobileLoginUrl(option, success, failure) {
		var url = api.userMobileLoginUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
	  },
	
	  //userLogoutUrl
	  postUserLogoutUrl(option, success, failure) {
		var url = api.userLogoutUrl;
	
		var formData = new FormData();
		for (var k in option) {
		  formData.append(k, option[k]);
		}
	
		axios
		  .post(url, formData)
		  .then(res => {
			var rd = res.data;
			if (success) {
			  success(rd);
			}
		  })
		  .catch(error => {
			if (failure) {
			  failure(error);
			}
		  });
		},

		//seatingPlanUrl  选座
		postSeatingPlan(option, success, failure) {
			var url = api.seatingPlanUrl;
	
			var formData = new FormData();
			for (var k in option) {
				formData.append(k, option[k]);
			}
	
			axios
				.post(url, formData)
				.then(res => {
					var rd = res.data;
					if (success) {
						success(rd);
					}
				})
				.catch(error => {
					if (failure) {
						failure(error);
					}
				});
		},
  //createOrderUrl
  postCreateOrder(option, success, failure) {
    var url = api.createOrderUrl;

    var formData = new FormData();
    for (var k in option) {
      formData.append(k, option[k]);
    }

    axios
      .post(url, formData)
      .then(res => {
        var rd = res.data;
        if (success) {
          success(rd);
        }
      })
      .catch(error => {
        if (failure) {
          failure(error);
        }
      });
  },

  //orderInfoUrl
  getOrderInfo(option, success, failure) {
    var url = api.orderInfoUrl;

    axios
      .get(url, { params: option })
      .then(res => {
        var rd = res.data;
        if (success) {
          success(rd);
        }
      })
      .catch(error => {
        if (failure) {
          failure(error);
        }
      });
  },

  //myOrderListUrl
  getMyOrderList(option, success, failure) {
    var url = api.myOrderListUrl;

    axios
      .get(url, { params: option })
      .then(res => {
        var rd = res.data;
        if (success) {
          success(rd);
        }
      })
      .catch(error => {
        if (failure) {
          failure(error);
        }
      });
  }
}

export default request;