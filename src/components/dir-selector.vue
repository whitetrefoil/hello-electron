<style lang="scss" rel="stylesheet/scss" scoped>
.vue-component-dir-selector {
  display: flex;
  align-items : center;
}
.mdl-textfield {
  flex-grow: 1;
  margin-right: 10px;
}
</style>

<template>
  <div class="vue-component-dir-selector">
    <mdl-textfield floating-label="Search In:"
                   :value="searchIn"
                   @change="setSearchDirManually"></mdl-textfield>
    <mdl-button type="button"
                class="mdl-js-ripple-effect"
                colored
                @click="browse">Browse
    </mdl-button>
  </div>
</template>

<script type="text/javascript" lang="babel">
const { dialog } = require('electron').remote;
const _          = require('lodash');

module.exports = {
  props: {
    searchIn: [String, void 0],
  },

  methods: {

    setSearchDir(dir) {
      this.$dispatch('set-search-dir', dir);
    },

    browse() {
      dialog.showOpenDialog({
        title     : 'Search In...',
        properties: ['openDirectory'],
      }, filenames => {
        if (_.isNil(filenames)) { return; }
        this.setSearchDir(filenames[0]);
      });
    },

    setSearchDirManually(event) {
      this.setSearchDir(event.target.value);
    },
  },
};
</script>
