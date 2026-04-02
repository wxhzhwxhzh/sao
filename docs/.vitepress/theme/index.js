// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import Comment from "../components/Comment.vue";
import { h } from "vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(Comment)
    });
  }
};