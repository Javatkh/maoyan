<template>
    <div class="resetreq">
        <div id="tips"></div>
        <div class="tabShows" v-show="steps==0">
            <form id="postForm" method="post">
                <dl class="list">
                    <dd>
                        <dl>
                            <dd class="dd-padding">
                                <input placeholder="手机/邮箱/用户名" name="user" class="input-weak" value>
                            </dd>
                            <dd
                                class="dd-padding kv-line-r captcha"
                                data-com="captcha"
                                captcha-src="/account/appcaptcha?uuid=328B83DC724E744AC8488A31E79D5D5E6385695A55FBCC44E763D091ECEF014C"
                            >
                                <input
                                    class="input-weak kv-k"
                                    type="text"
                                    placeholder="请输入右图验证码"
                                    value
                                    name="captcha"
                                >
                                <span class="refresh kv-v">
                                    <img
                                        alt="加载中……"
                                        style="width:70px;
			height: 30px;"
                                        src="https://i.meituan.com/account/appcaptcha?uuid=328B83DC724E744AC8488A31E79D5D5E6385695A55FBCC44E763D091ECEF014C"
                                    >
                                    <a class="btn btn-weak">换一张</a>
                                </span>
                            </dd>
                        </dl>
                    </dd>
                </dl>
                <div class="btn-wrapper">
                    <button type="button" @click="steps=1" class="btn btn-block btn-larger">下一步</button>
                </div>
                <div class="to-tel">
                    <a href="tel:10107888">手机号无法接收短信？</a>
                </div>
            </form>
        </div>

        <div class="tabShows" v-show="steps==1">
            <dl class="list">
                <dd class="dd-padding">
                    <ol class="crumbs">
                        <li class="active">选择验证方式</li>
                        <li>安全验证</li>
                        <li>找回登录密码</li>
                    </ol>
                </dd>
            </dl>
            <dl class="list ops">
                <dd class="dd-padding kv-line-r">
                    <div class="kv-k">短信</div>
                    <div class="btn btn-weak opItem" @click="steps=2" index="0" gaevent="imt/risk2/valid/type_0">立即验证</div>
                </dd>
            </dl>
        </div>
        <div class="tabShows" v-show="steps==2">
            <dl class="list">
                <dd class="dd-padding">
                    <ol class="crumbs">
                        <li class="active">选择验证方式</li>
                        <li class="active">安全验证</li>
                        <li>找回登录密码</li>
                    </ol>
                </dd>
            </dl>
            <dl class="list ops">
                <dd class="dd-padding kv-line-r">
                    <dl class="kv-line-r-w">
                        <dd
                            class="kv-line-r dd-padding"
                            data-com="smsBtn"
                            data-requrl="https://i.meituan.com/risk2/sendsms"
                        >
                            <input
                                type="tel"
                                name="mobile"
                                disabled="disabled"
                                class="input-weak kv-k"
                                value="187*****659"
                            >
                            <button type="button" class="btn btn-weak kv-v kv-v-h">发送验证码</button>
                        </dd>
                        <dd class="dd-padding">
                            <input
                                class="input-weak J_input_sms"
                                name="verifycode"
                                type="tel"
                                pattern="[0-9]+"
                                placeholder="请输入手机短信中的验证码"
                                disabled="true"
                            >
                        </dd>
                    </dl>
                </dd>
            </dl>
            <div class="btn-wrapper">
                <button
                    type="button"
                    gaevent="imt/account/risk2/verifybtn"
                    class="btn btn-block btn-larger J-verify-btn verify-btn"
                    
										 @click="steps=3"
                >验证</button>
            </div>
        </div>
        <div class="tabShows" v-show="steps==3">
            <div id="setPasswordForm" method="post">
                <dl class="list">
                    <dd>
                        <dl>
                            <dd class="dd-padding">
                                <input
                                    type="password"
                                    name="password"
                                    class="input-weak"
                                    placeholder="设置账户密码"
                                    autocomplete="off"
                                >
                            </dd>
                            <dd class="dd-padding">
                                <input
                                    type="password"
                                    name="password2"
                                    class="input-weak"
                                    placeholder="再次确认密码(密码长度在8-32个字符之间)"
                                    autocomplete="off"
                                >
                            </dd>
                        </dl>
                    </dd>
                </dl>
                <div class="btn-wrapper">
                    <button @click="$router.push('/login')" type="button" class="btn btn-larger btn-block">重置登录密码</button>
                </div>
                <p class="ex-tips">备注：密码长度8位及以上，需包含（数字、大写字母、小写字母、特殊字符）其中2种及以上组合</p>
            </div>
        </div>
        <footer>
            <div class="copyright">
                <span class="copyright">
                    © 猫眼电影 客服电话：
                    <a data-evt="ft/hotline" href="tel:4006705335">400-670-5335</a>
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "resetreq",
    data() {
        return {
            steps: 0
        };
    },
    created() {
				this.$store.commit("setNavTitle", "找回密码");
    },
    mounted() {},
    methods: {},
    watch: {},
    components: {},
    computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tips {
    display: none;
    font-size: 0.26rem;
    background-color: #fff6e0;
    color: #d78900;
    border-bottom: 1px solid #ffebc8;
    text-align: center;
    padding: 0.2rem;
    line-height: 1.4;
}
dl.list:first-child {
    margin: 0;
    border-top: 0;
}
.kv-line-r-w{
	width:100%;
}
dl.list {
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    margin-top: 0.2rem;
    margin-bottom: 0;
    background-color: #fff;
}
dl.list dt:last-child,
dl.list dd:last-of-type {
    border-bottom: 0;
}

dl.list dd dl {
    margin: 0;
    margin-bottom: -1px;
    padding-left: 0.2rem;
    border: 0;
}

dl.list dd dl {
    margin: 0;
    margin-bottom: -1px;
    padding-left: 0.2rem;
    border: 0;
}
dl.list dd dl > .dd-padding,
dl.list dd dl dd > .react,
dl.list dd dl > dt {
    padding-left: 0;
}
dl.list .dd-padding,
dl.list dt,
dl.list dd > .react {
    padding: .28rem .2rem;
}

dl.list dd > .input-weak {
    width: 100%;
    display: block;
}
input.input-weak,
textarea.input-weak {
    border: 0;
    height: 40px;
    margin: -0.15rem 0;
    text-indent: 0.3rem;
    line-height: 40px;
    font-size: inherit;
    border-radius: 0.06rem;
    padding: 0;
    outline: 0;
}

.kv-line-r {
    display: -webkit-box;
    display: -ms-flexbox;
    margin: 0.2rem 0;
}
dl.list dt:last-child,
dl.list dd:last-of-type {
    border-bottom: 0;
}

.kv-line-r>h6, .kv-line-r>.kv-k {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    font-size: inherit;
    font-weight: 400;
    margin-right: .2rem;
    display: block;
}
.kv-v-h{
	line-height: 0.4rem;
	height:0.4rem;
}
img {
    vertical-align: middle;
    border: 0;
    display: inline-block;
}

.btn {
    display: inline-block;
    margin: 0;
    text-align: center;
    height: .8rem;
    padding: 0 .32rem;
    border-radius: .06rem;
    color: #fff;
    border: 0;
    background-color: #df2d2d;
    font-size: .28rem;
    vertical-align: middle;
    line-height: .8rem;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-user-select: none;
}
a {
    color: #df2d2d;
    text-decoration: none;
    outline: 0;
    display: inline-block;
}
.btn-larger {
    height: .94rem;
    line-height: .94rem;
    font-size: .4rem;
}

.btn-block {
    display: block;
    width: 96%;
    margin: 0 auto;
}
.captcha .btn {
    margin-top: -.15rem;
    margin-bottom: -.15rem;
    margin-left: .2rem;
}

.btn-weak {
    border: .02rem solid #df2d2d;
    padding: 0 .3rem;
    background: 0;
    color: #df2d2d;
}
dl.list dd>.btn {
    margin-top: -.15rem;
    margin-bottom: -.15rem;
}
.to-tel {
    font-size: 0.28rem;
    color: #06c1ae;
    text-align: center;
    margin-top: 0.33rem;
}
footer {
    margin-top: 0.33rem;
    padding: 0 0.2rem 0.4rem;
    /* background-color: #f8f8f8; */
}
.copyright {
    text-align: center;
    font-size: 0.33rem;
}
.kv-line-r > .kv-v,
.kv-line-r > p {
    display: block;
}

dl.list dt,
dl.list dd {
    margin: 0;
    border-bottom: 1px solid #d6d6d6;
    overflow: hidden;
    font-size: inherit;
    font-weight: 400;
    position: relative;
}
dl.list dt,
dl.list dd {
    margin: 0;
    border-bottom: 1px solid #d6d6d6;
    overflow: hidden;
    font-size: inherit;
    font-weight: 400;
    position: relative;
}
ol.crumbs {
    list-style: none;
    padding-left: 0;
    text-align: center;
		margin: 0;
}
ol.crumbs li.active {
    color: #df2d2d;
}
ol.crumbs li {
    display: inline-block;
    text-align: center;
    position: relative;

}
ol.crumbs li + li {
    margin-left: 0.32rem;
    position: relative;
}

ol.crumbs li + li:before {
    content: ">";

    position: absolute;
    left: -0.3rem;
    font-weight: bolder;
    color: #aaa;
}
.btn-wrapper{
	margin-top:0.3rem;
}


.ex-tips{
	padding:0 20px;
}
</style>
