# 项目 Sass 样式规范 (Sass Style Rules)

本规范基于《医疗预约挂号平台Sass样式与UI界面布局设计指南》制定，旨在统一项目的样式架构、命名规范与编码风格，提升代码的可维护性与扩展性。

## 1. 架构规范 (Architecture)
项目的HTML结构禁止胡乱使用嵌套，如：
```html
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">Card Text</p>
        </div>
      </div>
    </div>
  </div>
</div>
``` ，所有嵌套结构满足样式精确定义即可，禁止过度嵌套，增加代码读取难度。
### 1.1 目录结构 (7-1 Pattern)
采用标准的 7-1 模式组织样式文件，所有样式文件通过 `main.scss` 统一引入。

```
src/styles/
|– abstracts/          # 抽象层：变量、函数、混合宏 (不输出CSS)
|   |– _variables.scss    # 全局变量 (色彩、字体、间距、断点)
|   |– _mixins.scss       # 全局混合宏 (响应式、Flex/Grid、排版)
|   |– _functions.scss    # 全局函数 (流体排版计算、色彩操作)
|
|– base/               # 基础层：重置、排版、全局样式
|   |– _reset.scss        # 浏览器重置样式 (Normalize/Reset)
|   |– _typography.scss   # 全局排版规则 (H1-H6, p, a)
|   |– _utilities.scss    # 通用工具类 (text-center, hidden)
|
|– components/         # 组件层：独立UI组件
|   |– _buttons.scss      # 按钮组件
|   |– _cards.scss        # 卡片组件
|   |– _inputs.scss       # 输入框组件
|   |– _modals.scss       # 模态框组件
|   |– _dropdowns.scss    # 下拉菜单组件
|
|– layout/             # 布局层：页面骨架
|   |– _header.scss       # 头部导航
|   |– _footer.scss       # 底部信息
|   |– _grid.scss         # 网格系统
|   |– _sidebar.scss      # 侧边栏
|
|– pages/              # 页面层：特定页面样式 (尽量少用，优先复用组件)
|   |– _home.scss         # 首页特定样式
|   |– _login.scss        # 登录页特定样式
|
|– themes/             # 主题层 (可选)
|   |– _theme.scss        # 主题变量覆盖
|   |– _dark.scss         # 深色模式变量
|
|– vendors/            # 第三方库样式
|   |– _bootstrap.scss    # Bootstrap 覆盖
|   |– _datepicker.scss   # 日期选择器覆盖
|
|– main.scss           # 主入口文件：按顺序引入以上所有文件
```

### 1.2 引入顺序
在 `main.scss` 中严格按照以下顺序引入：
1.  `abstracts/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

## 2. 命名规范 (Naming Convention)

### 2.1 BEM 命名法
所有组件样式必须遵循 **BEM (Block Element Modifier)** 命名规范。

*   **Block (块)**: 组件的顶级类名，如 `.card`。
*   **Element (元素)**: 组件的子部分，用双下划线连接，如 `.card__header`。
*   **Modifier (修饰符)**: 组件的状态或变体，用双中划线连接，如 `.card--featured`。

**示例**:
```scss
.doctor-card {                // Block
  &__header { ... }           // Element
  &__avatar { ... }           // Element
  
  &--featured {               // Modifier
    .doctor-card__header {    // Modifier 修改 Element
      background-color: $color-primary-light;
    }
  }
}
```

### 2.2 变量命名
使用语义化的命名，遵循 `$category-property-state` 格式。

*   **色彩**: `$color-primary`, `$color-success`, `$color-gray-100`
*   **间距**: `$spacing-xs`, `$spacing-md`, `$spacing-xl`
*   **字体**: `$font-size-base`, `$font-weight-bold`
*   **断点**: `$breakpoint-md`, `$breakpoint-lg`
*   **层级**: `$z-index-modal`, `$z-index-dropdown`

## 3. 编码风格 (Coding Style)

### 3.1 嵌套层级
**严格限制嵌套层级不超过 3 层**。过深的嵌套会导致 CSS 优先级难以管理，且性能较差。

**错误示例**:
```scss
.header {
  .nav {
    .list {
      .item {
        a { ... } // 5层嵌套，难以覆盖
      }
    }
  }
}
```

**正确示例**:
```scss
.header-nav {
  &__list { ... }
  &__item { ... }
  &__link { ... }
}
```

### 3.2 单位使用
*   **字体大小**: 使用 `rem` (相对于根元素)，便于响应式调整。
*   **间距/尺寸**: 使用 `rem` 或 `px` (根据设计稿)。
*   **边框/断点**: 使用 `px` (确保精确性)。
*   **时间**: 使用 `ms` (如 `300ms`)。

### 3.3 颜色使用
**禁止在样式文件中直接使用十六进制颜色值 (Hex Codes)**。必须使用定义好的变量。

**错误**: `color: #3498db;`
**正确**: `color: $color-primary;`

### 3.4 媒体查询
使用混合宏 `@include respond-to($breakpoint)` 管理媒体查询，**移动优先 (Mobile First)**。

```scss
.container {
  width: 100%; // 默认移动端
  
  @include respond-to(md) { // 平板及以上
    max-width: 720px;
  }
  
  @include respond-to(lg) { // 桌面及以上
    max-width: 960px;
  }
}
```

## 4. 核心变量与混合宏 (Core Definitions)

### 4.1 核心色彩
```scss
$color-primary: #3498db; // 海洋蓝
$color-success: #2ecc71; // 草绿色
$color-warning: #f39c12;
$color-danger: #e74c3c;
$color-text-main: #212529; // $gray-900
$color-text-secondary: #6c757d; // $gray-600
$color-bg-body: #f8f9fa; // $gray-100
```

### 4.2 响应式断点
```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

### 4.3 常用混合宏
*   `@mixin flex($dir, $justify, $align)`: Flex布局
*   `@mixin grid($cols, $gap)`: Grid布局
*   `@mixin respond-to($bp)`: 响应式查询
*   `@mixin text-truncate`: 文本截断

## 5. 无障碍设计 (Accessibility)

*   **对比度**: 确保正文文本对比度 > 4.5:1。
*   **触摸目标**: 移动端可点击区域至少 `44x44px`。
*   **状态反馈**: 交互元素必须有 `:hover`, `:active`, `:focus` 状态。
*   **色弱支持**: 状态指示必须结合 **颜色 + 图标/文字**。
