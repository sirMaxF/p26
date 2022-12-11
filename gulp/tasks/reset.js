// в этом файле будем писать задачи по очистке ненужных файлов из итоговой папки dist

import del from 'del'; // подключаем плагин del

export const reset = () => {
  return del(app.path.clean); // забираем путь clean: buildFolder, из файла path.js
};
