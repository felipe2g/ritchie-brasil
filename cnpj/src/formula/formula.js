const clc = require("cli-color")
const axios = require("axios")
const cnpjValidation = require('./utils/validations/cnpj')

async function Run(cnpj) {
  const version = '0.0.1'
  const validCnpj = cnpjValidation(cnpj)

  if(!validCnpj) {
    console.log(clc.red("CNPJ incorreto, você digitou certinho?"))
    return
  }

  const cnpjNumbers = cnpj.replace(/\D/g, "");

  console.log(`${clc.green('[̲̅<̲̅Θ̲̅>̲̅| Ritchie Brasil')} - ${clc.blueBright('CNPJ')} - ${clc.yellow(`v${version}`)}\n`)

  const cnpjInfo = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpjNumbers}`).catch(() => {
    console.log(clc.red("Falha ao buscar o CNPJ."))
  });

  if(cnpjInfo.data.status === 'ERROR') {
    console.log(clc.red("Falha ao buscar o CNPJ."))
  }

  const {
    tipo,
    abertura,
    nome,
    porte,
    atividade_principal,
    atividades_secundarias,
    natureza_juridica,
    logradouro,
    numero,
    complemento,
    cep,
    bairro,
    municipio,
    email,
    telefone,
    situacao,
    data_situacao
  } = cnpjInfo.data;

  if(tipo || abertura || nome || porte || natureza_juridica ) {
    console.log(clc.yellow('#################################################'))
    console.log(clc.yellow('##################### Dados #####################'))
    console.log(clc.yellow('#################################################'))
    cnpjInfo.data.cnpj && console.log(`CNPJ: ${cnpjInfo.data.cnpj}`)
    tipo               && console.log(`Tipo: ${tipo}`)
    abertura           && console.log(`Data de Abertura: ${abertura}`)
    nome               && console.log(`Nome Empresarial: ${nome}`)
    porte              && console.log(`Porte: ${porte}`)
    natureza_juridica  && console.log(`Natureza Jurídica: ${natureza_juridica}`)
    console.log("")
  }

  if(!(typeof atividade_principal === "undefined")) {
    console.log(clc.yellow('##################################################'))
    console.log(clc.yellow('################### Atividades ###################'))
    console.log(clc.yellow('##################################################'))

    if(atividade_principal.length > 0) {
      console.log(clc.yellow('- Principal'))

      atividade_principal.map((atividade) => {
        console.log(`${atividade.code} - ${atividade.text}`)
      })

      console.log("")
    }
  }

  if(!(typeof atividades_secundarias === "undefined")) {
    if(atividades_secundarias.length > 0) {
      console.log(clc.yellow('- Secundária'))

      atividades_secundarias.map((atividade) => {
        console.log(`${atividade.code} - ${atividade.text}`)
      })

      console.log("")
    }
  }

  if(logradouro || numero || complemento || cep || bairro || municipio) {
    console.log(clc.yellow('##################################################'))
    console.log(clc.yellow('#################### Endereço ####################'))
    console.log(clc.yellow('##################################################'))
    logradouro  && console.log(`Logradouro: ${logradouro}`)
    numero      && console.log(`Número: ${numero}`)
    complemento && console.log(`Complemento: ${complemento}`)
    cep         && console.log(`CEP: ${cep}`)
    bairro      && console.log(`Bairro: ${bairro}`)
    municipio   && console.log(`Municipio: ${municipio}`)
    console.log("")
  }

  if(email || telefone) {
    console.log(clc.yellow('#################################################'))
    console.log(clc.yellow('#################### Contato ####################'))
    console.log(clc.yellow('#################################################'))
    email    && console.log(`Email: ${email}`)
    telefone && console.log(`Telefone: ${telefone}`)
    console.log("")
  }

  if(situacao || data_situacao) {
    console.log(clc.yellow('#################################################'))
    console.log(clc.yellow('################## Informações ##################'))
    console.log(clc.yellow('#################################################'))
    console.log(clc.yellow(`Informações`))
    situacao      && console.log(`Situação: ${situacao}`)
    data_situacao && console.log(`Data da Situação: ${data_situacao}`)
    console.log("")
  }
}

const formula = Run
module.exports = formula
