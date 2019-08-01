// 计算属性
Vue.component('vue-gallery', {
  // 接收
  props: ['photos'],
  // 数据
  data: function () {
    return {
      activePhoto: null
    }
  },
  template: `
    <div class="vueGallery">
    <div class="activePhoto" :style="'background-image: url('+photos[activePhoto]+');'">
      <button type="button" aria-label="Previous Photo" class="previous" @click="previousPhoto()">
        <i class="fas fa-chevron-circle-left"></i>
      </button>
      <button type="button" aria-label="Next Photo" class="next" @click="nextPhoto()">
        <i class="fas fa-chevron-circle-right"></i>
      </button>
    </div>
    <div class="thumbnails">
      <div
           v-for="(photo, index) in photos"
           :src="photo"
           :key="index"
           @click="changePhoto(index)"
           :class="{'active': activePhoto == index}" :style="'background-image: url('+photo+')'">
      </div>
    </div>
  </div>`,
  // 生命周期（数据渲染之后）在这个生命周期中，我们可以获取到渲染之后的DOM
  mounted () {
    this.changePhoto(0)
    document.addEventListener("keydown", (event) => {
      console.log(event)
      // 左右键盘事件
      if (event.which == 37)
        this.previousPhoto()
      if (event.which == 39)
        this.nextPhoto()
    })
  },
  // 函数
  methods: {
    changePhoto (index) {
      this.activePhoto = index
    },
    nextPhoto () {
      // 调用方法：
      // 图片的索引，如果当前的索引+1 < 图片的总长度8 ---> 当前的索引一直+1，
      //            如果当前的索引+1 不小于  图片的总长度  ---> 让当前的索引=0
      // console.log(this.activePhoto) //01234567 01234567

      this.changePhoto( this.activePhoto+1 < this.photos.length ? this.activePhoto+1 : 0 )
    },
    previousPhoto () {
      // 如果 索引-1 >= 0 将让索引-1,  否则就让索引 = 图片的总长度-1=7
      // console.log(this.activePhoto) //07654321 07654321
      this.changePhoto( this.activePhoto-1 >= 0 ? this.activePhoto-1 : this.photos.length-1 )
    }
  }
})

new Vue({
  el: '#app',
  data: {
    photos: [
      'img/lordea-home-01-min.jpg',
      'img/lordea-home-02-min.jpg',
      'img/lordea-home-03-min.jpg',
      'img/lordea-home-04-min.jpg',
      'img/lordea-home-05-min.jpg',
      'img/lordea-home-06-min.jpg',
      'img/lordea-home-07-min.jpg',
      'img/lordea-home-08-min.jpg'
    ]
  }
});