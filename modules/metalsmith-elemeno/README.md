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

Change `/Makefile` from this:

```
build: node_modules
	node build.js

node_modules: package.json
	npm install

.PHONY: build
```

to this (add the dev parameter):

```
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

Then start the build with dev flag

`make build dev=true`
