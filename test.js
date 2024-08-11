const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your input: ', (input) => {
  console.log(`You entered: ${input}`);
  rl.close();
});