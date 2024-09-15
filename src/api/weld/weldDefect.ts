import { http } from "@/utils/http";

// 获取焊缝缺信息
export const pageQueryWeldInfo = (page, pageSize, queryForm: object) => {
  console.log("selectDateTime:", queryForm.selectDateTime);
  return http.get("/weld/page", {
    params: {
      page,
      pageSize,
      begin: queryForm.selectDateTime[0],
      end: queryForm.selectDateTime[1]
    }
  });
};

// 修改焊缝信息
export const editWeldInfo = (editForm: object) => {
  console.log("editForm:", editForm);
  return http.request("put", "/weld", {
    data: editForm
  });
};
