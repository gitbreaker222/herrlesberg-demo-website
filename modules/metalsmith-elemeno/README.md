Simple:

```javascript
// /build.js

const Metalsmith    = require('./lib')
const elemeno       = require('./modules/metalsmith-elemeno')

…

.use(elemeno('Token-goes-here'))
```

---

Or professional:

> This way you can exclude your token from versioning/publishing

Change `/Makefile` from this:

```Makefile
# /Makefile

build: node_modules
	node build.js

node_modules: package.json
	npm install

.PHONY: build
```

to this (add the dev parameter):

```Makefile
# /Makefile

build: node_modules
	node build.js $(dev)

node_modules: package.json
	npm install

.PHONY: build
```

```javascript
// /build.js

const Metalsmith    = require('./lib')
const elemeno       = require('./modules/metalsmith-elemeno')

if (dev) {
  dev        = require("metalsmith-dev")
  var dotenv = require('dotenv')
  dotenv.load()
}

…

.use(elemeno(process.env.ELEMENO_API_TOKEN))
```

Then start the build with dev flag: `make build dev=true`

---

The elemeno api thing also takes additional arguments. You can configure them by passing an options object:

```javascript
// /build.js

…
.use(elemeno({
	apiToken: process.env.ELEMENO_API_TOKEN, //necessary
	cacheMaxAge: 15, //minutes; default = 2
	cacheSize: 50 //megabytes; default = 50
}))
```
