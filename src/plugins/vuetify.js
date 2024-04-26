// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const baseColors = {
  primary: '#1E88E5',
  secondary: '#42A5F5',
  accent: '#BA68C8',
  error: '#FF5252',
  info: '#1E88E5',
  success: '#4CAF50',
  warning: '#FF9800',
  admin: '#E53935'
}

const darkBaseColors = {
  accent: '#BA68C8'
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
