<template>
  <div class="order-list">
    <label>搜索：</label>
    <el-input v-model="orderId" placeholder="请输入订单号" size="small" @keyup.enter.native="getList($event)"></el-input>
    <label style="margin-left: 80px;">订单状态：</label>
    <el-select v-model="stateValue" placeholder="请选择" size="small" @change="selectChange">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" size="small" @click="getList()">查找</el-button>
    <el-table
      :data="tableData.content"
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        v-for="(item,index) in tabHeader"
        :key="index"
        :label="item.title"
        :width="item.width">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.str==='createdAt'">{{ scope.row[item.str] | changeTime }}</span>
          <div style="margin-left: 10px" v-else-if="item.str==='user' && scope.row['orderLogisticsDo']">
            <p>姓名：{{scope.row['orderLogisticsDo']['receiverName']}}</p>
            <p>联系方式：{{scope.row.orderLogisticsDo.receiverMobile}}</p>
            <p>联系地址：{{scope.row.orderLogisticsDo.receiverProvince}} {{scope.row.orderLogisticsDo.receiverCity}}
              {{scope.row.orderLogisticsDo.receiverDistrict}} {{scope.row.orderLogisticsDo.receiverAddress}} </p>
          </div>
          <span style="margin-left: 10px" v-else-if="item.str==='state'">{{ scope.row[item.str] | stateStatus}}</span>
          <div style="margin-left: 10px" v-else-if="item.str==='picPath'">
            <div class="over">{{scope.row['subProductOrders'][0]['productTitle']}}</div>
            <div class="flex" style="font-size: 10px;line-height:15px;color: #999999;">
              <img :src="scope.row['subProductOrders'][0][item.str]"/>
              <div style="margin-left: 8px;flex:1;">
                <p style="margin-bottom: 15px;">SKU：{{scope.row['subProductOrders'][0]['saleProp']}}</p>
                <p>数量：{{scope.row['subProductOrders'][0]['num']}}</p>
              </div>
            </div>
          </div>
          <span style="margin-left: 10px" v-else-if="item.str==='actualPayment'">{{ scope.row['subProductOrders'][0][item.str]}}</span>
          <span style="margin-left: 10px" v-else>{{ scope.row[item.str] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state==1"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.totalElements">
    </el-pagination>
    <el-dialog title="订单发货" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="form">
        <el-form-item label="物流公司编号" :label-width="formLabelWidth">
          <el-input v-model="form.companyCode"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" :label-width="formLabelWidth">
          <el-input v-model="form.expressNumber"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {orderList, sendGoods} from '@/utils/productApis'

  export default {
    name: "Order-index",
    data() {
      return {
        orderId: '',
        formLabelWidth: '120px',
        tableData: {},
        tabHeader: [
          {title: '订单号', width: '', str: 'orderId'},
          {title: '购买人信息', width: '', str: 'user'},
          {title: '下单时间', width: '', str: 'createdAt'},
          {title: '商品信息', width: '', str: 'picPath'},
          {title: '销售金额(元)', width: '', str: 'actualPayment'},
          {title: '订单状态', width: '', str: 'state'},
        ],
        options: [
          {label: '全部', value: '-1'},
          {label: '待付款', value: '0'},
          {label: '待发货', value: '1'},
          {label: '待收货', value: '2'},
          {label: '已完成', value: '3'},
        ],
        page: 1,
        pageSize: 10,
        stateValue: '-1',
        form: {
          orderId: '',
          companyCode: '',
          expressNumber: ''
        },
        dialogFormVisible: false
      }
    },
    filters: {
      stateStatus(val) {
        if (val == 0) return '待付款'
        else if (val == 1) return '待发货'
        else if (val == 2) return '待收货'
        else if (val == 3) return '已完成'
      }
    },
    components: {},
    computed: {},
    methods: {
      //获取订单列表
      getList() {
        let data = {
          state: this.stateValue,
          page: this.page,
          pageSize: this.pageSize
        }
        orderList(data).then(res => {
          this.tableData = res.data
        }).catch(err => {
          throw err;
        })
      },
      selectChange(e) {
        console.log(this.stateValue)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
      },
      handleEdit(index, item) {//发货
        this.form.orderId = item.orderId
        this.form.companyCode = ''
        this.form.expressNumber = ''
        this.dialogFormVisible = true
      },
      toSure() {//确认发货
        if (!this.form.companyCode || !this.form.expressNumber) {
          this.$message({
            type: 'warning',
            message: '请完善发货信息'
          })
          return
        }
        sendGoods(this.form).then(res => {
          this.$message({type: 'success', message: '发货成功'})
          this.dialogFormVisible = false
          this.getList()
        }).catch(err => {
          throw err
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .order-list .el-input {
    width: 300px;
  }

  .over {
    font-size: 14px;
    line-height: 32px;
  }

  img {
    width: 80px;
    height: 80px;
  }

  .el-pagination {
    text-align: right;
    margin-right: 60px;
    margin-top: 30px;
  }
</style>
