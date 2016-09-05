<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <mdl-textfield :floating-label="name"
                 :value="extensions"></mdl-textfield>
</template>

<script lang="babel" type="text/javascript">
module.exports = {
  props: {
    name      : String,
    extensions: Set,
  },
};
</script>
