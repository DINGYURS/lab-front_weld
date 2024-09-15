export default {
  path: "/weld",
  meta: {
    title: "焊缝缺陷",
    rank: 5
  },
  children: [
    {
      path: "/weld/index",
      name: "weldDefectIndex",
      component: () => import("@/views/weld/index.vue"),
      meta: {
        title: "焊缝缺陷"
      }
    }
  ]
};
