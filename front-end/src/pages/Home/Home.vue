<template>
  <div class="row">
    <div class="col-md-4">
      <div class="sidebar text-left">
        <h1 class="text-center">Materials</h1>
        <hr />
        <ImageUploader :add-image="addImage"></ImageUploader>
        <h4>Images</h4>
        <ImagesList v-bind:images="images" :add-element="addElement"></ImagesList>

        <hr />
        <h4>Form</h4>
        <button class="btn btn-default" @click="onTextAreaAdd">Text area</button>
      </div>
    </div>
    <div class="col-md-8">
      <div class="main-content">
        <Editor :elements="elements" :remove-element="removeElement"></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import ImagesList from '@/components/ImagesList'
import Editor from '@/components/Editor'
import Rx from 'rxjs/Rx'
import EditorService from '@/services/EditorService'

const UUID = () => {
  return new Date().getTime()
}
export default {
  name: 'HelloWorld',
  components: { ImageUploader, ImagesList, Editor },
  data: function () {
    return {
      elements: EditorService.get()
    }
  },
  subscriptions: () => {
    return {
      images: Rx.Observable.ajax({
        responseType: 'json',
        url: 'http://localhost:8000/images/'
      }).pluck('response')
    }
  },
  methods: {
    addImage: function (image) {
      this.images.push(image)
    },
    addElement: function (elem) {
      if (elem) {
        const wrapper = document.createElement('div')
        elem.id = UUID()
        wrapper.appendChild(elem)
        this.elements.push({
          id: elem.id,
          elem: wrapper.innerHTML,
          top: 10,
          left: 10,
          value: ''
        })
      }
    },
    removeElement: function (id) {
      const { elements } = this

      // TODO: CHEAT!!!
      this.elements = []
      setTimeout(() => {
        this.elements = elements.filter(item => item.id !== id)
      }, 0)
    },
    onTextAreaAdd: function (evt) {
      const textArea = document.createElement('textarea')
      textArea.value = 'placeholder'
      this.addElement(textArea)
    }
  },
  watch: {
    elements: {
      handler: function (val) {
        EditorService.update(val)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./Home.scss"></style>
