<template>
  <div class="hello">
    <Trans id="id.msg" />
    <Trans id="Hello {name}" :values="{ name: 'Jaryk' }" />
    <Trans id="<abc>Click here</abc> <y>to go to</y> <x>a different page</x>!">
      <template v-slot:abc="{ translation }">
        <a href="/some-page">{{ translation }}</a>
      </template>
      <template v-slot:y="{ translation }">
        <b>{{ translation }}</b>
      </template>
      <template v-slot:x="{ translation }">
        <i>{{ translation }}</i>
      </template>
    </Trans>
    <Trans id="I have {numBooks, plural, one {# book} other {# books}}" :values="{ numBooks: 1 }" />
    <Trans id="I have {numBooksSlot} {numBooks, plural, one {book} other {books}}" :values="{ numBooks }">
      <template v-slot:numBooksSlot>
        <input v-model="numBooks" type="number" style="width: 40px" />
      </template>
    </Trans>
    <Trans id="Today is {date, date}" :values="{ date: new Date() }" />
    {{ computedMacroMessage }}
  </div>
</template>

<script>
import { t } from '@lingui/macro'
import { Trans } from '@ugzuzg/lingui-vue'

export default {
  name: 'HelloWorld',
  components: {
    Trans,
  },
  data() {
    return {
      numBooks: 1,
    }
  },
  computed: {
    computedMacroMessage() {
      const name = 'Jaryk'
      return t`Hello ${name}`
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
