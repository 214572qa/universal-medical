//定义首页模块数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//定义医院数据类型
export interface hospital{
    "id": string,
    "name": string,
    "updateTime": string,
    "isDeleted": number,
    params:{
        "hostypeString": string,
        "fullAddress": string,
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "serviceCount": number,
        "quitTime": number,
        "rule": string[],
        "quitDay": number,
    }
}

//存储全部的已有医院的数组类型
export type Content = hospital[];

//获取已有医院接口返回的数据ts类型
export interface HospitalResponseData extends ResponseData{
    data:{
        content: Content,
        "pageable": {
            "sort": {
                "empty": boolean,
                "sorted": boolean,
                "unsorted": boolean,
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean,
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "size": number,
        "number": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean,
        },
        "numberOfElements": number,
        "empty": boolean,
    }
}

//代表医院等级与地区所返回的数据的ts类型
export interface HospitalLevelAndRegion{
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param":[],
    "parentId": string,
    "value": string,
    "name": string,
    "dictCode": string,
    "hasChildren": boolean,
}
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];
//获取等级或地区接口返回的数据ts类型
export interface HospitalLevelAndRegionResponseData extends ResponseData{
    data: HospitalLevelAndRegionArr,
}

export interface HospitalInfo extends ResponseData{
    data:Content
}
