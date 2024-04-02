import gulp from "gulp";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

const styleSRC = "./src/scss/style.scss";
const styleDIST = "./dist/css/";

export function buildStyles() {
  return gulp
    .src(styleSRC)
    .pipe(
      sass({ outputStyle: "compressed", sass: dartSass }).on(
        "error",
        sass.logError
      )
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(styleDIST));
}
export function optimizeImages() {
  return gulp
    .src("./src/images/*.{jpg,jpeg,png}")
    .pipe(
      imagemin([
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 1,
        }),
      ])
    )
    .on("error", function (err) {
      console.error(err);
    })
    .pipe(gulp.dest("./dist/images"));
}

export const build = gulp.parallel(buildStyles, optimizeImages);

export default build;
