export const server = (done) => {
    app.plugins.browsersync.init({ // init запускает плагин browsersync
        server: {
            baseDir: `${app.path.build.html}`, // запускаем папку проекта baseDir
            notify: false,
            port: 3000,
        }
    })
}