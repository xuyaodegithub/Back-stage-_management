// import state from "../store/state";
import axios from 'axios'
const filters={
  changeTime(val,num){
  if(val){
    let data=new Date(val)
    let year=data.getFullYear()
    let month=data.getMonth()+1
    let day= data.getDate()
    let hour= data.getHours()
    let min=data.getMinutes()
    let sec=data.getSeconds()
    if(month.length<2){
      month='0'+month
    }
    //console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
    // return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
    if(month<10){
      month='0'+month
    }
    if(day<10){
      day='0'+day
    }
    if(hour<10){
      hour='0'+hour
    }
    if(min<10){
      min='0'+min
    }
    if(sec<10){
      sec='0'+sec
    }
      return year+'-'+month+'-'+day +' '+hour+':'+min+':'+sec
  }else{
    return ''
  }
},
  //倒计时
  setTime(val){
    let day = Math.floor(val / 1000 / 60 / 60/24)
    let hoursD = Math.floor(val / 1000 / 60 / 60 % 24)
    let hours = Math.floor(val / 1000 / 60 / 60)
    let mint = Math.floor(val / 1000 / 60 % 60)
    let sec = Math.floor(val / 1000 % 60)
    if (day < 10) day = '0' + day
    if (hoursD < 10) hoursD = '0' + hoursD
    if (hours < 10) hours = '0' + hours
    if (mint < 10) mint = '0' + mint
    if (sec < 10) sec = '0' + sec
      return {
        day:day,
        hoursD: hoursD,
        mint: mint,
        sec: sec
      }
  },
 getLastMonth(){
  var now=new Date();
  var year = now.getFullYear();//getYear()+1900=getFullYear()
  var month = now.getMonth() +1;//0-11表示1-12月
  var day = now.getDate();
  var dateObj = {};
  if(parseInt(month)<10){
    month = "0"+month;
  }
  if(parseInt(day)<10){
    day = "0"+day;
  }

  dateObj.now = year + '-'+ month + '-' + day;

  if (parseInt(month) ==1) {//如果是1月份，则取上一年的12月份
    dateObj.last = (parseInt(year) - 1) + '-12-' + day;
    return dateObj;
  }

  var  preSize= new Date(year, parseInt(month)-1, 0).getDate();//上月总天数
  if (preSize < parseInt(day)) {//上月总天数<本月日期，比如3月的30日，在2月中没有30
    dateObj.last = year + '-' + month + '-01';
    return dateObj;
  }

  if(parseInt(month) <=10){
    dateObj.last = year + '-0' + (parseInt(month)-1) + '-' + day;
    return dateObj;
  }else{
    dateObj.last = year + '-' + (parseInt(month)-1) + '-' + day;
    return dateObj;
  }

},
   getrandom(min, max) {//获取范围内的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
},
  saveActions(funUrl){
    axios({
      method: 'post',
      url:funUrl.url,
      dataType: 'JSON',
      data: funUrl.data
    }).then(function(res){
      // if(res.data.code==10000){
        // context.commit(funUrl[1],res)
        funUrl.callback(res)
      // }else{
      //   Toast({message: res.data.message, duration: 1500})
      // }
    }).catch(function(err){
      console.log(err)
    })
  },
}
export default filters
