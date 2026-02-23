/**
 * 统一API响应数据类型定义
 * 解决ResponseData在多个文件中重复定义的问题
 */

// 统一响应数据结构
export interface ResponseData<T = any> {
  code: number;
  message: string;
  ok: boolean;
  data: T;
}

// 分页请求参数
export interface PaginationParams {
  page: number;
  limit: number;
}

// 分页响应数据结构
export interface PaginatedData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 分页响应
export interface PaginatedResponseData<T> extends ResponseData<PaginatedData<T>> {}

// HTTP错误码映射类型
export interface HttpErrorConfig {
  message: string;
  action?: () => void;
}

export type HttpErrorConfigs = Record<number, HttpErrorConfig>;

// API请求状态
export interface RequestState<T = any> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

// 通用ID类型
export type ID = string | number;

// 时间戳类型
export type Timestamp = string; // 格式: "yyyy-MM-dd HH:mm:ss"

// 状态枚举 - 通用启用/禁用
export enum EnableStatus {
  DISABLED = 0,
  ENABLED = 1,
}

// 删除标记
export enum DeleteFlag {
  NORMAL = 0,
  DELETED = 1,
}
