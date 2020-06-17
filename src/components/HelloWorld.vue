<template>
  <div class="hello">
    <Trans id="id.msg" />
    <Trans id="Hello {name}" :values="{ name: 'Jaryk' }" />
    <Trans id="<abc>Hello</abc> <b>{name} <i>{last}</i></b>!" :values="{ name: 'Jaryk', last: 'Viktorchyk' }">
      <template v-slot:abc>
        <del />
      </template>
      <template v-slot:b>
        <b />
      </template>
      <template v-slot:i>
        <i />
      </template>
    </Trans>
    {{ macroMessage }}
  </div>
</template>

<script>
import { Trans } from '../'
import { t } from '@lingui/macro'

export default {
  name: 'HelloWorld',
  components: {
    Trans,
  },
  data() {
    const name = 'Jaryk'
    return {
      macroMessage: t`Hello ${name}`,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
