//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present IGPlus Extension
//   -
//   - IGPlus Extension is a software: you can redistribute it, and you are allowed to modify it (for contribution purposes) under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//
//   - IGPlus Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with IGPlus Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.


import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import autoprefix from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import gulpFlatten from 'gulp-flatten';
import insert from 'gulp-insert';
import uglify from 'gulp-uglify';
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import concat from "gulp-concat";
import filter from 'gulp-filter';
import replace from "gulp-replace";
import zip from 'gulp-zip';
import chalk from 'chalk';


let { src, dest, task, series } = gulp;
const link = chalk.hex('#5e98d9');
const EXTENSION_NAME = 'igplus'
const EXTENSION_V = 'v.2.3.0'
const COPYRIGHT = `//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present IGPlus Extension
//   -
//   - IGPlus Extension is a software: you can redistribute it, and you are allowed to modify it (for contribution purposes) under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//
//   - IGPlus Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with IGPlus Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.
`

//## Minify Images  ##//
task('minifyImg', async function () {
    src(['./src/assets/img/*.svg', './src/assets/img/**/*.svg'])
        .pipe(svgmin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./src/assets/img/*.png', './src/assets/img/*.gif',  './src/assets/img/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./src/assets/icons/*.png', './src/assets/icons/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/icons/'))
        .pipe(dest('./public/firefox/assets/icons/'))

    src(['./src/assets/img/**/*.md'])
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))
});

//## Minify CSS  ##//
task('minifyCSS', async function () {
    src(['./src/assets/graphs/*.css', './src/assets/graphs/**/*.css', './src/assets/graphs/**/**/*.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/firefox/assets/graphs/'))

    src(['./src/assets/graphs/*.css', './src/assets/graphs/**/*.css', './src/assets/graphs/**/**/*.css'])
        .pipe(replace('moz-extension://', 'chrome-extension://'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/graphs/'))
});

//## Minify JS ##//
task('minifyJS', async function () {
    src(['./src/assets/js/*.js'])
        .pipe(uglify())
        .pipe(insert.prepend(COPYRIGHT))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/assets/js/'))
        .pipe(dest('./public/firefox/assets/js/'))
});

//## Minify HTML ##//
task('minifyHTML', async function () {
    src(['./src/content/*.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(insert.prepend(`<!--\n${COPYRIGHT}-->\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chromium/content/'))
        .pipe(dest('./public/firefox/content/'))
});


//## Add other files  ##//
task('addOther', async function () {
    src(['./LICENSE', './package.json', './README.md', './SECURITY.md'])
        .pipe(dest('./public/chromium'))
        .pipe(dest('./public/firefox'))
        .pipe(dest('./public'));

    src('./src/manifest-chrome.json').pipe(rename("manifest.json")).pipe(dest('./public/chromium'));
    src('./src/manifest-firefox.json').pipe(rename("manifest.json")).pipe(dest('./public/firefox'));

    src(['./src/_locales/**/*'])
        .pipe(dest('./public/chromium/_locales'))
        .pipe(dest('./public/firefox/_locales'))
});

//## For source code .zip ##//
task('source', async function (done) {
    const excludedDirs = ['public', 'node_modules', 'previews', '.git'];
    const excludedFiles = ['**', '!**/__*.js', '!**/*.zip', '.git', '.gitignore', '.DS_Store', "!**/manifest.json", "!**/pnpm-lock.yaml"];

    src("./**/*")
        .pipe(filter(['**', ...excludedFiles]))
        .pipe(filter(['**', ...excludedDirs.map(e => [`!./${e}/**/*`, `!./${e}/`]).flat(2)]))
        .pipe(dest('./public/__source_code/'))

    src("./**/*")
        .pipe(filter(['**', ...excludedFiles]))
        .pipe(filter(['**', ...excludedDirs.map(e => [`!./${e}/**/*`, `!./${e}/`]).flat(2)]))
        .pipe(zip(`${EXTENSION_NAME}_${EXTENSION_V}_source_code.zip`))
        .pipe(gulp.dest('./public/'))
        .on('end', function () {
            console.log("Source finished, dest: " + link(`./public/${EXTENSION_NAME}_${EXTENSION_V}_source_code.zip`));
            done();
        })
});


task('zipper', async function (done) {
    setTimeout(function () {
        const fn_base = `${EXTENSION_NAME}_${EXTENSION_V}`
        console.log(chalk.green("Zipper started."));
        src("./public/firefox/**/*")
            .pipe(zip(`${fn_base}_firefox.zip`))
            .pipe(gulp.dest('./public/'))
            .on('end', function () {
                console.log("Zipper finished, dest: " + link(`./public/${fn_base}_firefox.zip`));
                done();
            });
        src("./public/chromium/**/*")
            .pipe(zip(`${fn_base}_chromium.zip`))
            .pipe(gulp.dest('./public/'))
            .on('end', function () {
                console.log("Zipper finished, dest: " + link(`./public/${fn_base}_chromium.zip`));
                done();
            });
    }, 6000);
});

// Watcher task to monitor changes in the src directory and run the build task
task('watch', function () {
    console.clear();
    console.log("Dev mode initialized.\n" + chalk.green(`${EXTENSION_NAME} - ${EXTENSION_V}\n`));
    console.log(chalk.green("✓") + " Starting...\n" + chalk.green("✓") + " Started sucessfuly.\n");

    console.log("\nBuild files located in " + chalk.hex("#205ab3")("./public/$browsertype") + " directory.\n\n");

    gulp.watch('./src/**/*', series('build')).on('change', function (path, stats) {
        console.clear();
        console.log(`File ${link("./" + path)} was changed, running build...`);
    });
});

task('build', series('minifyImg', "minifyCSS", "minifyJS", "minifyHTML", "addOther"));
task('build_md', series('minifyImg', "minifyCSS", "minifyJS", "minifyHTML", "addOther", "source", "zipper"));

// Task to run the build and start the watcher
task('dev', series('build', 'watch'));
// TODO: Faster Dev builds
task('edge', series('build', 'watch'));
task('firefox', series('build', 'watch'));
task('chrome', series('build', 'watch'));

task('default', series('build'));
