<style lang="scss" rel="stylesheet/scss" scoped>
table {
  width : 100%;
}
</style>

<template>
  <section class="search-result">
    <table class="mdl-data-table mdl-js-data-table" v-if="orderBy === 'raw'">

      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">RAW File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody v-if="searchResult.byRaw != null">
        <tr v-for="row in searchResult.byRaw">
          <td
              class="mdl-data-table__cell--non-numeric"
          >{{row.file.shortPath}}
          </td>
          <td
              class="mdl-data-table__cell--non-numeric"
          >{{row.companions | companionList}}
          </td>
        </tr>
      </tbody>
    </table>

    <table class="mdl-data-table mdl-js-data-table" v-else>

      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">JPG File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody v-if="searchResult.byJpg != null">
        <tr v-for="row in searchResult.byJpg">
          <td
              class="mdl-data-table__cell--non-numeric"
          >{{row.file.shortPath}}
          </td>
          <td
              class="mdl-data-table__cell--non-numeric"
          >{{row.companions | companionList}}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script type="text/javascript" lang="babel">
const _            = require('lodash')
const path         = require('path')
const SearchResult = require('../vuex/actions/search-result')

module.exports = {
  props: {
    searchResult: {
      type    : SearchResult,
      required: false,
    },
    orderBy     : {
      type   : String,
      require: true,
    },
  },

  filters: {
    companionList(companions) {
      return _(companions)
          .map(comp => path.extname(comp.shortPath))
          .join(',')
    },
  },
}
</script>
