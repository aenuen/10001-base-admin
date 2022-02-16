<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <div style="width: 100%;overflow: hidden;margin-bottom: 20px;">
      <el-button class="el-icon-printer" style="float:right;" @click="printContent">打印工资发放表</el-button>
      <el-button class="el-icon-edit" style="float:right;margin:0 10px 0 0; " @click="batchUpdate">批量编辑</el-button>
      <el-button class="el-icon-edit" style="float:right;margin-right:10px;" @click="editTableSwitch">{{ isEdit ? '关闭编辑' : '编辑个人所得税' }}</el-button>
    </div>
    <div v-if="isEdit">
      <el-form v-model="postForm" style="width:360px;margin:auto">
        <el-row v-for="item in postForm" :key="item.id">
          <el-col>
            <el-form-item :label="`${item.name}`" :label-width="labelWidth">
              <el-input v-model="item.myIncomeTax" placeholder="请输入个人所得税" type="number" :min="0" style="width:200px" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label-width="labelWidth">
              <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="updateIncomeTax">编辑个人所得税</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-else id="printGrantTable">
      <div style="width:100%;margin:10px 0;overflow:hidden;font-size:14px;line-height:30px;color:#999;font-family:Helvetica,sans-serif;">
        <em style="display:block;font-style:normal;float:left;width:30%;">编制单位:{{ theCompany }}</em>
        <em style="display:block;font-style:normal;float:left;width:30%;">所属期:{{ theYearMonth }}</em>
        <em style="display:block;font-style:normal;float:left;width:30%;">发放日期:{{ nextYearMonth }}</em>
        <em style="display:block;font-style:normal;float:left;width:10%;text-align:right">金额单位：元</em>
      </div>
      <el-table
        :key="key"
        :data="list"
        show-summary
        border
        fit
        highlight-current-row
        style="width: 100%"
        @row-dblclick="editRow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="showBatchUpdate" type="selection" align="center" width="55" />
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
        <el-table-column :label="`${fields['department']}`" align="center">
          <template slot-scope="{row:{department}}"><span>{{ department }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['team']}`" align="center">
          <template slot-scope="{row:{team}}"><span>{{ team }}</span></template>
        </el-table-column>
        <el-table-column label="应发工资" align="center">
          <el-table-column prop="basePay" :label="`${fields['basePay']}`" align="center" />
          <el-table-column prop="meritPay" :label="`${fields['meritPay']}`" align="center" />
          <el-table-column prop="subtotal01" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="其他应扣" align="center">
          <el-table-column label="缺勤扣款" align="center">
            <el-table-column prop="days" label="天数" align="center" />
            <el-table-column prop="deduction" label="扣款" align="center" />
          </el-table-column>
          <el-table-column prop="subtotal02" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="代扣代缴" align="center">
          <el-table-column :label="`${fields['myPension']}`" align="center">
            <el-table-column prop="myPension" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myUnemployment']}`" align="center">
            <el-table-column prop="myUnemployment" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myMedicalCare']}`" align="center">
            <el-table-column prop="myMedicalCare" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column prop="myIncomeTax" :label="`${fields['personal']}${fields['myIncomeTax']}`" align="center" />
          <el-table-column prop="subtotal03" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column prop="subtotal04" label="实发工资" align="center" width="120px" />
        <el-table-column v-if="showDelete" :label="fields.work" align="center">
          <template slot-scope="{row:{id}}">
            <el-button type="danger" size="mini" class="el-icon-delete" @click="onDeleteMonthRow(id)" />
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="haveForm.length>0"
        :key="2"
        :data="noneForm"
        show-summary
        border
        fit
        highlight-current-row
        :show-header="false"
        style="width: 100%;margin-top:30px;"
        @row-dblclick="editRow"
      >
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
        <el-table-column :label="`${fields['department']}`" align="center">
          <template slot-scope="{row:{department}}"><span>{{ department }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['team']}`" align="center">
          <template slot-scope="{row:{team}}"><span>{{ team }}</span></template>
        </el-table-column>
        <el-table-column label="应发工资" align="center">
          <el-table-column prop="basePay" :label="`${fields['basePay']}`" align="center" />
          <el-table-column prop="meritPay" :label="`${fields['meritPay']}`" align="center" />
          <el-table-column prop="subtotal01" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="其他应扣" align="center">
          <el-table-column label="缺勤扣款" align="center">
            <el-table-column prop="days" label="天数" align="center" />
            <el-table-column prop="deduction" label="扣款" align="center" />
          </el-table-column>
          <el-table-column prop="subtotal02" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="代扣代缴" align="center">
          <el-table-column :label="`${fields['myPension']}`" align="center">
            <el-table-column prop="myPension" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myUnemployment']}`" align="center">
            <el-table-column prop="myUnemployment" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myMedicalCare']}`" align="center">
            <el-table-column prop="myMedicalCare" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column prop="myIncomeTax" :label="`${fields['personal']}${fields['myIncomeTax']}`" align="center" />
          <el-table-column prop="subtotal03" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column prop="subtotal04" label="实发工资" align="center" width="120px" />
        <el-table-column v-if="showDelete" :label="fields.work" align="center">
          <template slot-scope="{row:{id}}">
            <el-button type="danger" size="mini" class="el-icon-delete" @click="onDeleteMonthRow(id)" />
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="haveForm.length>0"
        :key="3"
        :data="haveForm"
        show-summary
        border
        fit
        highlight-current-row
        :show-header="false"
        style="width: 100%;margin-top:30px;"
        @row-dblclick="editRow"
      >
        <el-table-column :label="`${fields['id']}`" type="index" align="center" width="80" />
        <el-table-column prop="name" :label="`${fields['name']}`" align="center" />
        <el-table-column :label="`${fields['department']}`" align="center">
          <template slot-scope="{row:{department}}"><span>{{ department }}</span></template>
        </el-table-column>
        <el-table-column :label="`${fields['team']}`" align="center">
          <template slot-scope="{row:{team}}"><span>{{ team }}</span></template>
        </el-table-column>
        <el-table-column label="应发工资" align="center">
          <el-table-column prop="basePay" :label="`${fields['basePay']}`" align="center" />
          <el-table-column prop="meritPay" :label="`${fields['meritPay']}`" align="center" />
          <el-table-column prop="subtotal01" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="其他应扣" align="center">
          <el-table-column label="缺勤扣款" align="center">
            <el-table-column prop="days" label="天数" align="center" />
            <el-table-column prop="deduction" label="扣款" align="center" />
          </el-table-column>
          <el-table-column prop="subtotal02" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column label="代扣代缴" align="center">
          <el-table-column :label="`${fields['myPension']}`" align="center">
            <el-table-column prop="myPension" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myUnemployment']}`" align="center">
            <el-table-column prop="myUnemployment" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column :label="`${fields['myMedicalCare']}`" align="center">
            <el-table-column prop="myMedicalCare" :label="`${fields['personal']}`" align="center" />
          </el-table-column>
          <el-table-column prop="myIncomeTax" :label="`${fields['personal']}${fields['myIncomeTax']}`" align="center" />
          <el-table-column prop="subtotal03" :label="`${fields['subtotal']}`" align="center" />
        </el-table-column>
        <el-table-column prop="subtotal04" label="实发工资" align="center" width="120px" />
        <el-table-column v-if="showDelete" :label="fields.work" align="center">
          <template slot-scope="{row:{id}}">
            <el-button type="danger" size="mini" class="el-icon-delete" @click="onDeleteMonthRow(id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-if="batchUpdateControl" title="月表人员批量编辑" width="800px" :visible.sync="batchUpdateControl">
      <monthBatchUpdate :update-data="multipleSelection" is-batch @onBatchUpdateSuccess="onBatchUpdateSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { printTable } from '@/libs/print'
import { pmMonth } from 'plugins-methods'
import { fields } from '@/views/salary/components/config'
import monthBatchUpdate from './monthBatchUpdate'
import { salaryIncomeTax } from '@/api/salary'

export default {
  name: 'ViewsSalaryComponentsGrantTable', /* 工资发放表 */
  components: { monthBatchUpdate },
  filters: { /* 过滤器 */ },
  directives: { /* 定义指令 */ },
  props: { /* 定义传值 */
    monthData: { type: Array, default: () => [] },
    nowCompany: { type: String, default: '' },
    nowYearMonth: { type: String, default: '' },
    showDelete: Boolean,
    showBatchUpdate: Boolean
  },
  data() { /* 定义数据 */
    return {
      fields: fields,
      key: 1,
      list: [],
      theCompany: '尚德',
      theYearMonth: '',
      nextYearMonth: '',
      isEdit: false,
      labelWidth: '120px',
      postForm: [],
      noneForm: [],
      haveForm: [],
      submitLoading: false,
      multipleSelection: [],
      batchUpdateControl: false
    }
  },
  watch: { /* 监控值变换 */
    monthData(value) {
      this.list = value
      this.postFormParse(value)
    },
    nowCompany(value) {
      this.theCompany = value
    },
    nowYearMonth: {
      handler: function(value) {
        this.theYearMonth = value
        this.nextYearMonth = pmMonth.monthApartNumberDate(`${value}-15`, 1)
      },
      deep: true
    }
  },
  methods: { /* 函数及方法 */
    editTableSwitch() {
      this.isEdit = !this.isEdit
    },
    postFormParse(value) {
      this.postForm = []
      this.noneForm = []
      this.haveForm = []
      value.forEach(item => {
        this.postForm.push({ id: item.id, name: item.name, myIncomeTax: item.myIncomeTax })
        if (item.company === '居乐' && item.team === 'RD01') {
          this.noneForm.push(item)
        } else if (item.company === '居乐') {
          this.haveForm.push(item)
        }
      })
    },
    updateIncomeTax() {
      this.submitLoading = true
      salaryIncomeTax(this.postForm).then(res => {
        const { msg } = res
        this.$message.success(msg)
        this.$emit('onUpdateSuccess')
        this.submitLoading = false
        this.editTableSwitch()
      }).catch(() => {
        this.submitLoading = false
      })
    },
    printContent() {
      printTable('printGrantTable', '工资发放表')
    },
    onDeleteMonthRow(id) {
      this.$emit('onDeleteMonthRow', id)
    },
    editRow(row) {
      this.$emit('onEditMonth', row.id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    batchUpdate() {
      if (this.multipleSelection.length <= 0) {
        this.$message.info('请选择需要批量编辑的内容')
      } else {
        this.batchUpdateControl = true
      }
    },
    onBatchUpdateSuccess() {
      this.$emit('onBatchUpdateSuccess')
      this.batchUpdateControl = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
