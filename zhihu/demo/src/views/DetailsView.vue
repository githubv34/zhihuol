<template>
  <div class="home">
    <div class="box">
     <van-image :src="img" class="imgs"/>
     <div class="banner-footer">
          <div
            class="footer"
            :style="{
              background: '#' + imageHue.substr(2, 8) + 'd5',
              background: `
                linear-gradient(0,#${imageHue.substr(
                    2,
                    8
                )},#${imageHue.substr(
                2,
                8
              )}e6,#${imageHue.substr(2, 8)}00)`,
            }"
          ></div>
        </div>
     <h2>{{tatle}}</h2>
     </div>
    <div class="box2" v-html="details"></div>


    <div class="box3">
      <router-link to="/">
        <van-icon name="arrow-left" class="back" />
      </router-link>
      
      <van-icon name="comment-o" :badge="comments" badge-color="while"  @click="change(id)"/>
      <van-icon name="thumb-circle-o" :badge="popularity"  @click="bun1()" class="bun1" ref="bun11"/>
      <van-icon name="star-o" @click="bun2()"  class="bun2" ref="bun22"/>
      <van-icon name="share-o" @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        :options="options"
        @select="onSelect"
        cancel-text=''
        class="share"
        share-sheet-icon-size="12px"
        />
    </div>
    <div class="box4">
      <span>查看知乎讨论</span>
    </div>
  </div>
</template>


<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      id: "",
      details:[],
      img:"",
      tatle:"",
      imageHue:"",
       popularity:0,
      comments:0,
      showShare: false,
      showmode: true,
      options: [[
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '二维码', icon: 'qrcode' },
      ],
      [ { name: '更多', icon: 'weapp-qrcode' },
      ],],
    };
  },
  created() {
    this.getDetailsList(this.storyid);
  },
  watch: {
    storyid() {
      this.getDetailsList(this.storyid);
    },
  },
  props: {
    storyid: {
      type: String,
      return: 0,
      
    },
  },
  methods: {
       bun1() {
      this.$toast("点赞"),
      this.$refs.bun11.style.backgroundColor = "red";
    },
    bun2() {
      this.$toast("收藏");
      this.$refs.bun22.style.backgroundColor = "red";
      // this.$refs.bun22.style.name = "star";
    },
    change(id) {
      console.log("id===>", id);
      this.$router.push("/extra/" + id);
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    getDetailsList(id) {
      this.axios.get(`story/${id}`).then((re) => {
        this.id = re.data.story.id;
        this.details = re.data.story.body;
        this.img = re.data.story.image;
        this.tatle = re.data.story.title;
        this.imageHue = re.data.story.imageHue;
        console.log("de",re);

        
      }); 
      this.axios.get(`story/${id}/extra`).then((re) => {
        console.log("dee",re);
        this.comments = re.data.comments;
        this.popularity = re.data.popularity;

        });
       },
    
    },
     
  
};
</script>

<style scoped>
@import url("http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3");
.home {
  background: white;
}

.box3 {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  background: #eeeeee;
  box-sizing: border-box;
}
.back {
  border-right: 1px solid rgb(167, 158, 158);
  padding-right: 10px;
}
.btn1.active {
  background: red;
}

.van-info {
  background-color: transparent;
  border: none;
  color: #000;
  right: -5px;
}

.banner-footer .footer {
  width: 100vw;
  height: 50vw;
  position: absolute;
  top: 50vw;
}
::v-deep .van-image__indicators {
  left: auto;
  right: 10px;
  transform: none;
}

::v-deep .van-image__indicator--active {
  width: 18px;
  border-radius: 20px;
}
.imgs {
  height: 100%;
}
h2{
  color: #f4f4f4;
   position: absolute;
   left:8px;
  
}
.img-place-holder{
  height: 0;
}
::v-deep  .img-place-holder {
   height: 0;
}
.share{
  font-size: 12px;
  size: 12px;
  
}
::v-deep .van-share-sheet__icon{
  width: 30px;
  height: 30px;
}
::v-deep .van-share-sheet__options{
  display: flex;
  justify-content: space-between;
}
::v-deep .question .view-more a{
  background: rgb(91, 150, 216);
  color: #f4f4f4;
  margin-bottom: 50px;
  border-radius:20px;
  height:40px ;
  text-align: center;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 18px;
}

::v-deep .meta{
  display: flex;
  margin-top: 50px;
}
::v-deep .meta .avatar, .comment-meta .avatar{
  margin-top: -5px;
}

</style>