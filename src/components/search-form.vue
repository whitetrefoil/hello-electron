<style lang="scss" rel="stylesheet/scss" scoped>
form {
  width : 100%;
}
</style>

<template>
  <section class="search-form">
    <form action="#">
      <dir-selector class="form-line" :search-in="searchIn"></dir-selector>

      <ext-name-selector class="form-line"
                         name="RAW Ext.:"
                         :extensions="rawExt"
                         @add-ext="addRawExt"
                         @delete-ext="deleteRawExt"></ext-name-selector>

      <ext-name-selector class="form-line"
                         name="JPG Ext.:"
                         :extensions="jpgExt"
                         @add-ext="addJpgExt"
                         @delete-ext="deleteJpgExt"></ext-name-selector>
    </form>
  </section>
</template>

<script type="text/javascript" lang="babel">
const dirSelector     = require('./dir-selector.vue');
const extNameSelector = require('./ext-name-selector.vue');

module.exports = {

  props: {
    searchIn: [String, void 0],
    rawExt  : Array,
    jpgExt  : Array,
  },

  components: {
    dirSelector,
    extNameSelector,
  },

  methods: {
    addRawExt(ext) {
      this.$dispatch('add-raw-ext', ext);
    },
    addJpgExt(ext) {
      this.$dispatch('add-jpg-ext', ext);
    },
    deleteRawExt(ext) {
      this.$dispatch('delete-raw-ext', ext);
    },
    deleteJpgExt(ext) {
      this.$dispatch('delete-jpg-ext', ext);
    },
  },
};
</script>
