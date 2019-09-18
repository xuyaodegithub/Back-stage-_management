<template>
  <div class="hello">
    <div style="text-align: right;">
      <el-button type="success" plain size="small" style="width:100px;margin-right: 200px;" @click="goback()">返回
      </el-button>
    </div>
    <el-upload
      ref="uploads"
      :show-file-list="false"
      name="file"
      class="upload-demo"
      action="https://qa.puhuoji.com/foodData/file/upload"
      :before-upload="beforImg"
      :on-success="successImg"
      multiple>
    </el-upload>
    <el-form ref="form" :model="productData" label-width="150px" label-position="left">
      <el-form-item label="产品名称">
        <el-input v-model="productData.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="产品分类名称">
        <el-input v-model="productData.category" size="small"></el-input>
      </el-form-item>
      <el-form-item label="轮播图片集合">
        <div class="flex img">
          <div class="relate" v-if="productData.titleImages.length>0" v-for="(val,index) in productData.titleImages"
               :key="index">
            <img :src="val" alt="">
            <i class="el-icon-delete cu" @click="deleImg(index,1)"></i>
          </div>
          <el-button size="small" type="primary" :loading="uploading" @click="upImg(1)">{{uploading ? '上传中' : '上传图片'}}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="详情图片集合">
        <div class="flex img">
          <div class="relate" v-if="productData.bodyImages.length>0" v-for="(val,index) in productData.bodyImages"
               :key="index">
            <img :src="val" alt="">
            <i class="el-icon-delete cu" @click="deleImg(index,2)"></i>
          </div>
          <el-button size="small" type="primary" :loading="uploading2" @click="upImg(2)">{{uploading ? '上传中' :
            '上传图片'}}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="规格集合">
        <div class="sku">
          <el-button type="primary" icon="el-icon-plus" circle class="addNewSku" size="mini"
                     @click="addSku()"></el-button>
          <div v-for="(item,index) in productData.productSkuPropertyList"
               v-if="productData.productSkuPropertyList.length>0" :key="index" style="margin-bottom: 30px"
               class="tagList">
            <i class="el-icon-close closeThis cu" @click="closeItem(index)"></i>
            <label>名称：</label>
            <el-input v-model="item.name" size="mini" style="width: 300px;margin-bottom: 10px;"></el-input>
            <div class="flex">
              <label>标签：</label>
              <div class="tagSet">
                <el-tag :key="key" v-for="(val,key) in item.options" closable :disable-transitions="false"
                        @close="handleClose(index,key)">{{val}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible && whichI==index" v-model="inputValue"
                          ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm(index)"
                          @blur="handleInputConfirm(index)"></el-input>
                <el-button v-else class="button-new-tag" size="mini" @click="showInput(index)">+添加标签</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="lenghts">
        <el-table
          :data="results">
          <el-table-column
            v-for="(item,index) in tableH"
            :label="item.title"
            :width="item.width"
            :key="index">
            <template slot-scope="scope">
                <span style="margin-left: 10px;display: block" v-if="item.str==='image'" @click="upImg(3,scope.$index)"
                      class="cu">
                  <img :src="scope.row[item.str]" alt="" v-if="scope.row[item.str]">
                   <el-button size="mini" v-else>上传图片</el-button>
                </span>
              <span style="margin-left: 10px" v-else-if="item.str==='price'">
                  <el-input v-model="scope.row[item.str]" placeholder="请输入价格" size="mini" type="number"
                            min="0"></el-input>
                </span>
              <span style="margin-left: 10px" v-else-if="item.str==='stock'">
                  <el-input v-model="scope.row[item.str]" placeholder="请输入库存" size="mini" type="number"
                            min="0"></el-input>
                </span>
              <span style="margin-left: 10px" v-else>
                  {{scope.row[item.str]}}
                </span>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="results.length>0">
          <el-input v-model="allPrice" size="mini" style="width: 100px;margin-left: 320px" placeholder="输入替换所有"
                    @input="changeAll(1)"></el-input>
          <el-input v-model="allStore" size="mini" style="width: 100px;margin-left: 45px" placeholder="输入替换所有"
                    @input="changeAll(2)"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 120px;">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import {UpperShelf, getpucDetail} from '@/utils/productApis'

  export default {
    // props: ['itemData', 'types'],
    props:{
      itemData:Object,
      types:String
    },
    name: 'addSub',
    data() {
      return {
        allPrice: '',
        allStore: '',
        productData: {
          title: '',//产品名称
          category: '',//父分类名称
          // priceDescription:'',//商品价格区间
          titleImages: [],//轮播图数组
          bodyImages: [],//详情图片
          // totalSale:'',//销量
          productSkuList: [],//总sku组合数据
          productSkuPropertyList: [
            // {name:'颜色',options:['黑色','蓝色','红色']},
            // {name:'尺寸',options:['mini','small','big']},
            // {name:'材质',options:['塑料','铁的','铜的']},
          ],//sku数组
        },
        tableH: [
          {title: '组合名称', width: '', str: 'skuKey'},
          {title: '组合图片', width: '100', str: 'image'},
          {title: '组合价格', width: '150', str: 'price'},
          {title: '组合库存', width: '150', str: 'stock'},
        ],
        uploading: false,
        uploading2: false,
        type: 1,//上传轮播还是详情 1、轮播 2、详情
        inputVisible: '',//tag输入框显示
        inputValue: '',//tag输入框内容
        whichI: 0,
        results: [],//组合规格集合
        tableImgindex: 0,
        tableData: [],
      }
    },
    activated() {
      if (this.types == 'add') {
        this.productData = {
          title: '',//产品名称
          category: '',//父分类名称
          // priceDescription:'',//商品价格区间
          titleImages: [],//轮播图数组
          bodyImages: [],//详情图片
          // totalSale:'',//销量
          productSkuList: [],//总sku组合数据
          productSkuPropertyList: [
            // {name:'颜色',options:['黑色','蓝色','红色']},
            // {name:'尺寸',options:['mini','small','big']},
            // {name:'材质',options:['塑料','铁的','铜的']},
          ],//sku数组
        }
        this.results = []
      } else {
        getpucDetail({id: this.itemData.productId}).then(res => {
          this.productData = res.data;
          delete this.productData.totalSale;
          delete this.productData.subTitle;
          delete this.productData.priceDescription;
          this.$nextTick(() => {
            this.results = this.productData.productSkuList
          })

        })
      }
    },
    watch: {
      productSkuPropertyList: {
        handler(curVal, oldVal) {
            this.allPrice = '';
            this.allStore = '';
            this.doExchange();
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters([]),
      lenghts() {
        let length = this.results.length
        return `组合规格(${length})条`
      },
      productSkuPropertyList(){
        return this.productData.productSkuPropertyList
      }
    },
    components: {},
    mounted() {

    },
    methods: {
      doExchange() {
        let arrs = JSON.parse(JSON.stringify(this.productData.productSkuPropertyList)), result = [], results = []
        arrs.map((val, index) => {
          if (val.options.length < 1) arrs.splice(index, 1)
        })
        let func = function (arr, depth) {
          for (let i = 0; i < arr[depth].options.length; i++) {
            result[depth] = arr[depth].options[i]
            if (depth != arr.length - 1) {
              func(arr, depth + 1)
            } else {
              let obj = {
                skuKey: result.join(','),
                image: '',
                price: '',
                stock: ''//库存
              }
              results.push(obj)
            }
          }
        }
        if (arrs.length < 1) {
          this.results = []
          return
        }
        func(arrs, 0)
        this.results = results
      },
      upImg(num, key) {
        // console.log(key)
        if (key != '' || key != null || key != undefined) this.tableImgindex = key
        this.type = num
        let oDiv = document.getElementsByClassName('el-upload__input')[0];
        oDiv.click()
      },
      beforImg(file) {
        if (this.type === 1) this.uploading = true
        if (this.type === 2) this.uploading2 = true
      },
      successImg(response, file, fileList) {
        if (this.type === 1) {
          this.productData.titleImages.push(response.data)
          this.uploading = false
        } else if (this.type === 2) {
          this.productData.bodyImages.push(response.data)
          this.uploading2 = false
        } else {
          this.results[this.tableImgindex].image = response.data
        }

      },
      deleImg(index, type) {
        if (type === 1) this.productData.titleImages.splice(index, 1)
        if (type === 2) this.productData.bodyImages.splice(index, 1)

      },
      showInput(index) {//显示tag输入框
        this.whichI = index
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput[0].focus();
        });
      },
      handleClose(index, key) {//删除tag
        this.productData.productSkuPropertyList[index].options.splice(key, 1)
      },
      handleInputConfirm(index, key) {//添加tag
        let inputValue = this.inputValue;
        if (inputValue) {
          this.productData.productSkuPropertyList[index].options.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      addSku() {//增加新的sku
        let data = {name: '', options: []}
        this.productData.productSkuPropertyList.push(data)
      },
      closeItem(index) {//删除某个sku
        this.productData.productSkuPropertyList.splice(index, 1)
      },
      goback() {
        this.$emit('to-parse', {title: 'listSub', data: {}})
      },
      changeAll(a) {
        let str = ''
        if (a === 1) str = 'price'
        else str = 'stock'
        this.results.map((val, key) => {
          val[str] = a === 1 ? this.allPrice : this.allStore
        })
      },
      onSubmit() {
        if (this.results.length < 1) {
          this.$message({type: 'warning', message: '商品至少有一种规格sku'})
          return
        } else {
          let skuprice = this.results.every((val, index) => {
            return val.price
          })
          let skustore = this.results.every((val, index) => {
            return val.stock
          })
          if (!skuprice || !skustore) {
            this.$message({type: 'warning', message: '请完善规格组合信息'})
            return
          }
        }
        let data = JSON.parse(JSON.stringify(this.productData))
        data.productSkuList = this.results
        UpperShelf(data).then(res => {
          this.$emit('to-parse', {title: 'listSub', type: '', data: {}, refalish: true})
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    .img, .sku {
      width: 480px;
      flex-wrap: wrap;
      align-items: center;
      min-height: 100px;
      border: 1px solid #DCDFE6;
      border-radius: 10px;
      padding: 10px;

      .relate {
        position: relative;
        margin-right: 20px;
        margin-bottom: 20px;

        &:hover i {
          display: block;
        }

        i {
          transition: 1s;
          display: none;
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -15px 0 0 -15px;
          color: red;
        }
      }

      img {
        display: block;
        width: 100px;
        height: 100px;
      }
    }

    .sku {
      position: relative;
      width: 600px;

      .addNewSku {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }

  .tagList {
    padding: 10px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    width: 85%;
    position: relative;

    .closeThis {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    label {
      display: inline-block;
      min-width: 100px;
    }

    .tagSet {
      width: 70%;
    }
  }

  .el-input {
    max-width: 500px;
  }

  .el-tag {
    margin-right: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }

  .el-table {
    width: 600px;

    .el-input {
      width: 80%;
    }

    img {
      display: block;
      width: 60px;
      height: 60px;
    }
  }
</style>
