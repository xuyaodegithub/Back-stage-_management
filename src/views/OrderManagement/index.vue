<template>
  <div class="hello">
    <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search" size="small"></el-input>
    <ul>
      <li v-for="(item,index) in seachList" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        input: '',
        list: [
          '物流公司',
          '三生三世',
          '啊啊啊啊',
          '上班上班',
          '上班上班',
        ]
      }
    },
    methods:{

    },
    computed: {
      ...mapGetters([
      ]),
      seachList(){
        let arr=[]
        this.list.map((val,index)=>{
          if(val.indexOf(this.input)>-1) arr.push(val)
        })
        return arr
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  header {
    line-height: 60px;
    background: #5e8856;
    text-align: center;
    width: 100%;
    color: #ffffff;
  }

  .hello {
    height: 100%;
  }
</style>
