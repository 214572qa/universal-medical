export interface ResponseData {
    "code": number;
    "message": string;
    "ok":boolean
}
//提交订单接口返回的数据的ts类型
export interface SubmitOrder extends ResponseData {
    "data": number;
}

//订单详情数据的ts类型
export interface OrderInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param":{
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "patientId": string,
    "patientName": string,
    "patientPhone": string,
    "reserveTime": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}
//定义订单接口返回的数据ts类型
export interface OrderResponseData extends ResponseData {
    "data": OrderInfo;
}

//获取二维码接口返回的数据ts类型
export interface PayInfo{
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}

export interface QrCode extends ResponseData {
    "data": PayInfo;
}

//查询支付结果的ts数据类型
export interface PayResult extends ResponseData {
    "data":boolean
}

//代表一个用户信息的数据类型
export interface UserInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        avatar?: string;
    },
    "openid": null,
    "certificatesType": string,
    "certificatesNo": string,
    "certificatesUrl": null,
    "nickName": string,
    "name": string,
    "phone": string,
    "authStatus": number,
    "status": number
}

//获取用户信息接口返回的数据的ts类型
export interface UserInfoResponseData extends ResponseData {
    "data": UserInfo;
}

//代表证件类型的数据ts
export interface CertationType {
    "id":number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
    },
    "parentId": number,
    "dictCode": string,
    "value": string,
    "name": string,
    "hasChildren": boolean
}

export type CertationArr = CertationType[];

export interface CertationTypeResponseData extends ResponseData {
    "data": CertationArr;
}

//用户认证携带的参数的ts类型
export interface UserParams {
    "certificatesUrl": string,
    "certificatesType": string,
    "certificatesNo": string,
    "name": string
}

//代表一个订单的数据的ts类型
export interface Order {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depname": string,
    "scheduleId": null,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

export type Records = Order[];
//获取订单接口数据的ts类型
export interface UserOrderInfoResponseData extends ResponseData {
    "data": {
        "total": number,
        "records": Records,
        "size": number,
        "current": number,
        "pages": number,
        "hitCount": boolean,
        "searchCount": boolean,
        "orders":[]
    };
}

//代表就诊人的ts类型
export interface User {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString":null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "phone": string,
    "sex": number,
    "bithdata": string,
    "isMarry": number,
    "provinceCode": null,
    "cityCode":null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo":null,
    "status":string
}
//保存全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的接口返回数据的ts类型
export interface AllUserResponseData extends ResponseData {
    "data": AllUser;
}

//订单状态的ts类型
export interface OrderState {
    "comment":string,
    "status":number
}

export type AllOrderState = OrderState[];
//全部订单状态码接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
    "data": AllOrderState;
}

export interface City {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
    },
    "parentId": number,
    "dictCode": null,
    "value": string,
    "name": string,
    "hasChildren": boolean
}
export type CityArr = City[];
export interface CityResponseData extends ResponseData {
    "data": CityArr;
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
    id?:string,
    name:string,
    certificatesType:string,
    certificatesNo:string,
    phone:string,
    sex:number,
    birthdate:string,
    isMarry:number,
    districtCode:string,
    address:string,
    addressSelected:string[],
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string,
    isInsure:number
}

//修改用户信息的ts类型
export interface UserUpdateParams {
    id?: number,
    name?: string,
    nickName?: string,
    certificatesType?: string,
    certificatesNo?: string,
    phone?: string,
    headImg?: string
}

//上传头像接口返回的数据ts类型
export interface UploadResponse extends ResponseData {
    data: string // 假设返回的是图片URL
}
