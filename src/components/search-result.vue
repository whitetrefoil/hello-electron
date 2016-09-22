<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <section class="search-result">
    <table class="mdl-data-table mdl-js-data-table">

      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">RAW File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in searchResult">
          <td class="mdl-data-table__cell--non-numeric">{{row.shortPath}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{row.foundJpgExts}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script type="text/javascript" lang="babel">
const SearchResult = require('../vuex/actions/search-result')

module.exports = {
  props: {
    searchResult: [SearchResult, void 0],
  },
}
</script>
