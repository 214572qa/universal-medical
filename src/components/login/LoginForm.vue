<template>
  <div class="login-form">
    <el-form :model="loginParam" :rules="rules" ref="formRef">
      <el-form-item prop="phone">
        <el-input 
          placeholder="请输入手机号" 
          :prefix-icon="User" 
          v-model="loginParam.phone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input 
          placeholder="请输入手机验证码" 
          :prefix-icon="Lock" 
          v-model="loginParam.code"
        ></el-input>
      </el-form-item>
      <!-- 验证码按钮 -->
      <el-form-item>
        <el-button :disabled="!isPhone || flag" style="width: 50%">
          <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
          <span v-else @click="getCode">获取验证码</span>
        </el-button>
      </el-form-item>
    </el-form>
    
    <div class="bottom">
      <el-button 
        style="width: 100%;" 
        type="primary" 
        size="default" 
        :disabled="!isPhone || loginParam.code.length < 6" 
        @click="login"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import CountDown from '@/components/countdown/index.vue';
import { validatePhone, validateCode } from '@/utils/validate';
import { PHONE_REGEXP } from '@/utils/constants/regexp';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formRef = ref<FormInstance>();
const flag = ref<boolean>(false);

const loginParam = reactive({
  phone: '',
  code: '',
});

// 计算属性：是否符合手机号格式
const isPhone = computed(() => {
  return PHONE_REGEXP.test(loginParam.phone);
});

// 验证规则
const rules = reactive<FormRules>({
  phone: [{ validator: validatePhone, trigger: 'change' }],
  code: [{ validator: validateCode, trigger: 'blur' }]
});

// 获取验证码
const getCode = async () => {
  if (!isPhone.value || flag.value) return;
  
  flag.value = true;
  try {
    await userStore.getCode(loginParam.phone);
    loginParam.code = userStore.code;
    ElMessage.success('验证码发送成功');
  } catch (error) {
    // 错误已由拦截器处理，此处主要是防止倒计时异常
    // flag.value = false; // 如果发送失败，是否重置倒计时？通常不需要，防止刷接口
  }
};

// 倒计时结束回调
const getFlag = (val: boolean) => {
  flag.value = val;
};

// 登录
const login = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await userStore.userLogin(loginParam);
        userStore.visible = false;
        
        const redirect = route.query.redirect;
        if (redirect) {
          router.push(redirect as string);
        } else {
          router.push('/home');
        }
        ElMessage.success('登录成功');
      } catch (error) {
        // 错误提示已由拦截器处理
      }
    }
  });
};
</script>

<style scoped lang="scss">
.login-form {
  .bottom {
    margin-top: 20px;
  }
}
</style>
