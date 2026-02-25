//引入二次封装的axios
import request from "@/utils/request";
import type { AddOrUpdateUser,AllOrderStateResponseData,AllUserResponseData,UserOrderInfoResponseData,UserParams,CertationTypeResponseData,UserInfoResponseData,PayResult,QrCode,OrderResponseData,SubmitOrder, CityResponseData, UserUpdateParams, UploadResponse } from "./type";
//枚举地址接口
enum API {
    //提交订单，获取订单号码接口地址
    SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
    //获取订单详情的数据
    GETODERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
    //取消订单接口地址
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    //获取支付订单二维码接口
    QRCODE_URL = '/order/weixin/createNative/',
    //查询订单支付结果的接口
    PAYRESULT_URL = '/order/weixin/queryPayStatus/',
    //获取当前账号的用户信息
    USERINFO_URL = '/user/auth/getUserInfo',
    // 修改当前账号的用户信息
    UPDATE_USERINFO_URL = '/user/auth/updateUserInfo',
    // 上传头像
    UPLOAD_AVATAR_URL = '/file/upload',
    //获取证件类型的接口
    CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
    //用户认证的接口
    USERCERTATION_URL = '/user/auth/userAuah',
    //获取用户订单号的数据
    USERORDERINFO_URL = '/order/orderInfo/auth/',
    //获取全部就诊人的信息
    ALLUSER_URL  = '/user/patient/auth/findAll',
    //获取订单的状态
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
    //获取城市的数据
    CITY_URL = '/cmn/dict/findByParentId/',
    //新增就诊人的接口
    ADDUSER_URL = '/user/patient/auth/save',
    //更新已有的就诊人接口
    UPDATEUSER_URL = '/user/patient/auth/update',
    //删除已有的就诊人接口
    DELETEUSER_URL = '/user/patient/auth/remove/',
}
//提交订单
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:string) => request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`);
//获取订单详情的方法
export const reqOrderInfo = (id:string) => request.get<any,OrderResponseData>(API.GETODERINFO_URL+`${id}`);
//取消订单
export const reqCancelOrder = (id:string) => request.get<any,any>(API.ORDERCANCEL_URL+`${id}`);
//获取支付订单二维码接口
export const reqQrCode = (orderId:string) => request.get<any,QrCode>(API.QRCODE_URL+`${orderId}`);
//查询订单支付结果的接口
export const reqPayResult = (orderId:string) => request.get<any,PayResult>(API.PAYRESULT_URL+`${orderId}`);
//获取当前用户信息的接口
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL);
//修改当前用户信息的接口
export const reqUpdateUserInfo = (data: UserUpdateParams) => request.post<any, any>(API.UPDATE_USERINFO_URL, data);
//上传头像的接口
export const reqUploadAvatar = (formData: FormData) => request.post<any, UploadResponse>(API.UPLOAD_AVATAR_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
//获取证件类型的方法
export const reqCetationType = (CertificatesType:string) => request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+`${CertificatesType}`);
//用户认证接口
export const reqUserCertation = (data:UserParams) => request.post<any,any>(API.USERCERTATION_URL,data);
//获取订单数据接口
export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string) => request.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`);
//获取全部就诊人的信息
export const reqAllUser = () => request.get<any, AllUserResponseData>(API.ALLUSER_URL);
//获取订单的状态
export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL);
//获取城市的数据
export const reqCity = (parentId:string) => request.get<any,CityResponseData>(API.CITY_URL+`${parentId}`);

//新增与修改已有的就诊人接口方法
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
    if (data.id) {
        return request.put(API.UPDATEUSER_URL, data);
    } else {
        return request.post(API.ADDUSER_URL, data);
    }
}

//删除某一个已有的就诊人接口方法
export const reqRemoveUser = (id:number) => request.delete<any,any>(API.DELETEUSER_URL+`${id}`);
