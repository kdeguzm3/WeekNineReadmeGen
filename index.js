const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const builder = require('./builder.js');

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
        let pushElement;
        for (element of getMail) {
            if (element.type = "PushEvent") pushElement = element;
        }
        temporary.userMail = pushElement.payload.commits[0].author.email;
        console.log(temporary);
        const answers = builder(temporary);  
        console.log(answers);
        await fs.writeFile('README.md', answers, 'utf8', err => console.log(err) );

    } catch(error) {
        console.log(error);
    }
}

collectData();

