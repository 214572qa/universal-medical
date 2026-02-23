<template>
    <!-- 实名认证组件的结构 -->
    <el-card class="box-card">
        <template #header>
            <!-- 卡片头部 -->
            <div class="card-header">
                <h1>实名信息</h1>
            </div>
        </template>
        <!-- 实名认证结构的提示部分 -->
        <div class="tip" style="color: #7f7f7f;">
            <p><el-icon>
                    <InfoFilled />
                </el-icon>完成实名认证后才能添加就诊人，并正常进行挂号，为了不影响后续步骤，建议提前实名认证。
            </p>
        </div>
        <!-- 卡片身体的底部：认证成功的结构，认证未成功的结构 -->
        <el-descriptions v-if="userInfo?.authStatus == 1" size="default" class="margin-top" :column="1" border
            style="margin: 20px auto;">
            <el-descriptions-item label-align="center" label-width="100">
                <template #label>
                    <div class="cell-item">
                        用户姓名
                    </div>
                </template>
                {{ userInfo?.name }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" label-width="100">
                <template #label>
                    <div class="cell-item">
                        证件类型
                    </div>
                </template>
                {{ userInfo?.certificatesType == '10' ? '身份证' : '户口本' }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" label-width="100">
                <template #label>
                    <div class="cell-item">
                        证件号码
                    </div>
                </template>
                {{ userInfo?.certificatesNo }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 用户未验证的结构 -->
        <el-form v-if="userInfo?.authStatus == 0" style="width: 50%;margin: 20px auto;" label-width="80px"
            :model="params" :rules="rules" ref="form">
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select placeholder="请选择证件类型" v-model="params.certificatesType">
                    <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType"
                        :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="上传证件" prop="certificatesUrl">
                <!-- action:upload组件向服务器提交图片路径
                limit:是照片墙约束图片个数
                on-exceed:超出约束个数时的回调
                -->
                <el-upload ref="upload" list-type="picture-card" :on-remove="removeHandle" :on-preview="previewHandle"
                    :on-success="successHandle" :on-exceed="exceedHandle" :limit="1"
                    action="/api/oss/file/fileUpLoad?fileHost=userAuath">
                    <img style="width: 100%; height: 100%;" src="../../../assets/auth_example.jpg" alt="">
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img v-if="params.certificatesUrl" :src="params.certificatesUrl" style="width: 100%; height: 100%;"
                        alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="reset">重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
// 引入图标
import { InfoFilled } from '@element-plus/icons-vue';
//获取用户信息
import { reqUserInfo, reqCetationType, reqUserCertation } from '@/api/user';
//引入组合式API函数
import { ref, onMounted, reactive } from 'vue';
import type { CertationTypeResponseData, CertationArr, UserInfoResponseData, UserInfo, UserParams } from '@/api/user/type';
import { ElMessage } from 'element-plus';
//获取form组件
let form = ref();
//存储用户信息
let userInfo = ref<UserInfo>({} as UserInfo);
let arrType = ref<CertationArr>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
let upload = ref();

//搜集用户表单认证的数据
let params = reactive<UserParams>({
    "certificatesUrl": "",
    "certificatesType": "",
    "certificatesNo": "",
    "name": ""
})
//组件挂载完毕
onMounted(() => {
    //获取用户信息的方法
    getUserInfo();
    //获取证件类型的接口
    getType();
});

//获取用户信息的方法
const getUserInfo = async () => {
    let result: UserInfoResponseData = await reqUserInfo();
    if (result.code == 200) {
        userInfo.value = result.data;
    }
};
//获取证件类型的数据
const getType = async () => {
    let result: CertationTypeResponseData = await reqCetationType('CertificatesType');
    if (result.code == 200) {
        arrType.value = result.data;
    }
};

//超出图片个数的回调
const exceedHandle = (files: File[], fileList: File[]) => {
    ElMessage({
        type: 'error',
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
    })
};

//图片上传成功的钩子
const successHandle = (response: any) => {
    //如果图片上传成功校验结果清除
    form.value.clearValidate(['certificatesUrl']);
    //收集上传成功图片地址
    //response:上传图片请求服务器返回的数据
    //uploadFile:上传的文件对象
    //uploadFiles:上传的文件列表

    params.certificatesUrl = response.data;
}

//图片预览的钩子
const previewHandle = () => {
    //触发预览的钩子的时候，对话框显示
    dialogVisible.value = true;
}

//图片移除的钩子
const removeHandle = () => {
    params.certificatesUrl = '';
}

//重置表单的回调
const reset = () => {
    //清除所有的校验结果
    form.value.clearValidate();
    //清除文件上传的列表
    upload.value.clearFiles();
    //清空数据
    Object.assign(params, {
        certificatesUrl: '',
        certificatesType: '',
        certificatesNo: '',
        name: ''
    })
}

//提交按钮的回调
const submit = async () => {
    //全部的表单校验通过返回一个成功的promise
    //如果有一个表单校验失败返回是一个失败的promise对象，后面的语句就不再执行
    await form.value.validate();
    try {
        //认证成功
        await reqUserCertation(params);
        ElMessage({
            type: 'success',
            message: '提交成功'
        })
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '提交失败'
        })
    }
}

//自定义验证规则的姓名方法
const validatorName = (rule: any, value: any, callback: any) => {
    //rule:即为当前校验字段的校验规则对象
    const reg = /^(?:[\u4e00-\u9fa5]{2,4}|[\u4e00-\u9fa5]{2}·[\u4e00-\u9fa5]{2,8})$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的中国人的姓名'));
    }
}
//自定义验证规则的证件类型方法
const validatorType = (rule: any, value: any, callback: any) => {
    //rule:即为当前校验字段的校验规则对象
    if (value == '10' || value == '20' || value == '30' || value == '40') {
        callback();
    } else {
        callback(new Error('请选择证件类型'));
    }
}
//自定义验证规则的证件号码方法
const validatorNo = (rule: any, value: any, callback: any) => {
    //身份证的正则表达式（18位）
    const sfz = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    //户口本的正则表达式（9位数字户号）
    const hkb = /^\d{9}$/;
    if (sfz.test(value) || hkb.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的身份证号码或户口本号码'));
    }
}
//证件照图片地址
const validatorUrl = (rule: any, value: any, callback: any) => {
    if (value.length) {
        callback();
    } else {
        callback(new Error('请上传证件照图片'));
    }
}

//表单验证规则
const rules = {
    // 用户姓名的验证规则
    //required:true，当前字段务必进行校验
    name: [
        { required: true, validator: validatorName },
    ],
    certificatesType: [
        { required: true, validator: validatorType }
    ],
    certificatesNo: [
        { required: true, validator: validatorNo }
    ],
    certificatesUrl: [
        { required: true, validator: validatorUrl }
    ]
}
</script>

<style scoped lang="scss">
.box-card {
    .tip {
        p {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        :deep(.el-icon) {
            font-size: 20px;
            padding-top: 5px;
            margin-right: 5px;
        }
    }
}
</style>
