import { PluginOption } from 'vite'
import { SearchPlugin } from 'vitepress-plugin-search'

var Segment = require('segment')
const segment = new Segment()
segment.useDefault()

const options = {
  encode: (str: string) => segment.doSegment(str, { simple: true }),
  tokenize: 'forward' as const,
}

const searchPlugin = SearchPlugin(options) as PluginOption

export default searchPlugin
