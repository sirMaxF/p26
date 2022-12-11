// Основной модуль

import gulp from "gulp"; // импортируем сам галп из пакета Галп

// Импорт путей

import { path } from "./gulp/config/path.js";

// Импорт общих плагинов

import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную

global.app = {
  // process.argv это втроенная переменная которая может хранить в себе переданный флаг
  isBuild: process.argv.includes('--build'), // режим продакшна – когда мы уже закончили работы и формируем конечный файлы для отправки заказчику
  isDev: !process.argv.includes('--build'), // режим разработчика
  path: path,
  gulp: gulp,
  plugins: plugins,
};


// импорт задачи

import { copy } from "./gulp/tasks/copy.js" ;// забираем задачу export const copy  из файла copy.js
import { reset } from "./gulp/tasks/reset.js" ;
import { html } from "./gulp/tasks/html.js" ;
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otf2ttf, ttf2woff, fontStyle } from "./gulp/tasks/fonts.js"; // импорт здесь такой для того чтобы построить правильный порядок выполнения
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";





// наблюдатель за изменениями в файлах

function watcher() {
  gulp.watch(path.watch.files, copy); // в методе gulp.watch мы вначале указываем путь к файлам за которыми следим, а через запятую необъодимое действие
  gulp.watch(path.watch.html, html);
  // если нужно чтобы все изменения сразу же грузились на сервер то пишем вместо строчки выше gulp.watch(path.watch.html, gulp.series(html, ftp)); Аналогично со всеми другими задачами
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// задача svgSprive ниже это единственная задача которую мы не включаем в сценарий по умолчанию, потому что она будет выполняться только один раз для создания css спрайтов. и выполняться она будет по запросу
export { svgSprive }

// Последовательная обработка шрифтов

const fonts = gulp.series(otf2ttf, ttf2woff, fontStyle);

// основные задачи
const mainTasks = gulp.series(fonts, svgSprive, gulp.parallel(copy, html, scss, js, images)); // метод parallel выполняет задачи непоследовательно, параллельно. Мы копируем файлы и выполняем задачу html.js



// построение сценариев выполнения задач

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // метод series нужен для выполнения задач последовательно. Здесь мы вначале удаляем папку с результатом (для избавления от ненужных файлов, вначале удаленных из папки с исходником), затем копируем файлы + их обработка одновременно (это mainTasks). Затем вкючаем наблюдатель и одновременно запускаем локальный сервер на браузере

const build = gulp.series(reset, mainTasks); // в режиме продакшна наблюдатель и запуск сервера не нужен

const deployZIP = gulp.series(reset, mainTasks, zip);

const deployFTP = gulp.series(reset, mainTasks, ftp);


// экспорт сценариев

export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// выполнение сценария по умолчанию

gulp.task('default', dev);
