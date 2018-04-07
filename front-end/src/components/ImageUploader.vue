<template>
  <label class="image-uploader" @drop="onDrop">
    Click here to upload image
    <input type="file" id="imageUploader" accept="image/*" />
  </label>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'ImageUploader',
  data () {
    return {}
  },
  methods: {
    onDrop: function (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
  },
  props: ['addImage'],
  subscriptions: function () {
    this.$fromDOMEvent('#imageUploader', 'change')
      .subscribe(evt => {
        const files = evt.target.files
        const formData = new FormData()
        formData.append('file', files[0])
        $.ajax({
          url: 'http://localhost:8000/uploads/',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: (result) => {
            this.addImage(result.file)
          }
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~variables';
  .image-uploader {
    display: block;
    cursor: pointer;
    // padding: 15px;
    border-radius: 5px;
    border: 2px dashed $GREY_400;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 16px;

    input {
      display: none;
    }
  }
</style>
