# README.md 更新计划 (README Update Plan)

基于对项目结构和代码实现的重新分析，以下是更新 `d:\test\syt\README.md` 的详细计划。

## 1. 现状分析 (Analysis)

### 1.1 版本信息 (Version Info)
当前 README 中的徽章 (Badges) 信息已过时，与 `package.json` 不符：
- **TypeScript**: 文档显示 `4.x`，实际为 `~5.9.3`。
- **Vite**: 文档显示 `4.x`，实际为 `^7.2.4`。
- **Pinia**: 文档显示 `2.x`，实际为 `^3.0.4`。

### 1.2 Mock 导航 (L153-162)
- 当前描述 "所有 Mock 规则目前集中在 `mock/hospital.ts`" 是准确的。
- 实际 `mock/hospital.ts` 不仅包含静态数据，还包含**内存持久化逻辑** (CRUD, search, filtering)，这一点在文档中未充分体现。

### 1.3 Mock 扩展指南 (L201-257)
- 当前示例过于简单，仅展示了静态 GET 请求。
- 实际项目使用了 `MockRequest` 接口处理请求参数 (`body`, `query`, `params`)。
- 实际项目使用了统一的响应结构 `{ code, message, ok, data }`，且在 `src/api/types/common.ts` 中定义了 `ResponseData<T>`。
- 现有指南未展示如何处理 POST 请求或动态参数，缺乏实用性。

## 2. 更新内容 (Proposed Changes)

### 2.1 更新顶部徽章 (Top Badges)
更新 TypeScript, Vite, Pinia 的版本号以匹配 `package.json`。

### 2.2 优化 Mock 导航说明 (Update L153-162)
- **保留** "集中管理" 的现状说明，但**强调** `mock/hospital.ts` 的内存数据库特性。
- **增强** 拆分建议，明确推荐将新模块（如 User, Order）独立文件管理。

### 2.3 重写 Mock 扩展指南 (Update L201-257)
将指南升级为 "最佳实践" 模式，展示一个完整的、带参数处理的 Mock 接口流程。

#### Step 1: 定义类型 (Type Definition)
使用项目通用的 `ResponseData` 泛型接口。

```typescript
import { ResponseData } from '@/api/types/common';

export interface UserInfo {
  name: string;
  age: number;
  avatar: string;
}

export type UserInfoResponseData = ResponseData<UserInfo>;
```

#### Step 2: 编写 API (API Definition)
展示标准的 API 定义方式。

```typescript
import request from '@/utils/request';
import type { UserInfoResponseData } from './type';

enum API {
  USER_INFO = '/user/info',
}

export const reqUserInfo = (id: number) => 
  request.get<any, UserInfoResponseData>(API.USER_INFO + `/${id}`);
```

#### Step 3: 配置 Mock (Mock Configuration)
展示如何处理 `MockRequest` 和动态逻辑。

```typescript
import { MockMethod } from 'vite-plugin-mock';

// 模拟内存数据
const users = [{ id: 1, name: '张三', age: 18 }];

export default [
  {
    url: '/api/user/info/:id',
    method: 'get',
    response: (req: { query: any; body: any; params: any }) => {
      const { id } = req.params;
      const user = users.find(u => u.id == id);
      
      if (user) {
        return {
          code: 200,
          message: '成功',
          ok: true,
          data: user
        };
      } else {
        return {
          code: 201,
          message: '用户不存在',
          ok: false,
          data: null
        };
      }
    }
  }
] as MockMethod[];
```

## 3. 执行步骤 (Execution Steps)

1.  **修改 README.md**:
    - 更新顶部 Badges。
    - 替换 `## 🛠️ Mock 扩展指南` (L201-257) 的内容。
    - 优化 `## 🧭 API 与 Mock 导航` (L153-162) 的提示文字。
2.  **验证**:
    - 确认 Markdown 格式正确。
    - 确认代码示例无语法错误且符合项目规范。

此计划旨在使文档与实际代码实现保持一致，并提供更有价值的开发指导。
