<script setup lang="ts">
import { OgObject } from 'open-graph-scraper/types/lib/types'
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const url = props.url

const ogData = ref<null | OgObject>(null)

const imageUrl = computed(() => {
  return !ogData.value
    ? ''
    : (ogData.value.ogImage?.[0] || ogData.value.twitterImage?.[0])?.url || ''
})

const hostname = computed(() => {
  return !ogData.value
    ? ''
    : ogData.value.ogSiteName || ogData.value.twitterSiteName || url
})

onMounted(async () => {
  // Fetch the Open Graph data from og data cache json file
  console.log('PreviewLink: Fetching OG data for URL:', url)
  const response = await fetch('/json/preview/previewLinkData.json', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const data = await response.json()
    ogData.value = data[url] || null
  }
})
</script>

<template>
  <div v-if="ogData" class="link-preview-widget">
    <a :href="url" rel="noopener noreferrer" target="_blank">
      <div class="link-preview-widget-title">
        {{ ogData.ogTitle || ogData.twitterTitle || 'No title available' }}
      </div>
      <div class="link-preview-widget-description">
        {{
          ogData.ogDescription ||
          ogData.twitterDescription ||
          'No description available'
        }}
      </div>
      <div class="link-preview-widget-url">
        {{ hostname }}
      </div>
    </a>
    <a
      v-if="imageUrl"
      class="link-preview-widget-image"
      :href="url"
      rel="noopener"
      :style="{ backgroundImage: `url('${imageUrl}')` }"
      target="_blank"
    ></a>
  </div>
  <div v-else class="link-preview-loading">
    <a :href="url" rel="noopener noreferrer" target="_blank">{{ url }}</a>
  </div>
</template>

<style scoped lang="scss">
.link-preview-widget {
  display: table;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 16px 0;
  background-color: var(--vp-c-bg-soft);

  &:hover {
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

.dark .link-preview-widget {
  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }
}

.link-preview-widget-title {
  font-size: 16px;
  font-weight: 700;
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 8px;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--vp-c-text-1);
}

.link-preview-widget-description {
  font-size: 12px;
  font-style: normal;
  line-height: 1.5;
  display: -webkit-box;
  overflow: hidden;
  max-height: 3em;
  margin-bottom: 4px;
  word-break: break-all;
  color: var(--vp-c-text-2);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.link-preview-widget-url {
  font-size: 12px;
  font-style: normal;
  line-height: 1.5;
  display: block;
  margin-bottom: 0;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.link-preview-widget > a {
  display: table-cell;
  flex-direction: column;
  padding: 16px;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-flex: 1;
  flex: 1;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--vp-c-bg-alt);
  }
}

.link-preview-widget-image {
  display: table-cell;
  width: 225px;
  min-width: 220px;
  height: 150px;
  padding: 0;
  vertical-align: middle;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  -webkit-box-flex: 0;
  flex: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

.link-preview-loading {
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin: 16px 0;

  a {
    color: var(--vp-c-brand-1);
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
      color: var(--vp-c-brand-2);
    }
  }
}
</style>
