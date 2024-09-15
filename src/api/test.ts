import { http } from "@/utils/http";

export type TestData = {
  testId?: number;
  testName: string;
  testInfo: string;
  testFather?: number;
  children?: TestData[];
  leaf?: boolean;
};

export const getTestTree = () => {
  return http.request<TestData[]>("post", "/test/tree");
};
