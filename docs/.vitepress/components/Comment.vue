<!-- .vitepress/components/Comment.vue -->
<template>
  <div style="margin-top: 40px;">
    <Giscus
      repo="你的用户名/仓库名"
      repo-id="从giscus.app获取"
      category="Announcements"
      category-id="从giscus.app获取"
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