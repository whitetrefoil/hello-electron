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

</style>

<style lang="scss" rel="stylesheet/scss" scoped>
.search-buttons {
  padding : 20px 0;

  > button, label {
    margin-right : 15px;
  }
}

#app {

  &, input, textarea, button {
    font-family : Roboto, sans-serif;
  }

  > header {
    display     : block;
    padding-top : 24px;
  }

  > .content {
    width     : 100%;
    padding   : 20px 20px 0 20px;
    flex-grow : 1;
    position  : relative;
    overflow  : hidden;
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

    <div class="content">

      <search-form :search-in="params.searchIn"
                   :raw-ext="params.rawExt"
                   :jpg-ext="params.jpgExt"
                   set-search-dir-action="setSearchDir"
                   add-raw-ext="addRawExt"
                   delete-raw-ext="deleteRawExt"
                   add-jpg-ext="addJpgExt"
                   delete-jpg-ext="deleteJpgExt"
      ></search-form>

      <div class="search-buttons">
        <mdl-button
            types="raised"
            color="primary"
            ripple
            @click.stop.prevent.native="search">Search
        </mdl-button>

        <mdl-button
            types="raised"
            ripple
            @click.stop.prevent.native="reset">Reset
        </mdl-button>

        <mdl-radio
            name="group-by"
            value="raw"
            @input="setOrderBy"
        >By RAW
        </mdl-radio>

        <mdl-radio
            name="group-by"
            value="jpg"
            @input="setOrderBy"
        >By JPG
        </mdl-radio>
      </div>

      <!--<search-result :search-result="searchResult"></search-result>-->

      <notification
          :errors="errors"
          read-action="removeFirstErrorMessage"
      ></notification>
    </div>

    <footer class="mdl-mini-footer">
      <div>We are using node {{versions.node}}, Chrome {{versions.chrome}}, and Electron {{versions.electron}}.</div>
    </footer>
  </div>
</template>

<script type="text/javascript" lang="babel">
const { mapState, mapActions } = require('vuex')
const log                      = require('../log')
const store                    = require('../vuex/store')
const { MdlButton, MdlRadio }  = require('./mdl')
const Notification             = require('./notification.vue')
const SearchForm               = require('./search-form.vue')
// const SearchResult             = require('./search-result.vue')

module.exports = {
  name: 'App',

  store,

  data() {
    return {
      versions: {},
    }
  },

  created() {
    this.versions = process.versions
  },

  computed: mapState(['params', 'errors']),

  components: {
    MdlButton,
    MdlRadio,
    Notification,
    SearchForm,
    // SearchResult,
  },

  methods: {
    search() {
      log.warn('TODO')
    },

    reset() {
      log.warn('TODO')
    },

    ...mapActions(['setOrderBy']),
  },
}
</script>

