import type { Flipper } from 'flip-toolkit'
import type { InjectionKey, ShallowRef } from 'vue'

export const FlipInstanceSymbol: InjectionKey<ShallowRef<Nullable<Flipper>>> = Symbol('FlipInstanceSymbol')
