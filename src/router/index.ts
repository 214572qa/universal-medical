import { createRouter, createWebHistory } from 'vue-router';
//createRouter创建路由实例
const router = createRouter({
    //路由的模式的设置
    history: createWebHistory(),
    //管理路由
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta:{
                title:'首页'
            }
        },
        {
            path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
            children:[
                {
                    path:'/hospital/register',
                    component: () => import('@/pages/hospital/register/index.vue'),
                    meta:{
                        title:'预约挂号'
                    }
                },
                {
                    path:'/hospital/detail',
                    component: () => import('@/pages/hospital/detail/index.vue'),
                    meta:{
                        title:'医院详情'
                    }
                },
                {
                    path:'/hospital/notice',
                    component: () => import('@/pages/hospital/notice/index.vue'),
                    meta:{
                        title:'预约通知'
                    }
                },
                {
                    path:'/hospital/close',
                    component: () => import('@/pages/hospital/close/index.vue'),
                    meta:{
                        title:'停诊信息'
                    }
                },
                {
                    path:'/hospital/search',
                    component: () => import('@/pages/hospital/search/index.vue'),
                    meta:{
                        title:'查询'
                    }
                },
                {
                    path:'register_step1',
                    component: () => import('@/pages/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
                {
                    path:'register_step2',
                    component: () => import('@/pages/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约第二步'
                    }
                }
            ]
        },
        {
            path:'/wxlogin',
            component: () => import('@/pages/wxlogin/index.vue')
        },
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/user',
            component: () => import('@/pages/user/index.vue'),
            children:[
                {
                    path:'certification',
                    component: () => import('@/pages/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },
                {
                    path:'profile',
                    component: () => import('@/pages/user/profile/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },
                {
                    path:'order',
                    component: () => import('@/pages/user/order/index.vue'),
                    meta :{
                        title:'挂号订单'
                    }
                },
                {
                    path:'patient',
                    component: () => import('@/pages/user/patient/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },
                {
                    path:'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                    meta:{
                        title:'信息反馈'
                    }
                }
            ]
        }
    ],
    //滚动行为:控制滚动条滚动到顶部
    scrollBehavior(){
        return {
            top:0,
            left:0
        }
    }
})

//导出路由实例
export default router;