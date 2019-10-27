"use strict";

import webpack from "webpack"
import webpacStream from "webpack-stream"
import gulp from "gulp"
import gulpIf from "gulp-if"
import pug from "gulp-pug"
import sass from "gulp-sass"
import debug from "gulp-debug"
import clean from "gulp-clean"
import cssnano from "gulp-cssnano"
import rename from "gulp-rename"
import replace from "gulp-replace"
import autoprefixer from "gulp-autoprefixer"
import browserSync from "browser-sync"
import sourcemaps from "gulp-sourcemaps"
import yargs from "yargs"

const argv = yargs.argv
const production = !!argv.production
const webpackConfig = require("./webpack.config.js")
const paths = {
    pug: {
        src: "./src/pug/*.pug",
        dist: "./dist/",
        watch: "./src/pug/**/*"
    },
    sass: {
        src: "./src/sass/*.sass",
        dist: "./dist/styles/",
        watch: "./src/sass/**/*"
    },
    scripts: {
        src: "./src/main.js",
        dist: "./dist/js/",
        watch: [
            "./src/components/**/*",
            "./src/js/**/*",
            "./src/*.{js,vue}"
        ]
    },
    fonts: {
        src: "./src/fonts/**/*",
        dist: "./dist/fonts/",
        watch: "./src/fonts/**/*"
    },
    images: {
        src: [
            "./src/img/**/*.{jpg,jpeg,png,gif,svg}",
        ],
        dist: "./dist/img/",
        watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
    }
}

webpackConfig.mode = production ? "production" : "development"
webpackConfig.devtool = production ? false : "cheap-eval-source-map";

export const server = () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: true
    })
}

export const cleanFiles = () => gulp.src("./dist/*",{read:false})
    .pipe(clean())
    .pipe(debug({
        "title": "Cleaning..."
    }))

export const views = () => gulp.src(paths.pug.src)
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulpIf(production, replace("main.css", "main.min.css")))
    .pipe(gulpIf(production, replace("bundle.js", "bundle.min.js")))
	.pipe(gulpIf(production, replace("main.js", "main.min.js")))
    .pipe(gulp.dest(paths.pug.dist))
    .pipe(browserSync.reload({
        stream: true
    }))

export const styles = () => gulp.src(paths.sass.src)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer(
        ['last 15 version','> 1%','ie 8','ie 7'],
        {cascade:true}
    ))
    .pipe(gulpIf(production, cssnano()))
    .pipe(gulpIf(production, rename({
		suffix: ".min"
	})))
	.pipe(gulpIf(!production, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.sass.dist))
    .pipe(browserSync.reload({
        stream: true
    }))


export const scripts = () => gulp.src(paths.scripts.src)
    .pipe(webpacStream(webpackConfig), webpack)
    .pipe(gulpIf(production, rename({
        suffix: ".min"
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(debug({
        "title": "JS Files"
    }))
    .pipe(browserSync.reload({
        stream: true
    }))

export const images = () => gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dist))
    .pipe(debug({
		"title": "Images"
    }))
    .pipe(browserSync.reload({
        stream: true
    }))

export const fonts = () => gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(debug({
		"title": "Fonts"
    }))
    .pipe(browserSync.reload({
        stream: true
    }))

export const watch = () => {
    gulp.watch(paths.pug.watch, views)
    gulp.watch(paths.sass.watch, styles)
    gulp.watch(paths.scripts.watch, scripts)
    gulp.watch(paths.images.watch, images)
    gulp.watch(paths.fonts.watch, fonts)
}
export const development = gulp.series(cleanFiles,
    gulp.parallel(views,styles,scripts,images,fonts),
    gulp.parallel(server,watch))

export const prod = gulp.series(cleanFiles, views, styles, scripts, images, fonts)

export default development