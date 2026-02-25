<template>
    <div class="carousel-wrapper">
        <el-carousel 
            :interval="5000" 
            height="520px" 
            class="hero-carousel"
            indicator-position="outside"
            arrow="always"
            trigger="click"
        >
            <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
                <div class="hero-slide">
                    <img :src="item" alt="" class="hero-bg">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <div class="hero-badge">
                            <span class="badge-icon">★</span>
                            <span>专业医疗服务</span>
                        </div>
                        <h1 class="hero-title">扫一扫 就在一指间</h1>
                        <p class="hero-subtitle">为您提供优质的医疗预约体验，让就医更简单</p>
                        <div class="hero-cta" @click="goToBooking">
                            <span>立即预约</span>
                            <span class="cta-arrow">→</span>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import yiliao1 from '@/assets/yiliao1.png';
import yiliao2 from '@/assets/yiliao2.png';
import yiliao3 from '@/assets/yiliao3.png';
import yiliao4 from '@/assets/yiliao4.png';

const router = useRouter();
const carouselImages = [yiliao1, yiliao2, yiliao3, yiliao4];

const goToBooking = () => {
    router.push('/hospital/register');
};
</script>

<style scoped lang="scss">
$color-primary: #0ea5e9;
$color-white: #ffffff;
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
$radius-xl: 24px;
$radius-full: 9999px;

.carousel-wrapper {
    width: 100%;
    background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
    padding: 20px 0 60px;
}

.hero-carousel {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: $radius-xl;
    overflow: hidden;
    box-shadow: $shadow-xl;
    
    :deep(.el-carousel__container) {
        height: 520px;
        border-radius: $radius-xl;
    }
    
    :deep(.el-carousel__item) {
        border-radius: $radius-xl;
        overflow: hidden;
    }
    
    :deep(.el-carousel__indicators) {
        bottom: -50px;
        
        .el-carousel__indicator {
            padding: 12px 8px;
            
            .el-carousel__button {
                width: 48px;
                height: 6px;
                border-radius: 3px;
                background-color: rgba(14, 165, 233, 0.25);
                transition: all 0.4s ease;
            }
            
            &.is-active .el-carousel__button {
                width: 64px;
                background: linear-gradient(90deg, $color-primary 0%, #38bdf8 100%);
            }
        }
    }
    
    :deep(.el-carousel__arrow) {
        width: 56px;
        height: 56px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        
        &:hover {
            background: $color-white;
            transform: scale(1.1);
        }
        
        i {
            color: $color-primary;
            font-size: 22px;
        }
    }
    
    :deep(.el-carousel__arrow--left) { left: 30px; }
    :deep(.el-carousel__arrow--right) { right: 30px; }
}

.hero-slide {
    position: relative;
    width: 100%;
    height: 100%;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        135deg,
        rgba(15, 23, 42, 0.7) 0%,
        rgba(15, 23, 42, 0.4) 50%,
        rgba(14, 165, 233, 0.3) 100%
    );
}

.hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
    color: $color-white;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: $radius-full;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 24px;
    
    .badge-icon {
        color: #fbbf24;
        font-size: 16px;
    }
}

.hero-title {
    font-size: 56px;
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(135deg, $color-white 0%, #e0f2fe 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 40px;
    max-width: 500px;
    line-height: 1.6;
}

.hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 40px;
    background: $color-white;
    color: $color-primary;
    font-size: 18px;
    font-weight: 600;
    border-radius: $radius-full;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(14, 165, 233, 0.4);
        
        .cta-arrow {
            transform: translateX(6px);
        }
    }
    
    .cta-arrow {
        font-size: 20px;
        transition: transform 0.3s ease;
    }
}

@media (max-width: 768px) {
    .hero-carousel {
        margin: 0 16px;
        
        :deep(.el-carousel__container) {
            height: 420px;
        }
    }
    
    .hero-title {
        font-size: 36px;
    }
    
    .hero-subtitle {
        font-size: 16px;
    }
}
</style>