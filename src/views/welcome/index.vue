<template>
  <!-- 编辑数据对话框 -->
  <el-dialog
    v-model="editFormVisible"
    align-center
    class="h-5/6 flex flex-col justify-between"
    show-close
    width="80%"
  >
    <template #header>
      <div class="text-2xl font-bold">审查信息</div>
    </template>
    <!-- 主体内容 -->
    <div class="flex flex-col items-center justify-center grow">
      <!-- 上方原始照片 -->
      <div class="w-5/12 p-2">
        <h3 class="text-center">原始照片</h3>
        <div class="z-0 hover:z-50">
          <img
            :src="originalImage"
            alt="原始照片"
            class="w-full h-auto object-cover border transform transition-transform duration-300 ease-in-out cursor-pointer hover:scale-150"
          />
        </div>
      </div>
      <!-- 下方修改后的照片 -->
      <div class="w-5/12 p-2">
        <h3 class="text-center">修改后照片</h3>
        <div class="z-0 hover:z-50">
          <img
            :src="processedImage"
            alt="修改后照片"
            class="w-full h-auto object-cover border transform transition-transform duration-300 ease-in-out cursor-pointer hover:scale-150 z-0 hover:z-50"
          />
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer flex justify-center space-x-2">
        <!-- 已审核按钮 -->
        <button
          class="w-full h-15 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          type="primary"
          @click="submitEdit"
        >
          已审核
        </button>
      </div>
    </template>
  </el-dialog>

  <div class="rounded-lg p-5">
    <!-- 顶部表单 -->
    <div class="w-full shadow-sm">
      <el-form
        :inline="true"
        :model="queryForm"
        class="font-bold bg-white rounded-lg mb-4 flex items-center"
      >
        <div class="flex space-x-4 items-center">
          <el-date-picker
            v-model="queryForm.selectDateTime"
            date-format="YYYY/MM/DD ddd"
            end-placeholder="结束时间"
            format="YYYY-MM-DD"
            range-separator="至"
            start-placeholder="开始时间"
            type="daterange"
            value-format="YYYY-MM-DD"
            @blur="handleCurrentChange"
            @clear="handleClear"
          />
          <el-form-item class="query-Form-item">
            <button
              class="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-0.5 px-4 rounded-lg hover:shadow-lgtransition-all duration-300 ease-in-out transform hover:-translate-y-1"
              type="primary"
              @click="handleCurrentChange"
            >
              查询
            </button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 表单数据展示 -->
    <div style="width: 100%">
      <el-table :data="tableData" border height="auto">
        <el-table-column align="center" label="序号">
          <template #default="{ $index }">
            {{ adjustedIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="原始照片" prop="image">
          <template v-slot="scope">
            <img
              :src="scope.row.image"
              alt="原始照片"
              style="width: 100px; height: auto"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理后照片" prop="imageCheck">
          <template v-slot="scope">
            <img
              :src="scope.row.imageCheck"
              alt="处理后照片"
              style="width: 100px; height: auto"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="缺陷信息" prop="info">
          <template v-slot="scope">
            <div>
              <el-tag
                v-for="(item, index) in scope.row.info"
                :key="index"
                class="mr-1"
                type="danger"
              >
                {{ item }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" />
        <el-table-column align="center" label="修改时间" prop="updateTime" />
        <el-table-column align="center" label="是否已审核" prop="isVerified">
          <template #default="{ row }">
            <el-tag v-if="row.isVerified === 0" type="danger">未审核</el-tag>
            <el-tag v-else type="success">已审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template #default="{ row }">
            <button
              class="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg"
              type="primary"
              @click="editButton(row)"
            >
              查看详情
            </button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :disabled="disabled"
      :hide-on-single-page="hideOnSinglePage"
      :size="size"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { editWeldInfo, pageQueryWeldInfo } from "@/api/weld/weldDefect.ts";
import { ElMessage } from "element-plus";

const size = ref("default");
const background = ref(true);
const disabled = ref(false);
const hideOnSinglePage = ref(true);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const editFormVisible = ref(false);
const originalImage = ref(null);
const processedImage = ref(null);

const queryForm = reactive({
  selectDateTime: []
});

const editForm = reactive({
  id: "",
  isVerified: ""
});

// 计算表格序号
const adjustedIndex = computed(() => {
  return index => {
    return (currentPage.value - 1) * pageSize.value + index + 1;
  };
});

// 处理date picker清空事件
function handleClear() {
  queryForm.selectDateTime = [];
  handleCurrentChange();
}

// 提交修改信息
async function submitEdit() {
  try {
    editForm.isVerified = 1;
    await editWeldInfo(editForm);
    await handleCurrentChange();
    editFormVisible.value = false;
    ElMessage.success("编辑成功");
  } catch (error) {
    console.error("Failed to update Label data:", error);
  }
}

// 分页查询数据
async function handleCurrentChange() {
  try {
    const response = await pageQueryWeldInfo(
      currentPage.value,
      pageSize.value,
      queryForm
    );
    // 处理 info 字段，将其按照逗号分割成数组
    const processedRecords = response.records.map(record => {
      return {
        ...record,
        info: record.info ? record.info.split(",") : []
      };
    });
    tableData.value = processedRecords;
    total.value = response.total;
  } catch (error) {
    console.error("Failed to fetch Label data:", error);
  }
}

// “查看详情”按钮
const editButton = row => {
  editFormVisible.value = true;
  handleEchoData(row);
};

// 回显数据
async function handleEchoData(row) {
  try {
    originalImage.value = row.image;
    processedImage.value = row.imageCheck;
    editForm.id = row.id;
  } catch (error) {
    console.error("Failed to edit Label data:", error);
  }
}

// 页面加载时获取数据
onMounted(async () => {
  try {
    await handleCurrentChange();
  } catch (error) {
    console.error("Failed to fetch Label data when created:", error);
  }
});
</script>
<style scoped>
.query-Form-item {
  @apply mx-1.5 my-2.5;
}
</style>
