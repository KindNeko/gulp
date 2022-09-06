// Общие плагины
import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщение ошибок
import browserSync from "browser-sync" // Сервер
import newer from "gulp-newer"; // Проверка обновлений
import ifPlugins from "gulp-if"; // Условное ветвление
import rename from 'gulp-rename'; // Переименование файла


export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browserSync: browserSync,
	newer: newer,
	if: ifPlugins,
	rename: rename,
}