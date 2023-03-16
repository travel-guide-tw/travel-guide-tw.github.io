<template>
  <Layout>
    <template #doc-after>
      <GiscusWrapper />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import GiscusWrapper from '../components/GiscusWrapper.vue'

const { Layout } = DefaultTheme
</script>
