import { HeadConfig } from 'vitepress'

const gtagHead: HeadConfig[] = <string>process.env.VITE_APP_GOOGLE_TAG_ID
  ? ([
      [
        'script',
        {
          async: '',
          src: `https://www.googletagmanager.com/gtag/js?id=${<string>(
            process.env.VITE_APP_GOOGLE_TAG_ID
          )}`,
        },
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${<
          string
        >process.env.VITE_APP_GOOGLE_TAG_ID}');`,
      ],
    ] as HeadConfig[])
  : []

export default gtagHead
