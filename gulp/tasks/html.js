import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number"; // позволяет избежать кеширования. Полезно при проверке итоговых результатов в документе: иногда предыдущие файлы кешируются в браузере и новых изменений не видно


// пишем задачу копирования файлов из src в dist

export const html = () => {
  return app.gulp.src(app.path.src.html)
  .pipe(app.plugins.plumber( // настраиваем работу плагинов поиска ошибко (plumber) и вывода информации о них (notify)
    app.plugins.notify.onError({
      title: 'HTML',
      message: 'Error: <%= error.message %>'
    })
  ))
    .pipe(fileInclude()) //вызываем плагин для склейки файлов fileInclude
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(
        app.plugins.if( // обращаемся к плагину if и проверяем: если это режим продакшна (isBuild), то выполняем действие
          app.isBuild,
          webpHtmlNosvg()
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({ // благодаря коду ниже добавляем к адресу подключаемых стилей текущие дату и время. также будет создаваться файл version.json в папке Галп, где будет храниться этот ключ
            'value': '%DT%',
            'append': {
              'key': '_v',
              'cover': 0,
              'to': [
                'css',
                'js',
              ]
            },
            'output': {
              'file': 'gulp/version.json'
            }
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream()); // команда stream отвечает за обновление страницы
};
