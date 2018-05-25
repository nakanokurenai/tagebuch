<template>
  <div ref="container"></div>
</template>

<script>
import * as monaco from 'monaco-editor'

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
}

export default {
  props: ['value'],
  beforeMount() {
    const monaco = monaco.editor.create(this.$refs.container, {
      value: this.value,
      language: 'markdown',
    })
    monaco.onDidChangeContent(e => {
      this.$emit('input', monaco.getValue())
    })
  }
}
</script>
