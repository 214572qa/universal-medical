<template>
    <div>
        <!-- 展示订单详情的结构 -->
        <el-card class="box-card">
            <!-- 卡片头部的结构 -->
            <template #header>
                <div class="detail">挂号详情</div>
            </template>
            <!-- 展示身体部分的顶部结构 -->
            <div class="top">
                <!-- 左侧标签 -->
                <el-tag type="success">
                    <div class="tag">
                        <svg t="1770554255274" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3272" width="16" height="16">
                            <path
                                d="M377.8 832.3c-12.5 0-25-4.8-34.5-14.3L76.5 551.2c-19.1-19.1-19.1-50 0-69.1 19.1-19.1 50-19.1 69.1 0L412.4 749c19.1 19.1 19.1 50 0 69.1-9.6 9.5-22.1 14.2-34.6 14.2z"
                                fill="#1afa29" p-id="3273"></path>
                            <path
                                d="M377.8 832.3c-12.5 0-25-4.8-34.5-14.3-19.1-19.1-19.1-50 0-69.1L877 215.3c19.1-19.1 50-19.1 69.1 0s19.1 50 0 69.1L412.4 818c-9.6 9.6-22.1 14.3-34.6 14.3z"
                                fill="#1afa29" p-id="3274"></path>
                        </svg>
                        <span>{{ orderInfo?.param?.orderStatusString }}</span>
                    </div>
                </el-tag>
                <div class="right_info">
                    <img src="../../../../assets/code_login_wechat.png" alt="">
                    <div class="info">
                        <p class="p1">
                            微信 关注
                            <span class="wxtxt">
                                <svg t="1770630947166" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2125" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2126"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2127"></path>
                                </svg>
                            </span>
                            “广东114预约挂号”
                        </p>
                        <p class="p2">“快速预约挂号”</p>
                    </div>
                </div>
            </div>
            <!-- 订单详情底部的结构 -->
            <div class="bottom">
                <!-- 左侧展示订单详情信息 -->
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊人信息
                                </div>
                            </template>
                            {{ orderInfo?.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊日期
                                </div>
                            </template>
                            {{ orderInfo?.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊医院
                                </div>
                            </template>
                            {{ orderInfo?.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊科室
                                </div>
                            </template>
                            {{ orderInfo?.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    医生职称
                                </div>
                            </template>
                            {{ orderInfo?.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    医生服务费
                                </div>
                            </template>
                            <span style="color: red;">{{ orderInfo?.amount }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号订单
                                </div>
                            </template>
                            {{ orderInfo?.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号时间
                                </div>
                            </template>
                            {{ orderInfo?.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>

                    <div class="btn" v-if="orderInfo?.orderStatus === 0 || orderInfo?.orderStatus === 1">
                        <el-popconfirm width="220" icon-color="#626AEF" title="确定取消预约吗？" @confirm="cancel">
                            <template #reference>
                                <el-button>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" size="default" v-if="orderInfo?.orderStatus == 0"
                            @click="openDialog">支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <p>1.请确认就诊人信息是否正确，若填写错误，将无法取号就诊，损失由本人承担；</p>
                        <p style="color: red;">2.【取号】就诊当天需在{{ orderInfo?.fetchTime }}前完成取号，过时将无法取号，损失由本人承担；</p>
                        <p>3.【退号】在{{ orderInfo?.quitTime }}前可在线退号，逾期将不可办理退号，损失由本人承担；</p>
                        <p>4.广州114预约挂号支持自费患者使用身份证预约，同时支持广州市医保患者使用医保卡在平台预约挂号，请于就诊当日，携带预约挂号所使用的有效身份证证件到院取号；</p>
                        <p>5.请注意广州市医保患者在住院期间不能使用医保卡在诊所取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <!-- 展示支付二维码的结构 -->
        <!-- 对话框通过v-model控制显示与隐藏的true：展示 false：隐藏 -->
        <el-dialog @close="closeDialog " v-model="dialogVisible" title="微信支付" width="400px" class="pay-dialog">
            <!-- 支付的结构 -->
            <div class="qrcode">
                <img :src="imgUrl" alt="">
                <p>请使用微信扫一扫</p>
                <p class="p_bottom">扫描二维码支付</p>
            </div>
            <!--对话框底部的插槽传递结构 -->
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//引入获取订单详情的接口
import { reqQrCode, reqCancelOrder, reqOrderInfo, reqPayResult } from '@/api/user';
import type { PayResult,QrCode, OrderInfo, OrderResponseData } from '@/api/user/type';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
let $route = useRoute();
//定义存储二维码图片的路径
let imgUrl = ref<string>('');
//控制支付二维码对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
let orderInfo = ref<OrderInfo>();
//存储定时器的引用
let timer = ref<any>();
//挂载数据
onMounted(() => {
    getOrderInfo();
})
//获取订单详情的数据
const getOrderInfo = async () => {
    let result: OrderResponseData = await reqOrderInfo($route.query.orderId as string);
    if (result.code === 200) {
        orderInfo.value = result.data;
    }
}

//取消订单：订单的状态有3种： orderStatus -1:已取消 0:待支付 1:已支付
//取消订单：订单的状态有四种： orderStatus -1:已取消 0:待支付 1:已支付 2:已退款
const cancel = async () => {
    try {
        //取消预约
        let result = await reqCancelOrder($route.query.orderId as string);
        //取消成功，更新页面数据
        if (result.code === 200) {
            ElMessage({
                type: 'success',
                message: '取消预约成功'
            });
            // 直接更新本地状态，优化用户体验
            if (orderInfo.value) {
                orderInfo.value.orderStatus = -1;
                orderInfo.value.param.orderStatusString = '已取消';
            }
        } else {
            ElMessage({
                type: 'error',
                message: result.message || '取消预约失败'
            });
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消预约失败'
        });
    }
}
//点击支付按钮的回调
const openDialog = async () => {
    try {
        //展示对话框
        dialogVisible.value = true;
        //获取支付需要使用的二维码信息
        let result: QrCode = await reqQrCode($route.query.orderId as string);

        if (result.code === 200 && result.data?.codeUrl) {
            // 使用第三方二维码生成API（qrcode.react-async.com 或 api.qrserver.com）
            // 方案1：使用 api.qrserver.com
            imgUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(result.data.codeUrl)}`;

            //询问服务器当前这笔交易的支付结果
            //只要二维码查来：需要每隔几秒询问服务器是否支付成功
            timer.value = setInterval(async()=>{
                let result: PayResult = await reqPayResult($route.query.orderId as string);
                //如果服务器返回的数据data:true，表示支付成功
                if (result.data) {
                    //对话框关闭
                    dialogVisible.value = false;
                    //提示支付成功的信息
                    ElMessage({
                        type: 'success',
                        message: '支付成功'
                    });
                    //支付成功立马清除定时器
                    clearInterval(timer.value);
                    //再次获取订单详情的数据
                    getOrderInfo();
                }
            },2000);
            // 方案2：也可以使用 quickchart.io（备选）
            // imgUrl.value = `https://quickchart.io/qr?text=${encodeURIComponent(result.data.codeUrl)}&size=200`;
        } else {
            ElMessage({
                type: 'error',
                message: '获取支付二维码失败'
            });
            dialogVisible.value = false;
        }
    } catch (error) {
        console.error('生成二维码失败:', error);
        ElMessage({
            type: 'error',
            message: '生成支付二维码失败'
        });
        dialogVisible.value = false;
    }
}
//关闭对话框的回调
const closeDialog = () => {
    dialogVisible.value = false;
    clearInterval(timer.value);
}
//对话框右上角关闭对话框的回调
const close = () => {
    clearInterval(timer.value);
}
</script>

<style scoped lang="scss">
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 10px;

        .tag {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        .right_info {
            display: flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            .info {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .p2 {
                    margin-left: -10px;
                }

                p {
                    font-size: 12px;
                    line-height: 20px;
                    display: flex;
                    align-items: center;

                    .wxtxt {
                        display: flex;
                        align-items: center;
                        margin: 0 2px;
                    }
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 4;

            .btn {
                margin: 10px 0;
            }
        }

        .right {
            flex: 6;
            margin-left: 20px;

            p {
                line-height: 25px;
            }
        }
    }
}

.pay-dialog {
    .qrcode {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid #7f7f7f;
        border-bottom: 1px solid #7f7f7f;

        img {
            margin-top: 10px;
            width: 150px;
            height: 150px;
        }

        p {
            line-height: 20px;
            font-size: 14px;
            color: #606266;
        }

        .p_bottom {
            margin-bottom: 10px;
        }
    }
}
</style>