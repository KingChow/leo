const App = require('./app')
const Router = require('./router')
const Static = require('./static')

module.exports = leo = function () {
    let app = new App();
    return app;
};

leo.configSet = function (cfg) {
    this.customConfig = cfg;
}

leo.Router = Router;
leo.static = function (staticPath, option) {
    return new Static(staticPath, option);
};
leo.customConfig = null;
