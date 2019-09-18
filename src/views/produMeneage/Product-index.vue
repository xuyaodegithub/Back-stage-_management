<template>
  <div class="hello">
    <div class="seach" v-if="subTitle=='listSub'">
      <label>搜索：</label>
      <el-input v-model="input" placeholder="请输入内容" size="small" @keyup.enter.native="getPlist($event)"></el-input>
      <el-button type="primary" size="small" @click="getPlist()">查找</el-button>
      <el-button type="primary" plain style="float: right;margin-right: 200px;width: 100px;" size="small"
                 @click="addP()">新增商品
      </el-button>
    </div>
    <div>
      <keep-alive>
        <component :is="subTitle" :pList="pList.content" @to-parse="changeTitle" :itemData="itemData"
                   :types="types"></component>
      </keep-alive>
      <el-pagination
        v-if="subTitle=='listSub'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pList.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import {getpucMess} from '@/utils/productApis'
  import listSub from './Product-list'
  import addSub from './Product-add'

  export default {
    name: 'pIndex',
    data() {
      return {
        input: '',
        subTitle: 'listSub',
        tableHeader: [
          {width: '', title: '产品名称', str: 'title'},
          {width: '150', title: '产品图片', str: 'titleImages'},
          {width: '', title: '产品价格', str: 'priceDescription'},
          {width: '100', title: '产品销量', str: 'totalSale'},
        ],
        pList: [],
        page: 1,
        pageSize: 10,
        itemData: {},
        types: ''
      }
    },
    computed: {
      ...mapGetters([])
    },
    components: {
      listSub, addSub
    },
    mounted() {
      this.getPlist()
    },
    methods: {
      getPlist(e) {
        let data = {
          // category: this.input,
          page: this.page,
          pageSize: this.pageSize
        }
        getpucMess(data).then(res => {
          this.pList = res.data;
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getPlist();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val;
        this.getPlist();
      },
      changeTitle(val) {
        this.subTitle = val.title;
        this.itemData = val.data;
        this.types = val.type;
        if (val.refalish) this.getPlist()
      },
      addP() {
        this.subTitle = 'addSub'
        // this.itemData=val.data
        this.types = 'add'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .seach {
    margin-bottom: 20px;
  }

  .seach label {
    display: inline-block;
    /*min-width:50px;*/
    margin-right: 20px;
  }

  .seach .el-input {
    width: 200px;
    margin-right: 20px;
  }

  .el-table .imgs {
    display: block;
    width: 100px;
    height: 100px;
  }

  .el-pagination {
    text-align: right;
    margin-top: 20px;
    margin-right: 50px;
  }
</style>
