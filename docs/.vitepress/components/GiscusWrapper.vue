<template>
  <div class="wrapper" v-if="shown">
    <Giscus
      repo="travel-guide-tw/travel-guide-tw.github.io"
      repoId="R_kgDOJCizzA"
      category="General"
      categoryId="DIC_kwDOJCizzM4CUeRh"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="zh-TW"
      loading="lazy"
      crossorigin="anonymous"
    />
  </div>
</template>

<script lang="ts" setup>
import Giscus from '@giscus/vue'

const shown = location.hostname === 'travel-guide-tw.github.io'
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 2rem;
}
</style>
