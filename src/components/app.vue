<template>
  <div id="app" class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <h1 class="mdl-layout-title">Hello Electron!</h1>
      </div>
    </header>

    <section class="search-form">
      <form action="#">
        <div class="form-line">
          <mdl-textfield floating-label="Search In:"
                         :value="searchIn"
                         @change="setSearchDirManually"></mdl-textfield>
          <mdl-button type="button"
                      class="mdl-js-ripple-effect"
                      @click="browse">Browse
          </mdl-button>
        </div>
      </form>
    </section>

    <section class="search-result"></section>

    <footer class="mdl-mini-footer">
      <div>We are using node {{*versions.node}}, Chrome {{*versions.chrome}}, and Electron {{*versions.electron}}.</div>
    </footer>
  </div>
</template>

<script lang="babel" type="text/javascript">
const { dialog } = require('electron').remote;
const _          = require('lodash');
const store      = require('../vuex/store');
const actions    = require('../vuex/actions');

module.exports = {
  store,
  data() {
    return {
      versions: {},
    };
  },
  vuex   : {
    getters: {
      searchIn: state => state.params.searchIn,
    },
    actions: {
      setSearchDir: actions.setSearchDir,
    },
  },
  methods: {
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
  ready() {
    this.versions = process.versions;
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~material-design-lite/dist/material.indigo-pink.min.css";
@import "~vendor/roboto-fonts.scss";
@import "~vendor/material-icons.css";

* {
  box-sizing : border-box;
}

#app {

  &, input, textarea, button {
    font-family : Roboto, sans-serif;
  }

  > section {
    width   : 100%;
    padding : 20px;
  }

  > header {
    display             : block;
    -webkit-app-region  : drag;
    -webkit-user-select : none;
  }

  .search-form {
    form {
      width : 100%;

      .form-line {
        display     : flex;
        align-items : center;

        > * {
          margin-left : 10px;
        }

        > *:first-child {
          flex-grow   : 1;
          margin-left : 0;
        }
      }
    }
  }

  .search-result {
    flex-grow : 1;
  }
}
</style>
