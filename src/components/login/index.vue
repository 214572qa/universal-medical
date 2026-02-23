<template>
    <div class="login_container">
        <!-- title：对话框左上角的标题 v-model：控制对话框的显示与隐藏 -->
        <el-dialog v-model="userStore.visible" title="用户登录">
            <!-- 对话框身体部分的结构 -->
            <el-row>
                <!-- 左侧的结构：搜集号码登录、微信扫一扫登录 -->
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene === 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <!-- 验证码铵钮 -->
                                <el-form-item>
                                    <el-button :disabled="!isPhone || flag">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                        <span v-else @click="getCode">获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="bottom">
                                <el-button style="width:90%;" type="primary" size="default"
                                    :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                    @click="login">登录</el-button>
                                <div class="Scan_code" @click="changeScene">
                                    <p>微信扫码登录</p>
                                    <svg t="1769148478604" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2309" width="32" height="32">
                                        <path
                                            d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                            fill="#28C445" p-id="2310"></path>
                                        <path
                                            d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                            fill="#28C445" p-id="2311"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene === 1">
                            <!-- 微信扫码登录的结构 -->
                            <p>微信登录</p>
                            <!-- 在此容器中生成微信扫码登录二维码 -->
                            <div id="login_container"></div>
                            <!-- <img src="../../assets/code_login_wechat.png" alt=""> -->
                            <p>请使用微信扫码登录</p>
                            <!-- 点击跳转至输入登录页面 -->
                            <div class="phone" @click="handler">
                                <p>商易通</p>
                                <svg t="1769843090996" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4929" width="32" height="32">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4930"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/code_login_wechat.png" alt="">
                                <svg t="1769149160979" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4845" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#2c2c2c" p-id="4846"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#2c2c2c" p-id="4847"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/code_login_wechat.png" alt="">
                                <svg t="1769149410444" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6064" width="16" height="16">
                                    <path
                                        d="M341.333333 230.4a34.133333 34.133333 0 0 0-34.133333 34.133333v494.933334a34.133333 34.133333 0 0 0 34.133333 34.133333h341.333334a34.133333 34.133333 0 0 0 34.133333-34.133333V264.533333a34.133333 34.133333 0 0 0-34.133333-34.133333H341.333333z m0-34.133333h341.333334a68.266667 68.266667 0 0 1 68.266666 68.266666v494.933334a68.266667 68.266667 0 0 1-68.266666 68.266666H341.333333a68.266667 68.266667 0 0 1-68.266666-68.266666V264.533333a68.266667 68.266667 0 0 1 68.266666-68.266666z"
                                        fill="#4C4C4C" p-id="6065"></path>
                                    <path
                                        d="M409.6 264.533333m25.6 0l153.6 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-153.6 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                                        fill="#B5B5B5" p-id="6066"></path>
                                    <path
                                        d="M469.333333 682.666667m42.666667 0l0 0q42.666667 0 42.666667 42.666666l0 0q0 42.666667-42.666667 42.666667l0 0q-42.666667 0-42.666667-42.666667l0 0q0-42.666667 42.666667-42.666666Z"
                                        fill="#B5B5B5" p-id="6067"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>
                        </div>
                    </div>
                    <p class="tip">官方指定平台</p>
                    <p class="tip">快速挂号 安全放心</p>
                </el-col>
            </el-row>

            <template #footer>
                <el-button size="default" type="primary" @click="userStore.visible = false">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//引入微信扫码登录参数请求
import { reqWxLogin } from '@/api/hospital';
import type { WXLoginResponseData } from '@/api/hospital/type';
//引入倒计时组件
import CountDown from '@/components/countdown/index.vue'
import { computed, reactive, ref, watch } from 'vue'
//引入用户图标和微信图标
import { User, Lock } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
//获取user相关仓库的数据(visible)可以控制login组件对话框的显示与隐藏
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus';
let userStore = useUserStore();
//获取路由对象
let $route = useRoute();
//获取路由器对象
let $router = useRouter();
//定义一个响应式数据控制倒计时组件的显示与隐藏
let flag = ref<boolean>(false);//false代表倒计时组件隐藏，true代表倒计时组件显示
let scene = ref<number>(0);//0代表搜集号码登录，1代表微信扫码登录
let form = ref<any>();
//搜集表单数据----手机号码
let loginParam = reactive({
    phone: '', //搜集手机号码
    code: '',//搜集对应的验证码
});
//计算当前表单元素设计的内容是否符合手机号码的格式
let isPhone = computed(() => {
    //手机号码的正则表达式
    const reg = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
    //返回布尔值：真代表符合手机号码的格式、假代表非手机号码
    return reg.test(loginParam.phone);
})
//点击微信扫码登录|微信小图标切换为微信扫码登录
const changeScene = async () => {
    //切换场景为1
    scene.value = 1;
    //发请求获取微信扫码二维码需要的参数
    // let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
    // let result: WXLoginResponseData = await reqWxLogin(redirect_URL);
    //生成微信扫码登录二维码页面
    //@ts-ignore
    // new WxLogin({
    //     self_redirect: true,//true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    //     id: "login_container",//显示二维码容器的设置
    //     appid: result.data.appid,
    //     scope: "snsapi_login",
    //     redirect_uri: result.data.redirect_uri,
    //     state: result.data.state,
    //     style: "black",
    //     href: "",//二维码的跳转链接
    //     onReady: function (isReady) {
    //         console.log(isReady);
    //     }
    // });
    // 方案：使用免费的二维码生成 API (api.qrserver.com)
    // 1. 定义回调地址（即你处理登录逻辑的页面）
    const redirectUri = window.location.origin + "/wxlogin"; // 或者你在路由中定义的路径
    const mockCode = "MOCK_CODE_" + Math.random().toString(36).substring(7);
    const state = "syt";

    // 2. 生成二维码内容（虽然扫码后手机会打开，但电脑端不会动）
    const qrData = encodeURIComponent(`${redirectUri}?code=${mockCode}&state=${state}`);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

    // 3. 找到容器并插入图片和提示文字
    const container = document.getElementById('login_container');
    if (container) {
        container.innerHTML = `
            <div style="text-align:center; display: flex; flex-direction: column; align-items: center;">
                <img id="mock_qr_code" src="${qrCodeUrl}"
                    style="width:150px;height:150px;border:1px solid #eee;padding:5px;cursor:pointer;"
                    title="开发环境：点击图片模拟扫码成功" />
                <p style="font-size:12px;color:#999;margin-top:10px;">请使用微信扫码登录</p>
                <p style="font-size:11px;color:#f60;">(开发模式：点击上方二维码即可模拟扫码成功)</p>
            </div>
        `;

        // 4. 【核心点】给图片绑定点击事件，模拟“扫码成功后微信重定向”的行为
        const qrImg = document.getElementById('mock_qr_code');
        qrImg?.addEventListener('click', () => {
            console.log("正在模拟扫码成功跳转...");
            // 模拟微信跳转：带着 code 和 state 回到你的回调页面
            window.location.href = `${redirectUri}?code=${mockCode}&state=${state}`;
        });
    }
}
//获取验证码按钮的回调
const getCode = async () => {
    //解决element-plus按钮禁用还能点击的问题
    if (!isPhone.value || flag.value) {
        return;//此处断点：用于中断后续代码的执行
    }
    // 显示倒计时组件，禁用获取验证码按钮，防止用户重复点击
    flag.value = true;
    try {
        //通知Pinia存储相应的状态码
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (error) {
        // 异常已由请求拦截器或 Store 处理，此处捕获防止控制台 Uncaught 报错
        ElMessage({
            type: 'error',
            message: (error as Error).message,
        })
    }
}

//计时器子组件绑定的自定义事件
// 当倒计时为0时，通知父组件关闭倒计时组件
const getFlag = (val: boolean) => {
    flag.value = val;
}

//点击用户登录按钮回调
const login = async () => {
    //保证表单校验的两项符合规则
    await form.value.validate();

    //发起登录请求
    //登录请求成功：顶部组件需要展示用户名字、对话框关闭
    //登录请求失败：弹出登录失败的错误信息
    try {
        //用户登录成功
        await userStore.userLogin(loginParam);
        //关闭对话框
        userStore.visible = false;
        //获取url上的query参数
        let redirect = $route.query.redirect;
        if (redirect) {
            $router.push(redirect as string);
        } else {
            $router.push('/home');
        }
    } catch (error) {
        //登录失败：弹出登录失败的错误信息
        ElMessage({
            type: 'error',
            message: (error as Error).message,
        });
    }
}

//手机号码的自定义校验规则
const validatorPhone = (rule: any, value: any, callback: any) => {
    //rule:代表当前校验的规则
    // value:代表当前校验的字段值
    // callback:代表当前校验的回调函数
    const reg = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('手机号码必须符合格式'));
    }
}
//验证码的自定义校验规则
const validatorCode = (rule: any, value: any, callback: any) => {
    if (/^\d{6}$/.test(value)) {
        callback();
    } else {
        callback(new Error('手机验证码必须为6位'));
    }
}

//表单校验的规则对象
const rules = {
    //手机号码的校验规则
    //required:代表当前字段务必进行校验
    //message:代表当前字段校验失败的提示信息
    //trigger:代表当前字段校验的触发时机，blur:失焦时触发，change:内容改变时触发
    //min:代表当前字段的最小长度，max:代表当前字段的最大长度，pattern:代表当前字段的正则表达式
    phone: [
        // { required: true, message: '手机号码必须符合格式', trigger: 'change' },
        { validator: validatorPhone, trigger: 'change' }
    ],
    code: [
        // { required: true, message: '请输入正确的手机验证码', trigger: 'blur' },
        { validator: validatorCode, trigger: 'blur' }
    ]
}

//点击手机后退输入验证码回调
const handler = () => {
    scene.value = 0;
}

//监听场景变化
watch(() => scene.value, (val: number) => {
    if (val === 1) {
        userStore.queryState();
    }
})
</script>

<style scoped lang="scss">
.login_container {
    ::v-deep(.el-dialog__body) {
        padding: 10px 0;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;
    }

    .bottom,
    .Scan_code {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0;
        }
    }

    .leftContent {
        .top {
            display: flex;
            flex-direction: space-around;
            overflow: hidden;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0;
                }
            }
        }
    }

    .tip {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
        font-size: 20px;
        font-weight: 900;
    }

    .webchat {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 20px 0;
        }

        img {
            border: 1px solid #ccc;
        }

        .phone {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                margin: 10px 0;
            }
        }
    }
}
</style>