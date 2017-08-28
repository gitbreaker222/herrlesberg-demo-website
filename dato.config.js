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
  root.directory("src/content", (folder) => {

    /*
      === FRONTPAGE / INDEX ===
    */
    folder.createPost(`index.md`, 'yaml', {
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

    /*
       === ARTICLES ===
    */
    folder.directory("articles", (subfolder) => {
      dato.articles.forEach((post) => {
        subfolder.createPost(
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
    
  })
}
