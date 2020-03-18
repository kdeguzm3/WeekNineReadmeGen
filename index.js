const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require('node-fetch');

let answers;
let readme;

console.log(`Let's make a Readme, shall we?`)
const questions = [
    {
        type: 'input',
        name: 'title',
        message: `What is your repo's title?`
    },
    {
        type: `input`,
        name: `description`,
        message: `How would you describe your repo`
    },
    {
        type: `input`,
        name: `installation`,
        message: `How should your app be installed?`,
    },
    {
        type: `input`,
        name: `usage`,
        message: `Any instructions on how the app should be used`,

    },
    {
        type: `input`,
        name: `license`,
        message: `What license is your repo using?`
    },
    {
        type: `input`,
        name: `contributors`,
        message: `usernames of contributors, separated by commas`
    },
    {
        type: 'input',
        name: `username`,
        message: `What is your Github username?`
    }
];

async function collectData() {
    try {
        const temporary = await inquirer.prompt(questions);
        temporary.contributors = temporary.contributors.split(" ").join("").split(",");
        let getHub = await fetch(`https://api.github.com/users/${temporary.username}`);
        getHub = await getHub.json();
        let getMail = await fetch(`https://api.github.com/users/${temporary.username}/events/public`);
        getMail = await getMail.json();
        temporary.userAvatar = getHub.avatar_url;
        temporary.userMail = getMail[0].payload.commits[0].author.email;
        console.log(temporary);
        const answers = buildReadme(temporary);  
        console.log(answers);
        await fs.writeFile('README.md', answers, 'utf8', err => console.log(err) );

    } catch(error) {
        console.log(error);
    }
}

collectData();

function buildReadme({title, description, installation, usage, license, contributors, username, userAvatar, userMail}) {
let buildString = `# ${title}

### ${description}

## Table of Contents

[Installation](#Installation) | [Usage](#Usage) | [License](#License) | [Contributors](#Contributors) | [Questions](#Questions)

## Installation

${installation}

## Usage

${usage}

## License

${license}

## Contributors`;

for (let name of contributors) {
    buildString += `

[![](https://img.shields.io/badge/github-${name}-brightgreen?style=plastic)](https://www.github.com/${name})`
}
buildString += `

## Questions

![](${userAvatar})

[![](https://img.shields.io/badge/gitHub-${username}-blue?style=plastic)](https://www.github.com/${username}) | 
[![](https://img.shields.io/badge/email-${userMail}-purple?style=plastic)](mailto:${userMail})
`

return buildString;
}