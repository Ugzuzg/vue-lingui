<template>
  <div class="hello">
    <Trans id="id.msg" />
    <Trans id="Hello {name}" :values="{ name: 'Jaryk' }" />
    <Trans id="<abc>part1</abc> <y>bold slot</y> <x>italic</x>!">
      <template v-slot:abc="{ translation }">
        <a href="/some-page" style="font-size: 100px">{{ translation }}</a>
      </template>
      <template v-slot:y="{ translation }">
        <b>{{ translation }}</b>
      </template>
      <template v-slot:x="{ translation }">
        <i>{{ translation }}</i>
      </template>
    </Trans>
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 1 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 2 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 12 }" />
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 21 }" />
    {{ computedMacroMessage }}
  </div>
</template>

<script>
// import { t } from '@lingui/macro'
import { Trans, linguiI18n } from '@ugzuzg/lingui-vue'

export default {
  name: 'HelloWorld',
  components: {
    Trans,
  },
  computed: {
    computedMacroMessage() {
      const name = 'Jaryk'
      return this[linguiI18n].i18n._('Hello {name}', { name })
      // return t`Hello ${name}`
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
