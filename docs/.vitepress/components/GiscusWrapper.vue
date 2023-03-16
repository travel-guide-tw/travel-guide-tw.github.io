<template>
  <div class="wrapper" v-if="shown" :key="route.path">
    <Giscus
      repo="travel-guide-tw/travel-guide-tw.github.io"
      repoId="R_kgDOJCizzA"
      category="General"
      categoryId="DIC_kwDOJCizzM4CUeRh"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-TW"
      loading="lazy"
      crossorigin="anonymous"
    />
  </div>
</template>

<script lang="ts" setup>
import Giscus from '@giscus/vue'
import { useRoute } from 'vitepress'

const shown = location.hostname === 'travel-guide-tw.github.io'
const route = useRoute()
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 2rem;
}
</style>
