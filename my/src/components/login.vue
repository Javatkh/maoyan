<template>
  <div class="body">
    <div id="tips" :class="{showTop:isShowTop==true}">账号或密码错误，是否
      <router-link to="/resetreq">找回密码</router-link>?
    </div>
    <div id="login">
      <dl class="list">
        <dd class="nav">
          <ul class="taba taban samfix noslide" data-com="tab">
            <li
              @click="loginWayIndex=1"
              tab-target="normal-login-form"
              gaevent="imt/login/tab/normal"
            >
              <a class="react" :class="{active:loginWayIndex==1}">美团账号登录</a>
            </li>
            <li
              @click="loginWayIndex=2"
              tab-target="quick-login-form"
              gaevent="imt/login/quickBuy/"
            >
              <a class="react" :class="{active:loginWayIndex==2}">手机验证登录</a>
            </li>
            <div style="width: 40%;left: 20px;" class="slide" :class="{move:loginWayIndex==2}"></div>
          </ul>
        </dd>
      </dl>
      <div
        v-if="loginWayIndex==1"
        id="normal-login-form"
        action="//i.meituan.com/account/login2"
        autocomplete="off"
        method="post"
        style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
      >
        <dl class="list list-in">
          <dd class="visibale">
            <dl>
              <dd class="dd-padding kv-line-r">
                <img
                  class="login-icon"
                  src="https://ms0.meituan.com/touch/img/account/login/icon_login_user@2x.png"
                >
                <input
                  v-model="mobile"
                  id="username"
                  class="input-weak J-login-name J-input J-account"
                  type="text"
                  placeholder="账户名/手机号/Email"
                  name="email"
                  @focus="isShowTop=false"
                >
                <div class="to-del J-to-del" style="display: none"></div>
              </dd>
              <ul class="tel-select J-select-user J-select" style="display: none"></ul>
              <dd class="dd-padding kv-line-r">
                <img
                  class="login-icon"
                  src="https://ms0.meituan.com/touch/img/account/login/icon_login_password@2x.png"
                >
                <input
                  v-model="password"
                  id="password"
                  class="input-weak J-input"
                  type="password"
                  placeholder="请输入您的密码"
                  name="password"
                  @focus="isShowTop=false"
                >
                <div class="to-del J-to-del" style="display: none"></div>
              </dd>
            </dl>
          </dd>
        </dl>

        <div class="btn-wrapper">
          <button
            @click="dealPasswordLogin"
            type="submit"
            gaevent="imt/login/normal"
            class="btn btn-larger btn-block disabled mj_login login-btn"
          >登录</button>
        </div>
        <input type="hidden" name="touchEvents">
        <input type="hidden" name="extraFingerPrint">
        <div class="forget">
          <a class="link" href="https://i.meituan.com/risk2/resetreq">忘记密码</a>
        </div>
        <input type="hidden" name="requestCode">
        <input type="hidden" name="responseCode">
      </div>
      <div
        v-if="loginWayIndex==2"
        id="quick-login-form"
        action="https://i.meituan.com/account/mobilelogin2"
        autocomplete="off"
        method="post"
        style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1); "
      >
        <dl class="list list-in">
          <dd class="visibale">
            <dl>
              <dd
                class="kv-line-r dd-padding padding-no"
                data-com="smsBtn_quick"
                data-requrl="/account/custom/mobilelogincode2"
              >
                <img
                  class="login-icon icon-align"
                  src="https://ms0.meituan.com/touch/img/account/login/icon_signin_phone@2x.png"
                >
                <input
                  type="tel"
                  name="mobile"
                  id="login-mobile"
                  class="input-weak kv-k J-input J-tel J-login-name shortWidth"
                  placeholder="请输入手机号"
                  maxlength="11"
                  v-model="way2Mobile"
                >
                <div class="to-del J-to-del-mobile J-to-del" style="display: none"></div>
                <button
                  id="smsCode"
                  type="button"
                  class="btn btn-weak kv-v btn-captacha"
                  gaevent="imt/buy/quickBuy/send"
                  :disabled="sendCodeDisabled"
                  @click="dealGetLoginCode"
                >获取验证码</button>
              </dd>
              <ul class="tel-select J-select" style="display: none"></ul>
              <dd class="kv-line-r dd-padding padding-no">
                <img
                  class="login-icon"
                  src="https://ms0.meituan.com/touch/img/account/login/icon_phone_check_code@2x.png"
                >
                <input
                  class="input-weak kv-k J_input_sms J-input"
                  name="code"
                  type="tel"
                  pattern="[0-9]+"
                  :placeholder="inputCodeDisabled?'请先获取验证码!':'请输入短信验证码'"
                  :disabled="inputCodeDisabled"
                  v-model="code"
                >
                <div class="to-del J-to-del-code J-to-del" style="display: none"></div>
              </dd>
              <!-- <dd class="dd-padding regist-tip">
                <div class="txt">未注册过的手机将自动注册为美团账户</div>
              </dd>-->
            </dl>
          </dd>
        </dl>
        <div class="btn-wrapper">
          <button
            type="submit"
            gaevent="imt/login/quick"
            class="btn btn-larger btn-block mj_login login-btn"
            :disabled="sendCodeDisabled"
            @click="dealCodeLogin"
          >登录</button>
        </div>
        <input type="hidden" name="touchEvents">
        <input type="hidden" name="extraFingerPrint">
        <!-- <div class="unreceived-tip J-not-received">
            <p>仍未收到验证码？拨打<a href="tel:10109777" class="dial">查询热线</a>快速获取吧（9：00-23：00提供服务）</p>
        </div>-->
        <input type="hidden" name="action">
        <input type="hidden" name="request_code">
        <input type="hidden" name="response_code">
      </div>
    </div>

    <ul class="subline">
      <li>
        <router-link to="/signup">立即注册</router-link>
      </li>
      <li class="pull-right">
        <router-link to="/resetreq">找回密码</router-link>
      </li>
    </ul>

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
  data() {
    return {
      loginWayIndex: 1,
      bgc: false,

      isShowTop: false,

      mobile: "",
      password: "",

      way2Mobile: "",
      sendCodeDisabled: true,

      inputCodeDisabled: true,

      code: ""
    };
  },
  created() {
    this.$store.commit("setNavTitle", "我的");
  },
  watch: {
    way2Mobile() {
      if (checkMobile(this.way2Mobile)) {
        console.log("按钮有效");
        this.sendCodeDisabled = false;
      } else {
        this.sendCodeDisabled = true;
      }
    }
  },
  methods: {
    loginSuccess(user) {
      //保存用户的登录信息
      localStorage.Maoyan_isLogin = "1";
      localStorage.Maoyan_user = JSON.stringify(user);

      this.$store.commit("setIsLogin", true);

      //登录一般把 push变成replace
      this.$router.replace("/mine");
    },
    dealCodeLogin() {
      if (!checkCode(this.code)) {
        layer.open({
          content: "验证码必须为4位数字",
          btn: "我知道了"
        });
        return;
      }

      this.request.postUserMobileLoginUrl(
        { mobile: this.way2Mobile, code: this.code },
        data => {
          if (data.status == 0) {
            layer.open({
              content: "短信验证码登录失败(message=" + data.message + ")",
              btn: "我知道了"
            });

            return;
          }

          //保存localStorage
          //跳转界面
          this.loginSuccess(data.data);
        }
      );
    },
    dealGetLoginCode() {
      //函数进来了, 手机号肯定是ok
      this.request.postMobileLoginCode({ mobile: this.way2Mobile }, data => {
        if (data.status == 0) {
          layer.open({
            content: "验证码发送失败(message=" + data.message + ")",
            btn: "我知道了"
          });

          return;
        }

        this.inputCodeDisabled = false;

        layer.open({
          content: "验证码发送成功(code=" + data.data.code + ")",
          btn: "我知道了"
        });
      });
    },
    dealPasswordLogin() {
      if (!checkMobile(this.mobile)) {
        layer.open({
          content: "手机号必须为11位, 输入正确的格式",
          btn: "我知道了"
        });

        return;
      }

      //检测
      if (!checkPassword(this.password, 6, 20)) {
        layer.open({
          content: "密码必须为6-20位",
          btn: "我知道了"
        });

        return;
      }

      console.log("开始登录");

      this.request.postUserPasswordLogin(
        { mobile: this.mobile, password: this.password },
        data => {
          if (data.status == 0) {
            // layer.open({
            //   content: "登录失败(message=" + data.message + ")",
            //   btn: "我知道了"
            // });
            this.isShowTop = true;
            return;
          }

          //保存localStorage
          //跳转界面
          this.loginSuccess(data.data);
        }
      );
    }
  }
};
</script>
<style scoped>
.body {
}
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

#tips.showTop {
  display: block;
  transform-origin: 0px 0px 0px;
  opacity: 1;
  transform: scale(1, 1);
}

#login {
  /* margin-top: 50px; */
}

dl.list:first-child {
  margin: 0;
  border-top: 0;
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

dl.list dd {
  margin: 0;
  border-bottom: 1px solid #d6d6d6;
  overflow: hidden;
  font-size: inherit;
  font-weight: 400;
  position: relative;
}

.nav {
  text-align: center;
}

.taba {
  display: -webkit-box;
  display: -ms-flexbox;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  position: relative;
  border-bottom: 0.08rem solid #d6d6d6;
}

.taba li {
  display: block;
  text-align: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  position: relative;
}

/* .taba li.active {
    color: #df2d2d;
} */

a.react,
label.react {
  display: block;
  color: inherit;
  height: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.taba li a.react {
  padding-top: 0.28rem;
  padding-bottom: 0.2rem;
}

.taba .slide {
  width: 355px;
  height: 20px;
  position: absolute;
  bottom: -0.08rem;
  border-bottom: 0.08rem solid #df2d2d;
  -webkit-transition: left 0.2s ease-in;
}

form {
  transform-origin: 0px 0px 0px;
  opacity: 1;
  transform: scale(1, 1);
}

dl.list:first-child {
  margin: 0;
  border-top: 0;
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

dl.list dd dl {
  margin: 0;
  margin-bottom: -1px;
  padding-left: 0.2rem;
  border: 0;
}

dl.list .dd-padding,
dl.list dt,
dl.list dd > .react {
  padding: 0.28rem 0.2rem;
  box-sizing: border-box;
}

.login-icon {
  display: none;
}

dl.list dd > .input-weak {
  width: 100%;
  display: block;
}

.btn-wrapper {
  margin: 0.28rem 0.2rem;
}

.btn {
  display: inline-block;
  margin: 0;
  text-align: center;
  height: 0.6rem;
  padding: 0 0.32rem;
  border-radius: 0.06rem;
  color: #fff;
  border: 0;
  background-color: #df2d2d;
  font-size: 0.28rem;
  vertical-align: middle;
  /* line-height: .6rem; */
  box-sizing: border-box;
  cursor: pointer;
  -webkit-user-select: none;
  box-sizing: border-box;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.btn-larger {
  height: 0.94rem;
  line-height: 0.94rem;
  font-size: 0.4rem;
}

.btn-block {
  display: block;
  width: 100%;
}

.forget {
  display: none;
}

.subline {
  margin: 0.28rem 0.2rem;
  box-sizing: border-box;
}

.subline li {
  display: inline-block;
}

.pull-right {
  float: right !important;
}

a {
  color: #df2d2d;
  text-decoration: none;
  outline: 0;
}

footer {
  margin-top: 0.3rem;
  padding: 0 0.2rem 0.4rem;
}

.copyright {
  text-align: center;
}

.taba .slide[data-v-15c04174] {
  width: 40%;
  height: 20px;
  position: absolute;
  bottom: -0.08rem;
  border-bottom: 0.08rem solid #df2d2d;
  -webkit-transition: left 0.2s ease-in;
}

.taba > .slide.move {
  margin-left: 180px;
}

.react.active {
  color: #df2d2d;
}

dl.list dd > .input-weak {
  width: 100%;
  display: block;
}

form:first-child .input-weak {
  width: 100%;
}

dl.list dd > .input-weak:focus {
  background-color: #dcdcdc;
}

.btn:disabled,
.btn.btn-disabled {
  background-color: #dcdcdc;
  color: #999;
  border: 0;
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

dl.list dd > .input-weak {
  width: 100%;
  display: inline-block;
}

dl.list dd .shortWidth {
  width: 65%;
}

dl.list dd > .J_input_sms {
  width: 100%;
  height: 30px;
}

dl.list dd > .btn {
  display: inline-block;
}

dl.list dd dl > .dd-padding {
  padding-left: 0;
}

.dl.list dd > input#login-mobile:focus,
select:focus {
  background-color: #f5f5ff;
  color: red;
}

.btn-captacha {
  margin-left: 5px;
}

dl.list .padding-no {
  padding: 8.5px 0;
  box-sizing: border-box;
}
a {
  display: inline;
}
ul {
  margin: 0;
  padding: 0;
}

</style>
