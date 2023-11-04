require("cypress-xpath");
import { Flamengo } from "../../../Arquivos/Usuario.js";
import { Vasco } from "../../../Arquivos/Usuario.js";
/***
 * Este  cenario de teste esta em modo semi-automatica
 * devido  a validação captcha  e não foi finalizado  o teste
 * validação do CNPJ
 *
 */
describe("CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO", () => {
  let tiposCertidao = [0, 1, 2, 3, 4, 5];
  let Empresas = [Flamengo, Vasco];
  for (let h = 0; h < Empresas.length; h++) {
    const empresa = Empresas[h];
    for (let i = 0; i < tiposCertidao.length; i++) {
      const tipo = tiposCertidao[i];
      EmitirCertidao(empresa, tipo);
    }
  }
});
/**
 * @author @carloseduardonit
 * @param {*} Empresa
 * @param {*} TipoCertidao
 */
function EmitirCertidao(Empresa, TipoCertidao) {
  it(criarTitulo(Empresa, TipoCertidao), () => {
    cy.viewport(1438, 700);
    cy.visit("https://cnc.tjdft.jus.br/").wait(10000);
    cy.get("a.bg-orange").click();
    if (escolherTipoCertidao(TipoCertidao)) {
      cy.xpath('//input[@aria-label="CPF/CNPJ"]').type(Empresa.CNPJ);
      //cy.get('[style="width: 304px; height: 78px;"] > div > iframe').check();
      cy.log("Clique no Captcha");
      cy.wait(30000).xpath('//button[@type="submit"]').first().click();
      cy.get(".bg-primary > .q-btn__content > .block").click();
      cy.wait(1000).contains("DOWNLOAD").click();
    }
  });
}
function criarTitulo(Empresa, TipoCertidao) {
  var reposta;
  switch (TipoCertidao) {
    case 1:
      reposta =
        "17." +
        TipoCertidao +
        " CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO Criminal da empresa: " +
        Empresa.nomePessoa;
      break;
    case 2:
      reposta =
        "17." +
        TipoCertidao +
        " CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO Cível da empresa: " +
        Empresa.nomePessoa;
      break;
    case 3:
      reposta =
        "17." +
        TipoCertidao +
        " CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO de Falência e Recuperação Judicial da empresa: " +
        Empresa.nomePessoa;
      break;
    case 4:
      reposta =
        "17." +
        TipoCertidao +
        " CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO Especial (Cível e Criminal) da empresa: " +
        Empresa.nomePessoa;
      break;
    default:
      reposta =
        "Não  emitira a CERTIDÃO NEGATIVA DE DISTRIBUIÇÃO da empresa: " +
        Empresa.nomePessoa;
      break;
  }
  return reposta;
}
function escolherTipoCertidao(opcao) {
  if (opcao > 0 && opcao <= 4) {
    cy.get("div.q-pt-md > div:nth-of-type(" + opcao + ") svg").click();
    return true;
  } else {
    cy.log("Não pode emitir a certidão");
  }
}
