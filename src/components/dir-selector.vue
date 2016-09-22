<style lang="scss" rel="stylesheet/scss" scoped>
.dir-selector {
  display     : flex;
  align-items : center;
}

.mdl-textfield {
  flex-grow    : 1;
  margin-right : 10px;
}
</style>

<template>
  <div class="dir-selector">
    <!--
    <div class="mdl-textfield mdl-js-textfield mdl-textfield&#45;&#45;floating-label">
      <input type="text"
             class="mdl-textfield__input"
             :value="searchIn"
             @change.prevent.stop="setSearchDirManually">
      <label class="mdl-textfield__label">Search In:</label>
    </div>
    -->

    <mdl-text-area
        :value="searchIn"
        @input="setSearchDirManually"
    ></mdl-text-area>

    <mdl-button
        color="primary"
        ripple
        @click.prevent.stop.native="browse">
      Browse
    </mdl-button>
  </div>
</template>

<script type="text/javascript" lang="babel">
const { dialog }                 = require('electron').remote
const _                          = require('lodash')
const { MdlButton, MdlTextArea } = require('./mdl')

module.exports = {
  props: {
    searchIn          : String,
    setSearchDirAction: String,
  },

  methods: {

    setSearchDir(dir) {
      this.$store.dispatch(this.setSearchDirAction, dir)
    },

    browse() {
      dialog.showOpenDialog({
        title     : 'Search In...',
        properties: ['openDirectory'],
      }, filenames => {
        if (_.isNil(filenames)) { return }
        this.setSearchDir(filenames[0])
      })
    },

    setSearchDirManually(dir) {
      this.setSearchDir(dir)
    },
  },

  components: {
    MdlButton,
    MdlTextArea,
  },
}
</script>
