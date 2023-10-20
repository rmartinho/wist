// Vue composable that enables toggling between light and dark color schemes,
// while respecting browser/OS preferences
//
// Usage:
//  import { useColorSchemes } from 'color-scheme'
//
//  const { colorscheme } = useColorSchemes({ fallback: 'light'}) // will use light scheme if nothing else is set
//  const { colorscheme } = useColorSchemes({ fallback: 'light', selected: 'dark'}) // will force use of dark scheme
//  console.log(colorscheme.value) // gets current color scheme
//  colorscheme.toggle() // toggles to the other color scheme
//  colorscheme.value = 'dark' // sets the color scheme directly
//  colorscheme.value = undefined // unsets the color scheme, returning to the fallback scheme

import { computed, ref, type Ref } from 'vue'
import { useMediaQuery } from '@/utils/media-query'

export type ColorSchemeName = 'light' | 'dark'

function otherColorScheme(colorscheme: ColorSchemeName): ColorSchemeName {
  return colorscheme == 'light' ? 'dark' : 'light'
}

const darkColorSchemeClass = 'dark-color-scheme' as const
const lightColorSchemeClass = 'light-color-scheme' as const
type ColorSchemeClass = typeof lightColorSchemeClass | typeof darkColorSchemeClass

function classFor(colorscheme: ColorSchemeName): ColorSchemeClass {
  switch (colorscheme) {
    case 'light':
      return lightColorSchemeClass
    case 'dark':
      return darkColorSchemeClass
  }
}

export interface ColorSchemeRef extends Ref<ColorSchemeName> {
  reset(): void,
  toggle(): ColorSchemeName,
}

export interface ColorSchemeOptions {
  fallback: ColorSchemeName,
  selected?: ColorSchemeName
}

const currentScheme = ref(null as ColorSchemeName | null)

export function useColorSchemes(options: ColorSchemeOptions): { colorscheme: ColorSchemeRef } {
  const fallbackScheme = options.fallback
  const otherScheme = otherColorScheme(fallbackScheme)
  const fallbackClass = classFor(fallbackScheme)
  const otherClass = classFor(otherScheme)
  const { query: otherSchemeQuery } = useMediaQuery(`(prefers-color-scheme: ${otherScheme})`)
  const defaultScheme = computed(() => otherSchemeQuery.value.matches ? otherScheme : fallbackScheme)

  const rootClasses = document.documentElement.classList

  switch (options.selected) {
    case 'dark':
    case 'light':
      rootClasses.toggle(classFor(options.selected))
      currentScheme.value = options.selected
      break
    default:
      currentScheme.value = null
  }

  const colorscheme = Object.assign(computed({
    get() {
      return currentScheme.value ?? defaultScheme.value
    },
    set(newScheme: ColorSchemeName) {
      currentScheme.value = newScheme
    }
  }), {
    reset() {
      currentScheme.value = null;
    },
    toggle() {
      if (currentScheme.value == null) {
        if (otherSchemeQuery.value.matches) {
          rootClasses.remove(otherClass)
          rootClasses.add(fallbackClass)
          currentScheme.value = fallbackScheme;
        } else {
          rootClasses.remove(fallbackClass)
          rootClasses.add(otherClass)
          currentScheme.value = otherScheme;
        }
      } else {
        if (currentScheme.value == otherScheme) {
          rootClasses.remove(otherClass)
          rootClasses.add(fallbackClass)
          currentScheme.value = fallbackScheme;
        } else {
          rootClasses.remove(fallbackClass)
          rootClasses.add(otherClass)
          currentScheme.value = otherScheme;
        }
      }
      return currentScheme.value;
    }
  })
  return {
    colorscheme: colorscheme
  }
}