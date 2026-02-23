import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
//引入医院顶部组件
import HospitalTop from '@/components/hospital_top/index.vue'
//引入医院底部组件
import HospitalBottom from '@/components/hospital_bottom/index.vue'
//引入路由实例
import router from '@/router/index.ts';
//引入 Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入pinia
import pinia from '@/store/index.ts';
//引入登录组件
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/visitor.vue'
//创建app实例
const app = createApp(App)

//注册路由实例
app.use(router)
//注册element-plus
app.use(ElementPlus,{
    locale: zhCn,
})

//注册医院顶部组件
app.component('HospitalTop', HospitalTop)
//注册医院底部组件
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
//注册访客组件
app.component('Visitor', Visitor)
//注册pinia
app.use(pinia);
// 强制开启 Devtools（即使在生产环境）
// 配合 vite.config.ts 中的 __VUE_PROD_DEVTOOLS__ 使用
// @ts-ignore
app.config.devtools = true;

//引入路由鉴权的文件
import './permisstion';

//挂载
app.mount('#app')
