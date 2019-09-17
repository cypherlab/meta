const fs = require('fs');
const execa = require('execa');
const Handlebars = require('handlebars');

const handlebars = (source, data) => {
  const template = Handlebars.compile(source)
  return template(data)
}

(async () => {

  const pkgs = []
  const md = { list: '' }

  // load all code components package.json files
  const pkgsPaths = execa
    .commandSync('ls -d ./code/*/*/package.json', { shell: true })
    .stdout
    .split('\n')

  // proxy them in the "pkgs" variable
  pkgsPaths.forEach(async file => {
    pkgs.push(JSON.parse(fs.readFileSync(file)))
  })

  // build the listing in markdown
  pkgs.forEach(async pkg => {
    md.list += `\n- [${pkg.name}](${pkg.repository}) - ${pkg.description}`
  })

  // create final README.md file
  const readme = fs.readFileSync(`./assets/README.md`, 'utf-8')
  const README = handlebars(readme, { list: md.list })
  fs.writeFileSync(`./README.md`, README, 'utf-8')

})()