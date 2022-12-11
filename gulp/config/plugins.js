import replace from "gulp-replace"; // поиск и замена
import plumber from "gulp-plumber"; // поиск ошибок
import notify from "gulp-notify"; // вывод уведомлений об ошибках
import browsersync from "browser-sync"; // виртуальный сервер для отображения изменений в браузере
import newer from 'gulp-newer'; // проверяет обновилась ли картинка. То есть чтобы каждый раз не обновлять уже обновленные файлы в папке с результатом
import ifPlugin from 'gulp-if'; // условное ветвление

 
//Экспортируем объект

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}