# Metalify-Riot-Starter

Website generator with Metalsmith, Netlify / NetlifyCMS and Riot JS

## Quick start

1. Install dependencies:

  ```
  npm install
  ```

1. Build static site in `build/` folder:

  ```
  make build dev=true
  ```

  With the **dev** flag this will rebuild on changes in the source folder and serve the build folder in your browser on `localhost:8080`)

1. Deploy to Netlify

   - Sign Up at https://www.netlify.com/ with github (has other options)
   - click _"New site from git"_ button somewhere
   - follow instructions
    - […]
    - … build command: `make build`

1. Configure NetlifyCMS

  Open `src/admin/config.yml` and enter link to your repo.

## Index

- [Configuration]('#configuration')
- [Metalsmith]('#metalsmith')
- [Netlify]('#netlify')
- [NetlifyCMS]('#netlifycms')
- [Riot JS]('#riot-js')

## Configuration

- Metalsmith build tasks: `build.js`
- Prismic headless CMS: `prismic-configuration.js`

## Metalsmith [(link)](http://www.metalsmith.io)

> An extremely simple, _pluggable_ static site generator.

**Customized!**

The _metalsmith-layouts_ plugin has been customized so it can process layout definitions without file extension. Example:

```markdown
---
title: My title
layout: default
---

# My content page
```

The used file extension defaults to `.html` and can be overriden with `layoutExtension`. Example for ``/index.js`:

```Javascript
.use(layouts({
  engine: 'pug',
  directory: './src/layouts',
  layoutExtension: '.pug', //custom option
  pattern: 'content/**/*.html'
}))
```

In original metalsmith the markdown file would look like this:

```markdown
---
title: My title
layout: default.pug
---

# My content page
```

Original README: https://www.npmjs.com/package/metalsmith



### License

The MIT License (MIT)

Copyright &copy; Segment \<friends@segment.com\>

---

## Netlify

TODO

---

## Riot JS

> Simple and elegant component-based UI library

Original README: https://www.npmjs.com/package/riot

---

## License

TL;DR

>A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

– https://choosealicense.com/licenses/mit/

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
