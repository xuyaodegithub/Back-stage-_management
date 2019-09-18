<template>
  <div class="hbg">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in nowRoutes" :to="{path: item.path ? item.path : '/'}" :key="index">{{item.meta.name}}</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="setMore">
      <el-dropdown split-button type="primary" size="medium" @command="handleCommand">
        更多操作
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">切换账号</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { setToken } from "../../utils/auth";
  import { getToken } from "../../utils/auth";
  import { mapActions } from 'vuex'
export default {
  name: 'alisd',
  data () {
    return {
      isCollapse: false,

    }
  },
  mounted(){
    // console.log(this.$router.options.routes)
  },
  filters:{

  },
  computed:{
    ...mapGetters([
      'ppp'
    ]),
    nowRoutes(){
      // console.log(this.$route.matched,'..............')
      return this.$route.matched
    }
  },
  methods:{
    handleCommand(val){
      if(val==1){
        let obj={
        a:1,b:2,c:3
      }
        setToken(obj)
      }else{
        console.log(typeof getToken())
      }

      // this.$message({
      //   message:val
      // })
    }
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hbg{
    position: relative;
    padding:0 20px;
    height:100%;
    .el-breadcrumb{
      line-height: 80px;
    }
    .el-breadcrumb__separator.el-icon-arrow-right{
      color: #fff;
    }
    .el-breadcrumb__separator{
      color: #fff;
    }
    .setMore{
      position: absolute;
      right: 100px;
      top: 50%;
      margin-top: -20px;
    }
  }
</style>
