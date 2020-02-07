const http = require('http')
const { URL } = require('url')
const path = require('path')
const Router = require('./router')
const Route = require('./route')

class App extends Router {
    constructor() {
        super();
    }
    listen() {
        let server = http.createServer(connetc.bind(this));
        function connetc(req, res) {
            req.route = new _Route(req);
            this.handle(req, res, null)
        }
        return server.listen(...arguments)
    }
}
class _Route extends Route {
    constructor(_req) {
        super(path.join(new URL('http:xxx.ccc' + _req.url).pathname, ''), _req.method.toLowerCase(), null);
        this.rawP = this.p;
    }
    peelRoot(root) {
        if (path.join(root, '') !== path.join('/', '') && (this.p === root || this.p.startsWith(path.join(root, '/')))) {
            this.p = this.p.replace(root, '')
        }
        console.log('peel did nothing')
    }
    packRoot(root) {
        this.p = path.join(root, this.p);
    }
}
module.exports = App;