<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button circle type="primary" :icon="Edit" @click="handler"></el-button>
                <el-popconfirm @confirm="removeUser" :title="`你确定要删除${user.name}吗？`">
                    <template #reference>
                        <el-button v-if="$route.path == '/user/patient'" circle type="danger"
                            :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型：{{ user.param.certificatesTypeString }}</p>
            <p>证件号码：{{ user.certificatesNo }}</p>
            <p>用户性别：{{ user.sex == 1 ? '男' : '女' }}</p>
            <p>出生日期：{{ user.birthdate }}</p>
            <p>手机号码：{{ user.phone }}</p>
            <p>婚姻状况：{{ user.isMarry == 1 ? '已婚' : '未婚' }}</p>
            <p>当前住址：{{ user.param.cityString }}</p>
            <p>详细地址：{{ user.param.fullAddress }}</p>
            <!-- 简洁的选中标识 -->
            <transition name="confirm">
                <div class="confirm" v-if="currentIndex === index">已选择</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import { useRoute,useRouter } from 'vue-router';
import { reqRemoveUser } from '@/api/user';
import { ElMessage } from 'element-plus';
let $router = useRouter();
let $route = useRoute();
//接受父组件传递过来的就诊人信息展示
let props = defineProps(["user", "currentIndex", "index"])
let $emit = defineEmits(["changeScene", "removeUser"]);

//相应的就诊人组件修改按钮的回调
const handler = () => {
    //要么是就诊人管理模块点击修改按钮
    //要么预约挂号点击修改按钮
    if ($route.path == '/user/patient') {
        $emit('changeScene', props.user);
    } else {
        //路由跳转携带参数
        $router.push({ path: '/user/patient', query: { type:'edit',id:props.user.id } });
    }

}

//删除某一个用户的回调
const removeUser = async () => {
    try {
        //删除用户成功
        await reqRemoveUser(props.user.id);
        //消息提示
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        $emit('removeUser', props.user.id);
    } catch (error) {
        
    }
}
</script>

<style scoped lang="scss">
.visitor {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    background: #fff;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
    }

    // 选中状态：简单的边框和背景变化
    &.selected {
        border: 2px solid #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);

        .top {
            background-color: #ecf5ff;

            .username {
                color: #409eff;
                font-weight: 500;
            }
        }
    }

    .top {
        height: 50px;
        background-color: #f5f7fa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;

        .left {
            .free {
                background: white;
                padding: 3px 8px;
                font-size: 12px;
                margin-right: 8px;
                border-radius: 3px;
                color: #7f7f7f;
                border: 1px solid #dcdfe6;
            }

            .username {
                color: #7f7f7f;
                font-size: 15px;
            }
        }

        .right {
            .el-button {
                width: 32px;
                height: 32px;
                padding: 0;
            }
        }
    }

    .bottom {
        padding: 20px;
        position: relative;

        p {
            line-height: 28px;
            color: #606266;
            font-size: 13px;
            margin: 0 0 5px 0;
        }

        // 简洁的选中标签
        .selected-tag {
            position: absolute;
            right: 15px;
            bottom: 15px;
            background: #409eff;
            color: white;
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 3px;
            font-weight: 500;
        }

        .confirm {
            position: absolute;
            width: 150px;
            height: 150px;
            color: red;
            border-radius: 50%;
            border: 2px dashed red;
            text-align: center;
            line-height: 150px;
            /* 修改：与height保持一致 */
            left: 20%;
            top: 20%;
            opacity: 0.2;
            transform: rotate(35deg);
            font-weight: 900;
        }
        .confirm-enter-active{
            transition: all 0.35s ease;
        }
        .confirm-enter-from{
            transform: scale(1);
        }
        .confirm-enter-to{
            transform: scale(1.2);
        }
    }
}

// 简单的淡入效果
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>