const process = require("node:process");
const readline = require("node:readline");

//-------------------------------------------------------------------------------- => exe1

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// rl.question("What is your name? ",(name)=>{
//     console.log(`Hello, ${name}`);
//     rl.close();
// });

//-------------------------------------------------------------------------------- => exe2 (multi questions)
// rl.question(("Name: "), (name) => {
//     rl.question("Age: ", (age) => {
//         console.log(`Name: ${name}, Age:${age}`);
//         rl.close();
//     })
// });

//-------------------------------------------------------------------------------- => exe3
function questionAsync1(rl, prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {
    const name = await questionAsync1(rl, "Name: ");
    const city = await questionAsync1(rl, "City: ");

    console.log(`Hello ${name} from ${city}`);
    rl.close();
}

// main();

//-------------------------------------------------------------------------------- => exe4 loop
function questionAsync2(rl, prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {

    let num;

    while (true) {
        const answer = await questionAsync2(rl, "Enter a number (1 to 10) : ");
        num = Number(answer);
        if (!Number.isNaN(num) && num >= 1 && num <= 10) break;
        console.log("Invalid : try again!");
    }
    console.log(`You chose : ${num}`);
    rl.close();
}

// main();

//-------------------------------------------------------------------------------- => ex 5 rl.prompt() and "line" event and "close"

const todos = [];

rl.prompt(); //>
console.log("Commands : help, add [your task], list, exit");
rl.prompt();

rl.on('line', (line) => {
    const input = line.trim();

    if (input === "help") {
        console.log(" help - show this \n add[your task] - add your task \n list - show all tasks \n exit - quit.")
    }
    else if (input.startsWith("add ")) {
        todos.push(input.slice(4));
        console.log("new task successfully added");
    }
    else if (input === "list") {
        console.log(todos.length ? todos.map((todo, idx) => `${++idx}. ${todo}`).join("\n") : `No todo!`);
    }
    else if (input === "exit") {
        rl.close();
    }
    else {
        console.log(`Unknown command. Type "help"`);
    }

    rl.prompt();
});

// like ctrl+c to close program
rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
})
