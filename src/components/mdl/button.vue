<template>
  <button
      :type="type"
      class="mdl-button mdl-js-button"
      :class="klasses">

    <i
        class="material-icons"
        v-if="isIcon">
      <slot></slot>
    </i>

    <slot v-else></slot>
  </button>
</template>

<script lang="babel" type="text/javascript">
const _ = require('lodash')

module.exports = {

  props: {
    type  : {
      type   : String,
      default: 'button',
    },
    types : {
      type    : String,
      required: false,
    },
    color : {
      type    : String,
      required: false,
    },
    ripple: {
      type   : Boolean,
      default: false,
    },
  },

  computed: {
    isIcon() {
      return !_.isNil(this.types) && this.types.split(' ').indexOf('icon') >= 0
    },

    klasses() {
      const klasses = []

      if (!_.isEmpty(this.types)) {
        _.forEach(this.types.split(' '), type => {
          klasses.push(`mdl-button--${type}`)
        })
      }

      if (!_.isEmpty(this.color)) {
        klasses.push(`mdl-button--${this.color}`)
      }

      if (this.ripple) {
        klasses.push('mdl-js-ripple-effect')
      }

      return klasses
    },
  },
}
</script>
