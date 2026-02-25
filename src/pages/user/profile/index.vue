<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <section class="user-card">
      <el-upload
        class="avatar-upload"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadAvatar"
      >
        <el-avatar :size="72" :src="userInfo.param?.avatar">
          {{ userInfo.name?.[0] || '用户' }}
        </el-avatar>
      </el-upload>
      
      <div class="user-info">
        <div class="name-row">
          <span class="name" @click="openEditDialog">
            {{ userInfo.name || userInfo.nickName || userInfo.phone }}
            <el-icon class="edit-icon"><Edit /></el-icon>
          </span>
          <el-tag :type="userInfo.authStatus === 1 ? 'success' : 'info'" size="small">
            {{ userInfo.authStatus === 1 ? '已实名认证' : '未实名认证' }}
          </el-tag>
        </div>
        <p class="welcome">{{ welcomeMessage }}</p>
      </div>

      <el-button 
        v-if="userInfo.authStatus === 0" 
        type="primary" 
        @click="goEdit"
      >
        去实名认证
      </el-button>
    </section>

    <!-- 账号详情 -->
    <section class="info-section">
      <h3 class="section-title">
        <el-icon><UserFilled /></el-icon>
        账号详情
      </h3>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="手机号码">{{ formatPhone(userInfo.phone) }}</el-descriptions-item>
        <el-descriptions-item label="用户昵称">{{ userInfo.nickName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ userInfo.name || '-' }}</el-descriptions-item>
        <el-descriptions-item label="证件类型">{{ userInfo.certificatesType || '-' }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{ maskIdCard(userInfo.certificatesNo) }}</el-descriptions-item>
        <el-descriptions-item label="账号状态">
          <el-icon class="status-icon"><Operation /></el-icon>
          <el-tag :type="userInfo.status === 1 ? 'success' : 'danger'" size="small">
            {{ userInfo.status === 1 ? '正常' : '异常' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </section>

    <!-- 安全设置 -->
    <section class="security-section">
      <h3 class="section-title">
        <el-icon><Lock /></el-icon>
        安全设置
      </h3>
      
      <div class="security-list">
        <div class="security-item">
          <div>
            <p class="item-title">登录密码</p>
            <p class="item-desc">定期修改密码可以保护账号安全</p>
          </div>
          <el-button type="primary" plain size="small">修改密码</el-button>
        </div>
        <div class="security-item">
          <div>
            <p class="item-title">手机绑定</p>
            <p class="item-desc">已绑定：{{ formatPhone(userInfo.phone) }}</p>
          </div>
          <el-button type="primary" plain size="small">更换手机</el-button>
        </div>
      </div>
    </section>

    <!-- 退出登录 -->
    <section class="logout-section">
      <el-popconfirm title="确定要退出登录吗？" @confirm="logout">
        <template #reference>
          <el-button type="danger">退出登录</el-button>
        </template>
      </el-popconfirm>
    </section>

    <!-- 编辑昵称弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑昵称" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户昵称">
          <el-input v-model="editForm.nickName" placeholder="请输入昵称" maxlength="20" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUserInfo">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { reqUserInfo, reqUpdateUserInfo, reqUploadAvatar } from '@/api/user';
import type { UserInfo, UserUpdateParams } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import type { UploadRequestOptions } from 'element-plus';
import { Edit, UserFilled, Lock, Operation } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();

const userInfo = ref<UserInfo>({} as UserInfo);
const dialogVisible = ref(false);
const editForm = reactive({ nickName: '' });

const welcomeMessage = computed(() => 
  userInfo.value.authStatus === 0 
    ? '建议您尽快完善实名认证，以便享受完整的挂号服务'
    : '欢迎来到尚医通，祝您身体健康，生活愉快！'
);

const formatPhone = (phone?: string) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || '-';

const maskIdCard = (id?: string) => {
  if (!id) return '-';
  return id.length === 18 ? id.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2') : id;
};

const getUserInfo = async () => {
  const result = await reqUserInfo();
  if (result.code === 200) userInfo.value = result.data;
};

const openEditDialog = () => {
  editForm.nickName = userInfo.value.nickName || '';
  dialogVisible.value = true;
};

const saveUserInfo = async () => {
  if (!editForm.nickName.trim()) {
    ElMessage.warning('昵称不能为空');
    return;
  }
  const params: UserUpdateParams = { id: userInfo.value.id, nickName: editForm.nickName };
  await reqUpdateUserInfo(params);
  ElMessage.success('修改成功');
  dialogVisible.value = false;
  getUserInfo();
};

const beforeAvatarUpload = (file: File) => {
  const isValid = ['image/jpeg', 'image/png'].includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isValid) ElMessage.error('头像格式必须是 JPG 或 PNG');
  if (!isLt2M) ElMessage.error('头像大小不能超过 2MB');
  return isValid && isLt2M;
};

const uploadAvatar = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append('file', options.file);
  const result = await reqUploadAvatar(formData);
  if (result.code === 200) {
    ElMessage.success('头像上传成功');
    userInfo.value.param = { ...userInfo.value.param, avatar: result.data };
    getUserInfo();
  }
};

const goEdit = () => router.push('/user/certification');
const logout = () => {
  userStore.logout();
  router.push('/home');
  ElMessage.success('退出登录成功');
};

onMounted(getUserInfo);
</script>

<style scoped lang="scss">
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 通用标题样式
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  
  .el-icon {
    color: #409eff;
  }
}

// 用户信息卡片
.user-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  .avatar-upload {
    text-align: center;
    cursor: pointer;
    
    .el-avatar {
      background: #409eff;
      font-size: 28px;
    }
    
    .upload-tip {
      display: block;
      margin-top: 8px;
      font-size: 12px;
      color: #909399;
    }
  }
  
  .user-info {
    flex: 1;
    
    .name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #303133;
        cursor: pointer;
        
        &:hover {
          color: #409eff;
        }
        
        .edit-icon {
          font-size: 14px;
          margin-left: 4px;
        }
      }
    }
    
    .status-icon {
      margin-right: 4px;
      vertical-align: middle;
      color: #909399;
    }
    
    .welcome {
      font-size: 13px;
      color: #909399;
    }
  }
}

// 账号详情
.info-section {
  padding: 20px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

// 安全设置
.security-section {
  padding: 20px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  .security-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .security-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 6px;
    
    .item-title {
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 4px;
    }
    
    .item-desc {
      font-size: 12px;
      color: #909399;
    }
  }
}

// 退出登录
.logout-section {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
</style>