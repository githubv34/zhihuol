<template>
  <div class="comment">
    <!-- 头部 -->
    <div class="total">
        <div class="left" @click="goOff()">
                <van-icon name="arrow-left" size="30"/>
        </div>
        <div class="right" ><h3 >{{extrames.comments}}条评论</h3></div>
    </div>
    <div class="commentList">
        <!-- 长评论部分 -->
        <span class="piece " v-show="longcomInfo.length !== 0">{{longcomInfo.length}}条长评</span>
        <div class="long-comment">
            
            <!-- 判断 如果长度为0 则不显示 -->
            <div v-show="longcomInfo.length !== 0" v-for="(item,index) in longcomInfo" :key="index">
                <div class="author">
                      <!-- 头像 -->
                      <div class="left">
                          <van-image class="author-img" :src="item.avatar" flt="cover"></van-image>
                      </div>
                      <!-- 内容以及时间 -->
                      <div class="comment-text">
                          <div class="action">
                              <span class="author-name">{{item.author}}</span>
                              <span is-link class="dot">···</span>
                          </div>
                          
                          <span class="textAll">{{item.content}}</span>
                          <div class="favour">
                              <div class="time">
                                  <span>{{item.time | showTime}}</span>
                              </div>
                              <div class="like">
                                   <ul class="uls" >
                                  <li @click="likeone(item.id)">
                                    <van-icon v-if="item.good" name="like-o"/>
                                    <van-icon v-else name="like" color="#3399FF"/>
                                  </li>     
                                  <li>
                                    {{item.likes}}
                                  </li>
                                  <li>
                                    <router-link to="/write/">
                                        <van-icon  name="chat-o" />
                                    </router-link>
                                  </li>
                                </ul>
                              </div>
                          </div>
                      </div>
                </div>  
            </div>
        </div>

        <!-- 短评论部分 -->
        <span class="piece ">{{shortcomInfo.length}}条短评</span>
        <div v-show="shortcomInfo.length !== 0" v-for="(item,index) in shortcomInfo" :key="index + 999">
            
            <div class="short-content" >
                <div>
                    <div class="author">
                       <!-- 头像 -->
                      <div class="left">
                          <van-image class="author-img" :src="item.avatar" flt="cover"></van-image>
                      </div>
                      <!-- 内容以及时间 -->
                      <div class="comment-text">
                          <div class="action">
                              <span class="author-name">{{item.author}}</span>
                              <span is-link class="dot">···</span>
                          </div>
                          <span class="textAll">{{item.content}}</span>
                          <div class="favour">
                            <div class="time">
                                <span>{{item.time | showTime}}</span>
                            </div>
                            <div class="like">
                                <ul class="uls"> 
                                  <li  @click="liketwo(item.id)">
                                    <van-icon v-if="item.good" name="like-o"/>
                                    <van-icon v-else name="like" color="#3399FF"/>
                                  </li>     
                                  <li>{{item.likes}}</li>
                                  <li>
                                    <router-link to="/write/">
                                        <van-icon  name="chat-o" />
                                    </router-link>
                                  </li>
                                </ul>
                            </div>
                          </div>
                      </div>
                  </div>  
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
      <p>已经显示全部评论</p>
    </div>
    <div class="footer">
      <div class="footer-left">
          <img class="pop" src="../assets/image/v2-fb2049df07b4bb5ee50730f6200b25b0_fhd.jpg" @click="totop">
      </div>
 
          <router-link to="/write/">
            <van-field v-model="value" placeholder="说说你的看法..." />
          </router-link>

    </div>
    <!-- 占位盒子 -->
    <div class="divs"></div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      // count:1,
      value:'',
      // 评论相关
      extrames:"",
      // 短评
      shortcomInfo:[],
      // 长评
      longcomInfo:[],
      likesFlags: false,
    };
  },
  props: {
    extraid: {
      type: String,
      return:0,
    }
  },
  watch: {
    extraid() {
          this.getDetailsList(this.extraid);
        },
  },
  created() {
        this.getDetailsList(this.extraid);
  },
  methods: {
    totop(){
      document.documentElement.scrollTop = 0;
    },
    getDetailsList(id) {
        // 评论相关
        this.axios.get(`/story/${id}/extra`).then(re => {
            this.extrames = re.data;           
        });
        // 短评
        this.axios.get(`/story/${id}/short-comments`).then(re => {
            // console.log(re);
            this.shortcomInfo = re.data.comments;
            for(var i = 0; i < this.shortcomInfo.length; i++) {
              this.shortcomInfo[i].good = true
            }
        });
        // 长评
        this.axios.get(`/story/${id}/long-comments/before/${id}`).then(re => {
            // console.log(re);
            this.longcomInfo = re.data.comments;
            for(var i = 0; i < this.longcomInfo.length; i++) {
              this.longcomInfo[i].good = true
            }
        });
        
     },
    goOff() {
        this.$router.go(-1);
    },
    likeone(ids) {
      for(var i = 0; i < this.longcomInfo.length; i++) {
        if(this.longcomInfo[i].id == ids) {
          this.longcomInfo[i].good = !this.longcomInfo[i].good;
          if(this.longcomInfo[i].good == false) {
              this.longcomInfo[i].likes += 1;
              this.$toast("点赞成功");
          }else {
            this.longcomInfo[i].likes -= 1;
            this.$toast("取消点赞")
          }
          this.longcomInfo.splice(i,1,this.longcomInfo[i]);
        }
      }
    },
     liketwo(ids) {
      for(var i = 0; i < this.shortcomInfo.length; i++) {
        if(this.shortcomInfo[i].id == ids) {
          this.shortcomInfo[i].good = !this.shortcomInfo[i].good;
          if(this.shortcomInfo[i].good == false) {
              this.shortcomInfo[i].likes += 1;
              this.$toast("点赞成功");
          }else {
            this.shortcomInfo[i].likes -= 1;
            this.$toast("取消点赞")
          }
          this.shortcomInfo.splice(i,1,this.shortcomInfo[i]);
        }
      }
    },
  },
  // 过滤器
  filters: {
    showTime(value) {
      function addZero(index) {
        return index < 10 ? '0' + index : index;
      }
      var time = new Date(value * 1000);
      var month = addZero(time.getMonth() + 1);
      var day = addZero(time.getDate());
      var hour = addZero(time.getHours());
      var minute = addZero(time.getMinutes());
      return month + '-' + day + ' ' + hour + ':' + minute;
    }
  },
}
</script>

<style scoped>
.comment {
  width: 100%;
  margin: 0 auto;
}
/* 头部 */
.total {
  width: 100vw;
  height: 60px;
  display: flex;
  background: #fefefe;
  border-bottom: 1px solid rgb(231, 217, 217);
}
.left { 
  width: 20%;
  position: relative;
  margin-top: 16px;
  margin-left: 10px;
}
.van-icon:before {
  width: 40px;
  height: 40px;
  position: absolute;
  top:-16px;
}
.right {
  width: 80%;
  position: relative;
}
.right h3 {
  position: absolute;
  top:20px;
  left:110px;
}
/* 评论 */
.commentList {
  margin-top: 10px;
}
.piece {
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  line-height: 40px;
  font-size: 16px;
  box-sizing: border-box;
}
/* 长评论 */
.author {
  display: flex;
  border-bottom: 1px solid rgb(206, 191, 191); 
}
.left {
  width: 30px;
  height: 30px;
  margin: 15px 10px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar .author-img {
  display: block;
  width: 100%;
  height: 100%;
}
.comment-text {
  width: 80vw;
  display: flex;
  flex-direction: column;
  position: relative;
}
.comment-text .action {
  margin: 15px 0 10px;
}
.comment-text .author-name {
  font-weight: 550;
  font-family: "微软雅黑";
  font-size: 16px;
}
.comment-text .dot {
  position: absolute;
  right: -5px;
  font-weight: 700;
  color: rgb(145, 131, 131);
}
/* 文章内容 */
.textAll {
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 18px;
  font-family: "微软雅黑";
}
.time {
  color: rgb(206, 191, 191);
}
.favour {
  height: 40px;
  margin-top: 20px;
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  position: relative;
}
.uls {
  position: absolute;
  right: -10px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color:rgb(192, 177, 177);
}
.uls li:nth-child(2) {
  position: absolute;
  left: -5px;
  top: -3px;
  font-size: 16px;
}
/* 底部 */
.bottom {
  width: 40vw;
  height: 5vw;
  margin: 0 auto;
  font-size: 16px;
  color: #d8cece;
  margin-bottom: 10px;
}
.bottom p{
  margin-bottom: 10px;
}
.footer {  
  width: 100vw;
  height: 6vh;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #f1f1f1;
  display: flex;
}
.footer-left {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
}
.pop {
  width: 100%;
  height: 100%;
}
.divs {
  height:12vh;
}
::v-deep .van-field__control{
  width: 81vw;
}
.van-cell{
  padding: 5px 5px;
}
</style>