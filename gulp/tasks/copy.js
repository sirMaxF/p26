// это файл для задачи копирования файлов

export const copy = () => { // export ставим чтобы эту функцию можно в других местах использовать
  return app.gulp.src(app.path.src.files) // получаем доступ к данным из файла path.js, там в export const path есть объект src
    .pipe(app.gulp.dest(app.path.build.files)) // определяем куда файлы перенести
};
