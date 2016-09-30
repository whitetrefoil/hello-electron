<style rel="stylesheet/scss" lang="scss">
.my-mdl-checkbox.my-mdl-checkbox--indeterminate {
  .mdl-checkbox__tick-outline {
    background-image: url("img/indeterminate.svg");
  }
}
</style>

<template>
  <label
      class="mdl-checkbox mdl-js-checkbox my-mdl-checkbox"
      :class="{'my-mdl-checkbox--indeterminate': isIndeterminate}"
  >
    <input
        type="checkbox"
        class="mdl-checkbox__input"
        :name="name"
        v-model="isChecked"
        @click.prevent.stop="emitInputEvent"
    >
    <span class="mdl-checkbox__label"><slot></slot></span>
  </label>
</template>

<script type="text/javascript" lang="babel">
module.exports = {

  props: {
    name   : {
      type   : String,
      default: '',
    },
    value  : {
      type   : String,
      default: '',
    },
    checked: {
      type   : [Boolean, String],
      default: false,
    },
  },

  computed: {
    isChecked() {
      return Boolean(this.checked);
    },
    isIndeterminate() {
      return this.checked === 'indeterminate'
    },
  },

  methods: {
    emitInputEvent($event) {
      this.$emit('input', $event.currentTarget.value)
      this.$forceUpdate()
    },
  },

  mounted() {
    componentHandler.upgradeElement(this.$el)
  },

  updated() {
    this.$el.MaterialCheckbox.checkToggleState()
  },
}
</script>
