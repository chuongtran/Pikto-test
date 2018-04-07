<template>
  <div id="editor">
    <EditorItem v-for="(item, index) in elements" :key="index" :elem="item" :remove-element="removeElement"></EditorItem>
  </div>
</template>

<script>
import EditorItem from './EditorItem'
export default {
  name: 'Editor',
  props: ['elements', 'removeElement'],
  components: { EditorItem }
}
</script>

<style lang="scss">
  @import '~variables';
  #editor {
    width: 100%;
    height: calc(100vh - 60px);
    box-shadow: 0px 0px 25px -2px $GREY_300;
    margin-top: 30px;
    position: relative;
    overflow: hidden;
  }
</style>
