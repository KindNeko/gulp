// Получение имени папок проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

// Основные пути к результатам и исходникам
const buildFolder = "./public";
const srcFolder = "./app";

// Все пути
export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/main.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/common/style.scss`,
    css: `${srcFolder}/css/style.css`,
    html: `${srcFolder}/view/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  wath: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/*/**/*.scss`,
    css: `${srcFolder}/*/**/*.css`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`, // название папки на удаленом серве
};
