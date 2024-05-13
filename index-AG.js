#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
// Enum for different enemy types
var EnemyType;
(function (EnemyType) {
    EnemyType["SKELETON"] = "Skeleton";
    EnemyType["ZOMBIE"] = "Zombie";
    EnemyType["WARRIOR"] = "Warrior";
    EnemyType["ASSASSIN"] = "Assassin";
})(EnemyType || (EnemyType = {}));
// Function to generate random number within a range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to simulate a battle with a random enemy
async function battle(player, opponent) {
    const enemy = {
        health: randomNumber(50, 100),
        attack: randomNumber(5, 15)
    };
    console.log(chalk.yellow(`You're facing a ${opponent}!`));
    while (player.health > 0 && enemy.health > 0) {
        console.log(chalk.blue(`Your health: ${player.health}`));
        console.log(chalk.red(`${opponent}'s health: ${enemy.health}`));
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What will you do?',
                choices: ['Attack', 'Use Health Potion', 'Run For Your Life']
            }
        ]);
        if (action === 'Attack') {
            const playerDamage = randomNumber(5, 15);
            const enemyDamage = randomNumber(5, 15);
            enemy.health -= playerDamage;
            player.health -= enemyDamage;
            console.log(chalk.yellow(`You dealt ${playerDamage} damage to the ${opponent}!`));
            console.log(chalk.yellow(`${opponent} dealt ${enemyDamage} damage to you!`));
        }
        else if (action === 'Use Health Potion') {
            const healthPotion = randomNumber(10, 20);
            const healthDiff = 100 - player.health; // Calculate the difference to reach 100
            const healthToRestore = Math.min(healthPotion, healthDiff); // Limit restoration to reach 100
            player.health += healthToRestore;
            console.log(chalk.green(`You used a health potion and restored ${healthToRestore} health!`));
            console.log(chalk.blue(`Your health: ${player.health}`));
        }
        else {
            console.log(chalk.red('You chose to run!'));
            console.log(chalk.red.bold('You lose. Better luck next time!'));
            return;
        }
    }
    if (player.health <= 0) {
        console.log(chalk.red('You were defeated! Game Over.'));
    }
    else {
        console.log(chalk.green.bold('Congratulations! You defeated the enemy and survived!'));
    }
}
// Main function to start the game
async function startGame() {
    console.log(chalk.yellow.bold('\n<<< =======================================================>>>'));
    console.log(chalk.yellow.bold('\n\t\tWelcome to the Adventure Game\n'));
    console.log(chalk.yellow.bold('\n<<< ====================================================== >>>\n'));
    const { playerName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'playerName',
            message: 'Please Enter Your Name:'
        }
    ]);
    console.log(chalk.yellow(`\nHello, ${playerName}!\n`));
    const { selectedOpponent } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedOpponent',
            message: 'Select Your Opponent:',
            choices: Object.values(EnemyType)
        }
    ]);
    console.log(chalk.yellow(`\n${playerName} Vs ${selectedOpponent}\n`));
    await battle({ health: 100, attack: 10 }, selectedOpponent);
    console.log(chalk.yellow.bold('\n<<< =======================================================>>>'));
}
startGame();
