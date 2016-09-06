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

    <mdl-textfield floating-label="Add More"
                   :value.sync="extToAdd"
                   @keydown.enter="addExt"></mdl-textfield>

    <mdl-button type="button" icon="icon" colored @click="addExt">
      <i class="material-icons">done</i></mdl-button>
  </div>
</template>

<script lang="babel" type="text/javascript">
const _ = require('lodash');

module.exports = {
  props   : {
    name      : String,
    extensions: Array,
  },
  data() {
    return {
      extToAdd: '',
    };
  },
  methods : {
    addExt() {
      if (_.isEmpty(this.extToAdd)) { return; }
      this.$dispatch('add-ext', this.extToAdd);
      this.extToAdd = '';
    },
    deleteExt(ext) {
      this.$dispatch('delete-ext', ext);
    },
  },
};
</script>
