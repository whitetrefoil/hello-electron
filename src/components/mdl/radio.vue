<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <label class="mdl-radio mdl-js-radio">
    <input type="radio"
           class="mdl-radio__button"
           :name="name"
           :value="value"
           :checked = "isChecked"
           @change.prevent.stop="emitInputEvent">
    <span class="mdl-radio__label"><slot></slot></span>
  </label>
</template>

<script type="text/javascript" lang="babel">
module.exports = {

  props: {
    name: {
      type   : String,
      default: '',
    },
    value: {
      type   : String,
      default: '',
    },
  },

  methods: {
    emitInputEvent($event) {
      this.$emit('input', $event.currentTarget.value)
    },
  },

  computed: {
    isChecked() {
      return this.$store.state.params.orderBy === this.value
    },
  },
}

</script>
