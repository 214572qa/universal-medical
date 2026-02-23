//统一管理首页模块接口
import request from '@/utils/request'
import type { HospitalResponseData, HospitalLevelAndRegionResponseData,HospitalInfo } from './type'
//通过枚举统一管理首页模块接口地址
enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院等级与地区接口地址
    HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    //根据医院关键字获取相关数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/',
}

//获取已有的医院的数据接口
export const reqHospitalList = (page: number, limit: number,hostype = '',districtCode = '') => request.get<any,HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`);

//获取医院等级与地区接口
export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL + dictCode);
//根据医院关键字获取相关数据
export const reqHospitalInfo = (hosname: string) => request.get<any,HospitalInfo>(API.HOSPITALINFO_URL + hosname);
