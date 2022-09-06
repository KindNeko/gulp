import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber({
            errorHandler: app.plugins.notify.onError(error => ({
                title: "SVGSPRITE",
                message: error.message
            }))
        }))

        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнем иконок
                    example: true
                },
            },
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`))
}