//路由鉴权：就是路由能不能被访问到权限设置->全局守卫完成
//引入路由器
import router from "./router";
//引入进度条
import Nprogress from "nprogress";
//引入大仓库
import useUserStore from "./store/modules/user";
//引入进度条样式
import "nprogress/nprogress.css";

//进度条加载的加载小球不需要
Nprogress.configure({ showSpinner: false });

//存储用户未登录可以访问路由的路径
let whiteList = ["/home", "/hospital/register", "/hospital/detail", "/hospital/notice","/hospital/close","/hospital/search"];
//添加相应的全局守卫
//前置守卫
router.beforeEach((to, from, next) => {
    // 在守卫内部获取 store 实例，确保 Pinia 已经注册
    let userStore = useUserStore();
    //访问路由组件之前，进度条开始动
    Nprogress.start();
    //动态设置网页左上角的标题
    document.title = `医院-${to.meta.title}`
    
    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    //用户登录
    if (token) {
        next();
    }else{
        //用户未登录
        if (whiteList.includes(to.path)) {
            next();
        }else{

            //登录组件显示不出来
            userStore.visible = true;
            next({ path: '/home', query: { redirect: to.fullPath } })
        }
    }
});

//后置守卫
router.afterEach((to, from) =>{
    //访问路由组件成功后，进度条结束
    Nprogress.done();
});