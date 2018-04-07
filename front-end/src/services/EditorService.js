const EditorService = {
  update: (elements) => {
    localStorage.setItem('editorHtml', JSON.stringify(elements))
  },
  get: () => {
    const storedHtml = localStorage.getItem('editorHtml')
    if (!storedHtml || '' + storedHtml === 'null' || '' + storedHtml === 'undefined') return []
    return JSON.parse(storedHtml)
  }
}
export default EditorService
