/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.js","./views/*.{html,ejs}"],
  theme: {
    extend: {
      fontFamily:{
        archivo:["Archivo", "sans-serif"]
      },
      screens:{
        'tablet':{'max':'1023px'},
        'mobile1':{'max':'583px'}
      }
    },
  },
  plugins: [],
}

