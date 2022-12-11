import { configFTP } from '../config/ftp.js'; // включаем конфигурационный файл ftp.js из папки config. Его нужно заполнить вручную
import vinylFTP from 'vinyl-ftp'; // плагин отправки файлов на ftp
import util from 'gulp-util'; // помогает отображать ход отправки файлов на ftp

export const ftp = () => {
    configFTP.log = util.log; // в конфигурационный лог выводим плагин util, чтобы он показывал состояние дел
    const ftpConnect = vinylFTP.create(configFTP); // создаем подключение на основании файла ftp.js в папке config
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) // получаем все файлы в папке результата
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'FTP',
        message: 'Error: <%= error.message %>'
      }))
      )
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`)); // указываем назначение, которое будет состоять из пути к удаленному серверу (указывается в path.js) и названия root папки (рабочей папки)

}

