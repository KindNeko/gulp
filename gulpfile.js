// Основной модуль
import gulp from "gulp";

// Пути
import { path } from "./gulp/config/path.js";

// Задачи 
import { copy } from "./gulp/tasks/copy.js";
import { clear } from "./gulp/tasks/clear.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonsts.js";
import { svgSprive } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";


// Общие плагины
import { plugins } from "./gulp/config/plugins.js";

// Глобальная перменная
global.app = {
    // Флаги для определения режима работы
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    // Флаги
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Наблюдатель
const watcher = () => {
    gulp.watch(path.wath.files, copy);
    gulp.watch(path.wath.html, html);
    gulp.watch(path.wath.scss, scss);
    gulp.watch(path.wath.js, js);
    gulp.watch(path.wath.images, images);
}

// Для отдельного запуска
// "svgSprive": "gulp svgSprive"
// export { svgSprive }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

// Параллельное выполнение
const mainTasks = gulp.series(fonts, svgSprive, gulp.parallel(copy, html, scss, js, images));
const browser = gulp.parallel(watcher, server);

// Сборка 
const dev = gulp.series(clear, mainTasks, browser);
const build = gulp.series(clear, mainTasks);
const deployZIP = gulp.series(clear, mainTasks, zip);
const deployFTP = gulp.series(clear, mainTasks, ftp);


// Сценарии по умолчанию 
gulp.task('default', dev);
