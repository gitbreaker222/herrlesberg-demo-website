# Metalify-Riot-Starter

**this is still in alpha**

Website generator with Metalsmith, Netlify / NetlifyCMS and Riot JS

## Quick start

1. **Clone** this repo and install dependencies:

  ```
  npm install
  ```

1. **Build** static site in `build/` folder with local content:

  ```
  make test dev=true
  ```

  With the **dev** flag this will rebuild on changes in the source folder and serve the build folder in your browser on `localhost:8080`)

1. **Deploy to Netlify**

   - Sign Up at [netlify.com][netlify] with github (has other options)
   - click _"New site from git"_ button somewhere
   - follow instructions
    - […]
    - … build command: `make build`

1. **Setup datoCMS** (not so quick)

  - Sign up at at [datocms.com][dato]
  - create a *model (singele type)* "index" with these *fields*:
    - title *(single-line-string)*
    - content *(Multiple-paragraph text)*
  - create a *model* "post" with these *fields*:
    - title *(single-line-string)*
    - slug *(Slug)*
    - date *(DateTime)*
    - content *(Multiple-paragraph text)*
  - Create items in "Content" tab to mirror the contents from `src/content/`
  - Go to `Settings > API tokens` and copy *"Read-only API token"*
  - Back in Project: Create a new file in root folder: `.env`
  - paste the API token in there: `DATO_API_TOKEN=<API-TOKEN-HERE>`
  - **IMPORTANT:** Don't add `.env` to VCS
  - test connection *(stop prior running process with `ctrl + c`/`cmd + c`)*
  ```
  make build dev=true
  ```

5. Now you can run your site locally with content from DatoCMS. To make it ready for production and let it update automatically online, you finally need to **connect netlify and DatoCMS**:
  - At DatoCMS go to `Settings > Deployment settings`
  - Choose environment (if you are not sure, choos "Production")
  - Click the Netlify "one click setup" button
  - Go to `Settings > API tokens` and copy *"Read-only API token"*
  - Go to Netlify `Settings > Build & deploy > Build environment variables`
  - Click "Edit variables" -> "New variable"
  - key = *"DATO_API_TOKEN"*; value = *(PASTE-API-TOKEN-HERE)*


## Index

- [Configuration]('#configuration')
- [Metalsmith]('#metalsmith')
- [Netlify]('#netlify')
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

> All the features developers need right out of the box: Global CDN, Continuous Deployment, one click HTTPS and more…

[www.netlify.com][netlify]

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



[netlify]: https://www.netlify.com
[dato]: https://www.datocms.com
