import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { getKaptcha, getLogin, refreshTokenApi } from "@/api/system/login";
import { UserResult, RefreshTokenResult, Role } from "@/api/system/login";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, sessionKey } from "@/utils/auth";
import { roleIdMap, setRoles, roleSessionKey } from "@/utils/role";
import { showErrorMessage } from "@/utils/message";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "",
    // 用户类型
    userType:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.userType ?? 0,
    // 页面级别权限
    roles: storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? [],
    roleId: storageSession().getItem<DataInfo<number>>(sessionKey)?.roleId ?? 0,
    userId:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.userId ?? "",
    roleCode:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.roleCode ?? "",
    roleList: storageSession().getItem<Role[]>(roleSessionKey) ?? [],
    accountId:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.accountId ?? 0
  }),
  actions: {
    /** 获取验证码 */
    async getKaptchaCode() {
      return new Promise<any>((resolve, reject) => {
        getKaptcha()
          .then(data => {
            if (data) {
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储用户类型 */
    SET_USERTYPE(userType: number) {
      this.userType = userType;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    SET_ROLEID(roleId: number) {
      this.roleId = roleId;
    },
    SET_USERID(userId: string) {
      this.userId = userId;
    },
    SET_ACCOUNTID(accountId: number) {
      this.accountId = accountId;
    },
    SET_ROLECODE(roleCode: string) {
      this.roleCode = roleCode;
    },
    SET_ROLELIST(roleList: Array<Role>) {
      this.roleList = roleList;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data) {
              if (Array.isArray(data.roles) && data.roles.length > 0) {
                const role = data.roles[0];
                setRoles(data.roles);
                console.log(role);
                setToken({
                  username: data.username,
                  userType: 1,
                  ...role,
                  roleId: roleIdMap[role.roleCode],
                  roles: [role.roleCode],
                  userId: role.userId
                });
                resolve(data);
              } else {
                reject(data.message);
              }
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      if (this.userType === 2) {
        router.push("/customerLogin");
      } else {
        router.push("/login");
      }
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            setToken(data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
            showErrorMessage("重新获取token失败，请重新登陆");
            this.logOut();
          });
      });
    },
    setRoles(role) {
      return new Promise<any>((resolve, reject) => {
        try {
          setToken({
            username: this.username,
            userType: this.userType,
            ...role,
            roleId: roleIdMap[role.roleCode],
            roles: [role.roleCode]
          });
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
