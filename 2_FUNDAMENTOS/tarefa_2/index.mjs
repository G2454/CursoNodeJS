import chalk from "chalk";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "Nome",
      message: "Qual o seu nome? ",
    },
    {
      name: "Idade",
      message: "Qual a sua idade? ",
    },
  ])
  .then((answers) => {
    console.log(chalk.bgYellow.black(`O seu nome é: ${answers.Nome}`));
    console.log(chalk.bgYellow.black(`A sua idade é: ${answers.Idade}`));
  })
  .catch((err) => {
    console.log(`Houve o seguinte erro: ${err}`);
  });
