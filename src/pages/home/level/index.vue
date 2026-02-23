<template>
    <div class="level">
        <h1>医院等级</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital">
                <li  :class="{active:activeFlag === ''}" @click="changeLevel('')">全部</li>
                <li v-for="level in LevelArr" :key="level.id" :class="{active:activeFlag === level.value}" @click="changeLevel(level.value)">{{level.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入数据接口
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

//控制医院等级高亮响应式数据
let activeFlag = ref<string>('');
//定义一个数组用于存储医院等级数据
const LevelArr = ref<HospitalLevelAndRegionArr>([]);
//组件挂载完毕
onMounted(() => {
   getLevevl();
})

//获取医院等级数据
const getLevevl = async() => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion(
        'HosType'
    );
    // 存储医院等级的数据 ,将获取到的医院等级数据赋值给LevelArr
    if (result.code === 200) {
        LevelArr.value = result.data;
    }
}

//点击点击的铵钮回调
const changeLevel = (level: string) => {
    //高亮的响应式数据存储level数值
    activeFlag.value = level;
    //点击时，触发自定义事件，将医院等级参数传递给父组件
    $emit('getLevel', level);
}

let $emit = defineEmits(['getLevel']);
</script>

<script lang="ts">
    export default {
        name: 'Level'
    }
</script>

<style scoped lang="scss">
.level{
    color: #7f7f7f;
    h1{
        font-weight: 900;
        margin:10px 0;
    }

    .content{
        display: flex;
        .left{
            font-size: 18px;
            font-weight: 900;
            margin-right: 10px;
        }
        .hospital{
            display: flex;
            li{
                margin-left: 10px;
                &.active{
                    color:  #55a6fe;
                }
            }

            li:hover{
                color:  #55a6fe;
                //光标变成小手
                cursor: pointer;
            }
        }
    }
}
</style>