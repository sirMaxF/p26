import webpack from 'webpack-stream';

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) // Итоговый файл скриптов будем собирать из множества других файлов. Поэтому указываем sourcemaps: app.isDev, чтобы в режиме разработчика при возникновении ошибок точно видеть в каком из исходных файлов была ошибка
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'JS',
      message: 'Error: <%= error.message %>'
    }))
    )
    .pipe(webpack({
        mode: app.isBuild ? 'production' : 'development', // указываем: если мы в режиме продакшна - указываем Продакшн. Если в режиме разработчика - соответствующий режим
        output: {
            filename: 'app.min.js',
        }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}