import { useHead } from '@unhead/vue'

type PreloadAsTypes = 'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'video' | 'worker'

/**
 * Tells the browser to preload the given resource URLs
 * 
 * @param urls The URLs to preload
 */
export function usePreload(as: PreloadAsTypes, ...urls: string[]) {
  useHead({
    link: urls.map(href => ({
      rel: 'preload', href, as, key: href
    }))
  })
}