import { linguiI18n } from '../i18n-context.js'

// match <0>paired</0> and <1/> unpaired tags
const tagRe = /<(\d+|\w+)>(.*?)<\/\1>|<(\d+|\w+)\/>/
const nlRe = /(?:\r\n|\r|\n)/g

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
const voidElementTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true,
}

/*
 * `getElements` - return array of element indexes and element childrens
 *
 * `parts` is array of [pairedIndex, children, unpairedIndex, textAfter, ...]
 * where:
 * - `pairedIndex` is index of paired element (undef for unpaired)
 * - `children` are children of paired element (undef for unpaired)
 * - `unpairedIndex` is index of unpaired element (undef for paired)
 * - `textAfter` is string after all elements (empty string, if there's nothing)
 *
 * `parts` length is always multiply of 4
 *
 * Returns: Array<[elementIndex, children, after]>
 */
function getElements(parts) {
  if (!parts.length) return []

  const [paired, children, unpaired, after] = parts.slice(0, 4)

  return [[paired || unpaired, children || '', after]].concat(getElements(parts.slice(4, parts.length)))
}

function formatElements(h, value, elements) {
  // const uniqueId = makeCounter(0, '$lingui$')
  const parts = value.replace(nlRe, '').split(tagRe)

  // no inline elements, return
  if (parts.length === 1) return [value]

  const tree = []

  const before = parts.shift()
  if (before) tree.push(before)

  for (const [index, children, after] of getElements(parts)) {
    let element = elements[index]

    if (!element || (voidElementTags[element.type] && children)) {
      if (!element) {
        console.error(`Can use element at index '${index}' as it is not declared in the original translation`)
      } else {
        console.error(`${element.type} is a void element tag therefore it must have no children`)
      }

      // ignore problematic element but push its children and elements after it
      element = h('span')
    }

    tree.push(...(typeof element === 'string' ? [element] : [element({ translation: children })]))

    if (after) tree.push(after)
  }

  return tree
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
      const { id, message, formats, values } = this

      return this.gotI18nContext ? this.i18n._(id, values, { message, formats }) : id
    },
  },
  render(h) {
    const Tag = this.tag || this.defaultTag || 'span'
    const tree = formatElements(h, this.translation, this.$scopedSlots)
    return h(Tag, {}, tree)
  },
}

export default Trans
