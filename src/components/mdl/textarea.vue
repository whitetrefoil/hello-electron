<template>
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input
        class="mdl-textfield__input"
        :type="type"
        :value="value"
        @change.prevent.stop="emitInputEvent"
    >
    <label class="mdl-textfield__label">Search In:</label>
  </div>
</template>

<script type="text/javascript" lang="babel">
module.exports = {

  props: {
    type : {
      type   : String,
      default: 'text',
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
}
</script>
