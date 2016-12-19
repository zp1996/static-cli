const gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	exec = require("child_process").exec,
	build_path = `${__dirname}/build`,
	file_path = [
		`${__dirname}/ui/**/*.js`,
		`${__dirname}/res/**/*.js`,
		`${__dirname}/**/css/*.scss`
	],
	tasks = ["js", "sass"],
	port = require("./port.json").port;

gulp.task("js", () => {
	// 异步生成文档
	exec(`${__dirname}/bash.sh`);
	return gulp.src(file_path.slice(0, 2))
		.pipe(gulp.dest(`${build_path}/`))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("sass", () => {
	return gulp.src(file_path[2])
		.pipe(sass({
			outputStyle: "compressed",
			includePaths: `${__dirname}/ui/css/`
		}))
		.pipe(gulp.dest(`${build_path}/css`))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("server", tasks, () => {
	browserSync.init({
    	proxy: `http://localhost:${port}/`
  	});
});

gulp.task("watch", () => {
	gulp.watch(file_path, tasks);
});

gulp.task("default", ["server", "watch"]);