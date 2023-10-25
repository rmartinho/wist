import { computed, ref, type Ref } from 'vue'
import { useMediaQuery } from '@/utils/media-query'

/** Array of valid color scheme names */
export const colorSchemeNames = ['light', 'dark'] as const 
/** The type of valid color scheme names */
export type ColorSchemeName = typeof colorSchemeNames[number]
/** Type assertion for color scheme names  */
export function isColorSchemeName(obj: any): obj is ColorSchemeName {
  return obj in colorSchemeNames
}

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

/**A Vue ref that can toggle color schemes */
export interface ColorSchemeRef extends Ref<ColorSchemeName> {
  /** Resets the color scheme preference, leaving the fallack scheme current */
  reset(): void,
  /**
   * Toggles the current color scheme to the other one
   * 
   * @returns The new active color scheme
  */
  toggle(): ColorSchemeName,
}

/** Options for setting color schemes */
export interface ColorSchemeOptions {
  /** The color scheme to fall back on if none is set */
  fallback: ColorSchemeName,
  /** The color scheme that we want set, undefined if there is no preference */
  selected?: ColorSchemeName
}

const currentScheme = ref(null as ColorSchemeName | null)

/**
 * A Vue composable that enables toggling between light and dark color schemes,
 * while respecting browser/OS preferences
 * 
 * @param options An object with options for choosing defaults
 * @returns A reactive object that tracks/sets the current color scheme
 * 
 * @example
 * const colorscheme = useColorSchemes({ fallback: 'light', selected: 'dark'}) // will start with dark scheme
 * console.log(colorscheme.value) // dark
 * colorscheme.toggle() // toggles to light scheme
 * colorscheme.value = 'dark' // switches to dark scheme directly
 * colorscheme.value = undefined // unsets the color scheme, returning to the fallback scheme (light)
 */
export function useColorSchemes(options: ColorSchemeOptions): ColorSchemeRef {
  const fallbackScheme = options.fallback
  const otherScheme = otherColorScheme(fallbackScheme)
  const fallbackClass = classFor(fallbackScheme)
  const otherClass = classFor(otherScheme)
  const otherSchemeQuery = useMediaQuery(`(prefers-color-scheme: ${otherScheme})`)
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
    set(newScheme) {
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
  return colorscheme
}
