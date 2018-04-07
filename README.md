# Pikto test

The files were separated into 2 parts, back-end and front-end code.

## Backend
`cd back-end`
`run npm install`
`run npm start`

## Frontend
// Now uing VueJS v2, was built by Vue Client
`cd front-end`
`runt npm install`
`run run dev`

The app was separated into pages, now there is just one page (HomePage)
In HomePage, there are 2 containers, `sidebar` and `main-content`

  - Home: 
    data: `images`, `elements`
    methods: for updating images and elements

  - Sidebar:
    components: `ImageUploader`, `ImageList`
    props: `images` sent from Home.
    methods: 
      `updateImages` after resolve the images-upload api calling, then call Home's function for updating images list
      `addImage` will add call `addElement` method of home for adding image to editor
      `addTextarea` will call `addElement` method on home for adding textarea to editor
  - MainContent: 
    components: `Editor`, inside `Editor` will have `EditorItems`
    There will be some function for detech and update element. The watcher of `Home` will save current editor elements by `EditorService`




