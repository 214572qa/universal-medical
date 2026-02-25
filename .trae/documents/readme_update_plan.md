# 更新 README.md 计划

## 1. 目标
为 Vue3+Mock 医疗项目 `README.md` 补充以下 4 个章节：
1.  **API 与 Mock 导航**：映射关系表。
2.  **环境配置**：环境变量与 Mock 开关。
3.  **Mock 扩展指南**：新增接口三步法。
4.  **部署配置**：Vercel/Netlify SPA fallback 配置。

## 2. 详细内容

### 2.1 API 与 Mock 导航
根据 `ls` 和 `read` 结果：
-   `src/api/home/index.ts` -> 对应 `mock/hospital.ts` (包含医院列表、字典、搜索)
-   `src/api/hospital/index.ts` -> 对应 `mock/hospital.ts` (包含详情、科室、排班)
-   `src/api/user/index.ts` -> 对应 `mock/hospital.ts` (包含登录、验证码、就诊人)

**映射表草稿**：
| 业务模块 | API 文件 | Mock 文件 | 描述 |
| :--- | :--- | :--- | :--- |
| **首页/医院** | `src/api/home/index.ts` | `mock/hospital.ts` | 医院列表、等级/地区字典、搜索 |
| **医院详情** | `src/api/hospital/index.ts` | `mock/hospital.ts` | 详情、科室、排班、预约规则 |
| **用户/登录** | `src/api/user/index.ts` | `mock/hospital.ts` | 登录、验证码、实名认证、就诊人 |

### 2.2 环境配置
-   `vite.config.ts` 使用 `vite-plugin-mock`，配置为 `enable: command === 'serve'`。
-   `.env.development` 定义了 `VITE_API_BASE_URL=/api`。
-   Mock 开关：默认开发环境开启。若需关闭 Mock 连接真实后端，需修改 `vite.config.ts` 或引入 `VITE_USE_MOCK` 变量（当前代码未直接使用该变量，建议在文档中说明**如何修改配置**来实现）。

**文档策略**：
说明默认行为，并给出“连接真实后端”的配置修改示例（修改 `vite.config.ts` 的 `enable` 字段或配置 `server.proxy`）。

### 2.3 Mock 扩展指南
**三步法**：
1.  **定义类型** (`src/api/xxx/type.ts`)
2.  **编写 API** (`src/api/xxx/index.ts`)
3.  **配置 Mock** (`mock/xxx.ts`)

**代码示例**：
使用 `request.get<any, UserResponse>('/user/info')` 风格。

### 2.4 部署配置
项目当前无 `vercel.json` 或 `_redirects`。
**文档策略**：
提供标准的 `vercel.json` 和 `_redirects` 内容供用户复制。

## 3. 执行步骤
1.  读取 `d:\test\syt\README.md` 原文。
2.  在 "开发路线" 章节之前（或合适位置）插入新内容。
3.  验证插入后的 Markdown 格式。
