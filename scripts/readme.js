// const readdirp = require('readdirp');
const fs = require('fs');
const execa = require('execa');
const Handlebars = require('handlebars');

const handlebars = (source, data) => {
  const template = Handlebars.compile(source)
  return template(data)
}

// import execa from 'execa' 


(async () => {

  const libs = []
  let libsMarkdown = ''
  const assetsDir = './assets'

  const files = execa
    .commandSync('ls -d ./code/*/*/package.json', { shell: true })
    .stdout
    .split('\n')

  files.forEach(async f => {
    const pkg = JSON.parse(fs.readFileSync(f))

    libs.push({
        name: pkg.name
      , version: pkg.version
      , description: pkg.description
      , repository: pkg.repository
      , tags: pkg.tags || []
    })

    libsMarkdown += `\n- [${pkg.name}](${pkg.repository}) - ${pkg.description}`
  })

  const readme = fs.readFileSync(`${assetsDir}/README.md`, 'utf-8')
  const README = handlebars(readme, { libs: libsMarkdown })
  
  fs.writeFileSync(`./README.md`, README, 'utf-8')

  // console.log(handlebars(readme, { libs: libsMarkdown }))

  // const dirs = async (entry='.', { type='directories', depth=0 } = {}) => {
  //   const options = { type, depth }
  //   const out = []

  //   for await (const r of readdirp(entry, options)) {
  //     out.push(r)
  //   }
  //   return out
  // }


  // const dirsAtLevel = async (entry='.', level=1, tree={}, stop) => {
  //   stop = stop || level
  //   while(level){
  //     level--

  //     const cats = await dirs(entry)

  //     await Promise.all(cats.map(async c => {
  //       const { path, fullPath } = c

  //       if(!level) tree.push(path)

  //       if(level) {
  //         tree[path].dirs = await dirsAtLevel(fullPath, level, tree, stop)
  //       }
  //     }))

  //     return tree

  //   }
  // }



  // const result = await dirsAtLevel('./code', 1)
  // console.log(result)

})()

// const fs = require('fs')
// const path = require('path')

// const dir = (path='./code') => {

//   const r = []

//   return new Promise((solv) => {

//     Promise.all([
//       new
//     ])

//     fs.readdir(path, (err, files) => {
//       files.forEach(file => {


//         // let filepath = path.join(dirPath , file)
//         // let stat= fs.statSync(filepath)

//         console.log(file)
//       })
//     })
    
//   })
  
// }

// dir().then(r => console.log)

// // dir.files('code', (err, r) => console.log(r), { recursive: false })

// // const fs = require('fs')
// // const root = 'code'

// // const dirs = () => new Promise((solve) => {
// //   fs.readdirSync('./code').forEach(file => {
// //     fs.readdirSync([root, file].join('/')).forEach(file => {
// //       console.log(file)
// //     })
// //   })
  


