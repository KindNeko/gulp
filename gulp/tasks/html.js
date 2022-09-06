import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; // преобразование картинок в webp, кроме svg
import versionNumber from 'gulp-version-number'; // добавка ключа от кеширования файлов в браузере

export const html = () => {
    return app.gulp.src(app.path.src.html)

        .pipe(app.plugins.plumber({
            errorHandler: app.plugins.notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))

        /**
         * @@include('...') - подключение отдельный html файлов
         * (@@name, @@body) - имена элементов json вставляешь в нужный файл
         * @@lop('шаблон', 'файл с данными')
         */

        .pipe(fileInclude())

        .pipe(app.plugins.replace(/@img\//g, '/images/'))

        .pipe(
            app.plugins.if(app.isBuild, webpHtmlNosvg()))

        .pipe(
            app.plugins.if(
                app.isBuild, versionNumber({
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
        .pipe(app.plugins.browserSync.stream())
}