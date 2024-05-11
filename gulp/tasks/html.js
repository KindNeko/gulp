import fileInclude from "gulp-file-include";
import htmlMin from "gulp-htmlmin";
import versionNumber from "gulp-version-number"; // добавка ключа от кеширования файлов в браузере
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // преобразование картинок в webp, кроме svg

export const html = () => {
  return app.gulp
    .src(app.path.src.html)

    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )

    .pipe(fileInclude())
    .pipe(webpHtmlNosvg())
    .pipe(
      htmlMin({
        removeComments: true,
      })
    )
    .pipe(app.plugins.replace(/^\s*\n/gm, ""))
    .pipe(app.gulp.dest(app.path.build.html)) // Закомментировать если не нужен не сжатый дубль файла стилей

    .pipe(app.plugins.rename({ extname: ".min.html", removeComments: true }))
    .pipe(app.plugins.if(app.isBuild, htmlMin({ collapseWhitespace: true })))
    .pipe(app.gulp.dest(app.path.build.html))

    .pipe(app.plugins.replace(/@img\//g, "images/"))

    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))

    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )

    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
