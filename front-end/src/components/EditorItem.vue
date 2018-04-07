<template>
  <div class="editor-element" :class="{ moving: clicked }" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" ref="editorElement">
    <div v-html="elem.elem"></div>
    <b class="ic-close" @click="onElementRemove">x</b>
  </div>
</template>

<script>
// import EditorService from '@/services/EditorService'
export default {
  name: 'EditorItem',
  props: ['elem', 'removeElement'],
  data: function () {
    return {
      movingElem: null,
      clicked: false,
      moving: false,
      clickedPosition: {
        top: 0,
        left: 0
      },
      elemPosition: {
        top: 0,
        left: 0
      }
    }
  },

  mounted: function () {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)

    const elem = document.getElementById(this.elem.id)
    if (elem.nodeName === 'TEXTAREA') {
      elem.value = this.elem.value ? this.elem.value : ''
      elem.addEventListener('keyup', (evt) => {
        this.elem.value = evt.target.value
      })
    }

    const setElemPosition = () => {
      const editorElement = this.$refs['editorElement']
      editorElement.style.top = this.elem.top
      editorElement.style.left = this.elem.left
      editorElement.value = this.elem.value
    }
    setElemPosition()
  },

  methods: {
    onMouseDown: function (evt) {
      this.movingElem = evt.target.parentElement.parentElement

      this.clicked = true
      const { clientX, clientY } = evt
      this.clickedPosition.top = clientY
      this.clickedPosition.left = clientX

      const { style } = this.movingElem
      this.elemPosition.top = style.top ? Number(style.top.replace('px', '')) : 10
      this.elemPosition.left = style.left ? Number(style.left.replace('px', '')) : 10
    },
    onMouseMove: function (evt) {
      if (this.clicked && this.movingElem) {
        this.moving = true
        const { top: lastTop, left: lastLeft } = this.clickedPosition
        const { clientX, clientY } = evt
        const { top: elemTop, left: elemLeft } = this.elemPosition
        this.movingElem.style.top = `${clientY - lastTop + elemTop}px`
        this.movingElem.style.left = `${clientX - lastLeft + elemLeft}px`
      }
    },
    onMouseUp: function (evt) {
      this.clicked = false
      this.moving = false

      if (this.movingElem) {
        this.elem.top = this.movingElem.style.top
        this.elem.left = this.movingElem.style.left
      }
    },
    onElementRemove: function () {
      this.removeElement(this.elem.id)
    }
  }
}
</script>

<style lang="scss">
  @import '~variables';
  .editor-element {
    left: 10px;
    top: 10px;
    position: absolute;
    z-index: 1;
    cursor: move;
    position: absolute;
    border: 1px solid transparent;

    .ic-close {
      right: 5px;
      top: 0;
      position: absolute;
      font-size: 20px;
      line-height: 1;
      opacity: 0;
      visibility: hidden;

      &:hover {
        cursor: pointer;
        color: red;
      }
    }

    * {
      display: block;
      user-select: none;
      position: relative;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;

       -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
    }

    img {
      position: relative;
      &::before {
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
      }
    }

    &.moving {
      z-index: 999;
      * {
        box-shadow: 0px 0px 25px -3px $GREY_300;
      }
    }
    &:hover {
      border-color: $GREY_300;
      .ic-close {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>
