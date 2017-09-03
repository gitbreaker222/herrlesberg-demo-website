## Options and defaults

- folder || ''
- fileType || ''
- orderBy || 'title' *
- indexKey || 'menuIndex' *
- hideKey || 'hideInMenu' *
- ascOrDesc || 'asc'

> * These are set in the frontmatter with the defined key

## Example 1

key names of filestram look like this:

```
admin/index.html
media/IMG_20170429_115918_edit.jpg
media/logo.svg
style/milligram.min.css
style/normalize.css
content/index.html
content/posts/first-post.html
content/posts/fourth-post.html
content/posts/second-post.html
content/posts/third-post.html
content/posts/todo-guide.html
assets/main.css.map
assets/main.css
assets/main.tag.js
```

options:
```javascript
{
  folder: 'content',
  fileType: '.html',
  orderBy: 'date'
}
```

output (is actually json):

```yaml

contentMenu:
  type: menu
  baseUrl: /
  children:
    - title: Home
      position: 1
      description: asdf
      slug: index
      path: /index
    - title: News
      position: 2
      description: asdf asdf
      slug: news
      path: /news
  nachrichten:
    type: menu
    baseUrl: /news/
    children:
      - title: My first post
        date: '2020-10-10'
        description: asdf
        slug: my-first-post
        path: /news/my-first-post
```
