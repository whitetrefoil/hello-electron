<style lang="scss" rel="stylesheet/scss">
@import "~material-design-lite/src/_color-definitions.scss";
@import "~material-design-lite/src/material-design-lite.scss";
/*@import "~material-design-lite/dist/material.indigo-pink.min.css";*/
@import "~vendor/roboto-fonts.scss";
@import "~vendor/material-icons.css";

* {
  box-sizing          : border-box;
  -webkit-app-region  : drag;
  -webkit-user-select : none;
}

input, button, textarea {
  -webkit-app-region  : no-drag;
  -webkit-user-select : text;
}

#app {

  &, input, textarea, button {
    font-family : Roboto, sans-serif;
  }

  > section {
    width   : 100%;
    padding : 20px 20px 0 20px;
  }

  > header {
    display     : block;
    padding-top : 24px;
  }

  .search-result {
    flex-grow : 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
.search-buttons {
  button {
    margin-right : 15px;
  }
}
</style>

<template>
  <div id="app" class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <h1 class="mdl-layout-title">Hello Electron!</h1>
      </div>
    </header>

    <search-form :search-in="searchIn"
                 :raw-ext="rawExt"
                 :jpg-ext="jpgExt"
                 @set-search-dir="setSearchDir"
                 @add-raw-ext="addRawExt"
                 @delete-raw-ext="deleteRawExt"
                 @add-jpg-ext="addJpgExt"
                 @delete-jpg-ext="deleteJpgExt"></search-form>

    <section class="search-buttons">
      <mdl-button raised
                  primary
                  v-mdl-ripple-effect
                  @click="search">Search
      </mdl-button>
      <mdl-button raised v-mdl-ripple-effect>Reset</mdl-button>
    </section>

    <section class="search-result">
      <pre>{{searchResults}}</pre>
    </section>

    <footer class="mdl-mini-footer">
      <div>We are using node {{versions.node}}, Chrome {{versions.chrome}}, and Electron {{versions.electron}}.</div>
    </footer>
  </div>
</template>

<script lang="babel" type="text/javascript">
const actions    = require('../vuex/actions');
const searchForm = require('./search-form.vue');

module.exports = {
  data() {
    return {
      versions: {},
    };
  },
  vuex      : {
    getters: {
      searchIn     : state => state.params.searchIn,
      rawExt       : state => state.params.rawExt,
      jpgExt       : state => state.params.jpgExt,
      searchResults: state => JSON.stringify(state.searchResults, null, 2),
    },
    actions,
  },
  ready() {
    this.versions = process.versions;
  },
  components: {
    searchForm,
  },
};
</script>

