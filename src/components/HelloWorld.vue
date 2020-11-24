<template>
  <div class="hello">
    <Trans id="id.msg" />
    <Trans id="Hello {name}" :values="{ name: 'Jaryk' }" />
    <Trans id="<abc>Hello</abc> <y>{name} <x>{last}</x></y>!" :values="{ name: 'Jaryk', last: 'Viktorchyk' }">
      <template v-slot:abc>
        <a href="/some-page" style="font-size: 100px">
          <del>x<abc /></del>
        </a>
      </template>
      <template v-slot:y>
        <b><y /></b>
      </template>
      <template v-slot:x>
        <i><x /></i>
      </template>
    </Trans>
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 1 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 2 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 12 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 21 }" />
    {{ macroMessage }}
    {{ computedMacroMessage }}
  </div>
</template>

<script>
import { Trans, linguiI18n } from '../../lib'

export default {
  name: 'HelloWorld',
  components: {
    Trans,
  },
  data() {
    const name = 'Jaryk'
    return {
      macroMessage: this[linguiI18n].i18n._('Hello {name}', { name }),
    }
  },
  computed: {
    computedMacroMessage() {
      const name = 'Jaryk'
      return this[linguiI18n].i18n._('Hello {name}', { name })
    },
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
