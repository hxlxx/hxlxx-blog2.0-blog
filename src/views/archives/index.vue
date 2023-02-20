<script setup lang="ts">
import { getArchives } from '@/api'
import type { TArchive, TQueryInfo } from '@/types'
import { useDateFormat } from '@vueuse/core'

const router = useRouter()

const archives = ref<TArchive[]>()
const query = reactive<TQueryInfo>({
  page: 1,
  skip: 0,
  limit: 10
})
const total = ref<number>(0)

onBeforeMount(() => {
  initArchives(query)
})

const initArchives = async (query: TQueryInfo) => {
  const skip = (query.page! - 1) * query.limit!
  const { data } = (await getArchives({ skip, limit: query.limit })) || {}
  archives.value = data.res
  total.value = data.count
}
const handleChangePage = (page: number) => {
  query.page = page
  initArchives(query)
}
</script>

<template>
  <div>
    <nav-breadcrumb />
    <div class="card pb-20">
      <div class="mb-10" v-for="archive in archives" :key="archive.timeLine">
        <h1 class="my-10 text-accent text-[48px] text-center family-shuhei">
          {{ archive.timeLine }}
        </h1>
        <div
          class="archive relative h-[200px]"
          v-for="article in archive.list"
          :key="article.id"
        >
          <div class="content absolute top-10 w-[60%] lg:w-[40%]">
            <h1
              class="title mt-[6px] mb-5 relative text-[32px] break-all family-shuhei cursor-pointer transition-200 hover:opacity-60"
              @click="
                router.push({
                  name: 'article-detail',
                  params: { id: article.id }
                })
              "
            >
              {{ article.title }}
            </h1>
            <p class="text-cutoff-3">{{ article.content }}</p>
          </div>
          <div class="line"></div>
          <span
            class="time absolute top-1/2 -translate-y-1/2 text-accent family-shuhei"
          >
            <span class="hidden md:block">
              {{
                useDateFormat(article.created_at, 'YYYY-MM-DD').value.replace(
                  '"',
                  ''
                )
              }}
            </span>
          </span>
        </div>
      </div>
      <h-pagination
        :page="query.page"
        :total="total"
        :range="5"
        :size="query.limit"
        @on-change-page="handleChangePage"
      />
    </div>
  </div>
</template>

<style lang="postcss">
@media (max-width: 400px) {
  .line {
    @apply hidden;
  }
  .content {
    @apply absolute top-0 left-[10%] w-[80%];
    .title {
      &::before {
        @apply absolute -bottom-[10px] left-0 block w-[100px] h-[6px] rounded-full;
        content: '';
        background: var(--theme-gradient);
      }
    }
  }
  .time {
    @apply hidden;
  }
}
@media (min-width: 400px) and (max-width: 768px) {
  .archive {
    .content {
      @apply absolute top-0 left-[30%];
      .title {
        &::before {
          @apply absolute -bottom-[10px] left-0 block w-[100px] h-[6px] rounded-full;
          content: '';
          background: var(--theme-gradient);
        }
      }
    }
    .line {
      @apply absolute top-0 left-[70px] w-[6px] h-full bg-[var(--text-bright)];
    }
    .time {
      @apply left-[73px] -translate-x-10;
      &::before {
        @apply absolute top-1/2 -right-[50px] -translate-y-1/2 block w-5 h-5 rounded-full;
        content: '';
        z-index: 10;
        background-color: var(--text-accent);
      }
      &::after {
        @apply absolute top-1/2 -right-[56px] -translate-y-1/2 block w-8 h-8 rounded-full;
        content: '';
        background-color: var(--background-secondary);
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .archive {
    .content {
      @apply absolute top-0 left-[30%];
      .title {
        &::before {
          @apply absolute -bottom-[10px] left-0 block w-[100px] h-[6px] rounded-full;
          content: '';
          background: var(--theme-gradient);
        }
      }
    }
    .line {
      @apply absolute top-0 left-[160px] w-[6px] h-full bg-[var(--text-bright)];
    }
    .time {
      @apply left-[73px] -translate-x-10;
      &::before {
        @apply absolute top-1/2 -right-[50px] -translate-y-1/2 block w-5 h-5 rounded-full;
        content: '';
        z-index: 10;
        background-color: var(--text-accent);
      }
      &::after {
        @apply absolute top-1/2 -right-[56px] -translate-y-1/2 block w-8 h-8 rounded-full;
        content: '';
        background-color: var(--background-secondary);
      }
    }
  }
}

@media (min-width: 1024px) {
  .line {
    @apply absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-full bg-[var(--text-bright)];
  }
  .archive:nth-child(odd) {
    .content {
      @apply left-1/2 translate-x-10;
      .title {
        @apply text-left;
        &::before {
          @apply absolute -bottom-[10px] left-0 block w-[100px] h-[6px] rounded-full;
          content: '';
          background: var(--theme-gradient);
        }
      }
    }
    .time {
      @apply right-1/2 -translate-x-10;
      &::before {
        @apply absolute top-1/2 -right-[50px] -translate-y-1/2 block w-5 h-5 rounded-full;
        content: '';
        z-index: 10;
        background-color: var(--text-accent);
      }
      &::after {
        @apply absolute top-1/2 -right-[56px] -translate-y-1/2 block w-8 h-8 rounded-full;
        content: '';
        background-color: var(--background-secondary);
      }
    }
  }
  .archive:nth-child(even) {
    .content {
      @apply right-1/2 -translate-x-10;
      .title {
        @apply text-right;
        &::before {
          @apply absolute -bottom-[10px] right-0 block w-[100px] h-[6px] rounded-full;
          content: '';
          background: var(--theme-gradient);
        }
      }
    }
    .time {
      @apply left-1/2 translate-x-10;
      &::before {
        @apply absolute top-1/2 -left-[50px] -translate-y-1/2 block w-5 h-5 rounded-full;
        content: '';
        z-index: 10;
        background-color: var(--text-accent);
      }
      &::after {
        @apply absolute top-1/2 -left-[56px] -translate-y-1/2 block w-8 h-8 rounded-full;
        content: '';
        background-color: var(--background-secondary);
      }
    }
  }
}
</style>
