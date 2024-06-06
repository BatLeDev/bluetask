// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const baseColors = {
  primary: '#143d59',
  secondary: '#7dc3c0',
  accent: '#143d59',
  error: '#FF5252',
  success: '#4CAF50',
  warning: '#FF9800'
}

const darkBaseColors = {
  primary: '#7dc3c0',
  secondary: '#143d59',
  accent: '#7dc3c0'
}

const lightColors = { ...baseColors }
const darkColors = { ...baseColors, ...darkBaseColors }

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
  }
})
