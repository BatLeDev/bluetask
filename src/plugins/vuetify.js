// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const baseColors = {
  primary: '#1E88E5', // blue.darken1
  secondary: '#42A5F5', // blue.lighten1,
  accent: '#FF9800', // orange.base
  error: '#FF5252', // red.accent2
  info: '#2196F3', // blue.base
  success: '#4CAF50', // green.base
  warning: '#E91E63', // pink.base
  admin: '#E53935' // red.darken1
}
const baseDarkColors = {
  primary: '#2196F3', // blue.base
  success: '#00E676' // green.accent3
}

const lightColors = { ...baseColors }
const darkColors = { ...baseColors, ...baseDarkColors }

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: lightColors
      },
      dark: {
        dark: true,
        colors: darkColors
      }
    }
  },
})
