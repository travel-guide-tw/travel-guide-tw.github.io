import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import '../styles/index.scss'
import type { Theme } from 'vitepress'
import PreviewLink from '../components/PreviewLink.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PreviewLink', PreviewLink)
  },
} satisfies Theme
