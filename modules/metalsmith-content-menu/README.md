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

output:

```javascript

contentMenu: [
  {
    type: 'file',
    name: 'index.html',
    path: '/index.html',
    date: undefined
  },
  {
    name: 'posts',
    type: 'folder',
    children: [
      {
        type: 'file',
        name: 'first-post.html',
        path: '/posts/first-post.html'
      },
      {
        type: 'file',
        name: 'fourth-post.html',
        path: '/posts/fourth-post.html'
      },
      {
        type: 'file',
        name: 'second-post.html',
        path: '/posts/second-post.html'
      },
    ]
  }
]
```
