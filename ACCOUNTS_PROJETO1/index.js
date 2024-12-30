//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';    
//modulos internos

operations()

function operations(){
    inquirer.prompt({
        type:'list',
        name:'action',
        message:'O que você deseja fazer?',
        choices:[
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }).then((answers) => {
        console.log(answers.action);

        if(answers.action === 'Criar Conta'){
            createAccount();
        }else if(answers.action === 'Consultar Saldo'){
            checkBalance();
        }else if(answers.action === 'Depositar'){
            deposit();
        }else if(answers.action === 'Sacar'){
            withdraw();
        }else if(answers.action === 'Sair'){
            console.log(chalk.bgRed.black('Obrigado por usar nosso banco'))
            process.exit(); 
        }
    })
    .catch((err) => { console.log(err) });
}

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount();
}

function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            type:'input',
            message:'Digite um nome para a sua conta'
        },
    ])
    .then((answers)=>{
        const accountName = answers.accountName;
        console.log(accountName);

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts');
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa conta já existe'))
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err)
        });
        console.log(chalk.bgGreen.black('Conta criada com sucesso'));

        operations();


    }).catch((err) => { console.log(err) });
}

//add an amount to a user account
function deposit(){
    inquirer.prompt([
        {
            name:'accountName',
            type:'input',
            message:'Qual o nome da sua conta?'
        }
    ]).then((answers) =>{
        const accountName = answers.accountName;

        //verify if account exists
       if(!checkAccount(accountName)){
            return deposit()
       } 

       inquirer.prompt([
        {
            name:'amount',
            type:'input',
            message:'Qual o valor do depósito?'
        }
       ]).then((answers) =>{
        const amount = answers.amount;

        //add an amount
        addAmount(accountName, amount);
        operations()

       }).catch((err)=>(console.log(err)))
     
    })  
    .catch((err)=>(console.log(err)))
}


function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Essa conta não existe'));
    return false
    }
    else{
        return true
    }
}

function addAmount(accountName, amount){
    const account = getAccount(accountName);
    //console.log(account);

    if(!amount){
        console.log(chalk.bgRed.black('Valor inválido'));
        return deposit();
    }

    account.balance = parseFloat(account.balance) + parseFloat(amount);

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), function(err){
        console.log(err)
    });

    console.log(chalk.bgGreen.black(`Depósito no valor de R$${amount} realizado com sucesso`));


}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, 'utf-8', 'r');
    return JSON.parse(accountJSON);
}

function checkBalance(){
    inquirer.prompt([
        {
            name:'accountName',
            type:'input',
            message:'Qual o nome da sua conta?'
        }
    ]).then((answers) =>{
        const accountName = answers.accountName;

        //verify if account exists
       if(!checkAccount(accountName)){
            return checkBalance()
       } 

       const account = getAccount(accountName);
       console.log(chalk.bgGreen.black(`O saldo da sua conta é R$${account.balance}`));

       return operations();
    })
    .catch((err)=>(console.log(err)))
}

function withdraw(){
    inquirer.prompt([
        {
            name:'accountName',
            type:'input',
            message:'Qual o nome da sua conta?'       
        }
    ]).then((answers)=>{
        const accountName = answers.accountName;

        //verify if account exists
        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name:'amount',
                type:'input',
                message:'Qual o valor do saque?'
            }
        ]).then((answers)=>{
            const amount = answers.amount;

            //add an amount
            removeAmount(accountName, amount);
            operations()
        })
        .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))
}

function removeAmount(accountName, amount){
    const account = getAccount(accountName);
    //console.log(account);

    if(!amount){
        console.log(chalk.bgRed.black('Valor inválido'));
        return withdraw();
    }

    if(amount > account.balance){
        console.log(chalk.bgRed.black('Saldo insuficiente'));
        return withdraw();
    }

    account.balance = parseFloat(account.balance) - parseFloat(amount);

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), function(err){
        console.log(err)
    });

    console.log(chalk.bgGreen.black(`Saque no valor de R$${amount} realizado com sucesso`));

}