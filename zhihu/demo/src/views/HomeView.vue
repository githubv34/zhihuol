<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <top-bar></top-bar>
    </van-pull-refresh>

    <van-swipe
      @change="onChange"
      class="my-swipe"
      :autoplay="4000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in topStories" :key="index">
        <van-image :src="item.image" class="imgess" @click="change(item.id)">
        </van-image>

        <div class="banner-footer">
          <div
            class="footer"
            :style="{
              background: '#' + item.image_hue.substr(2, 8) + 'd5',
              background: `
                                                                                           linear-gradient(0,#${item.image_hue.substr(
                                                                                             2,
                                                                                             8
                                                                                           )},#${item.image_hue.substr(
                2,
                8
              )}e6,#${item.image_hue.substr(2, 8)}00)`,
            }"
          ></div>
        </div>

        <div class="left1">
          <h2>{{ item.title }}</h2>
          <h3>{{ item.hint }}</h3>
        </div>
      </van-swipe-item>
    </van-swipe>

    <topp-bar></topp-bar>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import ToppBar from "../components/ToppBar.vue";
import { Toast } from "vant";

export default {
  name: "HomeView",
  data() {
    return {
      current: 0, // 轮播图索引
      homeList: [], // 首页数据
      // top:[],
      // topp:[],
      // title:[],
      // hine:[],
      stories: [],
      topStories: [],
      dates: "",
      date: "",
      checked: true,
      count: 0,
      isLoading: false,
    };
  },
  // 改变索引
  methods: {
    change(id) {
      console.log("id===>", id);
      this.$router.push("/details/" + id);
    },
    onChange(index) {
      this.current = index;
    },

    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    bn1() {
      this.$toast("已为你减少此类推送");
    },
    bn2() {
      this.$toast("已为你加入收藏夹");
    },
  },

  // 页面加载触发
  created() {
    this.axios.get("stories/latest").then((re) => {
      this.dates = re.data.date;

      this.homeList = re.data;
      this.stories = re.data.stories;
      this.topStories = re.data.top_stories;
      // console.log("homeList", this.homeList);
      // console.log("re", re);
      // this.top = re.data.data.top_stories;
      // this.topp = re.data.data.stories;
    });
  },

  components: { TopBar, ToppBar },
};
</script>

<style scoped>
.bn1,
.bn2 {
  height: 20vw;
  border-radius: 15%;
}

.change {
  left: 200px;
  top: 4px;
  position: absolute;
}

.imgess {
  height: 100%;
}

.home {
  width: 100vw;
  background-color: white;
  /* display: flex; */
  align-items: center;
}

.my-swipe {
  width: 100%;
  height: 100%;
  /* border-radius: 5%; */
  /* border: 1px solid red; */
}

.left1 {
  position: absolute;
  bottom: 0px;

  margin-left: 4vw;
  margin-bottom: 4vw;
}

.left1 h2 {
  font-size: 22px;
  color: rgb(224, 224, 225);
  line-height: 25px;
}

.left1 h3 {
  font-size: 12px;
  color: rgb(209, 209, 216);
  margin-top: 8px;
}

.banner-footer .footer {
  width: 100vw;
  height: 50vw;
  position: absolute;
  bottom: 0px;
}

.box {
  width: 90vw;
  height: 20vw;

  /* display: inline-block; */
  margin-top: 20px;
  background-color: white;
  margin-left: 15px;
  /* flex-direction:row;  */
  /* justify-content: space-between; */
}

.right {
  height: 19vw;
  width: 19vw;
  /* border-radius: 10%; */
  float: right;
}

.left {
  background-color: rgb(240, 240, 240);
  width: 70vw;
  height: 20vw;
  float: left;
}

.left h2 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 15px;
  color: rgb(38, 36, 36);
}

.left h3 {
  font-size: 12px;
  font-weight: 500;
  color: rgb(51, 50, 48);
}

.addLoad {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  height: 50px;
  text-align: center;

  line-height: 50px;
}

::v-deep .van-swipe__indicators {
  left: auto;
  right: 10px;
  transform: none;
}

::v-deep .van-swipe__indicator--active {
  width: 18px;
  border-radius: 20px;
}

</style>
