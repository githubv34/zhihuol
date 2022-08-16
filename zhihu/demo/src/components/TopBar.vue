<template>
  <div class="topbar">
      <div class="home-top">
          <ul class="home-top-left">
          <li class="one">
              <h3>{{date}}</h3>
              <h4>{{month}}</h4>
          </li>
          <li class="three">{{times}}</li>
          <li class="threex">知乎日报</li>
          </ul>
          <div class="home-top-right">
              <van-image fit="cover" class="img" :src="require('../assets//image/v2-fb2049df07b4bb5ee50730f6200b25b0_fhd.jpg')"></van-image>
          </div>
      </div>
  </div>
</template>



<script>
export default {
    data(){
        return{
            times:"",
            month:"",
            date:"",
            months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        
        }
    },
    created(){
        var time = new Date();
        console.log("time",time);
        var hours = time.getHours();
        if(hours >= 6 && hours <= 11 ){
            this.times = "早上好!";
        }else if (hours >= 11 && hours <= 14){
            this.times = "中午好!";
        }else if (hours >= 14 && hours <= 18){
            this.times = "下午好!";
        }else{
            this.times = "晚上好!";
        }
        this.month = this.months[time.getMonth()];
        this.date = time.getDate();
    },
  
    
}

</script>

<style scoped>
.home-top{
    display: flex;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
}
.home-top-left{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #ccc;
    
}
.home-top-left li{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    /* border-radius:1px solid rgb(19, 16, 16) ; */
    /* border: 1px  solid red; */
}
.home-top-left  .one{
    /* border-radius:1px solid rgb(19, 16, 16) ; */
    border-right: 1px  solid rgb(196, 195, 194);
}
h4{
    font-size: 12px;
    transform: scale(0.8);
    margin-top: 3px;
    color: rgb(143, 132, 132);
}
h3{
    color: black;
}
.three{
    font-weight: 700;
    color: black;
}
.home-top-right{
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    overflow: hidden;
}
.img{
    width: 100%;
    height: 100%;
    
}

</style>