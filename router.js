const path = require('path')
const http = require('http')
const Route = require('./route')

Router = module.exports = class Router {
    constructor() {
        this.s = { 'use': [], 'all': [] }
        this.count = 0;
        this.root = '/'
    }
    add(route) {
        route.setNumber(this.count++);
        if (route.m === 'use') {
            this.s['use'].push(route)
        } else if (route.m === 'all') {
            this.s['all'].push(route)
        } else {
            let p = route.p ? route.p : path.join('', '/');
            if (!this.s.hasOwnProperty(p)) {
                this.s[p] = [];
            }
            this.s[p].push(route);
        }
    }
    match(route) {
        //console.log('INCOMING ROUTE : ', route)
        //console.log('BEGAIN MATCH : this.s= ', this.s)
        let { p, m } = route;
        p = p ? p : path.join('', '/')
        let _s_use = this.s['use'].filter(x => p === x.p || p.startsWith(path.join(x.p, '/')));
        let _s_all = this.s['all'].filter(x => { return (x.p === '*' || p === x.p) });
        let _s_path = [];
        if (this.s.hasOwnProperty(p)) {
            _s_path = this.s[p].filter(x => x.m === m);
        }
        let _s = [..._s_use, ..._s_all, ..._s_path].sort((x1, x2) => x1.n - x2.n);
        //console.log('MATCH RESULT: _s= ', _s)
        return _s;
    }
    handle(req, res, next) {
        let _root = this.r ? this.r.p : '/';
        //console.log('ROOT =　', _root)
        //console.log('BEFARE PEEL REQ.ROUTEs=', req.route)
        req.route.peelRoot(_root);
        // console.log('AFTER PEEL REQ.ROUTEs=', req.route)
        let index = 0, _s = this.match(req.route);
        function _next() {
            if (index === _s.length) {
                req.route.packRoot(_root);
                next ? next() : null;
            } else {
                let next_route = _s[index++];
                if (next_route.h instanceof Router) {
                    next_route.h.handle(req, res, _next);
                }
                else {
                    next_route.h(req, res, _next);
                }
            }
        }
        _next();
    }
}
let ms = ['use', 'all', ...http.METHODS];
let methods = Object.create(null);
ms.forEach(m => {
    m = m.toLowerCase();
    methods[m] = function (pathname, handler) {
        if (!handler) {
            handler = pathname;
            pathname = '/';
        }
        let _route = new Route(pathname, m, handler);
        this.add(_route);
    }
})
Object.assign(Router.prototype, methods)

