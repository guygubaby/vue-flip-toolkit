<template>
  <div ref="elRef" :class="className">
    <slot v-if="isReady" />
  </div>
</template>

<script lang="ts" setup>
import { Flipper } from 'flip-toolkit'
import type { StaggerConfig } from 'flip-toolkit/lib/types'
import { assert } from '@bryce-loskie/utils'
import { FlipInstanceSymbol } from './constants'

interface Props {
  flipKey: string | number
  className?: string
  staggerConfig?: StaggerConfig
  spring?: string
}

const { className, flipKey, staggerConfig, spring = 'gentle' } = defineProps<Props>()

const flipInstanceRef = shallowRef<Nullable<Flipper>>(null)
provide(FlipInstanceSymbol, flipInstanceRef)

const getFlipInstance = () => {
  const instance = unref(flipInstanceRef)
  assert(instance, 'flipInstanceRef is null')
  return instance
}

const isReady = ref(false)
const elRef = ref()

provide('elRef', elRef)

onMounted(() => {
  flipInstanceRef.value = new Flipper({
    element: elRef.value,
    spring,
    staggerConfig,
  })
  isReady.value = true
})

onBeforeUpdate(() => {
  const flipInstance = getFlipInstance()
  flipInstance.recordBeforeUpdate()
})

watch(() => flipKey, async(newKey, oldKey) => {
  await nextTick()
  getFlipInstance().update(oldKey, newKey)
})

// watch(() => staggerConfig, (oldConfig, newConfig) => {
//   if (newConfig !== oldConfig)
//     getFlipInstance().staggerConfig = newConfig
// })
</script>
