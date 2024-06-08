import { HeadConfig } from 'vitepress'
import * as dotenv from 'dotenv'

dotenv.config()

const tagId = <string>process.env.VITE_APP_GOOGLE_TAG_ID
const tagContent = <string>process.env.VITE_APP_GOOGLE_META_TAG_CONTENT

const gtagHead: HeadConfig[] =
  tagId && tagContent
    ? ([
        [
          'meta',
          {
            name: 'google-site-verification',
            content: tagContent,
          },
        ],
        [
          'script',
          {
            async: '',
            src: `https://www.googletagmanager.com/gtag/js?id=${tagId}`,
          },
        ],
        [
          'script',
          {},
          `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${tagId}');`,
        ],
      ] as HeadConfig[])
    : []

export default gtagHead
