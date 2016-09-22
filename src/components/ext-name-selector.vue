<style lang="scss" rel="stylesheet/scss" scoped>
.ext-name-selector {
  display     : flex;
  align-items : center;

  > * {
    flex-shrink : 0;
  }
}

label {
  display : inline-block;
}

.ext-names {
  flex-grow   : 1;
  flex-shrink : 1;
}

.mdl-textfield {
  width : 5em;
}

.mdl-chip {
  margin-left : 10px;
}
</style>

<template>
  <div class="ext-name-selector">
    <label>{{name}}</label>

    <div class="ext-names">
      <span class="mdl-chip mdl-chip--deletable" v-for="ext in extensions">
        <span class="mdl-chip__text">*.{{ext}}</span>

        <button type="button" class="mdl-chip__action" @click="deleteExt(ext)">
          <i class="material-icons">cancel</i>
        </button>
      </span>
    </div>

    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input type="text"
             class="mdl-textfield__input"
             v-model="local.extToAdd"
             @keydown.enter="addExt">
      <label class="mdl-textfield__label">Add More</label>
    </div>

    <mdl-button
        types="icon"
        color="primary"
        @click.prevent.stop.native="addExt">
      done
    </mdl-button>
  </div>
</template>

<script type="text/javascript" lang="babel">
const _                          = require('lodash')
const { MdlButton, MdlTextArea } = require('./mdl')

module.exports = {
  props: {
    name           : String,
    extensions     : Array,
    addExtAction   : String,
    deleteExtAction: String,
  },

  data() {
    return {
      local: {
        extToAdd: '',
      },
    }
  },

  methods: {
    addExt() {
      if (_.isEmpty(this.local.extToAdd)) { return }
      this.$store.dispatch(this.addExtAction, this.local.extToAdd)
      this.local.extToAdd = ''
    },

    deleteExt(ext) {
      this.$store.dispatch(this.deleteExtAction, ext)
    },
  },

  components: {
    MdlButton,
    MdlTextArea,
  },
}
</script>
