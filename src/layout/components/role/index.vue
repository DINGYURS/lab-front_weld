<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span class="dropdown-badge navbar-bg-hover select-none">
      <IconifyIconOffline :icon="Star" class="star" />
      {{ roleNameMap[roleCode] }}
      <IconifyIconOffline :icon="ArrowDown" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(role, index) in roleList"
          :key="index"
          @click="changeRole(role)"
        >
          {{ role.roleName }}
          <el-tag v-if="role.roleCode === roleCode" size="small" class="ml-1">
            当前
          </el-tag>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { resetRouter } from "@/router";
import { initRouter, getTopMenu } from "@/router/utils";
import { router } from "@/router";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { roleList, roleNameMap, roleCode } from "@/utils/role";
import ArrowDown from "@iconify-icons/ep/arrow-down";
import Star from "@iconify-icons/ep/star";

const userStore = useUserStoreHook();
const multiTagsStore = useMultiTagsStoreHook();

const changeRole = role => {
  if (roleCode.value === role.roleCode) return;
  userStore.setRoles(role).then(() => {
    resetRouter();
    initRouter().then(() => {
      const currentRoute = router.currentRoute.value;
      // console.log(router.resolve(currentRoute.path));
      const topMenu = getTopMenu(true);
      if (currentRoute.path === topMenu.path) {
        router.go(0);
      } else {
        router.push(topMenu.path);
      }

      multiTagsStore.handleTags("splice", "", {
        startIndex: 1,
        length: Array.isArray(multiTagsStore.multiTags)
          ? multiTagsStore.multiTags.length
          : 1
      });
    });
  });
};
</script>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 48px;
  margin-right: 10px;
  cursor: pointer;
}

.star {
  font-size: 18px;
  margin-right: 5px;
}
</style>
