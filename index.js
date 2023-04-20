const prompt = require('prompt-sync')()
const SHA256 = require('crypto-js/sha256')
const fs = require('fs');
const { versions } = require('process');


let copia;

const criaUsuario = () => {
    const usersCriar = require('./users.json')
    console.log(usersCriar)

    const definirUsuario =  prompt('Crie o seu username: ')
    const definirSenha =  prompt('Crie sua senha: ', {echo: '*'})
    const novoUsuario = {"usuario": definirUsuario, "senha": (SHA256(definirSenha).toString())} //(SHA256(definirSenha).toString())
    
    copia = [...usersCriar, novoUsuario]
    console.log(copia)
    
    fs.writeFileSync('./users.json', JSON.stringify(copia))

}

const login = (bancoDeDados) =>{
    //const usersLogar = require('./users.json')
    if(bancoDeDados === undefined){
        bancoDeDados = require('./users.json')
    }

    console.log(bancoDeDados)

    const logarUsuario = prompt('digite seu username: ')
    const logarSenha = prompt('digite sua senha: ', {echo: '*'})
    let logarSenhaCrypto = (SHA256(logarSenha).toString())

    let filtraLogin = bancoDeDados.find((usuario) => {
        return usuario['usuario'] === logarUsuario;
    })
    console.log(filtraLogin)



    
    
    
    const cadastraNum = (copiaNum) => {
        
        const nomeDoContato = prompt("digite o nome da pessoa: ")
        const numCadastrado = prompt("digite o número: ")
        let criarNum = [{nomeDoContato, numCadastrado}]
        
        if(fs.existsSync(`./db/${logarUsuario}.json`)){ 
            const recuperaAgenda = require(`./db/${logarUsuario}.json`)
            copiaNum = [...recuperaAgenda, criarNum]
            fs.writeFileSync(`./db/${logarUsuario}.json`, JSON.stringify(copiaNum))
        }else {
            fs.appendFileSync(`./db/${logarUsuario}.json`, JSON.stringify(criarNum) ) 
        }
        
        
        
        // const addNum = [...bancoDeDados, bancoDeNum]
        // console.log(addNum)
        // fs.writeFileSync('./users.json', JSON.stringify(cadastrando))
    }
    
    const verificarAgenda = () => {
        const mostrar = require(`./db/${logarUsuario}.json`)
        
        console.log(mostrar)
    }

    // const voltar = () => {
    //     login()
    // }
    
    if(filtraLogin.senha === logarSenhaCrypto){2
        while(opcao !== '4'){
            console.log('menu :'+'\n'+'(1) - cadastrar novo número '+'\n' +'(2) - agenda verificada' + '\n' + '(3) - voltar'+ '\n' + '(4) - sair')
            opcao = prompt('escolha: ')
            if(opcao === '1'){
                console.log('Digite o número desejado: ')
                cadastraNum()
            }else if(opcao === '2'){
                verificarAgenda()
                //console.log('verificar agenda')
            }else if(opcao === '3'){
                inicio()
            }
        }


    }else {
        console.log('usuario ou senha inválidos')
    }
}

let opcao;

const inicio = () => {
    console.log('menu :'+'\n'+'(1) - cadastrar usuário e senha '+'\n' +'(2) - logar' + '\n' + '(4) - sair')
    opcao = prompt('opção: ')
    if(opcao === '1'){ 
        criaUsuario()
    }else if(opcao === '2'){
        login(copia)
    }

}
while(opcao !== '4'){
    inicio()
}
