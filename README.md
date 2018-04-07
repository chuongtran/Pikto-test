# Pikto test

The files were separated into 2 parts, back-end and front-end code.

## Backend
`cd back-end`<br/>
`npm install`<br/>
`npm start`

## Frontend
// Now uing VueJS v2, was built by Vue Client<br/>
`cd front-end`<br/>
`npm install`<br/>
`npm run dev`

The app was separated into pages, now there is just one page (HomePage)
In HomePage, there are 2 containers, `sidebar` and `main-content`

  - Home: <br/>
    data: `images`, `elements`<br/>
    methods: for updating images and elements

  - Sidebar:<br/>
    components: `ImageUploader`, `ImageList`<br/>
    props: `images` sent from Home.<br/>
    methods: <br/>
      `updateImages` after resolve the images-upload api calling, then call Home's function for updating images list<br/>
      `addImage` will add call `addElement` method of home for adding image to editor<br/>
      `addTextarea` will call `addElement` method on home for adding textarea to editor<br/>
  - MainContent: <br/>
    components: `Editor`, inside `Editor` will have `EditorItems`<br/>
    There will be some function for detech and update element. The watcher of `Home` will save current editor elements by `EditorService`




