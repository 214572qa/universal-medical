import type { ResponseData } from "../home/type";

//定义详情接口返回的数据类型
export interface HospitalDetailResponse {
    code: number;
    message: string;
    ok:boolean
}
//代表医院详情的数据类型
export interface HosPitalDetail {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    },
    "hospital":{
        "id":string,
        "createTime":string,
        "updateTime":string,
        "isDeleted":number,
        "param":{
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule":null
    } 
}

//医院详情返回数据ts
export interface HospitalDetail extends ResponseData {
    data: HosPitalDetail;
}

//代表医院科室的数据
export interface Deparment {
    "depcode":string,
    "depname":string,
    "children"?:Deparment []
}

//代表存储医院科室数据类型
export type DeparmentArr = Deparment[]
//获取科室接口返回数据类型
export interface DeparmentResponseData extends ResponseData {
    data: DeparmentArr;
}

//用户登录接口需要携带参数类型
export interface LoginData {
    phone: string,
    code: string
}

//登录接口返回的用户信息类型
export interface UserInfo {
    name: string,
    token: string
}
//登录接口返回数据类型
export interface UserLoginResponseData extends ResponseData {
    data: UserInfo;
}


//定义微信扫码登录返回数据的类型
export interface WXLogin {
    "redirectUrl": string,
    "appid": string,
    "scope": string,
    "state": string
}

export interface WXLoginResponseData extends ResponseData {
    data: WXLogin;
}

//定义预约挂号接口返回数据的类型
export interface Basemap {
    "workDataString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string
}
export interface WorkData {
    "workData": string,
    "workDataMd":string,
    "dayOfWeek":string,
    "docCount":number,
    "reservedNumber":null,
    "availableNumber":number,
    "status":number
}
export type BookingScheduleList = WorkData[]

export interface HospitalWorkData extends ResponseData {
    data:{
        total:number,
        bookingScheduleList:BookingScheduleList,
        baseMap:Basemap
    }
}

//代表的是一个医生的数据
export interface Doctor {
    "id":string,
    "createTime":string,
    "updateTime":string,
    "isDeleted":string,
    "param":{
        "dayOfWeek":string,
        "depname":string,
        "hosname":string
    },
    "hoscode":string,
    "depcode":string,
    "title":string,
    "docname":string,
    "skill": string,
    "workDate":string,
    "workTime":number,
    "reservedNumber":number,
    "availableNumber":number,
    "amount":number,
    "status":number,
    "hosScheduleId":string
}

//数组包含全部医生
export type DocArr = Doctor[]
//获取医生排班接口返回的数据
export interface DoctorResponseData extends ResponseData {
    data: DocArr;
}


//代表的是一个就诊人的数据ts类型
export interface User{
    "id":string,
    "createTime":string,
    "updateTime":string,
    "isDeleted":string,
    "param":{
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString":null,
        "provinceString":null
    },
    "userId":number,
    "name":string,
    "certificatesType":string,
    "certificatesNo":string,
    "sex":number,
    "birthdate":string,
    "phone":string,
    "isMarry":number,
    "provinceCode":null,
    "cityCode":null,
    "districtCode":null,
    "address":string,
    "contactsName":string,
    "contactsCertificatesType":string,
    "contactsCertificatesNo":string,
    "isInsure":number,
    "cardNo":null,
    "status":string,
}
export type UserArr = User[];
export interface UserResponseData extends ResponseData{
    data: UserArr;
}

//获取某一个挂号医生数据详情

export interface DoctorInfoData extends ResponseData {
    data: Doctor;
}