<template>
  <div class="hello1">
    <el-container style="height: 100%;">
      <el-aside width="200px">
        <el-scrollbar style="height: 100%;overflow-x: hidden;">
        <asilde></asilde>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <!--<div class="HRee">头部</div>-->
          <headerTop></headerTop>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { Button, Select , Row, Col,} from 'element-ui';
  import asilde from '@/components/asilder'
  import headerTop from '@/components/humberger'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  computed:{
    ...mapGetters([
      'ppp'
    ])
  },
  components:{
    Button, Select,Row, Col,asilde,headerTop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .hello1{
    height:100%;
  }
</style>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding:0;
  }
  .el-aside{
    overflow-x:hidden ;
    background-color: #2f4050;
  }
  .el-scrollbar{
    height: 100%;
    overflow-x: hidden;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
    height:100%;
  }
</style>
