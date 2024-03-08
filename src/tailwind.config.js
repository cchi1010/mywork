module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    screens: {
      'xs': {'max': '599px'},
      'sm': {'min': '600px', 'max': '767px'}, //'600px',
      'md': {'min': '767px', 'max': '833px'}, //'1280px',
      'lg': {'min': '834px', 'max': '1023px'}, //'1600px',
      'xl': {'min': '1024px', 'max': '1365px'}, //'2560px',
      'xxl': {'min': '1366px', 'max': '1919px'}, //'2560px',
      'xxxl': {'min': '1920px'}, //'2560px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
