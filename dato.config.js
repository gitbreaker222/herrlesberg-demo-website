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
       === PAGES ===
    */
    dato.pages.forEach((page) => {

      if (page.collection) {
        var collection = dato[page.collection]
        //collection index page…
        folder.createPost(
          `${page.slug}.md`, "yaml", {
            frontmatter: {
              layout: 'list',
              title: page.title,
              slug: page.slug,
              position: page.position,
              image: page.image,
              collection: page.slug
            },
            content: page.content || ''
          }
        )

        //… and folder for the collection
        folder.directory(page.slug, (subfolder) => {
          collection.forEach((item) => {
            subfolder.createPost(
              `${item.slug}.md`, "yaml", {
                frontmatter: {
                  layout: 'post',
                  title: item.title,
                  slug: item.slug,
                  date: item.date,
                  image: item.image,
                },
                content: item.content
              }
            )
          })
        })

      } else {

        //normal page
        folder.createPost(
          `${page.slug}.md`, "yaml", {
            frontmatter: {
              layout: 'layout',
              title: page.title,
              slug: page.slug,
              position: page.position,
              image: page.image,
            },
            content: page.content
          }
        )

      }
    })

  })
}
