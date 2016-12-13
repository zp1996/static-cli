const gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	// jsdoc = require("gulp-jsdoc"),
	pug = require("gulp-pug"),
	exec = require("child_process").exec,
	ui_path = `${__dirname}/ui`,
	build_path = `${__dirname}/build`,
	file_path = [
		`${ui_path}/js/**/*.js`,
		`${ui_path}/css/**/*.scss`,
		`${__dirname}/views/**/*.pug`
	],
	tasks = ["js", "pug", "sass"];

gulp.task("js", () => {
	return exec(`${__dirname}/bash.sh`, browserSync.reload);
});

gulp.task("sass", () => {
	return gulp.src(file_path[1])
		.pipe(sass({
			outputStyle: "compressed"
		}))
		.pipe(gulp.dest(`${build_path}/css`))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("pug", () => {
	return gulp.src(file_path[2])
		.pipe(pug({
			pretty: true,
		}))
		.pipe(gulp.dest(`${__dirname}/html`))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("server", tasks, () => {
	browserSync.init({
    	server: {
    		baseDir: "./"
    	}
  	});
});

gulp.task("watch", () => {
	gulp.watch(file_path, tasks);
});

gulp.task("default", ["server", "watch"]);