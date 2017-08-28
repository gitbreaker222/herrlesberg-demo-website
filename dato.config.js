// Arguments that will receive the mapping function:
//
// * dato: lets you easily access any content stored in your DatoCMS
//   administrative area;
//
// * root: represents the root of your project, and exposes commands to
//   easily create local files/directories;
//
// * i18n: allows to switch the current locale to get back content in
//   alternative locales from the first argument.
//
// Read all the details here:
// https://github.com/datocms/js-datocms-client/blob/master/docs/dato-cli.md


module.exports = (dato, root, i18n) => {

  /*
  === FRONTPAGE / INDEX ===
  */
  root.createPost(`src/content/index.md`, 'yaml', {
    frontmatter: {
      layout: 'layout',
      title: dato.index.title,
      subtitle: dato.index.subtitle,
    },
    content: dato.index.content
  })

  /*
  === PAGES ===
  */
  root.directory("src/content", (folder) => {
    console.log(dato.pages)
    dato.pages.forEach((item) => {
      folder.createPost(
        `${item.slug}.md`, "yaml", {
          frontmatter: {
            layout: 'layout',
            title: item.title,
            position: item.position,
            image: item.image,
          },
          content: item.content
        }
      )
    })
  })

  /*
  === ARTICLES ===
  */
  root.directory("src/content/articles/", (folder) => {
    dato.articles.forEach((post) => {
      folder.createPost(
        `${post.slug}.md`, "yaml", {
          frontmatter: {
            layout: 'post',
            title: post.title,
            date: post.date,
            image: post.image,
          },
          content: post.content
        }
      )
    })
  })

}
