const fetch = require('node-fetch');
const fs = require("fs");
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var readme = {
    contents: [],
    body: ""
};

function writeReadme() {
fs.writeFile("README.md", readmeMaker(readme), function(err) {
    if (err) {console.log(err)};
})
}
console.log("Let's make a README file!\nPlease answer the following questions")
rl.question('Project title: ', title => {
    readme.title = title != "" ? title : "Dance Monkey";
rl.question('Description: ', desc => {
    readme.description = desc != "" ? desc : "Tones and I";
rl.question('Installation: ', inst => {
    readme.installation = inst;
rl.question('Usage: ', usage => {
    readme.usage = usage;
rl.question('License: ', lic => {
    readme.license = lic;
    rl.close();
    writeReadme();
})
})
})
})
})

function readmeMaker({title, description, installation, usage, license})
{
    fileBody =
`# ${title}

## ${description}

## Installation

    ${installation}

## Usage

    ${usage}

## License

    ${license}
    `
    return fileBody;
}

