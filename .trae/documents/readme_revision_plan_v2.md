# 通用医疗项目 README.md 修正计划 (v2)

本计划旨在根据用户反馈，修正 `README.md` 中的项目定位和描述错误，重新生成一份精准反映“通用医疗”前端工程特性的文档。

## 1. 核心修正点
- **项目名称**: 从“尚医通”更正为 **“通用医疗 (Universal Medical)”**。
- **项目定位**: 从“全栈式平台”更正为 **“基于 Vue 3 + Mock 的纯前端医疗预约挂号平台”**。
- **技术架构**: 明确 **Frontend + Mock** 模式，强调无后端依赖，数据完全由本地 Mock 服务提供。

## 2. 文档结构设计

### 2.1 Hero Section (首屏)
- **Title**: 通用医疗 (Universal Medical)
- **Slogan**: "现代化纯前端医疗预约挂号平台 | Vue 3 + TypeScript + Vite + Mock.js"
- **Badges**:
  - `Build: Passing`
  - `Vue: 3.x`
  - `TypeScript: 4.x`
  - `Mock: Enabled` (新增)
- **Key Metrics**:
  - 零后端依赖 (Zero Backend Dependency)
  - 100% Mock 数据覆盖
  - 首屏加载 < 1.0s

### 2.2 Live Demo (在线演示)
- 说明演示环境为纯前端静态部署，数据由 Service Worker 或拦截器模拟。
- 测试账号保持不变（手机号 13800138000）。

### 2.3 Architecture (系统架构) - *重点修改*
- 使用 **Mermaid flowchart TD** 绘制架构图，强调 Mock 层的核心地位：
  - **View Layer**: Vue 3 Components (Home, Detail, User)
  - **State Layer**: Pinia Stores (User, Hospital)
  - **Data Layer**: Axios Interceptor -> **Mock.js / Vite Plugin Mock** (而非真实后端)

### 2.4 Features (核心功能)
- **业务模拟**:
  - 医院检索与详情展示 (Mock 数据)
  - 挂号流程全模拟 (Mock 订单创建)
  - 用户登录与实名认证 (Mock 鉴权)
- **工程化特性**:
  - 组件化开发 (Element Plus 二次封装)
  - 类型安全 (TypeScript 接口定义)
  - 性能优化 (路由懒加载、骨架屏、图片懒加载)

### 2.5 Project Structure (目录结构)
- 简要展示 `src` 和 `mock` 目录的对应关系，体现 Mock 驱动开发的特点。

### 2.6 Quick Start (快速开始)
- 强调 `npm run dev` 即可启动完整服务（含 Mock）。

## 3. 执行步骤
1.  **重写 README.md**: 基于 v2 计划重写文档内容。
2.  **修正 index.html**: 顺手将 `index.html` 中的 `<title>syt</title>` 修改为 `通用医疗预约挂号平台` 以保持一致性。
3.  **验证**: 确认文档描述与代码库实际情况（Frontend + Mock）完全一致。

## 4. 交付物
- `d:\test\syt\README.md`: 修正后的项目文档。
- `d:\test\syt\index.html`: 修正标题后的入口文件。
