<template>
  <div class="wechat-login-container">
    <div id="login_container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
  // 1. 定义回调地址
  const redirectUri = window.location.origin + "/wxlogin";
  const mockCode = "MOCK_CODE_" + Math.random().toString(36).substring(7);
  const state = "syt";

  // 2. 生成二维码内容
  const qrData = encodeURIComponent(`${redirectUri}?code=${mockCode}&state=${state}`);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

  // 3. 找到容器并插入图片
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

    // 4. 绑定点击事件
    const qrImg = document.getElementById('mock_qr_code');
    qrImg?.addEventListener('click', () => {
      console.log("正在模拟扫码成功跳转...");
      window.location.href = `${redirectUri}?code=${mockCode}&state=${state}`;
    });
  }

  // 开始轮询查询扫码状态 (模拟)
  userStore.queryState(); 
});
</script>

<style scoped lang="scss">
.wechat-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>
