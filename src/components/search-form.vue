<style lang="scss" rel="stylesheet/scss" scoped>
form {
  width : 100%;
}
</style>

<template>
  <section class="search-form">
    <form action="#">
      <dir-selector class="form-line"
                    :search-in="searchIn"
                    :set-search-dir-action="setSearchDirAction"></dir-selector>

      <ext-name-selector class="form-line"
                         name="RAW Ext.:"
                         :extensions="rawExt"
                         add-ext-action="addRawExt"
                         delete-ext-action="deleteRawExt"></ext-name-selector>

      <ext-name-selector class="form-line"
                         name="JPG Ext.:"
                         :extensions="jpgExt"
                         add-ext-action="addJpgExt"
                         delete-ext-action="deleteJpgExt"></ext-name-selector>
    </form>
  </section>
</template>

<script type="text/javascript" lang="babel">
const dirSelector     = require('./dir-selector.vue')
const extNameSelector = require('./ext-name-selector.vue')

module.exports = {

  props: {
    searchIn          : String,
    rawExt            : Array,
    jpgExt            : Array,
    setSearchDirAction: String,
  },

  components: {
    dirSelector,
    extNameSelector,
  },
}
</script>
