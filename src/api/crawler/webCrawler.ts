import { http } from "@/utils/http";

/** 爬取指定网页信息 */
export const getInfoFromWeb = (formData: object) => {
  return http.post("/crawler", {
    data: formData
  });
};
