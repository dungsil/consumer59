import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify({
      prefix: 'data-',
      prefixedOnly: true
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    fontFamily: {
      sans: 'Pretendard, sans-serif'
    }
  },
  shortcuts: [
    ['btn', 'inline-flex items-center p4 rounded-md font-500 text-center']
  ]
})
