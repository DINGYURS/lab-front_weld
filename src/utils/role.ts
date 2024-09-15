import { useUserStoreHook } from "@/store/modules/user";
import { computed } from "vue";
import { isString } from "@pureadmin/utils";
import { type Role } from "@/api/system/login";
import { storageSession } from "@pureadmin/utils";

export const roleId = computed(() => useUserStoreHook()?.roleId);
export const roleCode = computed(() => useUserStoreHook()?.roleCode);
export const roleList = computed(() => useUserStoreHook()?.roleList);

export const roleIdMap = {
  admin: 1,
  minister: 2,
  leader: 3,
  manager: 4,
  engineer: 5,
  tester: 6,
  courier: 7,
  designer: 8,
  customer: 9,
  test_customer: 10,
  user:11
};

export const roleNameMap = {
  admin: "管理员",
  minister: "部长",
  leader: "主管",
  manager: "业务经理",
  engineer: "项目工程师",
  tester: "试验工程师",
  courier: "样品管理员",
  designer: "工装设计员",
  customer: "商务客户",
  test_customer: "试验客户",
  user:"用户"
};

export function hasRole(value: string | Array<string>): boolean {
  if (!value) return false;
  // 由当前用户信息中roleCode判断是否有对应权限
  const userRole = useUserStoreHook()?.roleCode;
  if (!userRole) return false;
  const isRoles = isString(value)
    ? userRole === value
    : value.includes(userRole);
  return isRoles ? true : false;
}

export const isTodo = computed(() => {
  return hasRole([
    "leader",
    "manager",
    "engineer",
    "tester",
    "courier",
    "designer",
    "test_customer"
  ]);
});

export const roleSessionKey = "user-roles";
export function setRoles(roles: Role[]) {
  useUserStoreHook().SET_ROLELIST(roles);
  storageSession().setItem(roleSessionKey, roles);
}
