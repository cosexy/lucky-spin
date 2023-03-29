import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fb',
          400: '#7694f8',
          500: '#3b66f5',
          600: '#355cdd',
          700: '#2c4db8',
          800: '#233d93',
          900: '#1d3278'
        }
      },
      boxShadow: {
        primary: '2px 0 8px rgba(0,0,0,.04), 12px 0 24px rgba(64,64,64,.04)'
      }
    }
  },
  plugins: []
}
