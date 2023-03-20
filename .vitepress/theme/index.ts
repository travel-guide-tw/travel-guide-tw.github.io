import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../styles/index.scss'

export default {
  ...DefaultTheme,
  Layout: Layout,
}
