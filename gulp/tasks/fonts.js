import fs from 'fs'; // это плагин Node который работает с файловой системой, он установлен по умолчанию
import fonter from 'gulp-fonter'; // позволяет преобразовать шрифты из формата otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2'; // для конвертации в woff и woff2

// по итогу работы всех плагинов должны получиться шрифты форматов woff и woff2. Именно эти шрифты самые оптимизированные

export  const otf2ttf = () => {
    // Ищем файлы шрифтов otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>'
        }))
        )
        // Конвертируем в ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // выгружаем в исходную папку
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))

}

export const ttf2woff = () => {
     // ищем файлы шрифтов ttf
     return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
            .pipe(app.plugins.plumber(app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            }))
            )
            // Конвертируем в woff
            .pipe(fonter({
                formats: ['woff']
            }))
            // выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
            // ищем файлы шрифтов ttf
            .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
            // конвертируем в woff
            .pipe(ttf2woff2())
            // выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}


// ниже: записываем подключение файлов шрифтов в файл стилей
export const fontStyle = () => {
    // файл стилей подключения фрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
    // проверяем сущетсвуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontFiles) {
        if (fontFiles) {
            // проверяем сущетсвует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // если нет файла, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontFiles.length; i++) {
                    // записываем подключения шрифтов в файл стилей
                    let fontFileName = fontFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        }
                        else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        }
                        else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        }
                        else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        }
                        else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        }
                        else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        }
                        else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        }
                        else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        }
                        else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                    
                }
            }
            else {
                // Если файл есть выводим сообщение
                console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!")
            }
        }
        
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}



       
