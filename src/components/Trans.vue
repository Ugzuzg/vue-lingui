<script>
import { linguiI18n } from '../i18n-context.js'
const tagRe = /<(\d+|\w+)>(.*?)<\/\1>|<(\d+|\w+)\/>/
const nlRe = /(?:\r\n|\r|\n)/g

function getElements(parts) {
  if (!parts.length) return []

  const [paired, children, unpaired, after] = parts.slice(0, 4)

  return [[paired || unpaired, children || '', after]].concat(getElements(parts.slice(4, parts.length)))
}

function formatElements(h, value, elements) {
  const parts = value.replace(nlRe, '').split(tagRe)
  if (parts.length === 1) return [h('span', value)]

  const tree = []
  const before = parts.shift()
  if (before) tree.push(before)

  for (const [index, children, after] of getElements(parts)) {
    let element = elements[index]
    if (element && element[0] && element[0].tag) {
      element[0].children = children ? formatElements(h, children, elements) : null
    } else {
      element = h('span', element)
    }
    tree.push(
      element,
      /*
      h(
        element,

        // format children for pair tags
        // unpaired tags might have children if it's a component passed as a variable
        children ? formatElements(h, children, elements) : null, //element.props.children,
      ),
      */
    )

    if (after) tree.push(h('span', after))
  }

  return tree.flatMap(v => v)
}

export const Trans = {
  name: 'Trans',
  props: {
    id: String,
    message: String,
    formats: Object,
    values: Object,
    tag: String,
  },
  data() {
    return {
      elements: {},
    }
  },
  computed: {
    i18n() {
      return this[linguiI18n] && this[linguiI18n].i18n
    },
    defaultTag() {
      return this[linguiI18n] && this[linguiI18n].defaultTag
    },
    gotI18nContext() {
      return this.i18n && typeof this.i18n._ === 'function'
    },
    translation() {
      console.log(this.i18n)
      const { id, message, formats } = this
      const values = { ...this.values }
      const elements = this.elements
      if (values) {
        /*
          Related discussion: https://github.com/lingui/js-lingui/issues/183
          Values *might* contain React elements with static content.
          They're replaced with <INDEX /> placeholders and added to `components`.
          Example:
          Translation: Hello {name}
          Values: { name: <strong>Jane</strong> }
          It'll become "Hello <0 />" with components=[<strong>Jane</strong>]
        */

        Object.keys(values).forEach(key => {
          const value = values[key]
          // if (!React.isValidElement(value)) return

          const index = Object.keys(elements).length

          elements[index] = value
          values[key] = `<${index}/>`
        })
      }
      return this.gotI18nContext ? this.i18n._(id, values, { message, formats }) : id
    },
  },
  render(h) {
    const Tag = this.tag || this.defaultTag || 'span'
    const tree = formatElements(h, this.translation, { ...this.elements, ...this.$slots })
    return h(Tag, tree)
  },
}

export default Trans
</script>
