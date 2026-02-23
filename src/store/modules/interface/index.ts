import type { HosPitalDetail, DeparmentArr, UserInfo } from "@/api/hospital/type";
//定义仓库内部存储数据state的ts类型
export interface DetailState{
    //医院详情数据
    hospitalInfo:HosPitalDetail,
    //存储医院科室数据
    deparmentArr:DeparmentArr
}

//定义用户仓库内部存储数据state的ts类型
export interface UserState {
    visible: boolean,
    code: string,
    userInfo: UserInfo
}