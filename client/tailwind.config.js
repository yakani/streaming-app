/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{ colors: {
      'bittersweet': {
    '50': '#fff2f1',
    '100': '#ffe4e1',
    '200': '#ffccc7',
    '300': '#ffa8a0',
    '400': '#ff6f61',
    '500': '#f84c3b',
    '600': '#e52f1d',
    '700': '#c12314',
    '800': '#a02014',
    '900': '#842218',
    '950': '#480d07',
},
'white': {
    '50': '#ffffff',
    '100': '#efefef',
    '200': '#dcdcdc',
    '300': '#bdbdbd',
    '400': '#989898',
    '500': '#7c7c7c',
    '600': '#656565',
    '700': '#525252',
    '800': '#464646',
    '900': '#3d3d3d',
    '950': '#292929',
},
'robin': {
    '50': '#eefffd',
    '100': '#c6fffa',
    '200': '#8efff7',
    '300': '#4dfbf3',
    '400': '#19e8e5',
    '500': '#00cccc',
    '600': '#00a0a4',
    '700': '#027f83',
    '800': '#086367',
    '900': '#0c5255',
    '950': '#002f34',
},

    },},
  /**/
   
  },
  plugins: [],
}

