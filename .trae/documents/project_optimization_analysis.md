# 项目优化分析与建议报告

## 1. 现有优良实践
*   **路由懒加载**: 项目已在 `src/router/index.ts` 中全面实现了路由组件的按需加载，有效减小了首屏包体积。
*   **状态管理**: 使用 Pinia 进行模块化的状态管理（如 `user`, `hospitalDetail`），逻辑清晰。
*   **API 封装**: Axios 二次封装和 API 接口集中管理（`src/api`），便于维护。

## 2. 性能与体验优化建议

### A. 引入骨架屏 (Skeleton Screens)
目前页面在数据加载期间多为空白或简单的 Loading 状态，建议引入骨架屏提升由于网络延迟带来的视觉体验。

*   **首页医院列表 (`src/pages/home/index.vue`)**:
    *   **现状**: 数据加载前列表区域空白。
    *   **建议**: 使用 `<el-skeleton>` 组件包裹医院列表。在 `hospitalArr` 数据返回前，展示 10 个卡片占位符（包含图片、标题、标签的骨架结构）。

*   **医院详情页 (`src/pages/hospital/detail/index.vue`)**:
    *   **现状**: 依赖可选链 `?.` 渲染，数据未加载时文字部分为空，图标可能错位。
    *   **建议**: 在页面顶部（医院名、等级、Logo）区域添加骨架屏。当 `hospitalStore.hospitalInfo` 为空时显示占位块。

### B. 图片资源优化
*   **图片懒加载**:
    *   **现状**: 部分组件（如详情页 Logo）使用原生 `<img>` 标签。
    *   **建议**: 将 `<img>` 替换为 Element Plus 的 `<el-image>` 组件，并开启 `lazy` 属性。特别是对于未来可能扩展的长列表图片，能显著节省带宽。
    *   **代码示例**:
        ```vue
        <el-image :src="item.logoData" lazy>
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
        ```

### C. 数据加载策略优化
*   **医院详情页防重复请求**:
    *   **现状**: `hospital/index.vue` (父) 和 `detail/index.vue` (子) 都有获取详情数据的逻辑。
    *   **建议**: 
        1.  优化 `src/store/modules/hospitalDetail.ts` 中的 `getHospital` action，增加缓存判断：如果当前 Store 中的 `hoscode` 与请求的一致且数据不为空，则直接返回，不再发起网络请求。
        2.  或者明确职责：仅由父组件 `hospital/index.vue` 负责获取数据，子组件纯粹展示 Store 中的数据。

### D. 长列表性能 (未来规划)
*   **虚拟滚动**:
    *   如果未来医院列表取消分页改为无限滚动，建议引入虚拟滚动技术（如 `vue-virtual-scroller` 或 Element Plus 的 `Virtual Table`），只渲染可视区域内的 DOM 节点。

## 3. 代码健壮性
*   **类型定义完善**: 建议检查 `src/api` 下的所有 TypeScript 接口定义，尽量减少 `any` 的使用，确保编译期的类型安全。
*   **错误边界**: 在 `App.vue` 或主要布局组件中添加全局错误捕获（`onErrorCaptured`），防止某个组件渲染错误导致整个页面崩溃。

## 4. 实施路线图
1.  **P0 (高优先级)**: [已完成] 首页医院列表骨架屏、医院详情页骨架屏。
2.  **P1 (中优先级)**: [已完成] 图片懒加载替换（`src/pages/home/card` 和 `src/pages/hospital/detail`）、详情页数据请求逻辑优化。
3.  **P2 (低优先级)**: 全局类型检查优化、虚拟滚动预研。
