const GeneratorData = require('../models/generator');
const EnvioArquivo = require('../shared/senders/EnvioArquivo.js');
const EnvioBanco = require('../shared/senders/EnvioBanco.js');
const EnvioSocket = require('../shared/senders/EnvioSocket.js');

let dir = './src/data/';

const jsonfile = require('jsonfile-promised');
const db = require('mysql2');
const base64 = require('base-64');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const net = require('net');

let
    agentes,
    i = 0,
    cnpj,
    continua = true,
    destino,
    fuso,
    nomenclatura,
    notaBanco,
    quantidade,
    serie,
    sleep,
    tipoEmissao,
    numeroInicio,
    ie,
    comunicacao = 1,
    host,
    user,
    password,
    database,
    table,
    xml = false,
    agenteId = 0,
    ipSocket,
    porta,
    out,
    id,
    cancelamento,
    ped_ajuste
    ;

class NotasService {

    run(Generator) {
        id = Generator._id;
        comunicacao = Generator.tipoEnvio;
        cancelamento = Generator.cancelamento;
        ped_ajuste = Generator.ped_ajuste;
        notaBanco = Generator.nota[0].nota;
        agentes = Generator.agentes;
        cnpj = Generator.nota[0].cnpj;
        ie = Generator.nota[0].ie;
        destino = Generator.destino;
        fuso = Generator.fuso;
        fuso = fuso.toString();
        nomenclatura = Generator.nomenclatura;
        quantidade = Generator.quantidade;
        serie = Generator.serie;
        sleep = Generator.sleep;
        tipoEmissao = Generator.tipoEmissao;
        numeroInicio = Generator.numero;
        if (Generator.tipoEnvio == 2) {
            host = Generator.jdbc[0].host;
            user = Generator.jdbc[0].user;
            password = Generator.jdbc[0].password;
            database = Generator.jdbc[0].database;
            table = Generator.jdbc[0].table;
        } else {
            ipSocket = Generator.socket[0].ipSocket;
            porta = Generator.socket[0].porta;
            out = Generator.socket[0].out;
        }
        this.gerarNotas();
    }

    gerarNotas() {
        if (continua === false) {
            clearTimeout();
            continua = true;
            quantidade = 9999999999;
        } else {
            let numNota = i + 1;
            let nota = this.criarNota(i);
            let notaNumero = parseInt(numeroInicio) + i;

            if (agenteId >= agentes) agenteId = 1; else agenteId++;

            console.log('agente ' + agenteId);

            this.criarArquivo(nota, notaNumero, agenteId);

            if (i < quantidade - 1) {
                setTimeout(() => {
                    i++;
                    this.gerarNotas();
                }, parseInt(sleep));
            } else {
                console.log('Todas as notas foram geradas.');
                continua = true;
                quantidade = 9999999999;
            }
        }
    }

    pararGerarNotas() {
        continua = false;
        this.atualizaFormulario();    
    }

    atualizaFormulario() {
        let ondeParou = parseInt(numeroInicio) + i;
        let numero = ondeParou + 1;
        i = 0;
        //salvar os dados
        GeneratorData.findOneAndUpdate({ _id: id }, {
            $set: { numero: numero }
        }, {
                sort: { _id: -1 }, upsert: true
            }, (err, result) => {
                if (err) return res.send(err)
                console.log("Atualizado para o número: " + numero);
            })
    }

    criarNota(nota) {
        let notaConteudo = notaBanco;
        let numeroNota = parseInt(numeroInicio) + nota;
        let data = new Date();
        let mezinho = data.getMonth() + 1;
        let mes = ("00" + mezinho).slice(-2);
        let dia = ("00" + data.getDate()).slice(-2);
        let hora = ("00" + data.getHours()).slice(-2);
        let minuto = ("00" + data.getMinutes()).slice(-2);
        let segundos = ("00" + data.getSeconds()).slice(-2);
        let fusoNota = fuso[0] + '0' + fuso[1];

        let dataFormat = `${data.getFullYear()}-${mes}-${dia}T${hora}:${minuto}:${segundos}${fusoNota}:00`;
        let uf;
        let mod;
        let codigoAleatorio = (Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000);
        let ano = data.getFullYear().toString().substr(-2);

        xml = false;
        if (notaConteudo.includes('<?xml'))
            xml = true;

        let ks = notaConteudo.split("\n");
        for (let value of ks) {
            let newValue = value.split(";");
            if (newValue[0] == "2100") {
                uf = newValue[1];
                mod = newValue[5];
            }
        }

        let nNF = uf + ano + mezinho + cnpj + mod + serie + ("000000000" + numeroNota).slice(-9) + tipoEmissao + codigoAleatorio + 1;
        let digito = this.calculaDV(nNF);

        if (cancelamento == 'YES') {
            let content = `0000;CANCINUT;${nNF.substring(0, 43)}${digito};Dados incorretos da nota;Dados incorretos da nota`;
            let novo = destino.replace(/\\in/, '') + '\\can-inu\\';
            if (!fs.existsSync(novo))
                fs.mkdirSync(novo);

            console.log(novo);
            let encoded = base64.encode(content);
            log.info(`Gerando can-inu ${this.getName(agenteId)}${numeroNota}_ped_can-inu.txt ${encoded}`);
            fs.writeFileSync(novo + this.getName(agenteId) + numeroNota + '_ped_can-inu.txt', content);
        }

        notaConteudo = notaConteudo.replace('${Id}', "NFe" + `${nNF}`.substring(0, 43) + `${digito}`);
        notaConteudo = notaConteudo.replace('${cNF}', codigoAleatorio);
        notaConteudo = notaConteudo.replace('${serie}', serie);
        notaConteudo = notaConteudo.replace('${nNF}', numeroNota);
        notaConteudo = notaConteudo.replace('${tpEmis}', dataFormat);
        notaConteudo = notaConteudo.replace('${cDV}', digito);
        notaConteudo = notaConteudo.replace('${tpEmis}', tipoEmissao);
        notaConteudo = notaConteudo.replace('${CNPJ}', cnpj);
        notaConteudo = notaConteudo.replace('${IE}', ie);
        let linhas = notaConteudo.split('\n');
        let totItens = 1;
        let idItem = 1;
        let todosItens = [];
        let linhasInsert = [];
        while (idItem <= totItens) {
            for (let items of linhas) {
                let removeItem;
                if (items.includes('${item}')) {
                    let removeItem;
                    removeItem = items.replace('${item}', '');
                    if (removeItem.includes('${idItem}'))
                        linhasInsert.push(removeItem.replace(/\${idItem}/g, idItem));
                    else
                        linhasInsert.push(removeItem);
                }
            }
            todosItens.push(linhasInsert.toString());
            idItem++;
        }
        let notaParaEnviar = [];
        let add = false;
        for (let items of linhas) {
            //console.log(items);
            let removeItem;
            if (/\${item}/g.test(items)) {
                if (add == false) {
                    notaParaEnviar.push(linhasInsert.join('\n').toString());
                    add = true;
                }
            } else
                notaParaEnviar.push(items);
        }

        notaConteudo = notaParaEnviar.join('\n').toString();
        let valorTotal = parseFloat(totItens * 51.6000);
        let valorPis = parseFloat(51.6000 * 1.65 / 100).toFixed(2);
        let valorCofins = parseFloat(51.6000 * 7.60 / 100).toFixed(2);
        let vTotTrib = parseFloat(19.95 * totItens);
        let vFCPSTRet = parseFloat(51.6000 * 2.00 / 100).toFixed(2);
        while (/\${valorTotal}/.test(notaConteudo)) {
            notaConteudo = notaConteudo.replace('${valorTotal}', valorTotal.toFixed(2));
        }
        notaConteudo = notaConteudo.replace('${valorPis}', (valorPis * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${valorCofins}', (valorCofins * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vFCPSTRet}', (vFCPSTRet * totItens).toFixed(2));
        notaConteudo = notaConteudo.replace('${vTotTrib}', vTotTrib.toFixed(2));
        console.log(notaConteudo);
        return notaConteudo;
    }

    criarArquivo(conteudo, numNota, agenteId) {
        let caminho;
        let nome = nomenclatura.substring(0, nomenclatura.length - 4);
        let formatAgente = ("000" + agenteId).slice(-3);
        nome = `${nome}${formatAgente}#`;
        if (!xml)
            caminho = nome + numNota + '_ped_env.txt';
        else
            caminho = nome + numNota + '_ped_env.xml';

        console.log(`Agente: ${nome}`);

        if (comunicacao == 2) {
            let envioBanco = new EnvioBanco();
            envioBanco.enviar(conteudo, caminho);
        }
        else if (comunicacao == 3) {
            let envioSocket = new EnvioSocket();
            envioSocket.enviar(conteudo, caminho, agenteId);
        }
        else
            new EnvioArquivo(destino, caminho, conteudo, agenteId);
    }

    //Calcula o digito verificador
    calculaDV(nNF) {
        let soma = 0;
        let resto = 0;
        let peso = [4, 3, 2, 9, 8, 7, 6, 5];
        let digitoRetorno;
        for (let i = 0; i < nNF.length - 1; i++)
            soma += peso[i % 8] * (parseInt(nNF.substr(i, 1)));
        resto = soma % 11;
        if (resto == 0 || resto == 1) digitoRetorno = 0; else digitoRetorno = 11 - resto;

        return digitoRetorno;
    }

}
module.exports = NotasService;