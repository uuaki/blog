<script setup lang="ts">
import { computed } from "vue";
import { slugify } from "@mdit-vue/shared";

import { NavLink } from "../utils/types";

const props = defineProps<{
  noIcon?: boolean;
  icon?: NavLink["icon"];
  badge?: NavLink["badge"];
  title?: NavLink["title"];
  desc?: NavLink["desc"];
  link: NavLink["link"];
}>();

const formatTitle = computed(() => {
  if (!props.title) {
    return "";
  }
  return slugify(props.title);
});

const formatBadge = computed(() => {
  if (typeof props.badge === "string") {
    return { text: props.badge, type: "info" };
  }
  return props.badge;
});
</script>

<template>
  <a
    v-if="link"
    class="m-nav-link"
    :href="link"
    target="_blank"
    rel="noreferrer"
  >
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <h5
          v-if="title"
          :id="formatTitle"
          class="title"
        >
          {{ title }}
        </h5>
      </div>
      <Badge
        v-if="formatBadge"
        class="badge"
        :type="formatBadge.type"
        :text="formatBadge.text"
      />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  --m-nav-box-gap: 12px;

  display: block;
  border: 0;
  border-radius: 8px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    box-shadow: var(--vp-shadow-2);
    text-decoration: initial;
    background-color: var(--vp-c-bg);
  }

  .box {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: var(--m-nav-box-gap);
    height: 100%;
    color: var(--vp-c-text-1);

    &.has-badge {
      padding-top: calc(var(--m-nav-box-gap) + 2px);
    }

    &-header {
      display: flex;
      align-items: center;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 700;

    line-height: 1.4;
  }

  .badge {
    position: absolute;
    top: 2px;
    right: 0;
    transform: scale(0.8);
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
    line-height: 1.5;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-box-gap: 8px;

    .title {
      font-size: 14px;
    }
  }
}
</style>
