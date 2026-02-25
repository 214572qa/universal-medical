<template>
    <div class="register-confirm">
        <h2 class="page-title">确认挂号信息</h2>
        
        <!-- 就诊人选择卡片 -->
        <el-card class="patient-card">
            <template #header>
                <div class="card-header">
                    <span class="header-title">
                        <el-icon><User /></el-icon>
                        选择就诊人
                    </span>
                    <el-button type="primary" @click="goUser" :icon="Plus">
                        添加就诊人
                    </el-button>
                </div>
            </template>
            
            <!-- 就诊人列表 - 使用扁平结构 -->
            <div v-if="userArr.length" class="patient-grid">
                <div 
                    v-for="(user, index) in userArr" 
                    :key="user.id"
                    class="patient-item"
                    :class="{ 'is-selected': currentIndex === index }"
                    @click="selectPatient(index)"
                >
                    <!-- 选中标记 -->
                    <div class="selected-badge">
                        <el-icon><Check /></el-icon>
                    </div>
                    
                    <!-- 患者类型标签 -->
                    <span class="patient-type" :class="user.isInsure ? 'insure' : 'self'">
                        {{ user.isInsure ? '医保' : '自费' }}
                    </span>
                    
                    <!-- 患者基本信息 -->
                    <div class="patient-header">
                        <el-avatar :size="48" :icon="UserFilled" class="patient-avatar" />
                        <span class="patient-name">{{ user.name }}</span>
                    </div>
                    
                    <!-- 患者详细信息 - 使用dl/dt/dd语义化标签 -->
                    <dl class="patient-info">
                        <div class="info-row">
                            <dt>证件类型</dt>
                            <dd>{{ user.param?.certificatesTypeString || '身份证' }}</dd>
                        </div>
                        <div class="info-row">
                            <dt>证件号码</dt>
                            <dd class="text-ellipsis">{{ user.certificatesNo }}</dd>
                        </div>
                        <div class="info-row">
                            <dt>性别</dt>
                            <dd>{{ user.sex === 1 ? '男' : '女' }}</dd>
                        </div>
                        <div class="info-row">
                            <dt>出生日期</dt>
                            <dd>{{ user.birthdate }}</dd>
                        </div>
                        <div class="info-row">
                            <dt>手机号码</dt>
                            <dd>{{ user.phone }}</dd>
                        </div>
                        <div class="info-row">
                            <dt>婚姻状况</dt>
                            <dd>{{ user.isMarry === 1 ? '已婚' : '未婚' }}</dd>
                        </div>
                        <div class="info-row full-width">
                            <dt>当前住址</dt>
                            <dd class="text-ellipsis">{{ user.param?.provinceString }} {{ user.param?.cityString }} {{ user.param?.districtString }}</dd>
                        </div>
                        <div class="info-row full-width">
                            <dt>详细地址</dt>
                            <dd class="text-ellipsis">{{ user.address }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            
            <!-- 空状态 -->
            <el-empty v-else description="暂无就诊人信息，请添加就诊人" />
        </el-card>

        <!-- 挂号信息卡片 -->
        <el-card class="appointment-card">
            <template #header>
                <div class="card-header">
                    <span class="header-title">
                        <el-icon><InfoFilled /></el-icon>
                        挂号信息
                    </span>
                </div>
            </template>
            
            <el-descriptions :column="2" border class="appointment-info">
                <el-descriptions-item label="就诊日期">{{ docInfo?.workDate }}</el-descriptions-item>
                <el-descriptions-item label="就诊医院">{{ docInfo?.param?.hosname }}</el-descriptions-item>
                <el-descriptions-item label="就诊科室">{{ docInfo?.param?.depname }}</el-descriptions-item>
                <el-descriptions-item label="医生姓名">{{ docInfo?.docname }}</el-descriptions-item>
                <el-descriptions-item label="医生职称">{{ docInfo?.title }}</el-descriptions-item>
                <el-descriptions-item label="医生专长">
                    <span class="skill-text">{{ docInfo?.skill }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="医务服务费">
                    <span class="fee">¥{{ docInfo?.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 确认按钮 -->
        <div class="action-bar">
            <el-button 
                type="primary" 
                size="large"
                :disabled="!isPatientSelected"
                @click="submitOrder"
                class="submit-btn"
            >
                <el-icon><Check /></el-icon>
                确认挂号
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Plus, Check, UserFilled, InfoFilled } from '@element-plus/icons-vue';
import { reqGetUser, reqDoctorInfo } from '@/api/hospital';
import { reqSubmitOrder } from '@/api/user';
import type { SubmitOrder } from '@/api/user/type';
import type { DoctorInfoData, UserResponseData, UserArr, Doctor } from '@/api/hospital/type';

// 路由
const $route = useRoute();
const $router = useRouter();

// 状态
const docInfo = ref<Doctor | null>(null);
const currentIndex = ref(-1);
const userArr = ref<UserArr>([]);

// 计算属性 - 是否有选中就诊人
const isPatientSelected = computed(() => currentIndex.value !== -1);

// 选择就诊人
const selectPatient = (index: number) => {
    currentIndex.value = index;
};

// 获取就诊人信息
const fetchUserData = async () => {
    const result: UserResponseData = await reqGetUser();
    if (result.code === 200) {
        userArr.value = result.data;
    }
};

// 获取医生信息
const fetchDoctorInfo = async () => {
    const result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string);
    if (result.code === 200) {
        docInfo.value = result.data;
    }
};

// 提交订单
const submitOrder = async () => {
    if (!docInfo.value || !isPatientSelected.value) return;
    
    const hoscode = docInfo.value.hoscode;
    const scheduleId = docInfo.value.id;
    const patientId = userArr.value[currentIndex.value]?.id;
    
    if (!patientId) {
        ElMessage.warning('请先选择就诊人');
        return;
    }
    
    const result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId as string);
    
    if (result.code === 200) {
        $router.push({ path: '/user/order', query: { orderId: result.data } });
    } else {
        ElMessage.error(result.message);
    }
};

// 添加就诊人
const goUser = () => {
    $router.push({ path: '/user/patient', query: { type: 'add' } });
};

// 初始化
fetchUserData();
fetchDoctorInfo();
</script>

<style scoped lang="scss">
// 变量定义
$primary: #409eff;
$primary-light: #ecf5ff;
$success: #67c23a;
$warning: #e6a23c;
$danger: #f56c6c;
$text-primary: #303133;
$text-regular: #606266;
$text-secondary: #909399;
$border-color: #e4e7ed;
$bg-light: #f5f7fa;
$shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
$shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
$radius: 12px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.register-confirm {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.page-title {
    font-size: 24px;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid $primary;
    display: inline-block;
}

// 卡片头部样式
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-title {
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
    display: flex;
    align-items: center;
    gap: 8px;
    
    .el-icon {
        color: $primary;
        font-size: 18px;
    }
}

// 就诊人卡片
.patient-card {
    margin-bottom: 24px;
    border-radius: $radius;
    box-shadow: $shadow;
}

// 就诊人网格
.patient-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 20px;
}

// 就诊人项
.patient-item {
    position: relative;
    padding: 20px;
    background: #fff;
    border: 2px solid $border-color;
    border-radius: $radius;
    cursor: pointer;
    transition: $transition;
    overflow: hidden;

    // 选中标记 - 默认隐藏
    .selected-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        background: $primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0);
        transition: $transition;
        
        .el-icon {
            color: #fff;
            font-size: 14px;
        }
    }

    // 患者类型标签
    .patient-type {
        position: absolute;
        top: 12px;
        left: 12px;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        
        &.insure {
            background: linear-gradient(135deg, #e1f3d8 0%, #d9ecff 100%);
            color: $success;
        }
        
        &.self {
            background: linear-gradient(135deg, #fdf6ec 0%, #faecd8 100%);
            color: $warning;
        }
    }

    // 患者头部
    .patient-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        margin-top: 8px;
        
        .patient-avatar {
            background: linear-gradient(135deg, $primary 0%, #66b1ff 100%);
        }
        
        .patient-name {
            font-size: 18px;
            font-weight: 600;
            color: $text-primary;
        }
    }

    // 患者信息列表
    .patient-info {
        margin: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px 16px;
        
        .info-row {
            display: flex;
            align-items: baseline;
            gap: 8px;
            
            &.full-width {
                grid-column: span 2;
            }
            
            dt {
                font-size: 13px;
                color: $text-secondary;
                white-space: nowrap;
                flex-shrink: 0;
            }
            
            dd {
                margin: 0;
                font-size: 13px;
                color: $text-regular;
                font-weight: 500;
                
                &.text-ellipsis {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    // Hover效果
    &:hover {
        border-color: $primary;
        box-shadow: $shadow-hover;
        transform: translateY(-2px);
    }

    // 选中状态
    &.is-selected {
        border-color: $primary;
        background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
        box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.15), $shadow-hover;
        
        .selected-badge {
            opacity: 1;
            transform: scale(1);
        }
    }
}

// 挂号信息卡片
.appointment-card {
    margin-bottom: 24px;
    border-radius: $radius;
    box-shadow: $shadow;
}

.appointment-info {
    :deep(.el-descriptions__label) {
        background: $bg-light;
        font-weight: 500;
        color: $text-regular;
    }
    
    .skill-text {
        color: $text-regular;
        line-height: 1.6;
    }
    
    .fee {
        color: $danger;
        font-size: 18px;
        font-weight: 600;
    }
}

// 操作栏
.action-bar {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    
    .submit-btn {
        min-width: 200px;
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 24px;
        
        .el-icon {
            margin-right: 8px;
        }
    }
}

// 响应式
@media (max-width: 768px) {
    .patient-grid {
        grid-template-columns: 1fr;
    }
    
    .patient-info {
        grid-template-columns: 1fr !important;
        
        .info-row.full-width {
            grid-column: span 1 !important;
        }
    }
}
</style>