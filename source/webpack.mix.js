const path = require('path')
const mix = require('laravel-mix')
require('dotenv').config();
mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass("resources/sass/app.scss", "public/css")
    .sass("resources/sass/vendors/vendors.scss", "public/css");

mix.webpackConfig({
    stats: {
        children: true,
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
            "@": path.join(__dirname, "./resources"),
            "~": path.join(__dirname, "./resources/js"),
            "~assets": path.join(__dirname, "./resources/assets"),
            "~home": path.join(__dirname, "")
        }
    }
});