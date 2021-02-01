let srcPath = "app";
let distPath = "dist";

let fs = require('fs');

let path = {
	build: {
		html: distPath + "/",
		css: distPath + "/css/",
		js: distPath + "/js/",
		img: distPath + "/img/",
		fonts: distPath + "/fonts/",
	},
	src: {
		html: [srcPath + "/**/*.html", "!" + srcPath + "/**/_*.html"],
		css: srcPath + "/scss/style.scss",
		js: srcPath + "/js/*.js",
		img: srcPath + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: srcPath + "/fonts/**/*",
	},
	watch: {
		html: srcPath + "/**/*.html",
		css: srcPath + "/scss/**/*.scss",
		js: srcPath + "/js/**/*.js",
		img: srcPath + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + distPath + "/"
}

let {src, dest} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webphtml = require('gulp-webp-html'),
	webpscss = require('gulp-webpcss'),
	ghPages = require('gh-pages'),
	pathPages = require('path');


function deploy(cb) {
	ghPages.publish(pathPages.join(process.cwd(), "./" + distPath + "/"), cb);
}
exports.deploy = deploy;


function browserSync(params) {
	browsersync.init({
		server:{
			baseDir: "./" + distPath + "/"
		},
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(scss({outputStyle: "expanded"}))
		.pipe(group_media())
		.pipe(autoprefixer({
			/*grid: true,*/
			overrideBrowserslist: ["last 5 versions"]
		}))
		.pipe(webpscss())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(rename({extname: ".min.js"}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(webp({
			quality: 70
		}))
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				interlaced: true,
				progressive: true,
				optimizationLevel: 3,
				svgoPlugins: [{removeViewBox: false}]
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
};

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;