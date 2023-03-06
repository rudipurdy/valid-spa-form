import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
    
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupCssMediaQueries())
    
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream())
}

