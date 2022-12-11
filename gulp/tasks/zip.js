import del from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
    del(`./${app.path.rootFolder}.zip`); // удаляем zip архив если он уже сущствует
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) // обращаемся к папке с результатом и получаем все файлы любого уровня вложенности
    .pipe(app.plugins.plumber( // настраиваем работу плагинов поиска ошибко (plumber) и вывода информации о них (notify)
    app.plugins.notify.onError({
      title: 'ZIP',
      message: 'Error: <%= error.message %>'
    })
  ))
  .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // получаем имя родительской папки проекта и именно с таким именем сохраняем zip архив
  .pipe(app.gulp.dest('./'));
}