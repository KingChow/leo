# leo

A smart web workframe for nodejs.

## Installation

This is a Node.js module available through the npm registry.

Before installing, download and install Node.js. Node.js 10.0 or higher is required.

Installation is done using the npm install command:

```
$ npm install leo-core
```

## API

```javascript
const leo = require('leo-core')

const app = leo()
leo.listen(xxxx,callback)
leo.get('/',(req,res)=>{
    res.end('Hello leo.')
})
```