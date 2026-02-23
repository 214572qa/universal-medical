<template>
    <div class="notice">
       <h1 class="hosname">{{hospitalStore.hospitalInfo.hospital?.hosname}}</h1>
       <div class="top">为方便您早日就医康复，请您认真阅读预约挂号须知：</div>
       <div class="info">
            <div class="tip">一、预约实名制：</div>
            <div class="text">
                统一平台电话预约和网上预约挂号均采取实名制预约，请您在预约时提供真实、准确的个人信息，包括姓名、身份证号、手机号等。
            </div>
        </div>
        <div class="info">
            <div class="tip">二、预约挂号：</div>
            <div class="text">
                1. 患者在预约时，需提供真实、准确的个人信息，包括姓名、身份证号、手机号等。<br>
                2. 患者在预约时，需选择合适的就诊时间和就诊科室。<br>
                3. 患者在预约时，需支付预约挂号费用。
            </div>
        </div>
        <div class="info">
            <div class="tip">三、预约取消：</div>
            <div class="text">
                已完成预约的号源，需办理退号，至少在就诊前一工作日14：00前通过网站、微信公众号、114电话等平台预约渠道办理退号。
            </div>
        </div>
        <div class="info">
            <div class="tip">四、爽约处理：</div>
            <div class="text">
                如果预约成功后患者未能按时处理就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：<br>
                1. 患者在自然年内爽约次数不超过3次，自爽约日起，90天内不得再次预约挂号。<br>
                2. 患者在自然年内爽约次数超过6次，自爽约日起，180天内不得再次预约挂号。
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取医院详情数据进行展示
import useDetailStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.notice{
   .hosname{
    text-align: center;
    font-size: 30px;
   }
   .top{
    color: #7f7f7f;
    margin: 10px 0px;
   }
   .info{
    .tip{
       color: red;
       font-weight: 900; 
    }
    .text{
       color: #7f7f7f;
       margin: 10px 0px;
       line-height: 30px;
    }
   }
}
</style>