# Demo website "Herrlesbergladen"

This is a first demonstration based on my static-site-generator (SSG) starter:

https://github.com/gitbreaker222/metalify-riot-starter

## Technology used

- [_Metalsmith_][metalsmith] (build tool)
  - Customized module _"metalsmith-layouts"._

    The layout name in the front matter doesn't need the file extension (e.g. `.pug`). Instead it is defined with the new plug-in option `layoutExtension`.
  - Custom module _"metalsmith-elemeno"_

    Fetches the content from elemeno and writes it to the filestream
  - Custom module _"metalsmith-content-menu"_

    Creates simple navigation tree (2 hierarchy layers) in json format with full content of the second layer (articles) and adds it to metalsmith metadata as `contentMenu`
- [_Netlify_][netlify] (Deployment Server, BaaS)
- [_elemeno_][elemeno] (headless CMS, SaaS)
- [_RIOT JS_][riot] (frontend framework for custom tags)

[metalsmith]: www.metalsmith.io
[netlify]: www.netlify.com
[elemeno]: www.elemeno.io
[riot]: http://riotjs.com

## What is not so good

Every rendered page contains a copy of the css/js assets. This is > 90% of each page (images are just urls in html) --> very redundant I guess

### Improvement?

This could be done better with a single page application where all contents from CMS are saved to json, that gets loaded via ajax.
