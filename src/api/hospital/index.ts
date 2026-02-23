//引入二次封装axios
import request from '@/utils/request';
import type { UserResponseData,DoctorResponseData,HospitalWorkData,HospitalDetail,DeparmentResponseData,LoginData,UserLoginResponseData,WXLoginResponseData, DoctorInfoData } from '@/api/hospital/type';
//枚举请求地址
enum API {
    HOSPITALDETAIL_URL = '/hos/hospital/',
    //获取医院科室列表接口
    HOSPITALDEPARMENT_URL = '/hos/hospital/department/',
    //获取验证码接口
    GETUSERCODE_URL = '/sms/send/',
    //用户登录接口
    USERLOGIN_URL = '/user/login',
    //获取微信扫码登录所需要的地址
    WXLOGIN_URL = '/user/wxlogin/getLoginParam/',
    //获取某一个医院的某一个科室的预约挂号数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    //获取医院某一个科室某一天相应医生排班的数据
    HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    //获取某一个账号下就诊人的信息
    GETUSER_URL = '/user/patient/auth/findAll',
    //获取挂号医生的信息
    GETDOCTOR_URL = '/hosp/hospital/getSchedule/',
}
//获取医院详情的接口
export const reqHospitalDetail = (hoscode: string) => request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL+hoscode); 
//获取医院科室列表接口
export const reqHospitalDepartment = (hoscode: string) => request.get<any,DeparmentResponseData>(API.HOSPITALDEPARMENT_URL+hoscode);
//获取验证码接口
export const reqCode = (phone:string) => request.get<any,any>(API.GETUSERCODE_URL+phone);
//用户登录接口
export const reqUserLogin = (data:LoginData) => request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data);

//获取微信扫码登录生成二维码需要的参数接口
export const reqWxLogin = (wxRedirectUrl: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUrl=${wxRedirectUrl}`);

//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string)=>request.get<any,HospitalWorkData>(API.HOSPITALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`);
//获取医生排班数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string)=>request.get<any,DoctorResponseData>(API.HOSPITALDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`);

//获取某一个账号下就诊人信息
export const reqGetUser = ()=>request.get<any,UserResponseData>(API.GETUSER_URL);

//获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string)=>request.get<any,DoctorInfoData>(API.GETDOCTOR_URL+scheduleId);