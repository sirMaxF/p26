// Получаем имя папки проекта

import * as nodePath from 'path'; // команда работает благодаря тому что в package.json указали "type": "module", и теперь можно подключать модули
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // путь к папке с результатом. Также можно исопльзовать rootFolder. Будет создаваться автоматически в процессе действий Галпа
const srcFolder = `./src`; // путь к папке с исходниками

export const path = { // export пишем чтобы указанные пути могли использовать из других файлов
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },

  // ниже настраиваем откуда будем переносить файлы. Маска /**/ означает что ищем любые подпапки. Маска *.* означает что ищем любые файлы с любым расширением
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`
  },

  // watch объект файлов за которыми должен следить Галп и выполнять  определенные действия. Без объекта watch придется для выполнения действий все делать каждый раз вручную
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`, // наблюдаем за всеми файлами хтмл в папке исходников, поскольку если их несколько, в итоговой папке соберем в один
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    files: `${srcFolder}/files/**/*.*` //здесь то же самое что и в объекте src
    // за шрифтами не наблюдаем, они меняются не так часто
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`
};
