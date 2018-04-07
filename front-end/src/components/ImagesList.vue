<template>
  <div class="images-list">
    <span class="img-wrapper" v-for="(image, index) in images" v-bind:key="index" :style="{ 'background-image': 'url('+image+')'}" @click="onImageAdd(image)">
    </span>
  </div>
</template>

<script>

export default {
  name: 'ImagesList',
  props: ['images', 'addElement'],
  methods: {
    onImageAdd: function (img) {
      const imgElem = document.createElement('img')
      imgElem.src = img
      this.addElement(imgElem)
    }
  }
}
</script>
<style lang="scss">
  @import '~variables';
  .images-list {
    max-height: 390px;
    overflow: auto;
  }
  span.img-wrapper {
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid $GREY_400;
    padding: 10px;
    width: 80px;
    height: 80px;
    background-size: cover;
    background-position: center center;
  }
</style>
