<style rel="stylesheet/scss" lang="scss" scoped>
.mdl-snackbar {
  position   : absolute;
  min-height : 48px;
}

.mdl-badge[data-badge]:after {
  right : -11px;
}

i.material-icons {
  vertical-align : middle;
  margin-right   : 10px;
}
</style>

<template>
  <div
      ref="container"
      class="mdl-snackbar mdl-badge"
      :class="{'mdl-snackbar--active': firstError}"
      :data-badge="errorsCount"
  >
    <div
        class="mdl-snackbar__text"
        v-if="firstError"
        :title="firstError.timestamp"
    >{{firstError.message}}
    </div>
    <button
        class="mdl-snackbar__action"
        v-if="firstError"
        @click="read"
    >OK
    </button>
  </div>
</template>

<script type="text/javascript" lang="babel">
const _      = require('lodash')
const moment = require('moment')

module.exports = {

  props: {
    errors    : {
      type   : Array,
      default: [],
    },
    readAction: {
      type    : String,
      required: true,
    },
  },

  computed: {
    firstError() {
      const firstError = this.errors[0]
      if (_.isNil(firstError)) { return null }
      return {
        message: firstError.message,
        timestamp: moment(firstError.timestamp).format('lll'),
      }
    },
    errorsCount() {
      return this.errors.length > 1 ? this.errors.length : null
    },
  },

  methods: {
    read() {
      this.$store.dispatch(this.readAction)
    },
  },
}
</script>
