<template>
  <div class="hello">
    <div class="selfLogo">
      <img src="../../assets/images/0.jpg" alt="">
      <p>某某人</p>
    </div>
    <el-menu :default-active="$route.path" router unique-opened background-color="#2f4050" text-color="#ffffff" active-text-color="#409eff" class="el-menu-vertical-demo" @select="selectThis" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="/">
        <i class="el-icon-s-platform"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.path" v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <!--<span slot="title">分组一</span>-->
          <el-menu-item :index="val.path | patchAdd(item.path)" v-for="(val,key) in item.children" :key="key">
            <i :class="val.meta.icon"></i>{{val.meta.name}}
          </el-menu-item>
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
        </el-menu-item-group>
        <!--<el-menu-item-group title="分组2">-->
          <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-submenu index="1-4">-->
          <!--<span slot="title">选项4</span>-->
          <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
        <!--</el-submenu>-->
      </el-submenu>
      <!--<el-menu-item index="3">-->
        <!--<i class="el-icon-document"></i>-->
        <!--<span slot="title">导航三</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">导航四</span>-->
      <!--</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'alisd',
  data () {
    return {
      isCollapse: false,

    }
  },
  mounted(){

  },
  filters:{
    patchAdd(item,val){
      if(val=='/'){
        return `/${item}`
      }else{
        return `${val}/${item}`
      }
    },
  },
  computed:{
    ...mapGetters([
      'ppp'
    ]),
    routes(){
      return this.$router.options.routes
    },
    rouUrl(){
      return this.$route.fullPath
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    selectThis(o,p,q){
      // console.log(this.$route,'=============')
    }
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
    width:100%;
    height:100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 100%;
      min-height: 100%;
    }
    .el-submenu .el-menu-item{
      min-width:100%;
    }
    .selfLogo{
      padding: 15px;
      font-size:14px;
      text-align: center;
      color: #ffffff;
      img{
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border-radius: 50%;
        margin-bottom: 15px;
      }
    }
  }
</style>
