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
          <th class="mdl-data-table__cell--non-numeric">
            <mdl-checkbox
                name="select-all"
                :checked="isAllSelected"
                @input="selectAll"
            ></mdl-checkbox>
          </th>
          <th class="mdl-data-table__cell--non-numeric">RAW File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody v-if="searchResult.byRaw != null">
        <tr v-for="row in searchResult.byRaw">
          <td class="mdl-data-table__cell--non-numeric">
            <mdl-checkbox
                :checked="isSelected(row.file.path)"
                @input="select(row.file.path)"
            ></mdl-checkbox>
          </td>
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
          <th class="mdl-data-table__cell--non-numeric">
            <mdl-checkbox
                name="select-all"
                :checked="isAllSelected"
                @input="selectAll"
            ></mdl-checkbox>
          </th>
          <th class="mdl-data-table__cell--non-numeric">JPG File</th>
          <th class="mdl-data-table__cell--non-numeric">Comp.</th>
        </tr>
      </thead>

      <tbody v-if="searchResult.byJpg != null">
        <tr v-for="row in searchResult.byJpg">
          <td class="mdl-data-table__cell--non-numeric">
            <mdl-checkbox
                :checked="isSelected(row.file.path)"
                @input="select(row.file.path)"
            ></mdl-checkbox>
          </td>

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
const _               = require('lodash')
const path            = require('path')
const SearchResult    = require('../vuex/actions/search-result')
const { MdlCheckbox } = require('./mdl')

module.exports = {
  props: {
    searchResult         : {
      type    : [SearchResult, void 0],
      required: false,
    },
    searchResultSelection: {
      type    : [Object, void 0],
      required: false,
    },
    orderBy              : {
      type   : String,
      require: true,
    },
    selectAction         : {
      type    : String,
      required: true,
    },
  },

  filters: {
    companionList(companions) {
      return _(companions)
          .map(comp => path.extname(comp.shortPath))
          .join(',')
    },
  },

  computed: {
    isAllSelected() {
      if (_.isEmpty(this.searchResultSelection)) { return false }

      let initial

      for (const k in this.searchResultSelection) {
        if (this.searchResultSelection[k] === initial) { continue }
        if (initial !== void 0) { return 'indeterminate' }
        initial = this.searchResultSelection[k]
      }

      return initial
    },
  },

  methods: {
    isSelected(jpgPath) {
      return this.searchResultSelection[jpgPath]
    },

    select(jpgPath) {
      this.$store.dispatch(this.selectAction, {
        jpgPath,
        isSelected: !this.isSelected(jpgPath),
      })
    },

    selectAll() {
      this.$store.dispatch(this.selectAction, {
        jpgPath   : null,
        isSelected: !this.isAllSelected,
      })
    },
  },

  components: {
    MdlCheckbox,
  },
}
</script>
