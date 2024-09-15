import { http } from "@/utils/http";

export interface Role {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
  roleCode: string;
  roleName: string;
  companyId: number;
  companyName: string;
  deptId: number;
  deptName: string;
  userId?: any;
}
export type UserResult = {
  /** 用户名 */
  username: string;
  /** 当前登陆用户的角色 */
  roles: Array<Role>;
  message: string;
};

export type RefreshTokenResult = {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
};

type Result = {
  success: boolean;
  data: Array<any>;
};

/** 获取验证码 */
export const getKaptcha = (data?: object) => {
  return http.request<any>("get", "login/loginKaptcha", { data });
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "login/loginCheck", {
    data
  });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "login/refreshToken", {
    data
  });
};

/** 获取动态菜单，设置为空 */
export const getAsyncRoutes = () => {
  return http.request<Result>("get", "login/getAsyncRoutes");
};
