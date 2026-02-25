<template>
  <div class="bottom">
    <div class="content">
      <div class="footer-grid">
        <!-- 品牌信息 -->
        <div class="footer-col brand-col">
          <h3>通用医疗</h3>
          <p class="desc">致力于提供最便捷、专业的医疗预约服务。连接优质医疗资源，守护您的健康。</p>
          <div class="social-links">
            <span class="icon">微信</span>
            <span class="icon">微博</span>
          </div>
        </div>

        <!-- 合作伙伴 -->
        <div class="footer-col">
          <h4>合作伙伴</h4>
          <ul>
            <li>北京协和医院</li>
            <li>解放军总医院</li>
            <li>中日友好医院</li>
            <li>北京大学第一医院</li>
          </ul>
        </div>

        <!-- 帮助中心 -->
        <div class="footer-col">
          <h4>帮助中心</h4>
          <ul>
            <li>注册流程</li>
            <li>预约指南</li>
            <li>常见问题</li>
            <li>意见反馈</li>
          </ul>
        </div>

        <!-- 联系我们 -->
        <div class="footer-col contact-col">
          <h4>联系我们</h4>
          <p>电话：010-5678-8888</p>
          <p>邮箱：service@guangzhou.com</p>
          <p>地址：广州市天河区天河大道</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>京ICP备 13018369号 | 电话挂号010-56253825</p>
        <div class="links">
          <span>联系我们</span>
          <span>合作伙伴</span>
          <span>用户协议</span>
          <span>隐私协议</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom {
  width: 100%;
  background-color: #1a252f; // 深色背景
  color: #bdc3c7;
  padding: $spacing-2xl 0 $spacing-lg;

  .content {
    width: $container-width;
    margin: 0 auto;

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: $spacing-xl;
      margin-bottom: $spacing-2xl;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: $spacing-xl;

      .footer-col {
        h3 {
          color: white;
          font-size: $font-size-xl;
          margin-bottom: $spacing-md;
          font-weight: 700;
        }

        h4 {
          color: white;
          font-size: $font-size-lg;
          margin-bottom: $spacing-md;
          font-weight: 600;
        }

        .desc {
          line-height: 1.6;
          margin-bottom: $spacing-md;
          font-size: $font-size-sm;
        }

        ul {
          li {
            margin-bottom: $spacing-sm;
            cursor: pointer;
            transition: color $transition-base;
            font-size: $font-size-sm;

            &:hover {
              color: $color-primary;
            }
          }
        }

        &.contact-col {
            p {
                margin-bottom: $spacing-sm;
                font-size: $font-size-sm;
            }
        }
        
        .social-links {
            @include flex;
            gap: $spacing-md;
            
            .icon {
                padding: $spacing-xs $spacing-sm;
                background: rgba(255,255,255,0.1);
                border-radius: $radius-sm;
                cursor: pointer;
                transition: all $transition-base;
                font-size: $font-size-xs;
                
                &:hover {
                    background: $color-primary;
                    color: white;
                }
            }
        }
      }
    }

    .footer-bottom {
      @include flex-between;
      font-size: $font-size-xs;
      color: #7f8c8d;

      .links {
        span {
          margin-left: $spacing-md;
          cursor: pointer;
          transition: color $transition-base;

          &:hover {
            color: white;
          }
        }
      }
    }
  }
}
</style>
