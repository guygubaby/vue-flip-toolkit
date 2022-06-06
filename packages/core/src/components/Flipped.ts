import { assert } from '@bryce-loskie/utils'
import { FlipInstanceSymbol } from './constants'

export const Flipped = defineComponent({
  name: 'Flipped',
  props: {
    flipId: String,
    inverseFlipId: String,
    delayUntil: String,
    stagger: [String, Boolean],
    shouldFlip: Function,
    shouldInvert: Function,
    scale: {
      type: Boolean,
      default: false,
    },
    opacity: {
      type: Boolean,
      default: false,
    },
    translate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const slots = useSlots()

    const flipperInstanceRef = inject(FlipInstanceSymbol)

    const wrapperRef = ref()

    const parentEl = inject('elRef')!

    onMounted(() => {
      const flipper = unref(flipperInstanceRef)
      assert(flipper, 'flipper is null provide first')

      const element = wrapperRef.value

      if (props.flipId) {
        flipper.addFlipped({
          element,
          flipId: props.flipId,
          delayUntil: props.delayUntil,
          shouldFlip: () => true,
          shouldInvert: () => true,
          // onStart: el => props.$emit('on-start', { el, id: this.flipId }),
          // onComplete: el => props.$emit('on-complete', { el, id: this.flipId }),
          stagger: props.stagger,
          opacity: props.opacity,
          scale: props.scale,
          translate: props.translate,
          children: [],
        })
      }
      else if (props.inverseFlipId) {
        nextTick(() => {
          const parent = unref(parentEl) as any
          flipper.addInverted({
            element,
            parent,
            opacity: props.opacity,
            scale: props.scale,
            translate: props.translate,
            transformOrigin: 'left top',
          })
        })
      }
    })

    return () => h('div', { ref: wrapperRef }, slots.default)
  },
})
