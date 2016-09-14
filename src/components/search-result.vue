<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <section class="search-result">
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable">

      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">RAW File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody>
        <tr >
          <td class="mdl-data-table__cell--non-numeric">row.shortPath}}</td>
          <td class="mdl-data-table__cell--non-numeric">row.foundJpgExts}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script type="text/javascript" lang="babel">
module.exports = {
  props: {
    searchResult: Array,
  },

  computed: {
    searchResultJson() {
      return JSON.stringify(this.searchResult, null, 2);
    },
  },
};
</script>
