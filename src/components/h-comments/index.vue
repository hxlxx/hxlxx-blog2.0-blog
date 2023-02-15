<script setup lang="ts">
import { getCommentList, getCommentListByAid, createComment } from '@/api'
import { useUser } from '@/stores'
import type {
  ConfigApi,
  ReplyPageParam,
  CommentSubmitParam,
  ReplyApi,
  UserApi
} from 'undraw-ui'
import { useDateFormat } from '@vueuse/core'
import hMessage from '../h-message'
import { emoji } from '@/utils'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const userStore = useUser()
const i18n = useI18n()

const config = reactive<ConfigApi>({
  user: {} as UserApi,
  emoji: emoji,
  comments: []
})
let replyMap: Record<string | number, ReplyApi>

onBeforeMount(() => {
  initCommentList(route.params.id as string)
})

watch(
  () => userStore.user,
  () => {
    const { id, username, avatar_url: avatar } = userStore.user
    Object.assign(config.user, { id, username, avatar, likeIds: [] })
  },
  { immediate: true }
)
watch(
  () => route.params.id,
  (newVal) => {
    newVal && initCommentList(newVal as string)
  }
)

// 格式化评论列表
const formatComments = (comments: any[]) => {
  const copy = [...comments]
  copy.forEach((item) => {
    item.uid = item.user.id
    const other = copy.filter((_item) => _item.id !== item.id)
    other.forEach((o) => {
      if (item.id === o.parentId) {
        if (item.reply) {
          item.reply.push(o)
        } else {
          item.reply = [o]
        }
      }
    })
  })
  copy.forEach((item) => {
    item.reply &&
      (item.reply = {
        total: item.reply.length,
        list: item.reply
      })
    item.user.avatar = item.user.avatar_url
    item.user.homeLink = '/' + item.id
    item.createTime = useDateFormat(item.createTime, 'YYYY-MM-DD').value
  })
  return copy.filter((item) => !item.parentId)
}

const initCommentList = async (aid?: string) => {
  const { data } = aid
    ? await getCommentListByAid(parseInt(aid as string))
    : (await getCommentList()) || {}
  config.comments = formatComments(data)
  replyMap = config.comments.reduce((memo, cur) => {
    memo[cur.id] = cur.reply
    return memo
  }, {} as any)
}
// 提交评论事件
const submit = async ({
  content,
  parentId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  files,
  finish
}: CommentSubmitParam) => {
  if (!userStore.token) {
    return hMessage({
      type: 'danger',
      message: i18n.t('message.commentAfterLogin')
    })
  }
  const comment = {
    parentId,
    aid: route.params.id,
    uid: userStore.user.id,
    address: userStore.user.address,
    content
  }
  const user = {
    username: userStore.user.username,
    avatar: userStore.user.avatar_url,
    level: 0,
    homeLink: userStore.user.id + ''
  }
  const { code, data } = (await createComment({ data: comment })) || {}
  if (code === 200) {
    data.createTime = useDateFormat(data.createTime, 'YYYY-MM-DD').value
    finish({ ...data, user })
    hMessage({
      type: 'success',
      message: i18n.t('message.commentSuccess')
    })
  }
}
const page = (pageNum: number, pageSize: number, arr: any[]) => {
  var skipNum = (pageNum - 1) * pageSize
  var newArr =
    skipNum + pageSize >= arr.length
      ? arr.slice(skipNum, arr.length)
      : arr.slice(skipNum, skipNum + pageSize)
  return newArr
}
//回复分页
const replyPage = ({ parentId, pageNum, pageSize, finish }: ReplyPageParam) => {
  const reply = replyMap[parentId]
  const tmp = {
    total: reply.total,
    list: page(pageNum, pageSize, reply.list)
  }
  setTimeout(() => {
    finish(tmp)
  }, 200)
}
</script>

<template>
  <div class="comment-view">
    <u-comment
      :config="config"
      page
      @submit="submit"
      @reply-page="replyPage"
    ></u-comment>
  </div>
</template>

<style lang="postcss">
.comment-view {
  .u-comment {
    margin: 0;
  }
  .picture {
    @apply hidden;
  }
  .header {
    @apply hidden;
  }
  .el-button {
    border: none;
    transition: all 100ms linear;
    background-color: var(--color-blue);
  }
  .el-button:hover {
    opacity: 0.8;
  }
  .action-box {
    .item:first-child {
      display: none;
    }
  }
  .operation-warp {
    display: none;
  }
  .u-fold {
    img {
      display: inline-block;
    }
    .imgbox {
      display: none;
    }
  }
}
</style>
