<template>
    <!-- 就诊人组件的静态结构 -->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button class="button" type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <!-- 就诊人管理模块展示就诊人信息的结构 -->
        <div class="visitors" v-if="scene == 0">
            <Visitor @changeScene="changeScene"
                @removeUser="removeUser"
                class="item" v-for="(user, index) in userArr" :key="user.id"
                :user="user" :index="index" />
        </div>
        <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
        <div class="form" v-if="scene == 1">
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form style="width: 60%;margin: 20px auto;">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请你输入用户姓名" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请你选择证件类型" v-model="userParams.certificatesType">
                        <el-option v-for="item in certationArr" :key="item.id" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请你输入证件号码" v-model="userParams.certificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group  v-model="userParams.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="userParams.birthdate" value-format="YYYY-MM-DD" type="date" placeholder="请你选择出生日期" />
                </el-form-item>
                <el-form-item label="手机号码" >
                    <el-input placeholder="请你输入手机号码" v-model="userParams.phone"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
            <el-form style="width: 60%;margin: 20px auto;">
                <el-form-item label="婚姻状况">
                    <el-radio-group v-model="userParams.isMarry">
                        <el-radio :label="1">已婚</el-radio>
                        <el-radio :label="0">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保">
                    <el-radio-group v-model="userParams.isInsure">
                        <el-radio :label="1">自费</el-radio>
                        <el-radio :label="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前住址">
                    <el-cascader :props="props" placeholder="请选择当前住址" v-model="userParams.addressSelected"/>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input placeholder="请你输入详细地址" v-model="userParams.address"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">联系人信息（选填）</el-divider>
            <el-form style="width: 60%;margin: 20px auto;" label-width="80px">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请你输入姓名" v-model="userParams.contactsName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请你选择证件类型" v-model="userParams.contactsCertificatesType">
                        <el-option v-for="item in certationArr" :key="item.id" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请你输入手机号码" v-model="userParams.contactsPhone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="primary" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </div>

    </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type CascaderProps } from 'element-plus'
import { User } from '@element-plus/icons-vue';
import { reqGetUser } from '@/api/hospital';
import { reqAddOrUpdateUser, reqCetationType, reqCity } from '@/api/user';
import { onMounted, reactive, ref, watch } from 'vue';
import type { UserResponseData, UserArr } from '@/api/hospital/type';
import type { AddOrUpdateUser,CertationArr, CertationTypeResponseData } from '@/api/user/type';
//引入路由器与路由方法
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
let $route = useRoute();
//存储全部就诊人的信息
let userArr = ref<UserArr>([]);
//定义一个响应式数据：决定卡片的身体部分的展示内容
let scene = ref<number>(0);
//存储证件类型的数据
let certationArr = ref<CertationArr>([]);
//收集新增就诊人的数据
let userParams = reactive<AddOrUpdateUser>({
    id: '',
    name: '',
    certificatesType: '',
    certificatesNo: '',
    phone: '',
    sex: 0,
    birthdate: '',
    isMarry: 0,
    districtCode: '',
    address: '',
    addressSelected: [],
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: '',
    isInsure: 0
})
//组件挂载完毕获取一次就诊人的信息
onMounted(() => {
    //获取就诊人信息
    getAllUser();
    //获取证件的类型的数据
    getCertationType();
    //判断：当前这个路由组件是不是从挂号组件而来[挂号组件而来，路径上使携带query参数type=add]
    if ($route.query.type == 'add') {
        scene.value = 1;
    }

    if ($route.query.type == 'edit') {
        scene.value = 1;
    }
})

//获取全部就诊人信息
const getAllUser = async () => {
    let result: UserResponseData = await reqGetUser();
    if (result.code == 200) {
        userArr.value = result.data;
    }
}

//添加就诊人按钮的回调
const addUser = () => {
    //清空上一次的数据
    reset();
    //切换场景为1：显示添加、修改就诊人的表单
    scene.value = 1;
}

//就诊人子组件自定义事件的回调
const changeScene = (user:AddOrUpdateUser) => {
    scene.value = 1;
    //搜集已有的就诊人信息
    Object.assign(userParams, user);
}

//清空用户数据的方法
const reset = () => {
    //清空上一次的数据
    Object.assign(userParams,{
        id: null,
        name: '',
        certificatesType: '',
        certificatesNo: '',
        phone: '',
        sex: 0,
        birthdate: '',
        isMarry: 0,
        districtCode: '',
        address: '',
        addressSelected: [],
        contactsName: '',
        contactsCertificatesType: '',
        contactsCertificatesNo: '',
        contactsPhone: '',
        isInsure: 0
    })
}

//获取证件类型的接口
const getCertationType = async () => {
    let result: CertationTypeResponseData = await reqCetationType('CertificatesType');
    if (result.code == 200) {
        certationArr.value = result.data;
    }
}

//级联选择器提供的数据
const props: CascaderProps = {
    lazy: true, //懒加载数据
    //加载级联选择器数据的方法
    async lazyLoad(node, resolve) {
        // 根节点时 node.data 可能为 undefined 或空对象，需要安全获取 id
        const parentId = String(node.data?.id || '86');
        let result = await reqCity(parentId);

        //整理数组
        let showData = result.data.map(((item: any) => {
            return {
                id: item.id,
                value: item.value,
                label: item.name,
                leaf: !item.hasChildren, // hasChildren为true表示有子节点，leaf应为false
            }
        }));
        //注入组件需要展示的数据
        resolve(showData);
    },
}

//提交按钮的方法的回调
const submit = async() => {
    //要么新增一个就诊人|更新一个已有的就诊人
    try{
        //要么新增用户成功|更新已有的用户成功
        await reqAddOrUpdateUser(userParams);
        //提示文字
        ElMessage.success({
            type:'success',
            message: userParams.id?'提交成功':'新增成功'
        });
        //提交按钮的时候判断是不是从预约挂号而来
        if ($route.query.type == 'add') {
            $router.back(); // 返回上一个页面
        }else {
            scene.value = 0;//切换场景为0
        }
        //在获取全部的就诊人的信息
        getAllUser();
    }catch (error){
        ElMessage.error({
            type:'error',
            message: userParams.id ? '提交失败' : '新增失败'
        });
    }
}

//监听全部就诊人的数据
watch(() => userArr.value, () => {
    if ($route.query.type == 'edit') {
        let user = userArr.value.find((user) => {
            return user.id == $route.query.id;
        });
        Object.assign(userParams, user);
    }
}, { deep: true });

//删除就诊人按钮的回调
const removeUser = async () => {
    //再次获取全部的就诊人的信息
    await getAllUser();
}
</script>

<style scoped lang="scss">
.box-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .visitors {
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 32%;
            margin: 5px;
        }
    }
}
</style>