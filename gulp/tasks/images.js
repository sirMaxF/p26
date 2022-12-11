import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
    return app.gulp.src(app.path.src.images, { sourcemaps: true }) 
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'IMAGES',
      message: 'Error: <%= error.message %>'
    }))
    )
    // в ряде действие ниже: обращаемся к плагину if и проверяем: если это режим продакшна (isBuild), то выполняем действие
    .pipe(app.plugins.newer(app.path.build.images)) // вызываем плагин newer чтобы обрабатывать только те картинки которые изменились
    .pipe(
      app.plugins.if(
        app.isBuild,
        webp() // создаем изображения webp
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.images) // выгружаем webp в папку с результатом
      )
    )
    // две команды ниже: опять получаем доступ к папке с исходниками и опять проверяем на обновления
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({ // минимизируем изображения
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3, // 0 to 7
    
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg)) // получаем доступ к svg изображениям и копируем в папку с результатом (копирование по коду ниже)
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
}

// по итогу svg картинки не сжимаем и просто копируем, а все остальные сжимаем