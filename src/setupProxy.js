const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {

    app.use(
        createProxyMiddleware(['/auth','/todo'], {
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    )
    app.listen(3000);
}