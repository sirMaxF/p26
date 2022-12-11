import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // сжатие css файла
import webpCss from 'gulp-webpcss'; // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // группировка медиазапросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // Итоговый файл стилей будем собирать из множества других файлов. Поэтому указываем sourcemaps: app.isDev, чтобы в режиме разработчика при возникновении ошибок точно видеть в каком из исходных файлов была ошибка
    .pipe(app.plugins.plumber( 
    app.plugins.notify.onError({
      title: 'SCSS',
      message: 'Error: <%= error.message %>'
    })
  ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
          .pipe(
            app.plugins.if(
              app.isBuild,
              groupCssMediaQueries()
            )
          )
          .pipe(
            app.plugins.if(
              app.isBuild,
              webpCss({
                webpClass: ".webp", // если браузер поддерживает  webp изображения, плагин добавит класс .webp и выведет под этим классом соответствующие изображения. Чтобы определить свойства браузера будем использовать js скрипт. Также нужен webp конвертер 
                noWebpClass: ".no-webp" // если браузер не подддерживает webp изображения, будет соответствующий класс
            })
            )
          )
          .pipe(
            app.plugins.if(
              app.isBuild,
              autoprefixer({
                grid: true,
                overrideBrowserlist: ["last 3 versions"],
                cascade: true
            })
            )
          )
        // если раскомментировать строчку ниже, то в итоговой папке dist будет создано 2 файла стилей: один сжатый и один несжатый. Без этой строчки - только сжатый файл
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
              app.isBuild,
              cleanCss()
            )
          )
        .pipe(rename({
            extname: ".min.css" // переименуем файл, который теперь будет называться style.min.css
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
