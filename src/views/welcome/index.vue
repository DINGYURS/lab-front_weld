<script lang="ts" setup>
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { router } from "@/router";
import { roleList, roleNameMap, roleCode } from "@/utils/role";

defineOptions({
  name: "Welcome"
});

/**跳转至企业页 */
function goToEnterprise() {
  if (roleCode.value === "admin" || roleCode.value === "user") {
    useMultiTagsStoreHook().handleTags("push", {
      path: "/weld",
      name: "WeldDefect",
      query: { title: "焊缝缺陷" },
      meta: {
        title: "焊缝缺陷",
        dynamicLevel: 1
      }
    });
    router.push({
      name: "weldDefectIndex",
      query: { title: "焊缝缺陷" }
    });
  }
}

goToEnterprise();
</script>

<template>
  <h1>wwwww</h1>
</template>
