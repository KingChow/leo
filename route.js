const path = require('path')
module.exports = class Route {
    constructor(p, m, h) {
        this.p = p === '*' ? '*' : path.join('/', p);
        this.m = m;
        if (m === 'use' && this.p.endsWith(path.join('', '/'))) {
            this.p = this.p.substring(0, this.p.length - 1)
        }
        this.h = h;
        this.n = -1;
        if (this.h) {
            this.h.r = this;
        }
    }
    setNumber(n) {
        this.n = n;
    }
}