<!-- .vitepress/components/Comment.vue -->
<template>
  <div style="margin-top: 40px;">
    <Giscus
      repo="wxhzhwxhzh/sao"
      repo-id="R_kgDONbZCjA"
      category="Announcements"
      category-id="DIC_kwDONbZCjM4C53Tq"
      mapping="pathname"
      reactions-enabled="1"
      emit-metadata="0"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import Giscus from "@giscus/vue";
import { useData } from "vitepress";
import { computed } from "vue";

const { isDark } = useData();
</script>