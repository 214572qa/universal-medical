<template>
    <div class="login_container">
        <!-- title：对话框左上角的标题 v-model：控制对话框的显示与隐藏 -->
        <el-dialog v-model="userStore.visible" title="用户登录">
            <!-- 对话框身体部分的结构 -->
            <el-row>
                <!-- 左侧的结构：搜集号码登录、微信扫一扫登录 -->
                <el-col :span="12">
                    <div class="login">
                        <!-- 手机号登录 -->
                        <div v-if="scene === LoginType.PHONE">
                            <LoginForm />
                            <div class="switch-mode" @click="changeScene(LoginType.WECHAT)">
                                <p>微信扫码登录</p>
                                <WechatIcon />
                            </div>
                        </div>
                        
                        <!-- 微信扫码登录 -->
                        <div class="webchat" v-if="scene === LoginType.WECHAT">
                            <p>微信登录</p>
                            <WechatLogin />
                            <div class="switch-mode" @click="changeScene(LoginType.PHONE)">
                                <p>商易通</p>
                                <PhoneIcon />
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
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { LoginType } from '@/utils/enums/loginEnum';
import LoginForm from './LoginForm.vue';
import WechatLogin from './WechatLogin.vue';
import WechatIcon from '@/components/icons/WechatIcon.vue';
import PhoneIcon from '@/components/icons/PhoneIcon.vue';

let userStore = useUserStore();
let scene = ref<LoginType>(LoginType.PHONE);

const changeScene = (type: LoginType) => {
    scene.value = type;
}
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

    .switch-mode {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-top: 20px;

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
    }
}
</style>
