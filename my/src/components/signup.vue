<template>
  <div class="body">
    <form id="login-form" action="//i.meituan.com/account/signup" method="post">
      <div v-show="step==1">
        <dl class="list">
          <dd class="dd-padding">
            <ol class="crumbs">
              <li class="active" @click="step=1">输入手机号</li>
              <li @click="step>=2?step=2:''">输入验证码</li>
              <li @click="step>=3?step=3:''">设置密码</li>
            </ol>
          </dd>
        </dl>
        <dl class="list">
          <dd class="dd-padding">
            <input
              id="mobile-number"
              class="input-weak"
              type="tel"
              placeholder="请输入您的手机号"
              name="mobile"
              value
              autocomplete="off"
              v-model="mobile"
            >
          </dd>
        </dl>
        <p class="btn-wrapper">
          <label onclick>
            <input
              id="term"
              @click="isRead=!isRead"
              type="checkbox"
              name="terms"
              :checked="isRead"
              ref="term"
              class="mt"
            >
            我已阅读并同意
            <a href="javascript:;">《美团网用户协议》</a>
          </label>
        </p>
        <div class="btn-wrapper">
          <button
            type="button"
            class="btn btn-block btn-larger"
            :disabled="disabled"
            @click="dealGetCode()"
          >获取验证码</button>
        </div>
      </div>
      <!--<input type="hidden" name="touchEvents">
			<input type="hidden" name="extraFingerPrint">
			<input type="hidden" name="requestCode">
      <input type="hidden" name="responseCode">-->
      <div v-show="step==2">
        <dl class="list">
          <dd class="dd-padding">
            <ol class="crumbs">
              <li class="active" @click="step=1">输入手机号</li>
              <li class="active" @click="step>=2?step=2:''">输入验证码</li>
              <li @click="step>=3?step=3:''">设置密码</li>
            </ol>
          </dd>
        </dl>
        <dl class="list">
          <dd class="dd-padding">
            <input
              id="code-number"
              class="input-weak"
              type="tel"
              placeholder="请输入短信中的验证码"
              name="mobile"
              value
              autocomplete="off"
              v-model="code"
            >
          </dd>
        </dl>

        <div class="btn-wrapper">
          <button type="button" class="btn btn-larger btn-block" @click="dealSendCode()">提交验证码</button>
        </div>
        <ul class="subline">
          <li>
            <router-link to="/signup">立即注册</router-link>
          </li>
          <li class="pull-right">
            <router-link to="/resetreq">找回密码</router-link>
          </li>
        </ul>
      </div>
      <div v-show="step==3">
        <dl class="list">
          <dd class="dd-padding">
            <ol class="crumbs">
              <li class="active" @click="step=1">输入手机号</li>
              <li class="active" @click="step>=2?step=2:''">输入验证码</li>
              <li class="active" @click="step>=3?step=3:''">设置密码</li>
            </ol>
          </dd>
        </dl>
        <dl class="list">
          <dd>
            <dl>
              <dd class="dd-padding">
                <input
                  id="setting-password"
                  class="input-weak"
                  type="password"
                  placeholder="请输入您的密码"
                  name="password"
                  v-model="password"
                >
              </dd>
              <dd class="dd-padding">
                <input
                  id="setting-password-repeat"
                  class="input-weak"
                  type="password"
                  placeholder="请重复您输入的密码"
                  name="repassword"
                  v-model="repassword"
                >
              </dd>
            </dl>
          </dd>
        </dl>

        <div class="btn-wrapper">
          <button type="button" class="btn btn-larger btn-block" @click="dealSetPassword">设置密码</button>
        </div>
        <ul class="subline">
          <li>
            <router-link to="/signup">立即注册</router-link>
          </li>
          <li class="pull-right">
            <router-link to="/resetreq">找回密码</router-link>
          </li>
        </ul>
      </div>
    </form>

    <!--<div></div>
    <div></div>-->
    <footer>
      <div class="copyright">
        <span class="copyright">© 猫眼电影 客服电话：400-670-5335</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "t",
  data() {
    return {
      mobile: "",
      code: "",
      step: 1,
      disabled: true,
      password: "",
      repassword: "",

      isRead: false
    };
  },

  created() {
    this.$store.commit("setNavTitle", "注册");
  },
  mounted() {},
  methods: {
    dealSetPassword() {
      var self = this;

      //检测
      if (!checkPassword(this.password, 6, 20)) {
        layer.open({
          content: "密码必须为6-20位",
          btn: "我知道了"
        });

        return;
      }

      if (!checkPassword(this.repassword, 6, 20)) {
        layer.open({
          content: "重复密码必须为6-20位",
          btn: "我知道了"
        });

        return;
      }

      if (this.password != this.repassword) {
        layer.open({
          content: "密码和重复密码不一致",
          btn: "我知道了"
        });

        return;
      }

      this.request.postSignupSetPassword(
        {
          mobile: this.mobile,
          code: this.code,
          password: this.password
        },
        data => {
          if (data.status == 1) {
            layer.open({
              content: "注册成功, 是否跳转到登录界面",
              btn: ["是", "否"],
              yes: function(index) {
                self.$router.push("/login");
                layer.close(index);
              }
            });
          } else {
            layer.open({
              content: "注册失败(message=" + data.message + ")",
              btn: "我知道了"
            });
          }
        }
      );
    },
    dealGetCode() {
      console.log(this.isRead);
      if (!this.isRead) {
        layer.open({
          content: "请先阅读用户协议",
          btn: "我知道了"
        });
        return;
      }

      //获取验证码
      this.request.postSignup({ mobile: this.mobile }, data => {
        if (data.status == "1") {
          //this.step = 2;
          var code = data.data.code;
          layer.open({
            content: "验证码已经发送,请在手机上查看(" + code + ")",
            btn: "我知道了"
          });

          this.step = 2;
        } else {
          layer.open({
            content: "验证码发送失败(message=" + data.message + ")",
            btn: "我知道了"
          });
        }
      });
    },
    dealSendCode() {
      //   if (this.code.length == 4) {
      //     this.step = 3;
      //   }

      if (!checkCode(this.code)) {
        layer.open({
          content: "验证码必须为4位数字",
          btn: "我知道了"
        });
        return;
      }

      //发送请求给服务器, 检测验证码是否成功
      this.request.postSignupCheck(
        { mobile: this.mobile, code: this.code },
        data => {
          var status = data.status;
          if (status == 1) {
            //跳转
            this.step = 3;
          } else {
            layer.open({
              content: "验证码检测失败",
              btn: "我知道了"
            });
          }
        }
      );
    }
  },
  computed: {},
  watch: {
    mobile() {
      if (checkMobile(this.mobile)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
  color: #333;
  background-color: #f8f8f8;
  height: 100%;
  position: relative;
  bottom: 0;
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

dl.list .dd-padding,
dl.list dt,
dl.list dd > .react {
  padding: 0.28rem 0.2rem;
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

ol.crumbs li + li {
  margin-left: 0.6rem;
  position: relative;
}

ol.crumbs li {
  display: inline-block;
  text-align: center;
}

ol.crumbs li.active {
  color: #df2d2d;
}

ol.crumbs li + li:before {
  content: ">";
  display: block;
  position: absolute;
  left: -0.4rem;
  font-weight: bolder;
  color: #aaa;
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

dl.list .dd-padding,
dl.list dt,
dl.list dd > .react {
  padding: 0.28rem 0.2rem;
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
  display: block;
}

input.input-weak,
textarea.input-weak {
  border: 0;
  height: 0.6rem;
  margin: -0.15rem 0;
  text-indent: 0.1rem;
  line-height: 1;
  font-size: 0.3rem;
  border-radius: 0.06rem;
  padding: 0;
}

.btn-wrapper {
  margin: 0.28rem 0.2rem;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}

input.mt[type="radio"]:checked,
input.mt[type="checkbox"]:checked {
  background-color: #df2d2d;
  border: 0;
  color: #fff;
}

input.mt[type="checkbox"] {
  border-radius: 0.06rem;
}

input.mt[type="radio"],
input.mt[type="checkbox"] {
  -webkit-appearance: none;
  width: 0.45rem;
  height: 0.45rem;
  margin: -0.07rem 0;
  border-radius: 50%;
  border: 0.02rem solid #d6d6d6;
  text-align: center;
  vertical-align: middle;
  line-height: 0.45rem;
  outline: 0;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}

input.mt[type="radio"]:checked:after,
input.mt[type="checkbox"]:checked:after {
  content: "✓";
  font-size: 0.4rem;
  font-family: base_icon;
}

input.mt[type="radio"]:checked,
input.mt[type="checkbox"]:checked {
  background-color: #df2d2d;
  border: 0;
  color: #fff;
}

a {
  color: #df2d2d;
  text-decoration: none;
  outline: 0;
  display: inline;
}

.btn:disabled,
.btn.btn-disabled {
  background-color: #dcdcdc;
  color: #999;
  border: 0;
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

.copyright {
  text-align: center;
}
.btn-wrapper {
  margin: 0.28rem 0.2rem;
}
.subline {
  margin: 0.28rem 0.2rem;
}
.subline li {
  display: inline-block;
}
.pull-right {
  float: right !important;
}
.btn {
  display: inline-block;
  margin: 0;
  text-align: center;
  height: 0.8rem;
  padding: 0 0.32rem;
  border-radius: 0.06rem;
  color: #fff;
  border: 0;
  background-color: #df2d2d;
  font-size: 0.28rem;
  vertical-align: middle;
  line-height: 0.6rem;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-user-select: none;
}
dl.list dd dl > .dd-padding,
dl.list dd dl dd > .react,
dl.list dd dl > dt {
  padding-left: 0;
}

dl.list .dd-padding,
dl.list dt,
dl.list dd > .react {
  padding: 0.28rem 0.2rem;
}
ul {
  margin: 0;
  padding: 0;
}
dl {
  margin: 0;
}
</style>
