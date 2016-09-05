<style lang="scss" rel="stylesheet/scss" scoped>
form {
  width : 100%;
}
</style>

<template>
  <section class="search-form">
    <form action="#">
      <dir-selector class="form-line" :search-in="searchIn"></dir-selector>
    </form>
  </section>
</template>

<script type="text/javascript" lang="babel">
const dirSelector = require('./dir-selector.vue');

module.exports = {

  props: {
    searchIn: [String, void 0],
  },

  components: {
    dirSelector,
  },
};
</script>
