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
import replace from "gulp-replace";

let { src, dest, task, series } = gulp;
const COPYRIGHT = `//   - This file is part of IGPlus Extension
//  <https://github.com/gerwld/IGPlus-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present IGPlus Extension
//   -
//   - IGPlus Extension is a software: you can redistribute it, but you are not allowed to modify it under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//   -
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
    src(['./assets/img/*.svg', './assets/img/**/*.svg'])
        .pipe(svgmin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./assets/img/*.png', './assets/img/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./assets/icons/*.png', './assets/icons/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/icons/'))
        .pipe(dest('./public/firefox/assets/icons/'))

    src(['./assets/img/**/*.md'])
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))
});

//## Minify CSS  ##//
task('minifyCSS', async function () {
    src(['./assets/graphs/*.css', './assets/graphs/**/*.css', './assets/graphs/**/**/*.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/firefox/assets/graphs/'))

    src(['./assets/graphs/*.css', './assets/graphs/**/*.css', './assets/graphs/**/**/*.css'])
        .pipe(replace('moz-extension://', 'chrome-extension://'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/graphs/'))
});

//## Minify JS ##//
task('minifyJS', async function () {
    src(['./assets/js/*.js'])
        .pipe(uglify())
        .pipe(insert.prepend(COPYRIGHT))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/js/'))
        .pipe(dest('./public/firefox/assets/js/'))
});

//## Minify HTML ##//
task('minifyHTML', async function () {
    src(['./*.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(insert.prepend(`<!--\n${COPYRIGHT}-->\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/'))
        .pipe(dest('./public/firefox/'))
});


//## Add other files  ##//
task('addOther', async function () {
    src(['./LICENSE.md', './package.json', './README.md', './SECURITY.md'])
        .pipe(dest('./public/chrome'))
        .pipe(dest('./public/firefox'))
        .pipe(dest('./public'));

    src('./manifest-chrome.json').pipe(rename("manifest.json")).pipe(dest('./public/chrome'));
    src('./manifest-firefox.json').pipe(rename("manifest.json")).pipe(dest('./public/firefox'));

    src(['_locales/**/*'])
        .pipe(dest('./public/chrome/_locales'))
        .pipe(dest('./public/firefox/_locales'))
});


task('build', series('minifyImg', "minifyCSS", "minifyJS", "minifyHTML", "addOther"));
export default series('minifyImg');
