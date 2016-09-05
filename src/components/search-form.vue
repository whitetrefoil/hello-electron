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
                         name="RAW Extensions:"
                         :extensions="rawExt"></ext-name-selector>

      <ext-name-selector class="form-line"
                         name="JPG Extensions:"
                         :extensions="jpgExt"></ext-name-selector>
    </form>
  </section>
</template>

<script type="text/javascript" lang="babel">
const dirSelector     = require('./dir-selector.vue');
const extNameSelector = require('./ext-name-selector.vue');

module.exports = {

  props: {
    searchIn: [String, void 0],
    rawExt: Set,
    jpgExt: Set,
  },

  components: {
    dirSelector,
    extNameSelector,
  },
};
</script>
