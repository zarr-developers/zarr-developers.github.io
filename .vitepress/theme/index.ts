import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme, EnhanceAppContext } from 'vitepress'
import './custom.css'

import AdoptersMarquee from './AdoptersMarquee.vue'
import ImplementationsGrid from './ImplementationsGrid.vue'
import LogoWall from './LogoWall.vue'
import BackingBand from './BackingBand.vue'
import PageHero from './PageHero.vue'
import ZarrHero from './ZarrHero.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // Replaces the default hero image area on the home page with the
      // animated chunked-cube SVG (theme-aware, SSR-safe, no JS deps).
      'home-hero-image': () => h(ZarrHero),
    }),
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('AdoptersMarquee', AdoptersMarquee)
    app.component('ImplementationsGrid', ImplementationsGrid)
    app.component('LogoWall', LogoWall)
    app.component('BackingBand', BackingBand)
    app.component('PageHero', PageHero)
  },
} satisfies Theme
