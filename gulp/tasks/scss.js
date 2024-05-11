import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import cleanCss from "gulp-clean-css";
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Групировка медиа запросов
import gulpSass from "gulp-sass";
import webpcss from "gulp-webpcss"; // Вывод webp изображений
import dartSass from "sass";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemapps: app.isDev }) // sourcemapps: true - где ошибка

    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )

    .pipe(app.plugins.replace(/@img\//g, "../images/"))

    .pipe(sass({ outputStyle: "expanded" }))

    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))

    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )

    .pipe(app.plugins.replace(/^\s*\n/gm, ""))
    .pipe(app.gulp.dest(app.path.build.css)) // Закомментировать если не нужен не сжатый дубль файла стилей

    .pipe(app.plugins.if(app.isBuild, cleanCss()))

    .pipe(app.plugins.rename({ extname: ".min.css" }))

    .pipe(app.gulp.dest(app.path.build.css))

    .pipe(app.plugins.browserSync.stream());
};
