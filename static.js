const path = require('path')
const send = require('send')

const Router = require('./router'),
    //send = require('./send'),
    cfg = require('./defaultConfig').staticOption;

module.exports = class Static extends Router {
    constructor(staticPath, option) {
        super();
        this.staticPath = staticPath;
        this.option = option ? option : {};
        this.use('/', handler.bind(this))
    }
    handle(req, res, next) {
        if (req.method !== "GET") {
            next ? next() : null
        } else {
            let _root = this.r ? this.r.p : '/';
            console.log('ROOT =　', _root)
            console.log('BEFARE PEEL REQ.ROUTEs=', req.route)
            req.route.peelRoot(_root);
            console.log('THIS.OPTION = ', this.option)
            if (req.route.p === '' && searchPro('redirect', this.option, cfg)) {
                res.writeHead(301, {
                    'location': req.route.rawP + '/',
                    'Content-Type': 'text/html; charset=UTF-8',
                    'X-Content-Type-Options': 'nosniff',
                    'Content-Security-Policy': "default-src 'none'"
                })
                res.end();
            }
            else {
                this.s.use[0].h(req, res, _next.bind(this));
            }
            function _next() {
                next ? (req.route.packRoot(this.r.p), next()) : null;
            }
        }
    }

}
function handler(req, res, next) {
    let { m, p } = req.route;
    p = path.join(this.staticPath, p)
    if (path.extname(p) === '') {
        let index = searchPro('index', this.option, cfg)
        p = path.join(p, index)
    }

    send(req, p).pipe(res)

    // let extname = path.extname(p);
    // let headers = {}
    // if (extname === '.html') headers['Content-Type'] = 'text/html';
    // else if (extname === '.css') headers['Content-Type'] = 'text/css';
    // else if (extname === '.jpg') headers['Content-Type'] = 'jpeg';
    // send(p).then(
    //     (result) => {
    //         res.writeHead(200, headers)
    //         res.end(result)
    //     },
    //     (err) => {
    //         console.log('erRRRRRRRRRRRRRRRRRRRRRRRRRRRR', err)
    //         next()
    //     });
}
function searchPro(proName, ...options) {
    for (option of options) {
        if (option[proName]) {
            return option[proName];
        }
    }
    return null
}
