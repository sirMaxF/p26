import svgSprite from 'gulp-svg-sprite';

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'SVG',
      message: 'Error: <%= error.message %>'
    }))
    )
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // создать страницу с перечнем иконок
          example: true // по данной настройке будет создан хтмл файл с превью спрайтов, подходит для новичков которые плохо знают спрайты
        }
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}