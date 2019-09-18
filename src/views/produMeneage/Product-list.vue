<template>
  <div class="hello">
    <el-table
      :data="pList"
      style="width: 100%">
      <el-table-column
        v-for="(item,index) in tableHeader"
        :label="item.title"
        :width="item.width"
        :show-overflow-tooltip="item.title!=='产品图片'"
        :key="index">
        <template slot-scope="scope">
          <span v-if="item.str==='titleImages'">
            <img :src="scope.row[item.str][0]" alt="" class="imgs">
          </span>
          <span v-else-if="item.str==='onsale'">
           {{scope.row[item.str]==1? '已上架' : '已下架'}}
          </span>
          <span style="margin-left: 10px" v-else>{{ scope.row[item.str] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)" type="info" plain>修改状态</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import { deleteItem, changeStatus } from '@/utils/productApis'
  export default {
    // props: ['pList'],
    props:{
      pList:Array
    },
    name: 'listSub',
    data() {
      return {
        input: '',
        tableHeader: [
          {width: '500', title: '产品名称', str: 'title'},
          {width: '', title: '产品图片', str: 'titleImages'},
          {width: '', title: '产品价格', str: 'priceDescription'},
          {width: '', title: '产品销量', str: 'totalSale'},
          {width: '', title: '产品状态', str: 'onsale'},
        ],
      }
    },
    computed: {
      ...mapGetters([])
    },
    components: {},
    mounted() {

    },
    methods: {
      handleEdit(index, val) {
        let data={
          productId:val.productId,
          onsale:val.onsale ? 0 : 1
        };
        this.$confirm('确定要修改该商品状态么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatus(data).then(res=>{
            this.$emit('to-parse',{title: 'listSub', type: '', data: {}, refalish: true});
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }).catch(() => {

        });

      },
      handleDelete(index, val) {
        this.$confirm('确定要删除该商品么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({productId:val.productId}).then(res=>{
            this.$emit('to-parse',{title: 'listSub', type: '', data: {}, refalish: true});
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(err=>{
            console.log(err)
          })

        }).catch(() => {

        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-table .imgs {
    display: block;
    width: 60px;
    height: 60px;
  }
</style>
