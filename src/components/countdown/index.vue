<template>
    <div>
        <span>获取验证码（{{time}}s）</span>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数ref
import { ref, watch } from 'vue';
//倒计时的事件
let time = ref<number>(5);


//接受父组件传递过来的props->flag:用于控制计数器组件的显示与隐藏
let props = defineProps(['flag']);
let $emit = defineEmits(['getFlag']);
//监听父组件传递过来的props数据变化
watch(
    () => props.flag,
    () => {
        let timer: any;
        // 如果已经有定时器，先清除
        if (timer) clearInterval(timer);
        // 重置倒计时时间
        time.value = 5;
        //开启定时器每个1秒让数值减1
        timer = setInterval(() => {
            time.value--;
            if (time.value === 0) {
                //通知父组件倒计时结束
                $emit('getFlag', false);
                //停止定时器
                clearInterval(timer);
            }
        }, 1000);
    },
    { immediate: true }
)


</script>

<style scoped>

</style>