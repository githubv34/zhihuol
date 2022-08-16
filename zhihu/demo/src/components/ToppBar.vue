<template>
  <div class="home">
    <div
      class="box"
      v-for="(item, index) in stories"
      :key="index"
      @click="change(item.id)"
    >
      <van-swipe-cell>
        <div class="left">
          <h2>{{ item.title }}</h2>
          <h3>{{ item.hint }}</h3>
        </div>
        <img :src="item.images" class="right" />
        <template #right>
          <van-button
            square
            type="danger"
            text="厌恶"
            class="bn1"
            @click="bn1"
          />
          <van-button
            square
            type="primary"
            text="收藏"
            class="bn2"
            @click="bn2"
          />
        </template>
      </van-swipe-cell>
    </div>

    <div class="addLoad" @click="addLoad" ref="addLoad">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // top:[],
      // topp:[],
      // title:[],
      // hine:[],
      stories: [],
    };
  },
  // 改变索引
  methods: {
    change(id) {
      console.log("id===>", id);
      this.$router.push("/details/" + id);
    },
    bn1() {
      this.$toast("已为你减少此类推送");
    },
    bn2() {
      this.$toast("已为你加入收藏夹");
    },
    getLoad(index) {
      this.axios.get("/stories/before/" + index).then((re) => {
        console.log(re);

        this.homeList.stories.push(...re.data.stories);
        this.dates = re.data.date;
      });
    },
    addLoad() {
      this.getLoad(this.dates);
    },
    scrollfn() {
      var a = document.scrollTop || document.documentElement.scrollTop;
      var b = window.innerHeight;
      var c = this.$refs.addLoad.offsetTop;

      if (a + b - 50 >= c) {
        this.addLoad();
      }
    },
  },

  // 页面加载触发
  created() {
    this.axios.get("/stories/latest").then((re) => {
      this.dates = re.data.date;

      this.homeList = re.data;
      this.stories = re.data.stories;
      this.topStories = re.data.top_stories;
      console.log("homeList", this.homeList);
      console.log("re", re);
      // this.top = re.data.data.top_stories;
      // this.topp = re.data.data.stories;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollfn);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollfn);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.scrollfn);
    next();
  },
};
</script>

<style scoped>
.home {
  width: 100vw;
  background-color: white;
  /* display: flex; */
  align-items: center;
}

.bn1,
.bn2 {
  height: 20vw;
  border-radius: 15%;
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
</style>